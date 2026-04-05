<?php
/**
 * DRASI — Script d'installation automatique
 * Usage : php setup/setup.php [--host=localhost] [--port=3306] [--user=root] [--pass=]
 */

// ─── Paramètres CLI ───────────────────────────────────────────────────────────
$opts = getopt('', ['host::', 'port::', 'user::', 'pass::']);
$host = $opts['host'] ?? 'localhost';
$port = (int)($opts['port'] ?? 3306);
$user = $opts['user'] ?? 'root';
$pass = $opts['pass'] ?? '';

$dbName   = 'drasi_db';
$adminEmail = 'admin@drasi.fr';
$adminPass  = 'Drasi2026!';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ok(string $msg): void  { echo "\033[32m  [OK]\033[0m  $msg\n"; }
function err(string $msg): void { echo "\033[31m [ERR]\033[0m  $msg\n"; exit(1); }
function info(string $msg): void { echo "\033[36m [INFO]\033[0m $msg\n"; }

echo "\n";
echo "  ╔══════════════════════════════════════════╗\n";
echo "  ║        DRASI — Installation setup        ║\n";
echo "  ╚══════════════════════════════════════════╝\n\n";

// ─── Connexion sans DB ────────────────────────────────────────────────────────
info("Connexion à MySQL sur $host:$port ...");
try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;charset=utf8mb4",
        $user, $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    err("Impossible de se connecter à MySQL : " . $e->getMessage());
}
ok("Connexion MySQL établie");

// ─── Création de la base ──────────────────────────────────────────────────────
info("Création de la base de données '$dbName' ...");
$pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$pdo->exec("USE `$dbName`");
ok("Base '$dbName' prête");

// ─── Création des tables ──────────────────────────────────────────────────────
info("Création des tables ...");

$tables = [

'users' => "CREATE TABLE IF NOT EXISTS `users` (
  `id`            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email`         VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at`    DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

'cookie_consents' => "CREATE TABLE IF NOT EXISTS `cookie_consents` (
  `id`           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `session_id`   VARCHAR(191) NOT NULL,
  `analytics`    TINYINT(1) NOT NULL DEFAULT 0,
  `ip_address`   VARCHAR(45) DEFAULT NULL,
  `user_agent`   VARCHAR(500) DEFAULT NULL,
  `action`       VARCHAR(20) DEFAULT NULL,
  `consented_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `expires_at`   DATETIME DEFAULT NULL,
  INDEX idx_session (`session_id`),
  INDEX idx_expires (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

'analytics_pageviews' => "CREATE TABLE IF NOT EXISTS `analytics_pageviews` (
  `id`          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `session_id`  VARCHAR(191) NOT NULL,
  `url`         VARCHAR(500) DEFAULT NULL,
  `title`       VARCHAR(300) DEFAULT NULL,
  `referrer`    VARCHAR(500) DEFAULT NULL,
  `recorded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (`session_id`),
  INDEX idx_recorded (`recorded_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

'analytics_time' => "CREATE TABLE IF NOT EXISTS `analytics_time` (
  `id`          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `session_id`  VARCHAR(191) NOT NULL,
  `url`         VARCHAR(500) DEFAULT NULL,
  `time_spent`  INT UNSIGNED DEFAULT 0,
  `recorded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

'login_logs' => "CREATE TABLE IF NOT EXISTS `login_logs` (
  `id`          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_email`  VARCHAR(191) DEFAULT NULL,
  `ip_address`  VARCHAR(45) DEFAULT NULL,
  `user_agent`  VARCHAR(500) DEFAULT NULL,
  `success`     TINYINT(1) NOT NULL DEFAULT 0,
  `logged_at`   DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email   (`user_email`),
  INDEX idx_success (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

'news' => "CREATE TABLE IF NOT EXISTS `news` (
  `id`               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `titre`            VARCHAR(255) NOT NULL,
  `date_publication` DATE NOT NULL,
  `extrait`          TEXT DEFAULT NULL,
  `contenu`          TEXT DEFAULT NULL,
  `image`            VARCHAR(255) DEFAULT NULL,
  `ordre`            INT UNSIGNED DEFAULT 0,
  `actif`            TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`       DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

];

foreach ($tables as $name => $sql) {
    $pdo->exec($sql);
    ok("Table '$name' créée");
}

// ─── Utilisateur admin ────────────────────────────────────────────────────────
info("Création de l'utilisateur administrateur ...");
$hash = password_hash($adminPass, PASSWORD_BCRYPT);
$stmt = $pdo->prepare("INSERT IGNORE INTO `users` (email, password_hash) VALUES (?, ?)");
$stmt->execute([$adminEmail, $hash]);
if ($stmt->rowCount() > 0) {
    ok("Admin créé : $adminEmail");
} else {
    info("Admin déjà présent, ignoré.");
}

// ─── Actualités de démonstration ──────────────────────────────────────────────
info("Insertion des actualités de démonstration ...");

$newsItems = [
    [
        'titre'            => 'test',
        'date_publication' => date('Y-m-d'),
        'extrait'          => 'Actualité de test.',
        'contenu'          => 'Ceci est une actualité de test.',
        'image'            => null,
        'ordre'            => 0,
        'actif'            => 1,
    ],
];

$insertNews = $pdo->prepare(
    "INSERT IGNORE INTO `news` (titre, date_publication, extrait, contenu, image, ordre, actif)
     SELECT ?, ?, ?, ?, ?, ?, ?
     WHERE NOT EXISTS (SELECT 1 FROM `news` WHERE titre = ?)"
);

foreach ($newsItems as $item) {
    $insertNews->execute([
        $item['titre'], $item['date_publication'], $item['extrait'],
        $item['contenu'], $item['image'], $item['ordre'], $item['actif'],
        $item['titre'],
    ]);
}
ok("Actualités insérées");

// ─── Dossier uploads ──────────────────────────────────────────────────────────
$uploadDir = __DIR__ . '/../images/news';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
    ok("Dossier images/news/ créé");
} else {
    info("Dossier images/news/ déjà présent");
}

