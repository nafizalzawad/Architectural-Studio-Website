<?php
/**
 * Admin Authentication Middleware & CSRF Guard
 * File: backend/admin/auth_check.php
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Generate CSRF token if not set
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

/**
 * Verify CSRF Token
 */
function verifyCsrfToken(?string $token): bool {
    return !empty($token) && hash_equals($_SESSION['csrf_token'] ?? '', $token);
}

// Check if user is authenticated
if (empty($_SESSION['admin_user_id'])) {
    header('Location: login.php');
    exit;
}
