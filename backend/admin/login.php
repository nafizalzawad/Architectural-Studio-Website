<?php
/**
 * Administrator Login
 * File: backend/admin/login.php
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Redirect if already logged in
if (!empty($_SESSION['admin_user_id'])) {
    header('Location: index.php');
    exit;
}

// Generate CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

require_once __DIR__ . '/../api/config/database.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        $error = 'Invalid security token. Please refresh and try again.';
    } else {
        $username = trim($_POST['username'] ?? '');
        $password = trim($_POST['password'] ?? '');

        if (empty($username) || empty($password)) {
            $error = 'Please enter both username and password.';
        } else {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                SELECT id, username, password_hash, email 
                FROM admin_users 
                WHERE username = :user OR email = :email 
                LIMIT 1
            ");
            $stmt->execute([':user' => $username, ':email' => $username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                // Regenerate session ID to prevent session fixation
                session_regenerate_id(true);
                $_SESSION['admin_user_id'] = (int)$user['id'];
                $_SESSION['admin_username'] = $user['username'];
                $_SESSION['admin_email'] = $user['email'];

                // Update last login timestamp
                $updateStmt = $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = :id");
                $updateStmt->execute([':id' => $user['id']]);

                header('Location: index.php');
                exit;
            } else {
                $error = 'Invalid administrative credentials.';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-[#0a0a0c]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS Portal Login | Minale + Mann Architects</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    </style>
</head>
<body class="h-full flex items-center justify-center p-6 text-white bg-[#0c0d0e]">
    <div class="w-full max-w-md bg-[#121316] border border-white/10 p-8 sm:p-10 shadow-2xl">
        <div class="text-center mb-8">
            <span class="text-xs font-mono uppercase tracking-[0.35em] text-neutral-500 block mb-2">Architectural Studio CMS</span>
            <h1 class="text-2xl font-light uppercase tracking-[0.25em] text-white">Minale + Mann</h1>
            <p class="text-xs font-light text-neutral-400 mt-2">Administrative Dashboard Authentication</p>
        </div>

        <?php if (!empty($error)): ?>
            <div class="mb-6 p-3.5 bg-red-950/60 border border-red-500/40 text-red-200 text-xs tracking-wide">
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="login.php" class="space-y-6">
            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">

            <div>
                <label for="username" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Username / Email</label>
                <input type="text" id="username" name="username" required autofocus
                    class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors">
            </div>

            <div>
                <label for="password" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Password</label>
                <input type="password" id="password" name="password" required
                    class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors">
            </div>

            <button type="submit"
                class="w-full py-3.5 bg-white text-neutral-900 text-xs uppercase tracking-[0.25em] font-medium hover:bg-neutral-200 transition-colors">
                Authorize Session
            </button>
        </form>

        <div class="mt-8 pt-6 border-t border-white/10 text-center">
            <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-600 block">Default Dev: admin / password</span>
        </div>
    </div>
</body>
</html>