// ─── Génération de credentials.txt ───────────────────────────────────────────
info("Génération de credentials.txt ...");
$credPath = __DIR__ . '/../credentials.txt';
$credContent =
"╔══════════════════════════════════════════════════════╗\n" .
"║           DRASI — Identifiants de test               ║\n" .
"║        ⚠  NE PAS VERSIONNER CE FICHIER  ⚠           ║\n" .
"╚══════════════════════════════════════════════════════╝\n\n" .
"  URL du site     : http://localhost/drasi/\n" .
"  Dashboard admin : http://localhost/drasi/login.php\n\n" .
"  --- Compte administrateur ---\n" .
"  Email        : $adminEmail\n" .
"  Mot de passe : $adminPass\n\n" .
"  --- Base de donnees ---\n" .
"  Hote         : $host:$port\n" .
"  Base         : $dbName\n" .
"  User         : $user\n\n" .
"  --- phpMyAdmin ---\n" .
"  URL          : http://localhost/phpmyadmin5.2.3/\n\n" .
"  Genere le    : " . date('d/m/Y a H:i:s') . "\n";

file_put_contents($credPath, $credContent);
ok("credentials.txt généré");

// ─── Résumé ───────────────────────────────────────────────────────────────────
echo "\n";
echo "  ╔══════════════════════════════════════════╗\n";
echo "  ║     Installation terminée avec succès    ║\n";
echo "  ╚══════════════════════════════════════════╝\n\n";
echo "  → Site       : http://localhost/drasi/\n";
echo "  → Dashboard  : http://localhost/drasi/login.php\n";
echo "  → Login      : $adminEmail\n";
echo "  → Mot de passe : $adminPass\n\n";
echo "  Les identifiants ont été sauvegardés dans credentials.txt\n\n";
