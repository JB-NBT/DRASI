# DRASI — Direction Régionale Académique des Systèmes d'Information

Portail institutionnel développé dans le cadre d'un projet BTS.  
Le site est accompagné d'un tableau de bord d'administration protégé par authentification.

---

## Fonctionnalités

- **Site public** : présentation des services, actualités dynamiques, conformité RGPD (bandeau cookies)
- **Tableau de bord admin** : statistiques de visites, gestion des consentements, gestion des actualités
- **Authentification** : login sécurisé avec hachage bcrypt, logs des tentatives, session avec timeout 30 min
- **RGPD** : consentements conservés 3 ans, données analytiques 13 mois (recommandations CNIL)
- **Actualités** : CRUD complet depuis le dashboard, support des images, affichage en modal sur le site public

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
   git clone https://github.com/JB-NBT/DRASI drasi
   ```

2. Démarrer WampServer (icône verte dans la barre des tâches)

3. Double-cliquer sur **`install.bat`** à la racine du projet

Le script :
- détecte automatiquement WampServer et PHP
- crée la base de données `drasi_db` et toutes les tables
- insère le compte administrateur et 3 actualités de démonstration
- crée le dossier `images/news/`
- génère le fichier **`credentials.txt`** avec tous les identifiants

---

## Installation manuelle

Si `install.bat` ne peut pas être utilisé, exécuter directement depuis la ligne de commande :

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

Exemple avec mot de passe :
```bash
php setup/setup.php --user=root --pass=monmotdepasse
```

---

## Accès après installation

| Ressource       | URL                                     |
|-----------------|-----------------------------------------|
| Site public     | http://localhost/drasi/                 |
| Dashboard admin | http://localhost/drasi/login.php        |
| phpMyAdmin      | http://localhost/phpmyadmin/            |

Identifiants administrateur par défaut (projet BTS — à changer en production) :

| Champ         | Valeur           |
|---------------|------------------|
| Email         | admin@drasi.fr   |
| Mot de passe  | Drasi2026!       |

---

## Structure du projet

```
drasi/
├── index.html                  # Page d'accueil publique
├── login.php                   # Page de connexion admin
├── dashboard.php               # Tableau de bord (accès restreint)
├── logout.php                  # Déconnexion
├── dashboard-cookies.html      # (redirige vers login.php)
│
├── php/
│   ├── db.php                  # Connexion PDO MySQL
│   ├── auth.php                # Gestion de session / requireAuth()
│   └── api/
│       ├── consent.php         # Enregistrement des consentements cookies
│       ├── analytics.php       # Enregistrement des pages vues / temps passé
│       ├── stats.php           # API stats dashboard (auth requise)
│       ├── news.php            # API publique des actualités
│       ├── news-admin.php      # API CRUD actualités (auth requise)
│       └── upload.php          # Upload d'images (auth requise)
│
├── js/
│   ├── cookies.js              # Bandeau consentement RGPD
│   ├── dashboard.js            # Logique du tableau de bord
│   └── news.js                 # Affichage des actualités (site public)
│
├── css/
│   ├── common.css              # Variables, reset, header, footer
│   ├── index.css               # Styles page d'accueil + actualités
│   └── dashboard-cookies.css   # Styles dashboard et page login
│
├── images/
│   └── news/                   # Images uploadées (ignoré par git)
│
├── setup/
│   └── setup.php               # Script d'installation CLI
│
├── install.bat                 # Lanceur Windows (double-clic)
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
- Les actualités sont triées par `ordre ASC, date_publication DESC`
- Les consentements expirés sont purgés automatiquement à chaque nouvel enregistrement
- `php/db.php` est exclu du dépôt git (`.gitignore`) pour éviter d'exposer les identifiants MySQL

---

## Crédits

Projet BTS — Direction Régionale Académique des Systèmes d'Information  
Développé avec PHP 8, MySQL 8, HTML/CSS/JS vanilla, WampServer
