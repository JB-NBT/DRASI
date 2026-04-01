# Guide d'installation - Site DRASI

---

## Prérequis

- Git
- Un serveur web local avec support PHP 7.4 ou supérieur (Apache ou Nginx)
- Le module PHP `mail` activé pour le formulaire de contact

---

## Cloner le dépôt

```bash
git clone https://github.com/JB-NBT/DRASI.git
cd DRASI
```

---

## Mise en place du serveur local

### Option A — MAMP (Windows / macOS)

MAMP est l'environnement utilisé lors du développement initial du projet.

1. Ouvrir MAMP et aller dans Préférences > Serveur Web
2. Définir la racine du serveur (Document Root) vers le dossier cloné
3. Démarrer les serveurs Apache et PHP
4. Accéder au site via `http://localhost:8888` (port par défaut MAMP) ou `http://localhost` selon la configuration

### Option B — XAMPP (Windows / macOS / Linux)

1. Copier ou déplacer le dossier cloné dans `C:\xampp\htdocs\DRASI\` (Windows) ou `/opt/lampp/htdocs/DRASI/` (Linux)
2. Démarrer Apache depuis le panneau de contrôle XAMPP
3. Accéder au site via `http://localhost/DRASI`

### Option C — Laragon (Windows)

1. Copier le dossier cloné dans `C:\laragon\www\DRASI\`
2. Démarrer Laragon
3. Accéder au site via `http://drasi.test` (virtual host automatique) ou `http://localhost/DRASI`

### Option D — WAMP (Windows)

1. Copier le dossier cloné dans `C:\wamp64\www\DRASI\`
2. Démarrer WAMP
3. Accéder au site via `http://localhost/DRASI`

### Option E — Apache natif (Linux / macOS)

Copier le projet dans le répertoire web :

```bash
sudo cp -r DRASI /var/www/html/DRASI
sudo systemctl restart apache2
```

Ou configurer un VirtualHost dédié dans `/etc/apache2/sites-available/drasi.conf` :

```apache
<VirtualHost *:80>
    ServerName drasi.local
    DocumentRoot /var/www/html/DRASI
    <Directory /var/www/html/DRASI>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Puis activer le site :

```bash
sudo a2ensite drasi.conf
sudo systemctl restart apache2
```

Ajouter `127.0.0.1 drasi.local` dans `/etc/hosts` pour résoudre le domaine local.

### Option F — Serveur de développement PHP intégré

Pour un test rapide sans configuration de serveur :

```bash
cd chemin/vers/DRASI
php -S localhost:8000
```

Accéder au site via `http://localhost:8000`.

Note : le formulaire de contact nécessite une vraie configuration SMTP. Cette option est adaptée uniquement pour tester les pages statiques.

---

## Configuration du formulaire de contact

Ouvrir le fichier `php/traitement_contact.php` et modifier les constantes suivantes :

```php
define('EMAIL_DESTINATAIRE', 'votre-email@ac-rennes.fr');
define('RECAPTCHA_SECRET_KEY', 'votre-cle-secrete-recaptcha');
```

La clé secrète reCAPTCHA s'obtient sur : https://www.google.com/recaptcha/admin

Ouvrir ensuite `contact.html` et remplacer la valeur de `data-sitekey` par votre clé publique reCAPTCHA :

```html
<div class="g-recaptcha" data-sitekey="votre-cle-publique"></div>
```

---

## Vérification de l'installation

Ouvrir le navigateur et accéder à l'URL du serveur. Les points suivants doivent fonctionner :

- Page d'accueil (`index.html`) — affichage immédiat, aucune dépendance
- Cartes interactives (`perimetre.html`) — nécessite une connexion internet (Leaflet chargé via CDN)
- Formulaire de contact (`contact.html`) — nécessite PHP actif et reCAPTCHA configuré
- Tableau de bord RGPD (`dashboard-cookies.html`) — protégé par mot de passe, aucune dépendance serveur

---

## Notes

- Le site est entièrement statique, à l'exception du formulaire de contact qui requiert PHP
- Aucune base de données n'est nécessaire
- Les cartes Leaflet nécessitent une connexion internet (dépendance CDN externe)
- Le tableau de bord RGPD stocke et lit les données exclusivement via `localStorage` du navigateur
