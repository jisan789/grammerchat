import json
import time
import logging
import datetime
from typing import List, Dict, Any, Optional, Tuple
import httpx
from app.config import PHP_STORAGE_URL

logger = logging.getLogger("livechat.crud")

# ─────────────────────────────────────────────────────────────
# Resilient HTTP Client with Connection Pooling & Retries
# ─────────────────────────────────────────────────────────────
_httpx_client: Optional[httpx.Client] = None

def get_http_client() -> httpx.Client:
    global _httpx_client
    if _httpx_client is None or _httpx_client.is_closed:
        _httpx_client = httpx.Client(
            timeout=httpx.Timeout(20.0, connect=8.0),
            limits=httpx.Limits(max_keepalive_connections=25, max_connections=50, keepalive_expiry=30.0),
            headers={"User-Agent": "LiveChat-Engine/2.0"},
            follow_redirects=True,
        )
    return _httpx_client


def _execute_http(url: str, params: Dict[str, Any], method: str = "POST", timeout: float = 15.0) -> Optional[Dict[str, Any]]:
    if not url:
        return None
    client = get_http_client()
    method_upper = method.upper()

    for attempt in range(2):
        try:
            if method_upper == "POST":
                resp = client.post(url, json=params, timeout=timeout)
            else:
                resp = client.get(url, params=params, timeout=timeout)

            # Parse and return JSON payload if available (including 400/401/409 error messages from PHP)
            try:
                data = resp.json()
                if isinstance(data, dict):
                    return data
            except Exception:
                pass

            if resp.status_code == 200:
                break
            else:
                logger.warning(f"[CRUD] {url} responded with HTTP {resp.status_code} (attempt {attempt + 1}/2): {resp.text[:100]}")
        except (httpx.RequestError, httpx.TimeoutException) as exc:
            logger.warning(f"[CRUD] Network error calling {url} ({attempt + 1}/2): {exc}")
            if attempt < 1:
                time.sleep(0.15 * (attempt + 1))
        except Exception as e:
            logger.error(f"[CRUD] Unexpected error contacting {url}: {e}")
            break

    return None


def _php_call(params: Dict[str, Any], method: str = "POST", timeout: float = 15.0) -> Optional[Dict[str, Any]]:
    return _execute_http(PHP_STORAGE_URL, params=params, method=method, timeout=timeout)


# ─────────────────────────────────────────────────────────────
# Message Resilience Buffer (Stateless DB-First Mode)
# ─────────────────────────────────────────────────────────────
# Recent messages buffer to guarantee zero message loss during race conditions
# key: "user_a:user_b" (sorted alphabetically), value: list of recent message dicts
_RECENT_MESSAGES_BUFFER: Dict[str, List[Dict[str, Any]]] = {}
BUFFER_MAX_PER_PAIR = 50


def _get_pair_key(u1: str, u2: str) -> str:
    s1, s2 = u1.strip().lower(), u2.strip().lower()
    return f"{min(s1, s2)}:{max(s1, s2)}"


def _buffer_recent_message(msg: Dict[str, Any]):
    sender = (msg.get("sender") or "").strip().lower()
    recipient = (msg.get("recipient") or "").strip().lower()
    if not sender or not recipient:
        return

    pair_key = _get_pair_key(sender, recipient)
    buffer = _RECENT_MESSAGES_BUFFER.setdefault(pair_key, [])

    # Avoid duplicate by client_msg_id
    cid = msg.get("client_msg_id") or msg.get("id")
    if cid:
        for existing in buffer:
            if existing.get("client_msg_id") == cid or str(existing.get("id")) == str(cid):
                # Update in place
                existing.update(msg)
                return

    buffer.append(dict(msg))
    if len(buffer) > BUFFER_MAX_PER_PAIR:
        _RECENT_MESSAGES_BUFFER[pair_key] = buffer[-BUFFER_MAX_PER_PAIR:]


# ─────────────────────────────────────────────────────────────
# User & Session CRUD via External PHP Server
# ─────────────────────────────────────────────────────────────
def register_user(
    username: str,
    password: str,
    display_name: Optional[str] = None,
    avatar: Optional[str] = None,
    passkey: Optional[str] = None,
) -> Tuple[Optional[Dict[str, Any]], Optional[str], Optional[str]]:
    """Register a new user account directly on single external PHP database."""
    username = username.strip().lower()
    password = password.strip()

    if len(username) < 2:
        return None, None, "Username must be at least 2 characters long."
    if len(password) < 4:
        return None, None, "Password must be at least 4 characters long."

    payload = {
        "action": "register",
        "username": username,
        "password": password,
        "display_name": (display_name or "").strip() or username.capitalize(),
        "avatar": (avatar or "").strip() or f"https://api.dicebear.com/7.x/bottts/svg?seed={username}",
        "passkey": str(passkey).strip() if passkey else None,
    }

    resp = _php_call(payload, method="POST", timeout=15.0)
    if not resp:
        return None, None, "External authentication service unreachable."

    if resp.get("status") == "ok":
        user = resp.get("user")
        token = resp.get("token")
        return user, token, None

    return None, None, resp.get("message") or "Registration failed."


