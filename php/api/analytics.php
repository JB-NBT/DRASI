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

$type = $body['type'] ?? '';
$data = $body['data'] ?? [];

$db = getDB();

// Purge RGPD : 13 mois (recommandation CNIL pour les analytics)
$db->exec("DELETE FROM analytics_pageviews WHERE recorded_at < DATE_SUB(NOW(), INTERVAL 395 DAY)");
$db->exec("DELETE FROM analytics_time      WHERE recorded_at < DATE_SUB(NOW(), INTERVAL 395 DAY)");

if ($type === 'pageview') {
    $sessionId = preg_replace('/[^a-zA-Z0-9_\-]/', '', $data['sessionId'] ?? '');
    $url       = substr($data['url']   ?? '', 0, 500);
    $title     = substr($data['title'] ?? '', 0, 500);
    $referrer  = substr($data['referrer'] ?? '', 0, 500);

    $stmt = $db->prepare(
        "INSERT INTO analytics_pageviews (session_id, url, title, referrer) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$sessionId, $url, $title, $referrer]);

} elseif ($type === 'time') {
    $sessionId = preg_replace('/[^a-zA-Z0-9_\-]/', '', $data['sessionId'] ?? '');
    $url       = substr($data['url'] ?? '', 0, 500);
    $timeSpent = (int)($data['timeSpent'] ?? 0);

    $stmt = $db->prepare(
        "INSERT INTO analytics_time (session_id, url, time_spent) VALUES (?, ?, ?)"
    );
    $stmt->execute([$sessionId, $url, $timeSpent]);

} else {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown type']);
    exit;
}

echo json_encode(['ok' => true]);
