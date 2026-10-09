<?php
/**
 * Contact Inquiry Endpoint
 * File: backend/api/contact.php
 *
 * Accepts POST submissions, sanitizes, validates, logs to MySQL,
 * and transmits an email notification via mail()
 */

require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/config/database.php';

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(null, 405, 'Method not allowed. Use POST.');
}

// Receive payload from JSON or standard FormData
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    $input = $_POST;
}

// Anti-spam Honeypot Check (if 'website' or 'hp_field' is filled, silently reject bot)
if (!empty($input['website_hp'])) {
    // Return fake success to deceive bots
    jsonResponse(['message' => 'Inquiry received.'], 200);
}

// Extract & Sanitize fields
$name = trim(filter_var($input['name'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$email = trim(filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL));
$phone = trim(filter_var($input['phone'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$service = trim(filter_var($input['service_interest'] ?? 'General Inquiry', FILTER_SANITIZE_SPECIAL_CHARS));
$message = trim(filter_var($input['message'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));

// Validation
$errors = [];
if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Full name is required (minimum 2 characters).';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message is required (minimum 10 characters).';
}

if (!empty($errors)) {
    jsonResponse(['validation_errors' => $errors], 422, 'Invalid input submission.');
}

$db = Database::getConnection();
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown', 0, 255);

// Basic Rate Limiting: Max 3 submissions per IP in 5 minutes
$rateLimitStmt = $db->prepare("
    SELECT COUNT(*) 
    FROM contact_submissions 
    WHERE ip_address = :ip 
      AND created_at > (NOW() - INTERVAL 5 MINUTE)
");
$rateLimitStmt->execute([':ip' => $ipAddress]);
$recentCount = (int)$rateLimitStmt->fetchColumn();

if ($recentCount >= 3) {
    jsonResponse(null, 429, 'Too many requests. Please wait before submitting another inquiry.');
}

// Log submission into contact_submissions
$insertStmt = $db->prepare("
    INSERT INTO contact_submissions (name, email, service_interest, message, ip_address, user_agent)
    VALUES (:name, :email, :service, :message, :ip, :ua)
");

$insertStmt->execute([
    ':name'    => $name,
    ':email'   => $email,
    ':service' => $service,
    ':message' => $message,
    ':ip'      => $ipAddress,
    ':ua'      => $userAgent
]);

$submissionId = $db->lastInsertId();

// Trigger Studio Notification via PHP mail()
$studioNotificationEmail = getenv('STUDIO_NOTIFY_EMAIL') ?: 'studio@minaleandmann.com';
$emailSubject = "New Architectural Inquiry: {$name} - [{$service}]";

$emailBody = "New Inquiry received via Minale + Mann Web Portal\n\n";
$emailBody .= "--------------------------------------------------\n";
$emailBody .= "Submission ID: #{$submissionId}\n";
$emailBody .= "Client Name:   {$name}\n";
$emailBody .= "Client Email:  {$email}\n";
$emailBody .= "Practice:      {$service}\n";
$emailBody .= "Timestamp:     " . date('Y-m-d H:i:s') . "\n";
$emailBody .= "IP Address:    {$ipAddress}\n";
$emailBody .= "--------------------------------------------------\n\n";
$emailBody .= "Message:\n{$message}\n\n";

$headers = [
    'From'         => 'no-reply@minaleandmann.com',
    'Reply-To'     => $email,
    'X-Mailer'     => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

$headersString = '';
foreach ($headers as $k => $v) {
    $headersString .= "{$k}: {$v}\r\n";
}

// Send mail silently (in dev/cPanel environments mail server might vary)
@mail($studioNotificationEmail, $emailSubject, $emailBody, $headersString);

jsonResponse([
    'id'      => (int)$submissionId,
    'message' => 'Thank you for contacting Minale + Mann. Your inquiry has been registered, and our studio director will be in touch shortly.'
], 201);
