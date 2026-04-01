# Guide Technique - Site DRASI

**Documentation technique à destination des développeurs et administrateurs système**

---

## Table des matières

1. [Architecture technique](#architecture)
2. [Stack technologique](#stack)
3. [Structure des fichiers](#structure)
4. [Système de styles CSS](#css)
5. [JavaScript et interactivité](#javascript)
6. [Système de cookies RGPD](#cookies)
7. [Cartes Leaflet](#leaflet)
8. [Tableau de bord RGPD](#dashboard)
9. [Cas pratiques](#cas-pratiques)
10. [Performance et optimisation](#performance)
11. [Sécurité](#securite)
12. [Déploiement](#deploiement)

---

## Architecture technique {#architecture}

### Vue d'ensemble

Le site est une application web statique construite avec des technologies natives :
- HTML5 sémantique
- CSS3 avec variables CSS (Custom Properties)
- JavaScript Vanilla ES6+ (aucun framework)
- Leaflet 1.7.1 pour les cartes interactives

### Principes de conception

**Simplicité**
- Pas de framework lourd (React, Vue, Angular)
- Pas de système de build (Webpack, Vite, Parcel)
- Déploiement direct sur n'importe quel serveur web

**Modularité**
- Composants réutilisables (header, footer, bandeau cookies)
- Séparation CSS par fonctionnalité
- Scripts JavaScript organisés par domaine métier

**Performance**
- Chargement asynchrone des composants
- Pas de dépendances externes hormis Leaflet
- Code minifiable en production

**Maintenabilité**
- Code commenté et structuré
- Variables CSS pour personnalisation centralisée
- Convention de nommage cohérente

### Diagramme d'architecture

```
+------------------------------------------+
|          Navigateur (Client)             |
|                                          |
|  +----------+  +--------+  +---------+  |
|  |   HTML   |  |  CSS   |  |   JS    |  |
|  +----------+  +--------+  +---------+  |
|                                          |
|  +--------------------------------------+|
|  |  localStorage / sessionStorage       ||
|  |  (consentement, analytics, session)  ||
|  +--------------------------------------+|
+------------------------------------------+
              |  HTTP/HTTPS
+------------------------------------------+
|       Serveur Web (Apache / Nginx)       |
|                                          |
|  Fichiers statiques (.html, .css, .js,  |
|  images)                                 |
+------------------------------------------+
```

---

## Stack technologique {#stack}

### Frontend

| Technologie    | Version | Usage                                      |
|----------------|---------|--------------------------------------------|
| HTML5          | —       | Structure sémantique, accessibilité        |
| CSS3           | —       | Styles, animations, responsive design      |
| JavaScript     | ES6+    | Interactivité (Vanilla, sans framework)    |
| PHP            | —       | Envoi de mail (formulaire de contact)      |
| Leaflet        | 1.7.1   | Cartes interactives                        |

### APIs navigateur utilisées

| API                      | Usage                              |
|--------------------------|------------------------------------|
| localStorage             | Stockage consentement et analytics |
| sessionStorage           | Session utilisateur                |
| fetch()                  | Chargement des composants          |
| IntersectionObserver     | Animations au défilement           |

### Bibliothèque externe

Leaflet.js est la seule dépendance externe du projet :
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
```

### Compatibilité navigateurs

| Navigateur | Version minimale | Support      |
|------------|------------------|--------------|
| Chrome     | 90+              | Complet      |
| Firefox    | 88+              | Complet      |
| Safari     | 14+              | Complet      |
| Edge       | 90+              | Complet      |
| IE 11      | —                | Non supporté |

---

## Structure des fichiers {#structure}

### Arborescence

```
site-drasi/
|
|-- Pages HTML (racine)
|   |-- index.html                    # Page d'accueil
|   |-- histoire.html                 # Timeline historique
|   |-- equipes.html                  # Portfolio équipe
|   |-- missions.html                 # Missions et activités
|   |-- perimetre.html                # Cartes Leaflet
|   |-- comitologie.html              # Organisation et gouvernance
|   |-- services_opérés.html          # Services déployés
|   |-- contact.html                  # Formulaire de contact
|   +-- dashboard-cookies.html        # Tableau de bord RGPD (accès restreint)
|
|-- css/
|   |-- common.css                    # Styles communs (header, footer, variables)
|   |-- index.css                     # Styles page d'accueil
|   |-- histoire.css                  # Styles timeline
|   |-- equipe.css                    # Styles portfolio et modals
|   |-- missions.css                  # Styles page missions
|   |-- services.css                  # Styles services opérés
|   |-- comitologie.css               # Styles comitologie
|   |-- perimetre.css                 # Styles cartes Leaflet
|   |-- contact.css                   # Styles formulaire
|   |-- cookies.css                   # Styles bandeau de consentement RGPD
|   +-- dashboard-cookies.css         # Styles tableau de bord
|
|-- js/
|   |-- main.js                       # Script principal (menu, nav, scroll)
|   |-- cookies.js                    # Gestion cookies RGPD et analytics
|   |-- dashboard.js                  # Logique du tableau de bord
|   |-- maps.js                       # Cartes Leaflet (90 structures)
|   +-- modals.js                     # Modals membres équipe
|
|-- images/
|   |-- logo-acad.png                 # Logo académie (500x500px)
|   |-- GAR.png                       # Logo GAR
|   +-- equipe/                       # Photos des membres (400x400px)
|       |-- ****.png
|       |-- ****.png
|       +-- ...
|
|-- components/
|   |-- header.html                   # Header réutilisable
|   |-- footer.html                   # Footer réutilisable
|   +-- cookie-banner.html            # Bandeau de consentement RGPD
|
+-- docs/
    |-- README.md                     # Documentation principale
    |-- GUIDE_MISE_A_JOUR.md          # Guide utilisateur
    +-- GUIDE_TECHNIQUE.md            # Ce fichier
```

### Conventions de nommage

HTML et fichiers : `kebab-case`
```
index.html
dashboard-cookies.html
```

CSS — classes et variables :
```css
.hero-section { }
.member-card { }
--bleu-france: #228BCC;
--spacing-lg: 40px;
```

JavaScript — variables, fonctions et classes :
```javascript
const memberData = {};
let isVisible = false;

function initMenu() { }
function showBanner() { }

class Analytics { }
class CookieConsent { }
```

Fichiers images : `kebab-case`, sans accent
```
logo-academie.png
marie-dupont.png
```

---

## Système de styles CSS {#css}

### Variables CSS (Design Tokens)

Fichier : `css/common.css`

```css
:root {
    /* Couleurs — Charte graphique Académie de Rennes */
    --bleu-france: #228BCC;
    --bleu-france-hover: #1212B8;
    --rouge-marianne: #E1000F;
    --gris-50: #808080;
    --gris-85: #262626;
    --gris-clair: #f8f9fa;
    --blanc: #FFFFFF;
    --noir: #000000;

    /* Espacements */
    --spacing-xs: 8px;
    --spacing-sm: 16px;
    --spacing-md: 24px;
    --spacing-lg: 40px;
    --spacing-xl: 60px;

    /* Typographie */
    --font-primary: Arial, Helvetica, sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.6;

    /* Transitions */
    --transition-speed: 0.3s;
}
```

### Ordre de chargement des CSS

```html
<link rel="stylesheet" href="css/common.css">      <!-- 1. Base globale -->
<link rel="stylesheet" href="css/[page].css">      <!-- 2. Styles spécifiques à la page -->
<link rel="stylesheet" href="css/cookies.css">     <!-- 3. Modules transversaux -->
```

### Structure interne d'un fichier CSS

```
1. Variables spécifiques à la page
2. Styles desktop (base)
3. Responsive — tablettes (max 1024px)
4. Responsive — mobiles (max 768px)
5. Responsive — petits mobiles (max 480px)
```

### Points de rupture responsive

```css
/* Desktop (par défaut) : > 1024px — pas de media query */

@media screen and (max-width: 1024px) { /* Tablettes */ }
@media screen and (max-width: 768px)  { /* Mobiles */ }
@media screen and (max-width: 480px)  { /* Petits mobiles */ }
```

### Animations CSS

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}

.cookie-banner.visible {
    display: flex;
    animation: fadeIn 0.3s ease;
}
```

---

## JavaScript et interactivité {#javascript}

### Organisation des scripts

**main.js** — Script principal
```
1. Chargement dynamique des composants (header, footer, bandeau cookies)
2. Initialisation de la navigation et lien actif
3. Menu hamburger (mobile)
4. Animations au défilement (IntersectionObserver)
5. Bouton retour en haut de page
```

**Chargement dynamique des composants**

Les composants header, footer et bandeau cookies sont chargés via `fetch()` depuis `main.js`.
Le placeholder HTML cible est rempli avec le contenu récupéré, puis les scripts dépendants
(`initMenuToggle`, `initCookieSystem`) sont appelés une fois le DOM mis à jour.

### Menu hamburger (mobile)

HTML du composant :
```html
<button class="menu-toggle" id="menuToggle">
    <span></span>
    <span></span>
    <span></span>
</button>

<nav class="nav-menu" id="navMenu">
    <a href="index.html" class="nav-pill">Accueil</a>
</nav>
```

Comportements implémentés dans `initMenuToggle()` :
- Clic sur le bouton hamburger : bascule des classes `.active` sur le bouton et le menu
- Clic sur un lien du menu : fermeture automatique du menu
- Clic en dehors du menu : fermeture automatique

### Animations au défilement

```javascript
function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.card, .member-card').forEach(el => {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
```

---

## Système de cookies RGPD {#cookies}

### Architecture

Trois fichiers constituent le système :
- `js/cookies.js` — logique métier
- `css/cookies.css` — styles du bandeau et de la modal
- `components/cookie-banner.html` — structure HTML du bandeau

### Configuration

```javascript
const COOKIE_CONFIG = {
    consentName:       'drasi_cookie_consent',  // Clé localStorage du consentement
    analyticsName:     'drasi_analytics',       // Clé localStorage des analytics
    consentDuration:   365,                     // Durée en jours (1 an)
    analyticsDuration: 395,                     // 13 mois (recommandation CNIL)
    sessionName:       'drasi_session'          // Clé de session anonyme
};
```

### Classe Analytics — collecte anonyme

Méthodes principales :
- `generateSessionId()` — génère un identifiant de session unique et anonyme
- `trackPageView()` — enregistre l'URL, le titre et le référent de la page courante
- `trackTimeOnPage()` — enregistre le temps passé avant de quitter la page
- `saveToStorage(data, type)` — persiste les données dans localStorage (limite à 100 entrées)

### Classe CookieConsent — gestion du bandeau

Méthodes principales :
- `init()` — initialise le composant après chargement du DOM
- `checkConsent()` — vérifie si un consentement existe ; affiche le bandeau si absent
- `showBanner()` / `hideBanner()` — affiche ou masque le bandeau
- `saveConsent(preferences)` — enregistre le choix de l'utilisateur dans localStorage
- `acceptAll()` / `refuseAll()` — raccourcis pour accepter ou refuser tous les cookies

### Données stockées (si consentement accordé)

```javascript
// Entrée de consentement
{
    "analytics":  true,
    "timestamp":  "2025-12-01T10:00:00.000Z",
    "expires":    "2026-12-01T10:00:00.000Z"
}

// Entrée de page vue
{
    "url":       "/equipes.html",
    "title":     "Notre équipe - DRASI",
    "timestamp": "2025-12-01T10:05:00.000Z",
    "sessionId": "sess_1733046300000_abc123",
    "referrer":  "direct"
}
```

---

## Cartes Leaflet {#leaflet}

### Intégration CDN

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
```

### Structure des données (maps.js)

```javascript
// Collèges (41 établissements)
const colleges = [
    {nom: "Jules-Simon", commune: "Vannes", lat: 47.65880, lng: -2.76106},
    // ...
];

// Lycées (21 établissements)
const lycees = [
    {nom: "Charles de Gaulle", commune: "Vannes", lat: 47.67633, lng: -2.77259},
    // ...
];

// GRETA (3 établissements)
const gretas = [
    {nom: "GRETA-CFA Bretagne Sud", commune: "Lorient", lat: 47.74590, lng: -3.38103},
    // ...
];
```

### Initialisation d'une carte

```javascript
function initMapEPLE() {
    const map = L.map('map-eple').setView([47.85, -2.85], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '(c) OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    colleges.forEach(college => {
        L.circleMarker([college.lat, college.lng], {
            color: '#000080', fillColor: '#000091',
            fillOpacity: 0.8, radius: 7, weight: 2
        })
        .bindPopup('<b>Collège ' + college.nom + '</b><br>' + college.commune)
        .addTo(map);
    });
}
```

---

## Tableau de bord RGPD {#dashboard}

### Fichier : `dashboard-cookies.html`

### Fonctionnalités

Le tableau de bord permet l'inspection en temps réel des données RGPD stockées localement :
- État du consentement (`localStorage["drasi_cookie_consent"]`)
- Liste des cookies HTTP du domaine (`document.cookie`)
- Entrées du localStorage et du sessionStorage liées à DRASI
- Statistiques agrégées : nombre de cookies, pages vues, temps moyen par page

### Sécurisation de l'accès

Le tableau de bord est protégé par mot de passe côté client (session mémorisée 8 heures).
Pour une sécurisation renforcée côté serveur, trois méthodes sont disponibles.

**Méthode 1 — Renommer le fichier**
```
Remplacer dashboard-cookies.html par un nom non prévisible.
Exemple : dashboard-x8k2m9p3.html
```

**Méthode 2 — Protection .htaccess (Apache)**
```apache
<Files "dashboard-cookies.html">
    AuthType Basic
    AuthName "Zone réservée"
    AuthUserFile /chemin/absolu/.htpasswd
    Require valid-user
</Files>
```

Générer le fichier `.htpasswd` :
```bash
htpasswd -c .htpasswd admin
# Ou via un générateur en ligne : https://htpasswdgenerator.net/
```

**Méthode 3 — Restriction par adresse IP**
```apache
<Files "dashboard-cookies.html">
    Order Deny,Allow
    Deny from all
    Allow from 192.168.1.100
    Allow from 10.0.0.0/8
</Files>
```

---

## Cas pratiques {#cas-pratiques}

### Cas pratique 1 — Ajouter une carte Leaflet supplémentaire

Étape 1 : Définir les données dans `js/maps.js`
```javascript
const nouveauxPoints = [
    {nom: "Point A", commune: "Vannes", lat: 47.65880, lng: -2.76106},
];
```

Étape 2 : Créer la fonction d'initialisation (voir modèle `initMapEPLE` ci-dessus).

Étape 3 : Conditionner l'appel au chargement
```javascript
window.addEventListener('load', function() {
    if (document.getElementById('map-nouveaux-points')) {
        initMapNouveauxPoints();
    }
});
```

Étape 4 : Créer la page HTML en suivant la structure des pages existantes du site.

### Cas pratique 2 — Migration vers HTTPS

Étape 1 : Obtenir un certificat SSL (Let's Encrypt recommandé)
```bash
sudo apt-get install certbot python3-certbot-apache
sudo certbot --apache -d drasi.ac-rennes.fr
```

Étape 2 : Configurer le virtualhost SSL dans Apache
```apache
<VirtualHost *:443>
    ServerName drasi.ac-rennes.fr
    DocumentRoot /var/www/drasi

    SSLEngine on
    SSLCertificateFile      /etc/letsencrypt/live/drasi.ac-rennes.fr/cert.pem
    SSLCertificateKeyFile   /etc/letsencrypt/live/drasi.ac-rennes.fr/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/drasi.ac-rennes.fr/chain.pem

    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
</VirtualHost>
```

Étape 3 : Rediriger HTTP vers HTTPS
```apache
<VirtualHost *:80>
    ServerName drasi.ac-rennes.fr
    Redirect permanent / https://drasi.ac-rennes.fr/
</VirtualHost>
```

Étape 4 : Activer et redémarrer Apache
```bash
sudo a2enmod ssl headers
sudo a2ensite drasi-ssl drasi
sudo systemctl restart apache2
```

---

## Performance et optimisation {#performance}

### Outils de mesure

- Google PageSpeed Insights : https://pagespeed.web.dev/ (objectif : score > 90)
- GTmetrix : https://gtmetrix.com/

### Optimisations recommandées

**Images**
- Compresser avec TinyPNG avant upload (objectif : < 200 Ko par image)
- Utiliser le format WebP avec fallback JPG/PNG pour les navigateurs anciens

**CSS et JavaScript**
```bash
# Minifier le CSS
cssnano style.css -o style.min.css

# Purger le CSS inutilisé
purgecss --css style.css --content *.html --output style-purged.css

# Minifier le JavaScript
terser main.js -o main.min.js -c -m
```

**Cache navigateur (.htaccess)**
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/png  "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType text/css   "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

**Compression Gzip (.htaccess)**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript
</IfModule>
```

---

## Sécurité {#securite}

### En-têtes de sécurité (.htaccess Apache)

```apache
# Bloquer l'accès aux fichiers sensibles
<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|inc|bak)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# En-têtes HTTP de sécurité
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# HSTS (après activation HTTPS)
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

### Validation du formulaire de contact

La validation côté client est implémentée dans `main.js` :
- Vérification des champs obligatoires (nom, email, message)
- Vérification du format de l'adresse email par expression régulière
- Affichage d'un message d'erreur contextuel en cas d'invalidité

Pour la protection anti-spam : voir `docs/Guide_reCAPTCHA.pdf`

### Script de sauvegarde automatique

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/drasi"
SITE_DIR="/var/www/drasi"

tar -czf $BACKUP_DIR/site_$DATE.tar.gz $SITE_DIR
find $BACKUP_DIR -name "site_*.tar.gz" -mtime +30 -delete

echo "Sauvegarde créée : site_$DATE.tar.gz"
```

Planification via cron (sauvegarde quotidienne à 2h) :
```bash
crontab -e
# Ajouter :
0 2 * * * /opt/scripts/backup-site.sh
```

---

## Déploiement {#deploiement}

### Checklist pré-déploiement

```
[ ] Images optimisées (< 200 Ko par fichier)
[ ] Liens vérifiés (aucun lien mort)
[ ] Formulaires testés
[ ] Cartes Leaflet fonctionnelles
[ ] Bandeau cookies opérationnel
[ ] Tests responsive (mobile, tablette, desktop)
[ ] Tests multi-navigateurs (Chrome, Firefox, Safari, Edge)
[ ] Validation HTML : https://validator.w3.org/
[ ] Validation CSS : https://jigsaw.w3.org/css-validator/
[ ] Certificat SSL installé
[ ] En-têtes de sécurité configurés
[ ] Sauvegardes planifiées
```

### Déploiement via FTP

Structure à uploader :
```
site-drasi/
|-- *.html
|-- css/
|-- js/
|-- images/
|-- components/
+-- .htaccess
```

Paramètres de connexion :
```
Hôte         : ftp.votre-serveur.fr
Port         : 21 (ou 990 pour FTPS)
Identifiant  : votre_login
Permissions dossiers : 755
Permissions fichiers : 644
```

### Déploiement via SSH / SFTP

```bash
ssh user@server.fr
cd /var/www/html

# Via Git
git clone https://github.com/votre-repo/site-drasi.git

# Via SCP
scp -r /local/site-drasi/* user@server.fr:/var/www/html/
```

### Vérifications post-déploiement

```bash
# Vérifier la réponse HTTP
curl -I https://drasi.ac-rennes.fr

# Vérifier la redirection HTTP vers HTTPS
curl -I http://drasi.ac-rennes.fr

# Vérifier les en-têtes de sécurité
curl -I https://drasi.ac-rennes.fr | grep -E "X-|Strict"

# Tester les pages principales
for page in index.html equipes.html contact.html; do
    echo "Test $page : $(curl -s -o /dev/null -w "%{http_code}" https://drasi.ac-rennes.fr/$page)"
done
```

---

## Support et maintenance

### Contacts techniques

- DSI : ****@ac-rennes.fr
- Adjoint DSI : ****@ac-rennes.fr

### Ressources de référence

- MDN Web Docs : https://developer.mozilla.org/fr/
- Documentation Leaflet : https://leafletjs.com/reference.html
- Recommandations CNIL (cookies) : https://www.cnil.fr/fr/cookies-et-autres-traceurs
- W3C Validator : https://validator.w3.org/
- PageSpeed Insights : https://pagespeed.web.dev/
- SSL Labs Test : https://www.ssllabs.com/ssltest/

---

*Version 2.0 — Décembre 2025*
