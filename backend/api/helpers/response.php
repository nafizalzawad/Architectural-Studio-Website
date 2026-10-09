<?php
/**
 * CORS & Standardized API Response Helper
 * File: backend/api/helpers/response.php
 *
 * Configured for Decoupled Headless Vercel Deployments & Local Dev
 */

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Pre-approved whitelist
$allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
];

// Production domains (read from env or fallback)
$prodDomain = getenv('PRODUCTION_DOMAIN') ?: 'https://minaleandmann.com';
if ($prodHost = parse_url($prodDomain, PHP_URL_HOST)) {
    $allowedOrigins[] = 'https://' . $prodHost;
    $allowedOrigins[] = 'https://www.' . $prodHost;
} else {
    $allowedOrigins[] = $prodDomain;
}

$isAllowed = false;
$matchedOrigin = '';

if (!empty($origin)) {
    // 1. Exact match in whitelist (localhost & production domain)
    if (in_array($origin, $allowedOrigins, true)) {
        $isAllowed = true;
        $matchedOrigin = $origin;
    }
    // 2. Allow all Vercel PR preview & production deployments (*.vercel.app)
    elseif (preg_match('/^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/', $origin)) {
        $isAllowed = true;
        $matchedOrigin = $origin;
    }
    // 3. Optional custom environment override
    elseif ($envOrigin = getenv('CORS_ALLOWED_ORIGIN')) {
        if ($envOrigin === '*' || $envOrigin === $origin) {
            $isAllowed = true;
            $matchedOrigin = $origin;
        }
    }
}

if ($isAllowed && !empty($matchedOrigin)) {
    header("Access-Control-Allow-Origin: {$matchedOrigin}");
    header("Access-Control-Allow-Credentials: true");
} else {
    // Permissive fallback for public read endpoints
    header("Access-Control-Allow-Origin: *");
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-Token, X-Client-Version");
header("Access-Control-Max-Age: 86400"); // Cache preflight for 24 hours

// Handle HTTP preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * Output standardized JSON response and terminate script
 *
 * @param mixed $data Payload to return
 * @param int $status HTTP status code (default 200)
 * @param string|null $error Error message if failed
 */
function jsonResponse($data = null, int $status = 200, ?string $error = null): void {
    http_response_code($status);

    $response = [
        'success'   => ($status >= 200 && $status < 300),
        'status'    => $status,
        'timestamp' => date('c'),
    ];

    if ($error !== null) {
        $response['error'] = $error;
    }

    if ($data !== null) {
        $response['data'] = $data;
    }

    echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
