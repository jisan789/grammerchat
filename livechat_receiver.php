<?php
/**
 * LiveChat High-Performance SQLite PDO Receiver & API Provider
 * 
 * Upgraded to native SQLite storage (livechat.db) with WAL mode, transactions,
 * prepared statements, session cookie observation, and safe targeted conversation deletion.
 */

// 1. Headers & CORS Configuration
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Strict Zero-Cache Headers: Disables proxy, CDN, and browser caching
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
header('Pragma: no-cache');
header('Expires: 0');
header('Surrogate-Control: no-store');
header('CDN-Cache-Control: no-store');
header('Cloudflare-CDN-Cache-Control: no-store');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Storage & Directory Configuration
$dbFile    = __DIR__ . '/livechat.db';
$voiceDir  = __DIR__ . '/voice';
$imagesDir = __DIR__ . '/images';

if (!is_dir($voiceDir))  @mkdir($voiceDir, 0755, true);
if (!is_dir($imagesDir)) @mkdir($imagesDir, 0755, true);

// 3. SQLite PDO Initialization
try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA journal_mode=WAL;');
    $pdo->exec('PRAGMA synchronous=NORMAL;');
    $pdo->exec('PRAGMA foreign_keys=ON;');

    // 1. Users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            display_name TEXT NOT NULL,
            avatar TEXT,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            passkey TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // 2. Sessions table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
        CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(username);
    ");

    // 3. Messages table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender TEXT NOT NULL,
            recipient TEXT NOT NULL,
            msg_type TEXT NOT NULL,
            text_content TEXT,
            media_duration REAL,
            client_time TEXT,
            seen INTEGER DEFAULT 0,
            reply_to TEXT,
            client_msg_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_messages_pair ON messages(sender, recipient);
        CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
    ");

    // 4. Seen records
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS seen_records (
            msg_id TEXT PRIMARY KEY,
            marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // 5. User presence tracking
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS user_presence (
            user_key TEXT PRIMARY KEY,
            last_seen TEXT NOT NULL,
            updated_at TIMESTAMP D  EFAULT CURRENT_TIMESTAMP
        );
    ");
    try { $pdo->exec("ALTER TABLE user_presence ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;"); } catch (Exception $e) {}
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'SQLite initialization error: ' . $e->getMessage()]);
    exit;
}

