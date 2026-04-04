<?php
require_once __DIR__ . '/../auth.php';
requireAuth();

header('Content-Type: application/json');

require_once __DIR__ . '/../db.php';
$db = getDB();

// Totaux consentements
$consents = $db->query("
    SELECT
        COUNT(*) AS total,
        SUM(analytics = 1) AS accepted,
        SUM(analytics = 0) AS refused,
        MAX(consented_at)  AS last_consent
    FROM cookie_consents
")->fetch();

// Répartition par action
$byAction = $db->query("
    SELECT action, COUNT(*) AS nb
    FROM cookie_consents
    GROUP BY action
")->fetchAll();

// Derniers consentements (20 max)
$lastConsents = $db->query("
    SELECT session_id, analytics, action, ip_address, consented_at, expires_at
    FROM cookie_consents
    ORDER BY consented_at DESC
    LIMIT 20
")->fetchAll();

// Stats analytics
$pvStats = $db->query("
    SELECT COUNT(*) AS total, COUNT(DISTINCT session_id) AS sessions
    FROM analytics_pageviews
")->fetch();

// Pages les plus vues
$topPages = $db->query("
    SELECT url, COUNT(*) AS views
    FROM analytics_pageviews
    GROUP BY url
    ORDER BY views DESC
    LIMIT 10
")->fetchAll();

// Temps moyen par page
$avgTime = $db->query("
    SELECT url, ROUND(AVG(time_spent)) AS avg_time, COUNT(*) AS nb
    FROM analytics_time
    GROUP BY url
    ORDER BY avg_time DESC
    LIMIT 10
")->fetchAll();

// Dernières pages vues (20 max)
$lastPageviews = $db->query("
    SELECT session_id, url, title, referrer, recorded_at
    FROM analytics_pageviews
    ORDER BY recorded_at DESC
    LIMIT 20
")->fetchAll();

// Logs de connexion (30 derniers)
$loginLogs = $db->query("
    SELECT user_email, ip_address, success, logged_at
    FROM login_logs
    ORDER BY logged_at DESC
    LIMIT 30
")->fetchAll();

// Stats globales logins
$loginStats = $db->query("
    SELECT COUNT(*) AS total, SUM(success=1) AS success, SUM(success=0) AS failed
    FROM login_logs
")->fetch();

echo json_encode([
    'consents'     => $consents,
    'byAction'     => $byAction,
    'lastConsents' => $lastConsents,
    'pageviews'    => $pvStats,
    'topPages'     => $topPages,
    'avgTime'      => $avgTime,
    'lastPageviews'=> $lastPageviews,
    'loginLogs'    => $loginLogs,
    'loginStats'   => $loginStats,
]);
