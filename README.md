# DRASI — Direction Régionale Académique des Systèmes d'Information

Portail institutionnel développé dans le cadre d'un projet BTS.  
Le site est accompagné d'un tableau de bord d'administration protégé par authentification.

---

## Fonctionnalités

- **Site public** : présentation des services, actualités dynamiques (carrousel), conformité RGPD (bandeau cookies)
- **Tableau de bord admin** : statistiques de visites, gestion des consentements, gestion des actualités, accès rapide GLPI et phpMyAdmin
- **Authentification** : login sécurisé avec hachage bcrypt, logs des tentatives, session avec timeout 30 min
- **RGPD** : consentements conservés 3 ans, données analytiques 13 mois (recommandations CNIL)
- **Actualités** : CRUD complet depuis le dashboard, carrousel (max 6, affiche 3), tri par date décroissante

---

## Prérequis

- [WampServer](https://www.wampserver.com/) 3.x (PHP 8.x + MySQL 8.x + Apache)
- PHP ≥ 8.0
- MySQL ≥ 8.0

---

## Installation rapide (Windows)

1. Cloner le dépôt dans le dossier `www` de WampServer :
   ```
   cd C:\wamp64\www
   git clone https://github.com/JB-NBT/DRASI DRASI
   ```

2. Démarrer WampServer (icône verte dans la barre des tâches)

3. Lancer l'installation depuis PowerShell :
   ```
   powershell -ExecutionPolicy Bypass -File .\install.ps1
   ```

Le script :
- détecte automatiquement WampServer et PHP
- crée la base de données `drasi_db` et toutes les tables
- insère le compte administrateur et une actualité de démonstration
- crée le dossier `images/news/`
- télécharge et extrait GLPI dans `www/glpi/`
- génère le fichier **`credentials.txt`** avec tous les identifiants

---

## Installation manuelle

Si `install.ps1` ne peut pas être utilisé, exécuter directement depuis la ligne de commande :

```bash
"C:\wamp64\bin\php\phpX.X.X\php.exe" setup/setup.php
```

Options disponibles :
```
--host=localhost   Hôte MySQL (défaut : localhost)
--port=3306        Port MySQL (défaut : 3306)
--user=root        Utilisateur MySQL (défaut : root)
--pass=            Mot de passe MySQL (défaut : vide)
```

---

## Accès après installation

| Ressource       | URL                                     |
|-----------------|-----------------------------------------|
| Site public     | http://localhost/DRASI/                 |
| Dashboard admin | http://localhost/DRASI/login.php        |
| phpMyAdmin      | http://localhost/phpmyadmin5.2.3/       |
| GLPI            | http://localhost/glpi/public/           |

Identifiants administrateur par défaut (projet BTS — à changer en production) :

| Champ         | Valeur           |
|---------------|------------------|
| Email         | admin@drasi.fr   |
| Mot de passe  | Drasi2026!       |

---

## Structure du projet

```
DRASI/
├── index.html                  # Page d'accueil publique
├── histoire.html               # Page histoire
├── equipes.html                # Page équipe
├── missions.html               # Page missions
├── perimetre.html              # Page périmètre (carte Leaflet)
├── comitologie.html            # Page comitologie
├── services_operes.html        # Page services opérés
├── contact.html                # Page contact
├── mentions-legales.html       # Mentions légales
├── login.php                   # Page de connexion admin
├── dashboard.php               # Tableau de bord (accès restreint)
├── logout.php                  # Déconnexion
│
├── php/
│   ├── db.php                  # Connexion PDO MySQL (ignoré par git)
│   ├── auth.php                # Gestion de session / requireAuth()
│   ├── traitement_contact.php  # Traitement formulaire contact
│   └── api/
│       ├── consent.php         # Enregistrement des consentements cookies
│       ├── analytics.php       # Enregistrement des pages vues / temps passé
│       ├── stats.php           # API stats dashboard (auth requise)
│       ├── news.php            # API publique des actualités (max 6, tri date DESC)
│       ├── news-admin.php      # API CRUD actualités (auth requise)
│       └── upload.php          # Upload d'images (auth requise)
│
├── js/
│   ├── main.js                 # Chargement des composants, nav active
│   ├── cookies.js              # Bandeau consentement RGPD
│   ├── dashboard.js            # Logique du tableau de bord
│   ├── news.js                 # Carrousel actualités (max 6, affiche 3)
│   ├── maps.js                 # Carte Leaflet (périmètre)
│   ├── contact.js              # Formulaire contact
│   ├── captcha.js              # Gestion reCAPTCHA
│   └── modals.js               # Modals génériques
│
├── css/
│   ├── common.css              # Variables, reset, header, footer
│   ├── index.css               # Page d'accueil + actualités + carrousel
│   ├── dashboard-cookies.css   # Dashboard et page login
│   ├── cookies.css             # Bandeau RGPD
│   ├── equipe.css              # Page équipe
│   ├── histoire.css            # Page histoire
│   ├── missions.css            # Page missions
│   ├── perimetre.css           # Page périmètre
│   ├── comitologie.css         # Page comitologie
│   ├── services.css            # Page services opérés
│   ├── contact.css             # Page contact
│   └── mentions.css            # Mentions légales
│
├── components/
│   ├── header.html             # Header dynamique
│   ├── footer.html             # Footer dynamique
│   └── cookie-banner.html      # Bandeau RGPD
│
├── images/
│   ├── logo-acad.png           # Logo Académie de Rennes
│   ├── GAR.png                 # Logo GAR
│   └── news/                   # Images uploadées (ignoré par git)
│
├── setup/
│   └── setup.php               # Script d'installation CLI
│
├── install.ps1                 # Installateur PowerShell
├── credentials.txt             # Identifiants générés (ignoré par git)
└── .gitignore
```

---

## Base de données

Base : `drasi_db`

| Table                  | Description                                    |
|------------------------|------------------------------------------------|
| `users`                | Comptes administrateurs                        |
| `cookie_consents`      | Consentements RGPD (durée 3 ans)               |
| `analytics_pageviews`  | Pages vues anonymisées (durée 13 mois)         |
| `analytics_time`       | Temps passé par page (durée 13 mois)           |
| `login_logs`           | Journal des tentatives de connexion            |
| `news`                 | Actualités publiées sur le site                |

---

## Sécurité

- Mots de passe hachés avec `password_hash()` (bcrypt)
- Sessions PHP : `httponly`, `SameSite=Strict`, expiration à la fermeture du navigateur
- Timeout d'inactivité : 30 minutes côté serveur + avertissement 5 min avant
- Détection de fermeture d'onglet via `sessionStorage` (reconnexion obligatoire)
- Toutes les entrées utilisateur sont filtrées (`htmlspecialchars`, requêtes préparées PDO)
- Upload d'images : validation MIME via `finfo`, extension whitelist

---

## Notes de développement

- `session_write_close()` est appelé après chaque vérification d'auth pour libérer le verrou de session PHP et permettre les requêtes `fetch` parallèles depuis le dashboard
- Les actualités sont triées par `date_publication DESC` (plus récente en premier), max 6 retournées par l'API
- Le carrousel affiche 3 actualités à la fois avec navigation précédent/suivant
- Les consentements expirés sont purgés automatiquement à chaque nouvel enregistrement
- `php/db.php` est exclu du dépôt git (`.gitignore`) pour éviter d'exposer les identifiants MySQL
- GLPI nécessite une configuration Apache (alias ou AllowOverride All) pour servir depuis `/public/`

---

## Crédits

Projet BTS — Direction Régionale Académique des Systèmes d'Information  
Développé avec PHP 8, MySQL 8, HTML/CSS/JS vanilla, WampServer
