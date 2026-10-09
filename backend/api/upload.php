<?php
/**
 * Secure Media Upload Handler
 * File: backend/api/upload.php
 *
 * Protected endpoint requiring active authenticated administrator session
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/helpers/response.php';

// Authentication Check: Verify active admin session
if (empty($_SESSION['admin_user_id'])) {
    jsonResponse(null, 401, 'Unauthorized. Active administrator session is required to upload assets.');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(null, 405, 'Method not allowed. Use POST multipart/form-data.');
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $uploadErrors = [
        UPLOAD_ERR_INI_SIZE   => 'File exceeds php.ini upload_max_filesize limit.',
        UPLOAD_ERR_FORM_SIZE  => 'File exceeds HTML form MAX_FILE_SIZE limit.',
        UPLOAD_ERR_PARTIAL    => 'File was only partially uploaded.',
        UPLOAD_ERR_NO_FILE    => 'No file was submitted.',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary upload directory on host.',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk.',
        UPLOAD_ERR_EXTENSION  => 'A PHP extension blocked the file upload.'
    ];
    $code = $_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE;
    $msg = $uploadErrors[$code] ?? 'Unknown upload error occurred.';
    jsonResponse(null, 400, $msg);
}

$uploadedFile = $_FILES['file'];

// 1. Validate File Size (Maximum 8MB)
$maxBytes = 8 * 1024 * 1024; // 8 Megabytes
if ($uploadedFile['size'] > $maxBytes) {
    jsonResponse(null, 413, 'File payload too large. Maximum permitted size is 8MB.');
}

// 2. Strict MIME Type Inspection (via finfo or mime_content_type)
$tmpPath = $uploadedFile['tmp_name'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $tmpPath);
finfo_close($finfo);

$allowedMimes = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
];

if (!array_key_exists($mimeType, $allowedMimes)) {
    jsonResponse(null, 415, "Unsupported media type '{$mimeType}'. Allowed: image/jpeg, image/png, image/webp.");
}

$extension = $allowedMimes[$mimeType];

// 3. Target Upload Directory Setup
$uploadDir = realpath(__DIR__ . '/../') . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// 4. Cryptographically Random Filename Generation
$randomName = bin2hex(random_bytes(16)) . '.' . $extension;
$destinationPath = $uploadDir . $randomName;

if (!move_uploaded_file($tmpPath, $destinationPath)) {
    jsonResponse(null, 500, 'Failed to store file on web host server.');
}

// Determine public URL relative to web root
$publicUrl = '/uploads/' . $randomName;

jsonResponse([
    'success'  => true,
    'filename' => $randomName,
    'url'      => $publicUrl,
    'mime'     => $mimeType,
    'size'     => $uploadedFile['size']
], 201);
