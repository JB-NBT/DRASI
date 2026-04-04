<?php
define('SESSION_TIMEOUT', 30 * 60); // 30 minutes d'inactivité

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

function requireAuth(): void {
    if (empty($_SESSION['user_id'])) {
        header('Location: /drasi/login.php');
        exit;
    }

    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > SESSION_TIMEOUT) {
        session_unset();
        session_destroy();
        header('Location: /drasi/login.php?timeout=1');
        exit;
    }

    $_SESSION['last_activity'] = time();
    session_write_close(); // Libère le verrou de session — indispensable pour les requêtes fetch parallèles
}
