<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

require_once __DIR__ . '/../db.php';

$body = json_decode(file_get_contents('php://input'), true);
if ($body === null) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

$analytics  = !empty($body['analytics']) ? 1 : 0;
$action     = in_array($body['action'] ?? '', ['accept', 'refuse', 'custom']) ? $body['action'] : 'custom';
$sessionId  = preg_replace('/[^a-zA-Z0-9_\-]/', '', $body['session_id'] ?? '');
$ip         = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$userAgent  = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500);
$expiresAt  = date('Y-m-d H:i:s', strtotime('+13 months')); // CNIL : 13 mois max

$db = getDB();

// Purge des données expirées (RGPD : 3 ans pour les preuves de consentement)
$db->exec("DELETE FROM cookie_consents WHERE consented_at < DATE_SUB(NOW(), INTERVAL 3 YEAR)");

$stmt = $db->prepare(
    "INSERT INTO cookie_consents (session_id, analytics, ip_address, user_agent, action, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)"
);
$stmt->execute([$sessionId, $analytics, $ip, $userAgent, $action, $expiresAt]);

echo json_encode(['ok' => true]);
