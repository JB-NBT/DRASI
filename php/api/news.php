<?php
// API publique — lecture des actualités
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../db.php';

$db   = getDB();
$news = $db->query("
    SELECT id, titre, date_publication, extrait, contenu, image
    FROM news
    WHERE actif = 1
    ORDER BY date_publication DESC
    LIMIT 6
")->fetchAll();

echo json_encode($news);
