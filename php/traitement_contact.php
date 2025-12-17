<?php
// Configuration
define('RECAPTCHA_SECRET_KEY', '6Lc3RC4sAAAAAEqsCmv9DdTOqX7YArqildYuZLM2');
define('EMAIL_DESTINATAIRE', 'vannes@ac-rennes.fr');

header('Content-Type: application/json');

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Vérifier le reCAPTCHA
$recaptcha_response = $_POST['g-recaptcha-response'] ?? '';

if (empty($recaptcha_response)) {
    echo json_encode(['success' => false, 'message' => 'Veuillez valider le reCAPTCHA']);
    exit;
}

// Vérifier avec Google
$verify = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . RECAPTCHA_SECRET_KEY . '&response=' . $recaptcha_response);
$captcha_success = json_decode($verify);

if (!$captcha_success->success) {
    echo json_encode(['success' => false, 'message' => 'Validation reCAPTCHA échouée']);
    exit;
}

// Récupérer et nettoyer les données
$nom = htmlspecialchars(trim($_POST['nom'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telephone = htmlspecialchars(trim($_POST['telephone'] ?? ''));
$objet = htmlspecialchars(trim($_POST['objet'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

// Validation
if (empty($nom) || empty($email) || empty($objet) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs obligatoires doivent être remplis']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email invalide']);
    exit;
}

// Préparer l'email
$sujet = 'Contact DRASI : ' . $objet;
$corps = "Nouveau message depuis le formulaire de contact\n\n";
$corps .= "Nom : $nom\n";
$corps .= "Email : $email\n";
$corps .= "Téléphone : $telephone\n";
$corps .= "Objet : $objet\n\n";
$corps .= "Message :\n$message\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoyer l'email
if (mail(EMAIL_DESTINATAIRE, $sujet, $corps, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi du message']);
}
?>