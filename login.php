<?php
require_once 'php/db.php';
require_once 'php/auth.php'; // applique les params de session (lifetime:0, httponly, samesite)

if (!empty($_SESSION['user_id'])) {
    header('Location: /drasi/dashboard.php');
    exit;
}

$error   = '';
$timeout = !empty($_GET['timeout']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email && $password) {
        $db   = getDB();
        $stmt = $db->prepare("SELECT id, email, password_hash FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        $ip        = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
        $userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500);
        $success   = $user && password_verify($password, $user['password_hash']) ? 1 : 0;

        $log = $db->prepare("INSERT INTO login_logs (user_email, ip_address, user_agent, success) VALUES (?, ?, ?, ?)");
        $log->execute([$email, $ip, $userAgent, $success]);

        if ($success) {
            $_SESSION['user_id']    = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            header('Location: /drasi/dashboard.php?login=1');
            exit;
        }
    }
    $error = 'Email ou mot de passe incorrect.';
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DRASI — Connexion</title>
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/dashboard-cookies.css">
  <link rel="icon" type="image/png" href="images/logo-acad.png">
</head>
<body>

<div id="lock-screen" style="display:flex">
  <div class="lock-box">
    <div class="lock-brand">DRASI</div>
    <h1 class="lock-title">Accès administrateur</h1>
    <p class="lock-sub">
      Ce tableau de bord est réservé aux administrateurs.<br>
      Veuillez vous connecter.
    </p>

    <form method="POST" autocomplete="off">
      <div class="lock-field-wrap" style="margin-bottom:12px">
        <input
          type="email"
          name="email"
          class="lock-input"
          placeholder="Adresse e-mail"
          value="<?= htmlspecialchars($_POST['email'] ?? '') ?>"
          autocomplete="off"
          required
        >
      </div>
      <div class="lock-field-wrap">
        <input
          type="password"
          name="password"
          id="lock-input"
          class="lock-input"
          placeholder="Mot de passe"
          autocomplete="new-password"
          required
        >
        <button type="button" class="lock-eye" onclick="toggleEye()" title="Afficher / masquer">&#9679;</button>
      </div>

      <?php if ($timeout): ?>
        <div class="lock-error visible" style="border-left:3px solid #f59e0b;background:rgba(245,158,11,.08)">
          Session expirée après 30 min d'inactivité. Reconnectez-vous.
        </div>
      <?php elseif ($error): ?>
        <div class="lock-error visible"><?= htmlspecialchars($error) ?></div>
      <?php endif; ?>

      <button type="submit" class="lock-btn">Se connecter</button>
    </form>
  </div>
</div>

<script>
function toggleEye() {
  const input = document.getElementById('lock-input');
  input.type  = input.type === 'password' ? 'text' : 'password';
}
</script>
</body>
</html>
