<?php
/**
 * Root Router / Redirect for admin.websitename.com
 * File: backend/index.php
 *
 * Automatically routes the client directly to the CMS Admin Panel.
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// If already authenticated, land on project dashboard; otherwise direct to login
if (!empty($_SESSION['admin_user_id'])) {
    header('Location: /admin/index.php');
} else {
    header('Location: /admin/login.php');
}
exit;
