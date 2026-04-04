<?php
require_once __DIR__ . '/../auth.php';
requireAuth();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/../db.php';
$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$body   = json_decode(file_get_contents('php://input'), true) ?? [];

// GET — liste toutes les news (actives + inactives)
if ($method === 'GET') {
    $news = $db->query("
        SELECT id, titre, date_publication, extrait, contenu, image, ordre, actif
        FROM news ORDER BY date_publication DESC, ordre DESC
    ")->fetchAll();
    echo json_encode($news);
    exit;
}

// POST — créer
if ($method === 'POST') {
    $titre   = trim($body['titre'] ?? '');
    $date    = $body['date_publication'] ?? date('Y-m-d');
    $extrait = trim($body['extrait'] ?? '');
    $contenu = trim($body['contenu'] ?? '');
    $image   = trim($body['image'] ?? '') ?: null;
    $ordre   = (int)($body['ordre'] ?? 0);

    if (!$titre) { http_response_code(400); echo json_encode(['error' => 'Titre requis']); exit; }

    $stmt = $db->prepare("INSERT INTO news (titre, date_publication, extrait, contenu, image, ordre) VALUES (?,?,?,?,?,?)");
    $stmt->execute([$titre, $date, $extrait, $contenu, $image, $ordre]);
    echo json_encode(['ok' => true, 'id' => $db->lastInsertId()]);
    exit;
}

// PUT — modifier
if ($method === 'PUT') {
    $id      = (int)($body['id'] ?? 0);
    $titre   = trim($body['titre'] ?? '');
    $date    = $body['date_publication'] ?? date('Y-m-d');
    $extrait = trim($body['extrait'] ?? '');
    $contenu = trim($body['contenu'] ?? '');
    $image   = trim($body['image'] ?? '') ?: null;
    $ordre   = (int)($body['ordre'] ?? 0);
    $actif   = isset($body['actif']) ? (int)(bool)$body['actif'] : 1;

    if (!$id || !$titre) { http_response_code(400); echo json_encode(['error' => 'id et titre requis']); exit; }

    $stmt = $db->prepare("UPDATE news SET titre=?, date_publication=?, extrait=?, contenu=?, image=?, ordre=?, actif=? WHERE id=?");
    $stmt->execute([$titre, $date, $extrait, $contenu, $image, $ordre, $actif, $id]);
    echo json_encode(['ok' => true]);
    exit;
}

// DELETE
if ($method === 'DELETE') {
    $id = (int)($body['id'] ?? 0);
    if (!$id) { http_response_code(400); echo json_encode(['error' => 'id requis']); exit; }

    // Supprimer le fichier image associé si présent
    $row = $db->prepare("SELECT image FROM news WHERE id = ?");
    $row->execute([$id]);
    $img = $row->fetchColumn();
    if ($img && file_exists(__DIR__ . '/../../' . $img)) {
        @unlink(__DIR__ . '/../../' . $img);
    }

    $db->prepare("DELETE FROM news WHERE id = ?")->execute([$id]);
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