// ─────────────────────────────────────────────────────────────
// Cookie & Request Helpers
// ─────────────────────────────────────────────────────────────
$isHttps = (
    (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off') ||
    (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https') ||
    (!empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443)
);

function setSessionCookie($token, $isHttps) {
    $expire = time() + (90 * 86400); // 90 days
    if (PHP_VERSION_ID >= 70300) {
        setcookie('chat_session', $token, [
            'expires'  => $expire,
            'path'     => '/',
            'httponly' => true,
            'samesite' => 'Lax',
            'secure'   => $isHttps,
        ]);
    } else {
        setcookie('chat_session', $token, $expire, '/; samesite=lax', '', $isHttps, true);
    }
}

function clearSessionCookie($isHttps) {
    if (PHP_VERSION_ID >= 70300) {
        setcookie('chat_session', '', [
            'expires'  => time() - 3600,
            'path'     => '/',
            'httponly' => true,
            'samesite' => 'Lax',
            'secure'   => $isHttps,
        ]);
    } else {
        setcookie('chat_session', '', time() - 3600, '/; samesite=lax', '', $isHttps, true);
    }
}

function getSessionTokenFromRequest() {
    global $input;
    if (!empty($_COOKIE['chat_session'])) {
        return trim($_COOKIE['chat_session']);
    }
    $authHeader = '';
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (!empty($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        } elseif (!empty($headers['authorization'])) {
            $authHeader = $headers['authorization'];
        }
    }
    if ($authHeader && stripos($authHeader, 'Bearer ') === 0) {
        return trim(substr($authHeader, 7));
    }
    if (!empty($_GET['token'])) {
        return trim($_GET['token']);
    }
    if (is_array($input) && !empty($input['token'])) {
        return trim($input['token']);
    }
    return null;
}

function getAuthenticatedUser($pdo) {
    $token = getSessionTokenFromRequest();
    if (!$token) return null;

    $stmt = $pdo->prepare("
        SELECT s.token, s.expires_at, u.username, u.display_name, u.avatar, u.passkey
        FROM sessions s
        JOIN users u ON s.username = u.username
        WHERE s.token = :token
    ");
    $stmt->execute([':token' => $token]);
    $row = $stmt->fetch();
    if (!$row) return null;

    // Check expiration
    if (strtotime($row['expires_at']) < time()) {
        $del = $pdo->prepare("DELETE FROM sessions WHERE token = :token");
        $del->execute([':token' => $token]);
        return null;
    }

    return [
        'username'     => $row['username'],
        'display_name' => $row['display_name'],
        'avatar'       => $row['avatar'],
        'has_passkey'  => !empty($row['passkey'])
    ];
}

// Media upload helpers
function saveVoiceAudioFile($dataUrlOrBase64) {
    if (empty($dataUrlOrBase64)) return null;
    $ext = 'webm';
    $binary = null;

    if (preg_match('/^data:audio\/([a-zA-Z0-9_\-\+]+)(?:;[a-zA-Z0-9_\-=]+)*;base64,(.+)$/s', $dataUrlOrBase64, $matches)) {
        $mime = strtolower($matches[1]);
        if (strpos($mime, 'ogg') !== false)       $ext = 'ogg';
        elseif (strpos($mime, 'mp4') !== false || strpos($mime, 'm4a') !== false || strpos($mime, 'aac') !== false) $ext = 'm4a';
        elseif (strpos($mime, 'wav') !== false)   $ext = 'wav';
        elseif (strpos($mime, 'mp3') !== false)   $ext = 'mp3';
        else                                      $ext = 'webm';
        $binary = base64_decode($matches[2]);
    } else {
        $decoded = base64_decode($dataUrlOrBase64, true);
        if ($decoded !== false && strlen($decoded) > 50) {
            $binary = $decoded;
            $ext = 'webm';
        }
    }

    if (!$binary) return $dataUrlOrBase64;

    $voiceDir = __DIR__ . '/voice';
    if (!is_dir($voiceDir)) @mkdir($voiceDir, 0755, true);

    $fileName = 'voice_' . time() . '_' . substr(md5(uniqid(mt_rand(), true)), 0, 8) . '.' . $ext;
    $filePath = $voiceDir . '/' . $fileName;

    if (@file_put_contents($filePath, $binary) !== false) {
        global $isHttps;
        $scheme = $isHttps ? 'https' : 'http';
        $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : '');
        $scriptDir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
        if ($host) return "{$scheme}://{$host}{$scriptDir}/voice/{$fileName}";
    }
    return $dataUrlOrBase64;
}

function saveImageFile($dataUrlOrBase64) {
    if (empty($dataUrlOrBase64)) return null;
    $ext = 'jpg';
    $binary = null;

    if (preg_match('/^data:image\/([a-zA-Z0-9_\-\+]+)(?:;[a-zA-Z0-9_\-=]+)*;base64,(.+)$/s', $dataUrlOrBase64, $matches)) {
        $mime = strtolower($matches[1]);
        if (strpos($mime, 'png') !== false)       $ext = 'png';
        elseif (strpos($mime, 'webp') !== false)  $ext = 'webp';
        elseif (strpos($mime, 'gif') !== false)   $ext = 'gif';
        elseif (strpos($mime, 'svg') !== false)   $ext = 'svg';
        else                                      $ext = 'jpg';
        $binary = base64_decode($matches[2]);
    } else {
        $decoded = base64_decode($dataUrlOrBase64, true);
        if ($decoded !== false && strlen($decoded) > 50) {
            $binary = $decoded;
            $ext = 'jpg';
        }
    }

    if (!$binary) return $dataUrlOrBase64;

    $imagesDir = __DIR__ . '/images';
    if (!is_dir($imagesDir)) @mkdir($imagesDir, 0755, true);

    $fileName = 'img_' . time() . '_' . substr(md5(uniqid(mt_rand(), true)), 0, 8) . '.' . $ext;
    $filePath = $imagesDir . '/' . $fileName;

    if (@file_put_contents($filePath, $binary) !== false) {
        global $isHttps;
        $scheme = $isHttps ? 'https' : 'http';
        $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : '');
        $scriptDir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
        if ($host) return "{$scheme}://{$host}{$scriptDir}/images/{$fileName}";
    }
    return $dataUrlOrBase64;
}

// ─────────────────────────────────────────────────────────────
// Request Parsing
// ─────────────────────────────────────────────────────────────
$method = $_SERVER['REQUEST_METHOD'];
$rawInput = file_get_contents('php://input');
$jsonBody = json_decode($rawInput, true);

$action = '';
if (isset($_GET['action'])) {
    $action = strtolower(trim($_GET['action']));
} elseif (is_array($jsonBody) && isset($jsonBody['action'])) {
    $action = strtolower(trim($jsonBody['action']));
} elseif (isset($_POST['action'])) {
    $action = strtolower(trim($_POST['action']));
}

$input = is_array($jsonBody) ? $jsonBody : $_POST;

// ─────────────────────────────────────────────────────────────
// 1. AUTHENTICATION & USER MANAGEMENT ACTIONS
// ─────────────────────────────────────────────────────────────

// A. Register User: action = "register"
if ($action === 'register' || $action === 'user_register') {
    $username    = isset($input['username']) ? strtolower(trim($input['username'])) : '';
    $password    = isset($input['password']) ? trim($input['password']) : '';
    $displayName = isset($input['display_name']) ? trim($input['display_name']) : (isset($input['displayName']) ? trim($input['displayName']) : '');
    $avatar      = isset($input['avatar']) ? trim($input['avatar']) : '';
    $passHash    = isset($input['password_hash']) ? trim($input['password_hash']) : '';
    $salt        = isset($input['salt']) ? trim($input['salt']) : '';
    $passkey     = isset($input['passkey']) ? trim($input['passkey']) : null;

    if (empty($username) || strlen($username) < 2) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Username must be at least 2 characters']);
        exit;
    }

    // Check if user exists
    $checkStmt = $pdo->prepare("SELECT username FROM users WHERE username = :u");
    $checkStmt->execute([':u' => $username]);
    if ($checkStmt->fetch()) {
        http_response_code(409);
        echo json_encode(['status' => 'error', 'message' => 'Username already taken']);
        exit;
    }

    if (empty($salt)) $salt = bin2hex(random_bytes(16));
    if (empty($passHash) && !empty($password)) {
        $passHash = hash('sha256', $password . $salt);
    }
    if (empty($displayName)) $displayName = ucfirst($username);
    if (empty($avatar)) $avatar = 'https://api.dicebear.com/7.x/bottts/svg?seed=' . urlencode($username);

    $insUser = $pdo->prepare("
        INSERT INTO users (username, display_name, avatar, password_hash, salt, passkey)
        VALUES (:u, :d, :a, :p, :s, :pk)
    ");
    $insUser->execute([
        ':u'  => $username,
        ':d'  => $displayName,
        ':a'  => $avatar,
        ':p'  => $passHash,
        ':s'  => $salt,
        ':pk' => $passkey,
    ]);

    // Create session token & cookie
    $token = bin2hex(random_bytes(32));
    $expiresAt = gmdate('Y-m-d H:i:s', time() + (90 * 86400));
    $insSess = $pdo->prepare("INSERT INTO sessions (token, username, expires_at) VALUES (:t, :u, :e)");
    $insSess->execute([':t' => $token, ':u' => $username, ':e' => $expiresAt]);

    setSessionCookie($token, $isHttps);

    // Initial presence
    $pStmt = $pdo->prepare("
        INSERT INTO user_presence (user_key, last_seen, updated_at)
        VALUES (:u, :ls, CURRENT_TIMESTAMP)
        ON CONFLICT(user_key) DO UPDATE SET last_seen = :ls, updated_at = CURRENT_TIMESTAMP
    ");
    $pStmt->execute([':u' => $username, ':ls' => gmdate('Y-m-d\TH:i:s\Z')]);

    echo json_encode([
        'status'  => 'ok',
        'message' => 'User registered successfully',
        'token'   => $token,
        'user'    => [
            'username'     => $username,
            'display_name' => $displayName,
            'avatar'       => $avatar,
            'has_passkey'  => !empty($passkey)
        ]
    ]);
    exit;
}

// B. Login / Authenticate: action = "authenticate" or "login"
if ($action === 'authenticate' || $action === 'login') {
    $username = isset($input['username']) ? strtolower(trim($input['username'])) : '';
    $password = isset($input['password']) ? trim($input['password']) : '';

    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Username and password required']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT username, display_name, avatar, password_hash, salt, passkey FROM users WHERE username = :u");
    $stmt->execute([':u' => $username]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        exit;
    }

    $computedHash = hash('sha256', $password . $user['salt']);
    if ($computedHash !== $user['password_hash']) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        exit;
    }

    $token = bin2hex(random_bytes(32));
    $expiresAt = gmdate('Y-m-d H:i:s', time() + (90 * 86400));
    $insSess = $pdo->prepare("INSERT INTO sessions (token, username, expires_at) VALUES (:t, :u, :e)");
    $insSess->execute([':t' => $token, ':u' => $username, ':e' => $expiresAt]);

    setSessionCookie($token, $isHttps);

    echo json_encode([
        'status'  => 'ok',
        'message' => 'Logged in successfully',
        'token'   => $token,
        'user'    => [
            'username'     => $user['username'],
            'display_name' => $user['display_name'],
            'avatar'       => $user['avatar'],
            'has_passkey'  => !empty($user['passkey'])
        ]
    ]);
    exit;
}

// C. Verify/Get Session: action = "session_verify" or "me"
if ($action === 'session_verify' || $action === 'me') {
    $user = getAuthenticatedUser($pdo);
    if (!$user) {
        http_response_code(401);
        echo json_encode(['status' => 'unauthorized', 'user' => null]);
        exit;
    }
    echo json_encode(['status' => 'ok', 'user' => $user]);
    exit;
}

// D. Logout: action = "logout"
if ($action === 'logout' || $action === 'session_delete') {
    $token = getSessionTokenFromRequest();
    if ($token) {
        $del = $pdo->prepare("DELETE FROM sessions WHERE token = :t");
        $del->execute([':t' => $token]);
    }
    clearSessionCookie($isHttps);
    echo json_encode(['status' => 'ok', 'message' => 'Logged out successfully']);
    exit;
}

// E. Set Passkey: action = "set_passkey"
if ($action === 'set_passkey') {
    $user = getAuthenticatedUser($pdo);
    $username = $user ? $user['username'] : (isset($input['username']) ? strtolower(trim($input['username'])) : '');
    $passkey = isset($input['passkey']) ? trim((string)$input['passkey']) : '';

    if (empty($username) || strlen($passkey) !== 4 || !ctype_digit($passkey)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid passkey (must be 4 digits)']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE users SET passkey = :pk, updated_at = CURRENT_TIMESTAMP WHERE username = :u");
    $stmt->execute([':pk' => $passkey, ':u' => $username]);
    echo json_encode(['status' => 'ok', 'message' => 'Passkey saved']);
    exit;
}

// F. Verify Passkey: action = "verify_passkey"
if ($action === 'verify_passkey') {
    $username = isset($input['username']) ? strtolower(trim($input['username'])) : '';
    $passkey = isset($input['passkey']) ? trim((string)$input['passkey']) : '';

    $stmt = $pdo->prepare("SELECT username, display_name, avatar, passkey FROM users WHERE username = :u");
    $stmt->execute([':u' => $username]);
    $user = $stmt->fetch();

    if ($user && !empty($user['passkey']) && $user['passkey'] === $passkey) {
        echo json_encode([
            'status'   => 'ok',
            'verified' => true,
            'user'     => [
                'username'     => $user['username'],
                'display_name' => $user['display_name'],
                'avatar'       => $user['avatar']
            ]
        ]);
        exit;
    }
    http_response_code(400);
    echo json_encode(['status' => 'error', 'verified' => false, 'message' => 'Incorrect passkey']);
    exit;
}

// G. List Registered Users: action = "get_users"
if ($action === 'get_users') {
    $currentUser = isset($_GET['current_user']) ? strtolower(trim($_GET['current_user'])) : '';
    $stmt = $pdo->query("
        SELECT u.username, u.display_name, u.avatar, u.passkey, p.last_seen
        FROM users u
        LEFT JOIN user_presence p ON u.username = p.user_key
        ORDER BY u.username ASC
    ");
    $users = $stmt->fetchAll();

    $result = [];
    foreach ($users as $u) {
        $uname = $u['username'];
        $item = [
            'username'     => $uname,
            'display_name' => $u['display_name'],
            'avatar'       => $u['avatar'],
            'has_passkey'  => !empty($u['passkey']),
            'last_seen'    => $u['last_seen'],
            'last_message' => null
        ];

        if ($currentUser && $uname !== $currentUser) {
            $mStmt = $pdo->prepare("
                SELECT id, sender, recipient, msg_type, text_content, media_duration, client_time, seen, created_at
                FROM messages
                WHERE (sender = :c AND recipient = :u) OR (sender = :u AND recipient = :c)
                ORDER BY id DESC LIMIT 1
            ");
            $mStmt->execute([':c' => $currentUser, ':u' => $uname]);
            $lastM = $mStmt->fetch();
            if ($lastM) {
                $lastM['seen'] = (bool)$lastM['seen'];
                $item['last_message'] = $lastM;
            }
        }
        $result[] = $item;
    }

    echo json_encode(['status' => 'ok', 'users' => $result]);
    exit;
}

// H. Update Profile: action = "update_profile"
if ($action === 'update_profile') {
    $authUser = getAuthenticatedUser($pdo);
    $username = $authUser ? $authUser['username'] : (isset($input['username']) ? strtolower(trim($input['username'])) : '');
    $displayName = isset($input['display_name']) ? trim($input['display_name']) : '';
    $avatar = isset($input['avatar']) ? trim($input['avatar']) : '';

    if (empty($username)) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    if ($displayName && $avatar) {
        $stmt = $pdo->prepare("UPDATE users SET display_name = :d, avatar = :a, updated_at = CURRENT_TIMESTAMP WHERE username = :u");
        $stmt->execute([':d' => $displayName, ':a' => $avatar, ':u' => $username]);
    } elseif ($displayName) {
        $stmt = $pdo->prepare("UPDATE users SET display_name = :d, updated_at = CURRENT_TIMESTAMP WHERE username = :u");
        $stmt->execute([':d' => $displayName, ':u' => $username]);
    } elseif ($avatar) {
        $stmt = $pdo->prepare("UPDATE users SET avatar = :a, updated_at = CURRENT_TIMESTAMP WHERE username = :u");
        $stmt->execute([':a' => $avatar, ':u' => $username]);
    }

    $prof = $pdo->prepare("SELECT username, display_name, avatar FROM users WHERE username = :u");
    $prof->execute([':u' => $username]);
    echo json_encode(['status' => 'ok', 'user' => $prof->fetch()]);
    exit;
}

// ─────────────────────────────────────────────────────────────
// 2. CLEAR: SAFE TARGETED CONVERSATION DELETION
// CRITICAL: Protect against clearing the entire database!
// ─────────────────────────────────────────────────────────────
if ($action === 'clear' || $action === 'empty') {
    $authUser = getAuthenticatedUser($pdo);
    $u1 = $authUser ? $authUser['username'] : (isset($input['user1']) ? strtolower(trim($input['user1'])) : (isset($_GET['user1']) ? strtolower(trim($_GET['user1'])) : ''));
    $u2 = isset($input['opponent']) ? strtolower(trim($input['opponent'])) : (isset($input['user2']) ? strtolower(trim($input['user2'])) : (isset($_GET['opponent']) ? strtolower(trim($_GET['opponent'])) : (isset($_GET['user2']) ? strtolower(trim($_GET['user2'])) : '')));

    // Strictly enforce both participants to prevent accidental or malicious full wipe
    if (empty($u1) || empty($u2)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Both conversation participants must be specified to delete chat. Database wipe prevented.'
        ]);
        exit;
    }

    // Find media files associated ONLY with this specific conversation
    $mediaStmt = $pdo->prepare("
        SELECT text_content, msg_type FROM messages
        WHERE ((sender = :u1 AND recipient = :u2) OR (sender = :u2 AND recipient = :u1))
          AND msg_type IN ('voice', 'image')
    ");
    $mediaStmt->execute([':u1' => $u1, ':u2' => $u2]);
    $mediaRows = $mediaStmt->fetchAll();

    // Delete ONLY the messages between these two users
    $delStmt = $pdo->prepare("
        DELETE FROM messages
        WHERE (sender = :u1 AND recipient = :u2) OR (sender = :u2 AND recipient = :u1)
    ");
    $delStmt->execute([':u1' => $u1, ':u2' => $u2]);
    $deletedCount = $delStmt->rowCount();

    // Clean up local media files belonging ONLY to the deleted messages
    foreach ($mediaRows as $row) {
        $content = isset($row['text_content']) ? $row['text_content'] : '';
        if (strpos($content, '/voice/') !== false) {
            $parts = explode('/voice/', $content);
            $fileName = explode('?', end($parts))[0];
            $filePath = $voiceDir . '/' . $fileName;
            if (is_file($filePath)) @unlink($filePath);
        } elseif (strpos($content, '/images/') !== false) {
            $parts = explode('/images/', $content);
            $fileName = explode('?', end($parts))[0];
            $filePath = $imagesDir . '/' . $fileName;
            if (is_file($filePath)) @unlink($filePath);
        }
    }

    echo json_encode([
        'status'        => 'ok',
        'message'       => "Cleared {$deletedCount} messages between {$u1} and {$u2}",
        'deleted_count' => $deletedCount
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// ─────────────────────────────────────────────────────────────
// 3. GET: Retrieve messages & presence between two users
// ─────────────────────────────────────────────────────────────
if ($action === 'get' || ($method === 'GET' && (empty($action) || $action === 'get'))) {
    $authUser = getAuthenticatedUser($pdo);
    $user1 = isset($_GET['user1']) ? strtolower(trim($_GET['user1'])) : ($authUser ? $authUser['username'] : '');
    $user2 = isset($_GET['user2']) ? strtolower(trim($_GET['user2'])) : (isset($_GET['opponent']) ? strtolower(trim($_GET['opponent'])) : '');

    if ($user1 && $user2) {
        $stmt = $pdo->prepare("
            SELECT * FROM (
                SELECT id, sender, recipient, msg_type, text_content, media_duration,
                       client_time, seen, reply_to, client_msg_id, created_at
                FROM messages
                WHERE (sender = :u1 AND recipient = :u2) OR (sender = :u2 AND recipient = :u1)
                ORDER BY id DESC LIMIT 250
            ) ORDER BY id ASC
        ");
        $stmt->execute([':u1' => $user1, ':u2' => $user2]);
        $rows = $stmt->fetchAll();
        $conversation = [];
        foreach ($rows as $r) {
            $r['seen'] = (bool)$r['seen'];
            if (!empty($r['reply_to'])) {
                $decoded = json_decode($r['reply_to'], true);
                if ($decoded !== null) $r['reply_to'] = $decoded;
            }
            $conversation[] = $r;
        }
    } else {
        $conversation = [];
    }

    // Get presence for user2
    $lastSeen = null;
    if ($user2) {
        $pStmt = $pdo->prepare("SELECT last_seen FROM user_presence WHERE user_key = :u");
        $pStmt->execute([':u' => $user2]);
        $pRow = $pStmt->fetch();
        if ($pRow) $lastSeen = $pRow['last_seen'];
    }

    echo json_encode([
        'status'   => 'ok',
        'count'    => count($conversation),
        'messages' => $conversation,
        'last_seen'=> $lastSeen
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// ─────────────────────────────────────────────────────────────
// 4. PRESENCE: Update or Retrieve Presence / Last Seen
// ─────────────────────────────────────────────────────────────
if ($action === 'presence_update' || $action === 'update_presence') {
    $user = isset($input['user']) ? strtolower(trim($input['user'])) : (isset($_GET['user']) ? strtolower(trim($_GET['user'])) : '');
    $lastSeen = isset($input['last_seen']) ? trim($input['last_seen']) : (isset($_GET['last_seen']) ? trim($_GET['last_seen']) : gmdate('Y-m-d\TH:i:s\Z'));

    if ($user) {
        $pStmt = $pdo->prepare("
            INSERT INTO user_presence (user_key, last_seen, updated_at)
            VALUES (:u, :ls, CURRENT_TIMESTAMP)
            ON CONFLICT(user_key) DO UPDATE SET last_seen = :ls, updated_at = CURRENT_TIMESTAMP
        ");
        $pStmt->execute([':u' => $user, ':ls' => $lastSeen]);
    }

    echo json_encode(['status' => 'ok', 'user' => $user, 'last_seen' => $lastSeen]);
    exit;
}

if ($action === 'presence_get' || $action === 'get_presence' || $action === 'presence') {
    $user = isset($_GET['user']) ? strtolower(trim($_GET['user'])) : (isset($input['user']) ? strtolower(trim($input['user'])) : '');
    $lastSeen = null;
    if ($user) {
        $pStmt = $pdo->prepare("SELECT last_seen FROM user_presence WHERE user_key = :u");
        $pStmt->execute([':u' => $user]);
        $pRow = $pStmt->fetch();
        if ($pRow) $lastSeen = $pRow['last_seen'];
    }
    echo json_encode(['status' => 'ok', 'user' => $user, 'last_seen' => $lastSeen]);
    exit;
}

// ─────────────────────────────────────────────────────────────
// 5. SEEN: Mark message(s) as seen
// ─────────────────────────────────────────────────────────────
if ($action === 'seen' || $action === 'mark_seen') {
    $sender = isset($input['sender']) ? strtolower(trim($input['sender'])) : '';
    $recipient = isset($input['recipient']) ? strtolower(trim($input['recipient'])) : '';
    $ids = isset($input['ids']) ? $input['ids'] : [];

    if (!empty($ids) && is_array($ids)) {
        $inParams = implode(',', array_fill(0, count($ids), '?'));
        $stmt = $pdo->prepare("UPDATE messages SET seen = 1 WHERE id IN ($inParams)");
        $stmt->execute($ids);
    } elseif ($sender && $recipient) {
        $stmt = $pdo->prepare("UPDATE messages SET seen = 1 WHERE sender = :s AND recipient = :r");
        $stmt->execute([':s' => $sender, ':r' => $recipient]);
    }

    echo json_encode(['status' => 'ok']);
    exit;
}

// ─────────────────────────────────────────────────────────────
// 6. POST: Save a new message (chat, voice, or image)
// ─────────────────────────────────────────────────────────────
if ($method === 'POST') {
    $sender = isset($input['sender']) ? strtolower(trim($input['sender'])) : '';
    $recipient = isset($input['recipient']) ? strtolower(trim($input['recipient'])) : '';
    $msgType = isset($input['msg_type']) ? trim($input['msg_type']) : 'chat';
    $textContent = isset($input['text_content']) ? $input['text_content'] : (isset($input['text']) ? $input['text'] : (isset($input['audio']) ? $input['audio'] : (isset($input['image']) ? $input['image'] : null)));
    $mediaDuration = isset($input['media_duration']) ? (float)$input['media_duration'] : (isset($input['duration']) ? (float)$input['duration'] : null);
    $clientTime = isset($input['client_time']) ? trim($input['client_time']) : (isset($input['time']) ? trim($input['time']) : '');
    $clientMsgId = isset($input['client_msg_id']) ? trim($input['client_msg_id']) : (isset($input['id']) ? trim($input['id']) : null);
    $seen = isset($input['seen']) ? (int)(bool)$input['seen'] : 0;
    $replyTo = isset($input['reply_to']) ? (is_string($input['reply_to']) ? $input['reply_to'] : json_encode($input['reply_to'])) : null;

    if (!$sender || !$recipient) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing sender or recipient']);
        exit;
    }

    if ($msgType === 'voice' && !empty($textContent)) {
        $textContent = saveVoiceAudioFile($textContent);
    }
    if ($msgType === 'image' && !empty($textContent)) {
        $textContent = saveImageFile($textContent);
    }

    // Deduplicate if this client_msg_id was already persisted
    if (!empty($clientMsgId)) {
        $existStmt = $pdo->prepare("SELECT id, text_content, media_duration, client_time, seen FROM messages WHERE client_msg_id = :cid AND sender = :s LIMIT 1");
        $existStmt->execute([':cid' => $clientMsgId, ':s' => $sender]);
        $existing = $existStmt->fetch();
        if ($existing) {
            echo json_encode([
                'status'  => 'ok',
                'message' => 'Message already saved',
                'data'    => [
                    'id'             => (int)$existing['id'],
                    'sender'         => $sender,
                    'recipient'      => $recipient,
                    'msg_type'       => $msgType,
                    'text_content'   => $existing['text_content'],
                    'media_duration' => $existing['media_duration'],
                    'client_time'    => $existing['client_time'],
                    'client_msg_id'  => $clientMsgId,
                    'seen'           => (bool)$existing['seen'],
                ]
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    $insStmt = $pdo->prepare("
        INSERT INTO messages (sender, recipient, msg_type, text_content, media_duration, client_time, seen, reply_to, client_msg_id)
        VALUES (:s, :r, :m, :t, :d, :ct, :seen, :rp, :cid)
    ");
    $insStmt->execute([
        ':s'    => $sender,
        ':r'    => $recipient,
        ':m'    => $msgType,
        ':t'    => $textContent,
        ':d'    => $mediaDuration,
        ':ct'   => $clientTime,
        ':seen' => $seen,
        ':rp'   => $replyTo,
        ':cid'  => $clientMsgId,
    ]);
    $msgId = $pdo->lastInsertId();

    // Update presence
    $pStmt = $pdo->prepare("
        INSERT INTO user_presence (user_key, last_seen, updated_at)
        VALUES (:u, :ls, CURRENT_TIMESTAMP)
        ON CONFLICT(user_key) DO UPDATE SET last_seen = :ls, updated_at = CURRENT_TIMESTAMP
    ");
    $pStmt->execute([':u' => $sender, ':ls' => gmdate('Y-m-d\TH:i:s\Z')]);

    echo json_encode([
        'status'  => 'ok',
        'message' => 'Message saved successfully',
        'data'    => [
            'id'             => (int)$msgId,
            'sender'         => $sender,
            'recipient'      => $recipient,
            'msg_type'       => $msgType,
            'text_content'   => $textContent,
            'media_duration' => $mediaDuration,
            'client_time'    => $clientTime,
            'client_msg_id'  => $clientMsgId,
            'seen'           => (bool)$seen,
        ]
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}
