<?php
require_once __DIR__ . '/../auth.php';
requireAuth();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit;
}

if (empty($_FILES['image'])) {
    http_response_code(400); echo json_encode(['error' => 'Aucun fichier reçu']); exit;
}

$file     = $_FILES['image'];
$allowed  = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$maxSize  = 5 * 1024 * 1024; // 5 Mo

if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400); echo json_encode(['error' => 'Erreur upload : ' . $file['error']]); exit;
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime  = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime, $allowed)) {
    http_response_code(400); echo json_encode(['error' => 'Type de fichier non autorisé']); exit;
}

if ($file['size'] > $maxSize) {
    http_response_code(400); echo json_encode(['error' => 'Fichier trop lourd (max 5 Mo)']); exit;
}

$ext      = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'][$mime];
$filename = 'news_' . uniqid() . '.' . $ext;
$dest     = __DIR__ . '/../../images/news/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    http_response_code(500); echo json_encode(['error' => 'Impossible de sauvegarder le fichier']); exit;
}

echo json_encode(['path' => 'images/news/' . $filename]);