def authenticate_user(username: str, password: str) -> Tuple[Optional[Dict[str, Any]], Optional[str], Optional[str]]:
    """Verify user credentials directly on the single external PHP database."""
    username = username.strip().lower()
    password = password.strip()

    if not username or not password:
        return None, None, "Please enter both username and password."

    payload = {
        "action": "login",
        "username": username,
        "password": password,
    }

    resp = _php_call(payload, method="POST", timeout=15.0)
    if not resp:
        return None, None, "External authentication service unreachable."

    if resp.get("status") == "ok":
        user = resp.get("user")
        token = resp.get("token")
        return user, token, None

    return None, None, resp.get("message") or "Invalid credentials."


def verify_session_token(token: str) -> Optional[Dict[str, Any]]:
    """Validate session token directly with external PHP database (no local caching)."""
    if not token or len(token) < 16:
        return None

    resp = _php_call({"action": "session_verify", "token": token}, method="GET", timeout=10.0)
    if resp and resp.get("status") == "ok" and resp.get("user"):
        return resp["user"]

    return None


def delete_session(token: str) -> bool:
    """Revoke session on external PHP server."""
    if not token:
        return False
    resp = _php_call({"action": "logout", "token": token}, method="GET", timeout=8.0)
    return bool(resp and resp.get("status") == "ok")


def set_user_passkey(username: str, passkey: str) -> bool:
    """Set or update 4-digit PIN passkey on external PHP server."""
    username = username.strip().lower()
    passkey = str(passkey).strip()
    if not username or len(passkey) != 4 or not passkey.isdigit():
        return False

    resp = _php_call({"action": "set_passkey", "username": username, "passkey": passkey}, method="POST", timeout=10.0)
    return bool(resp and resp.get("status") == "ok")


def verify_user_passkey(username: str, passkey: str) -> bool:
    """Verify 4-digit PIN passkey on external PHP server."""
    username = username.strip().lower()
    passkey = str(passkey).strip()
    if not username or not passkey:
        return False

    resp = _php_call({"action": "verify_passkey", "username": username, "passkey": passkey}, method="POST", timeout=10.0)
    return bool(resp and resp.get("status") == "ok" and resp.get("verified"))


def get_user_profile(username: str) -> Optional[Dict[str, Any]]:
    """Retrieve public profile from external PHP server."""
    username = username.strip().lower()
    users = get_all_users()
    for u in users:
        if u.get("username") == username:
            return u
    return None


def update_user_profile(username: str, display_name: Optional[str] = None, avatar: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """Update profile directly on external PHP server."""
    username = username.strip().lower()
    payload = {
        "action": "update_profile",
        "username": username,
        "display_name": (display_name or "").strip(),
        "avatar": (avatar or "").strip(),
    }
    resp = _php_call(payload, method="POST", timeout=12.0)
    if resp and resp.get("status") == "ok" and resp.get("user"):
        return resp["user"]
    return None


def get_all_users(current_user: Optional[str] = None) -> List[Dict[str, Any]]:
    """Get all registered users directly from single external PHP database."""
    params = {"action": "get_users"}
    if current_user:
        params["current_user"] = current_user.strip().lower()

    resp = _php_call(params, method="GET", timeout=12.0)
    if resp and resp.get("status") == "ok" and isinstance(resp.get("users"), list):
        return resp["users"]
    return []


# ─────────────────────────────────────────────────────────────
# Presence Tracking via External PHP Server (Direct DB Mode)
# ─────────────────────────────────────────────────────────────
def update_user_presence(user_key: str, last_seen_str: Optional[str] = None) -> bool:
    """Sync presence directly to external PHP server."""
    if not user_key:
        return False
    user_key = user_key.strip().lower()
    if not last_seen_str:
        last_seen_str = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")

    resp = _php_call({"action": "presence_update", "user": user_key, "last_seen": last_seen_str}, method="POST", timeout=8.0)
    return bool(resp and resp.get("status") == "ok")


def get_user_presence(user_key: str) -> Optional[str]:
    """Retrieve last seen directly from external PHP server."""
    if not user_key:
        return None
    user_key = user_key.strip().lower()

    resp = _php_call({"action": "presence_get", "user": user_key}, method="POST", timeout=8.0)
    if resp and resp.get("status") == "ok" and resp.get("last_seen"):
        return resp["last_seen"]
    return None


# ─────────────────────────────────────────────────────────────
# Messages Storage & Targeted Safe Deletion via External PHP Server
# ─────────────────────────────────────────────────────────────
def save_message(
    sender: str,
    recipient: str,
    msg_type: str,
    text_content: Optional[str] = None,
    media_duration: Optional[float] = None,
    client_time: Optional[str] = None,
    seen: bool = False,
    reply_to: Optional[Any] = None,
    client_msg_id: Optional[str] = None,
) -> Dict[str, Any]:
    """Save message to local memory buffer immediately and persist to external PHP server."""
    sender = sender.strip().lower()
    recipient = recipient.strip().lower()

    local_msg = {
        "id": client_msg_id or f"local_{int(time.time()*1000)}",
        "sender": sender,
        "recipient": recipient,
        "msg_type": msg_type,
        "text_content": text_content,
        "media_duration": media_duration,
        "client_time": client_time,
        "seen": bool(seen),
        "reply_to": reply_to,
        "client_msg_id": client_msg_id,
        "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z"),
    }

    # Buffer immediately in memory
    _buffer_recent_message(local_msg)

    payload = {
        "action": "send",
        "sender": sender,
        "recipient": recipient,
        "msg_type": msg_type,
        "text_content": text_content,
        "audio": text_content if msg_type == "voice" else None,
        "image": text_content if msg_type == "image" else None,
        "media_duration": media_duration,
        "client_time": client_time,
        "seen": seen,
        "reply_to": reply_to,
        "client_msg_id": client_msg_id,
    }

    resp = _php_call(payload, method="POST", timeout=20.0)
    if resp and resp.get("status") == "ok" and "data" in resp:
        server_data = resp["data"]
        # Update memory buffer with persisted DB id
        local_msg["id"] = server_data.get("id", local_msg["id"])
        _buffer_recent_message(local_msg)
        return server_data

    return local_msg


