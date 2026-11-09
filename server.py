"""
LiveChat Server — Stateless Real-Time WebSockets Gateway & External PHP Storage Provider
Optimized for zero-disk environments (Render, Cloud, Serverless).
"""

import os
import json
import asyncio
import logging
import datetime
from contextlib import asynccontextmanager
from typing import Optional, Dict, Any

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, Response
from fastapi.responses import FileResponse, PlainTextResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.config import BASE_DIR, STATIC_DIR, INDEX_FILE, PHP_STORAGE_URL
from app.database import init_db
from app.auth import (
    extract_token_from_request,
    verify_session_token,
)
from app.crud import (
    update_user_presence,
    get_user_presence,
    get_conversation,
    clear_conversation,
)
from app.websocket import (
    connections,
    safe_send,
    send_to_user,
    broadcast,
    background_save_message,
    background_mark_seen,
)
from app.async_utils import run_in_thread
from app.routers import auth as auth_router
from app.routers import users as users_router
from app.routers import messages as messages_router
from app.routers import grammar as grammar_router

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("livechat.server")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle: Stateless mode using external PHP storage."""
    init_db()
    logger.info(f"[Server] Stateless mode initialized. External storage target: {PHP_STORAGE_URL}")
    yield
    logger.info("[Server] Shutdown complete.")


app = FastAPI(title="LiveChat Server", version="2.0.0", lifespan=lifespan)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Strict Zero-Cache Middleware: Forces browser and proxies to NEVER cache HTML, JS, CSS, or API data
@app.middleware("http")
async def block_all_caching_middleware(request: Request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers["Surrogate-Control"] = "no-store"
    response.headers["CDN-Cache-Control"] = "no-store"
    response.headers["Cloudflare-CDN-Cache-Control"] = "no-store"
    # Strip caching validators to prevent 304 Not Modified responses
    for h in ("ETag", "etag", "Last-Modified", "last-modified"):
        if h in response.headers:
            del response.headers[h]
    return response

# Include modular API routers
app.include_router(auth_router.router)
app.include_router(users_router.router)
app.include_router(messages_router.router)
app.include_router(grammar_router.router)


# ─────────────────────────────────────────────────────────────
# Helper: Presence Broadcast
# ─────────────────────────────────────────────────────────────
async def broadcast_presence(user_key: str, status: str, last_seen_iso: Optional[str] = None):
    """Notify all connected clients about user presence changes."""
    payload = {
        "type": "presence",
        "user": user_key,
        "status": status,
        "last_seen": last_seen_iso,
    }
    await broadcast(payload, exclude=user_key)


# ─────────────────────────────────────────────────────────────
# WebSocket Real-Time Chat & Media Endpoint (Multi-Device Aware)
# ─────────────────────────────────────────────────────────────
@app.websocket("/ws/{user_key}")
async def websocket_endpoint(websocket: WebSocket, user_key: str):
    user_key = user_key.strip().lower()
    if not user_key:
        await websocket.close(code=4001, reason="Invalid user key")
        return

    await websocket.accept()

    # Register this device connection (supports multiple concurrent devices per account)
    user_socks = connections.setdefault(user_key, set())
    was_offline = (len(user_socks) == 0)
    user_socks.add(websocket)
    device_count = len(user_socks)

    now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
    asyncio.create_task(run_in_thread(update_user_presence, user_key, now_iso))
    logger.info(f"[+] {user_key} connected device (devices: {device_count}, online users: {len(connections)})")

    # If this is the user's first active device, announce online presence to others
    if was_offline:
        await broadcast_presence(user_key, "online")

    try:
        while True:
            raw = await websocket.receive_text()
            try:
                data = json.loads(raw)
            except json.JSONDecodeError:
                continue

            msg_type = data.get("type", "")
            target_user = (data.get("to") or data.get("recipient") or data.get("opponent") or "").strip().lower()

            # Heartbeat ping
            if msg_type in ("ping", "presence_check"):
                now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
                asyncio.create_task(run_in_thread(update_user_presence, user_key, now_iso))
                partner = (data.get("partner") or "").strip().lower()
                is_p_online = bool(connections.get(partner)) if partner else False
                p_last_seen = await run_in_thread(get_user_presence, partner) if partner and not is_p_online else None
                await safe_send(
                    websocket,
                    {
                        "type": "pong" if msg_type == "ping" else "presence",
                        "user": partner,
                        "status": "online" if is_p_online else "offline",
                        "last_seen": p_last_seen,
                    },
                )
                continue

            # Forward message directly to recipient (all active devices)
            data["from"] = user_key
            is_delivered = False
            if target_user:
                is_delivered = await send_to_user(target_user, data)

            # Sync message to sender's OTHER devices (real-time cross-device sync)
            if target_user and msg_type in ("chat", "voice", "image", "chat_edit"):
                sync_payload = dict(data)
                sync_payload["self_sync"] = True
                sync_payload["from"] = user_key
                sync_payload["to"] = target_user
                await send_to_user(user_key, sync_payload, exclude_ws=websocket)

            # Instantly acknowledge message to originating sender device
            client_id = data.get("id") or data.get("client_msg_id")
            if client_id and msg_type in ("chat", "voice", "image"):
                now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
                await safe_send(
                    websocket,
                    {
                        "type": "msg_ack",
                        "id": client_id,
                        "status": "delivered" if is_delivered else "sent",
                        "server_time": now_iso,
                    },
                )

            # Persist chat, voice & image messages to external PHP server concurrently
            if msg_type in ("chat", "voice", "image") and target_user:
                asyncio.create_task(background_save_message(user_key, target_user, msg_type, data))
                now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
                asyncio.create_task(run_in_thread(update_user_presence, user_key, now_iso))

            # Forward seen event and persist seen status in background task
            if msg_type in ("seen", "mark_seen") and target_user:
                await send_to_user(target_user, data)
                ids = data.get("ids") or ([data.get("msg_id")] if data.get("msg_id") else None)
                is_all = data.get("all", False)
                # Sync seen status to sender's other devices
                await send_to_user(user_key, {"type": "seen_sync", "opponent": target_user, "ids": ids, "all": is_all}, exclude_ws=websocket)
                asyncio.create_task(
                    background_mark_seen(sender=target_user, recipient=user_key, ids=None if is_all else ids)
                )

            # Flying balloon emoji reaction sync to recipient and self devices
            if msg_type == "flying_emoji" and target_user:
                await send_to_user(target_user, data)
                await send_to_user(user_key, data, exclude_ws=websocket)

    except WebSocketDisconnect:
        pass
    except Exception as e:
        logger.warning(f"[WS] Exception in websocket loop for {user_key}: {e}")
    finally:
        user_socks = connections.get(user_key)
        if user_socks and websocket in user_socks:
            user_socks.discard(websocket)
            if not user_socks:
                connections.pop(user_key, None)
                now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
                asyncio.create_task(run_in_thread(update_user_presence, user_key, now_iso))
                logger.info(f"[-] {user_key} all devices disconnected")
                await broadcast_presence(user_key, "offline", now_iso)
            else:
                logger.info(f"[-] {user_key} device disconnected ({len(user_socks)} remaining)")


# ─────────────────────────────────────────────────────────────
# Auxiliary Presence & Direct Message History Endpoints
# ─────────────────────────────────────────────────────────────
@app.get("/api/presence/{user_key}")
async def api_get_presence(user_key: str):
    user_key = user_key.strip().lower()
    is_online = bool(connections.get(user_key))
    last_seen = await run_in_thread(get_user_presence, user_key) if not is_online else None
    return JSONResponse({
        "status": "ok",
        "user": user_key,
        "is_online": is_online,
        "last_seen": last_seen,
    })


@app.get("/api/messages/{opponent}")
async def get_messages_opponent(opponent: str, request: Request):
    opponent = opponent.strip().lower()
    token = extract_token_from_request(request)
    current_user = await run_in_thread(verify_session_token, token) if token else None
    user_key = current_user["username"] if current_user else request.query_params.get("user")

    if not user_key:
        return JSONResponse({"status": "error", "message": "User not authenticated"}, status_code=401)

    messages = await run_in_thread(get_conversation, user_key, opponent)
    is_online = bool(connections.get(opponent))
    last_seen = await run_in_thread(get_user_presence, opponent) if not is_online else None

    return JSONResponse({
        "status": "ok",
        "user": user_key,
        "opponent": opponent,
        "is_opponent_online": is_online,
        "opponent_last_seen": last_seen,
        "messages": messages,
    })


@app.post("/api/messages/seen")
async def api_messages_seen(request: Request):
    token = extract_token_from_request(request)
    current_user = await run_in_thread(verify_session_token, token) if token else None
    try:
        body = await request.json()
    except Exception:
        body = {}
    user_key = (current_user["username"] if current_user else body.get("user") or "").strip().lower()
    opponent = (body.get("opponent") or body.get("to") or "").strip().lower()
    ids = body.get("ids") or ([body.get("msg_id")] if body.get("msg_id") else None)
    is_all = body.get("all", False)
    if user_key and opponent:
        asyncio.create_task(background_mark_seen(sender=opponent, recipient=user_key, ids=None if is_all else ids))
        await send_to_user(opponent, {"type": "seen", "from": user_key, "ids": ids, "all": is_all})
        await send_to_user(user_key, {"type": "seen_sync", "opponent": opponent, "ids": ids, "all": is_all})
        return JSONResponse({"status": "ok"})
    return JSONResponse({"status": "error", "message": "Missing parameters"}, status_code=400)


# ─────────────────────────────────────────────────────────────
# Health Check & Keep-Alive Ping
# ─────────────────────────────────────────────────────────────
@app.get("/ping")
@app.get("/api/ping")
async def ping():
    return PlainTextResponse("alive")


@app.get("/health")
async def health():
    return JSONResponse({
        "status": "alive",
        "online_users": list(connections.keys()),
        "external_storage": PHP_STORAGE_URL,
    })


# ─────────────────────────────────────────────────────────────
# Static Files & SPA Delivery (Strict No-Cache Mode)
# ─────────────────────────────────────────────────────────────
NO_CACHE_HEADERS = {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0",
    "Pragma": "no-cache",
    "Expires": "0",
    "Surrogate-Control": "no-store",
    "CDN-Cache-Control": "no-store",
    "Cloudflare-CDN-Cache-Control": "no-store",
}


class NoCacheStaticFiles(StaticFiles):
    def is_not_modified(self, response_headers, request_headers) -> bool:
        return False

    def file_response(self, *args, **kwargs) -> Response:
        resp = super().file_response(*args, **kwargs)
        for k, v in NO_CACHE_HEADERS.items():
            resp.headers[k] = v
        for h in ("ETag", "etag", "Last-Modified", "last-modified"):
            if h in resp.headers:
                del resp.headers[h]
        return resp


app.mount("/static", NoCacheStaticFiles(directory=str(STATIC_DIR)), name="static")


@app.get("/app.js")
async def serve_app_js():
    return FileResponse(
        str(STATIC_DIR / "app.js"),
        media_type="application/javascript",
        headers=NO_CACHE_HEADERS,
    )


@app.get("/pwa.js")
async def serve_pwa_js():
    return FileResponse(
        str(STATIC_DIR / "pwa.js"),
        media_type="application/javascript",
        headers=NO_CACHE_HEADERS,
    )


@app.get("/style.css")
async def serve_style_css():
    return FileResponse(
        str(STATIC_DIR / "style.css"),
        media_type="text/css",
        headers=NO_CACHE_HEADERS,
    )


@app.get("/")
async def serve_root():
    return FileResponse(
        str(INDEX_FILE),
        headers=NO_CACHE_HEADERS,
    )


@app.get("/sw.js")
async def serve_sw_js():
    sw_headers = dict(NO_CACHE_HEADERS)
    sw_headers["Service-Worker-Allowed"] = "/"
    return FileResponse(
        str(BASE_DIR / "sw.js"),
        media_type="application/javascript",
        headers=sw_headers,
    )


@app.get("/manifest.webmanifest")
@app.get("/manifest.json")
async def serve_manifest():
    return FileResponse(
        str(BASE_DIR / "manifest.webmanifest"),
        media_type="application/manifest+json",
        headers=NO_CACHE_HEADERS,
    )


@app.get("/offline.html")
async def serve_offline_html():
    return FileResponse(
        str(BASE_DIR / "offline.html"),
        media_type="text/html",
        headers=NO_CACHE_HEADERS,
    )


@app.get("/favicon.ico")
async def serve_favicon():
    return FileResponse(
        str(BASE_DIR / "favicon.ico"),
        media_type="image/x-icon",
        headers=NO_CACHE_HEADERS,
    )



if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")