def mark_messages_seen(sender: str, recipient: str, msg_ids: Optional[List[Any]] = None) -> bool:
    """Mark messages seen in memory buffer and on external PHP server."""
    sender = sender.strip().lower()
    recipient = recipient.strip().lower()

    # Update in memory buffer
    pair_key = _get_pair_key(sender, recipient)
    if pair_key in _RECENT_MESSAGES_BUFFER:
        for m in _RECENT_MESSAGES_BUFFER[pair_key]:
            if m.get("sender") == sender and m.get("recipient") == recipient:
                if not msg_ids or str(m.get("id")) in [str(x) for x in msg_ids] or str(m.get("client_msg_id")) in [str(x) for x in msg_ids]:
                    m["seen"] = True

    payload = {
        "action": "seen",
        "sender": sender,
        "recipient": recipient,
        "ids": msg_ids or [],
    }
    resp = _php_call(payload, method="POST", timeout=8.0)
    return bool(resp and resp.get("status") == "ok")


def get_conversation(user1: str, user2: str, limit: int = 250) -> List[Dict[str, Any]]:
    """Retrieve message history from external PHP server seamlessly merged with recent memory buffer."""
    user1 = user1.strip().lower()
    user2 = user2.strip().lower()

    resp = _php_call({"action": "get", "user1": user1, "user2": user2}, method="GET", timeout=12.0)
    remote_msgs = []
    if resp and resp.get("status") == "ok" and isinstance(resp.get("messages"), list):
        remote_msgs = resp["messages"]

    # Index remote messages by client_msg_id and integer id
    known_cids = set()
    known_ids = set()
    for m in remote_msgs:
        if m.get("client_msg_id"):
            known_cids.add(str(m["client_msg_id"]))
        if m.get("id"):
            known_ids.add(str(m["id"]))

    # Merge any buffered messages not yet present in PHP response
    pair_key = _get_pair_key(user1, user2)
    buffered = _RECENT_MESSAGES_BUFFER.get(pair_key, [])
    merged = list(remote_msgs)

    for bm in buffered:
        cid = str(bm.get("client_msg_id") or "")
        bid = str(bm.get("id") or "")
        if (cid and cid in known_cids) or (bid and bid in known_ids):
            continue
        # Unpersisted or newly buffered message
        merged.append(dict(bm))

    return merged


def clear_conversation(user1: str, user2: str) -> Tuple[bool, int]:
    """
    SAFELY clear conversation messages ONLY between user1 and user2 on external PHP server and memory.
    """
    user1 = (user1 or "").strip().lower()
    user2 = (user2 or "").strip().lower()

    if not user1 or not user2:
        logger.warning(f"[CRUD] clear_conversation aborted: both participants required (user1='{user1}', user2='{user2}')")
        return False, 0

    # Clear memory buffer for pair
    pair_key = _get_pair_key(user1, user2)
    _RECENT_MESSAGES_BUFFER.pop(pair_key, None)

    payload = {
        "action": "clear",
        "user1": user1,
        "user2": user2,
    }

    resp = _php_call(payload, method="POST", timeout=12.0)
    if resp and resp.get("status") == "ok":
        deleted_count = resp.get("deleted_count", 0)
        logger.info(f"[CRUD] Cleared conversation between {user1} and {user2} on external server (deleted: {deleted_count})")
        return True, deleted_count

    return False, 0
