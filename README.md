# 🎓 Site Web - Direction Régionale Académique des Systèmes d'Information (DRASI)

**Site web institutionnel de la DRASI de proximité du Morbihan - Académie de Rennes**

---

## 📋 Table des matières

1. [Présentation du projet](#présentation)
2. [Installation et mise en ligne](#installation)
3. [Structure du projet](#structure)
4. [Technologies utilisées](#technologies)
5. [Fonctionnalités principales](#fonctionnalités)
6. [Guide de mise à jour rapide](#mise-à-jour)
7. [Système de cookies et analytics](#cookies-analytics)
8. [Accéder aux statistiques](#statistiques)
9. [Ajouter des membres d'équipe](#ajouter-membres)
10. [Préparation des images](#images)
11. [Personnalisation avancée](#personnalisation)
12. [Support et maintenance](#support)
13. [Documentation complémentaire](#documentation)

---

## 🎯 Présentation du projet {#présentation}

Ce site web a été conçu pour présenter la Direction Régionale Académique des Systèmes d'Information (DRASI) de proximité du Morbihan, anciennement DSII de proximité 56.

### Objectifs du site

- Présenter l'équipe et son organisation
- Informer sur les missions et le périmètre d'intervention
- Faciliter la prise de contact
- Retracer l'histoire et l'évolution de la structure
- Assurer une conformité RGPD totale
- Mesurer la fréquentation avec analytics anonymes

### Public cible

- Établissements scolaires du Morbihan (collèges, lycées, GRETA)
- Services académiques (IEN, CIO, CMS, DSDEN, SDJES)
- Personnel de l'Éducation Nationale
- Partenaires institutionnels

---

## 🚀 Installation et mise en ligne {#installation}

### Prérequis

- Un serveur web (Apache, Nginx, ou hébergement mutualisé)
- Accès FTP ou gestionnaire de fichiers
- **Aucune base de données requise** (site 100% statique)
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)

### Étapes d'installation

#### 1. Télécharger les fichiers

```bash
# Télécharger ou cloner le projet
git clone [URL_DU_PROJET]
cd site-drasi-vannes
```

#### 2. Configuration des images

**Logo académique** :
- Fichier : `images/logo-acad.png`
- Format : PNG avec fond transparent
- Dimensions recommandées : 500x500px minimum
- Poids : < 200 Ko

**Photos des membres** :
- Dossier : `images/equipe/`
- Format : PNG ou JPG
- Dimensions : 400x400px (carré, ratio 1:1)
- Nommage : `prenom-nom.png` (ex: `hafid-mokadem.png`)
- Poids : < 200 Ko par photo

**Logo GAR** :
- Fichier : `images/GAR.png`
- Format : PNG avec fond transparent

#### 3. Upload sur le serveur

Via FTP (FileZilla, WinSCP) :
```
/
├── index.html
├── histoire.html
├── equipes.html
├── missions.html
├── perimetre.html
├── comitologie.html
├── services_opérés.html
├── contact.html
├── admin-analytics.html ⭐ NOUVEAU
├── css/
├── js/
├── images/
└── components/
```

**⚠️ Important** : Conservez l'arborescence exacte des dossiers.

#### 4. Vérification

Testez les points suivants :
- ✅ Page d'accueil accessible
- ✅ Toutes les images s'affichent
- ✅ Navigation fonctionnelle
- ✅ Bandeau cookies opérationnel
- ✅ Formulaire de contact visible
- ✅ Cartes interactives (Leaflet) chargées
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Dashboard analytics accessible

### URLs importantes
- Page d'accueil : `index.html`
- Portfolio équipe : `equipes.html`
- Contact : `contact.html`
- **Dashboard Analytics : `admin-analytics.html`** ⭐

---

## 📁 Structure du projet {#structure}

```
site-drasi-vannes/
│
├── 📄 index.html                    # Page d'accueil
├── 📄 histoire.html                 # Historique de la structure
├── 📄 equipes.html                  # Portfolio équipe avec modals
├── 📄 missions.html                 # Missions (à compléter)
├── 📄 perimetre.html                # Périmètre avec cartes Leaflet
├── 📄 comitologie.html              # Comitologie (à compléter)
├── 📄 services_opérés.html          # Services opérés (à compléter)
├── 📄 contact.html                  # Formulaire de contact
├── 📄 admin-analytics.html          # Dashboard statistiques 📊 NOUVEAU
│
├── 📁 css/
│   ├── style.css                    # Styles principaux
│   ├── responsive.css               # Adaptations mobiles/tablettes
│   ├── cookies.css                  # Styles bandeau cookies 🍪 NOUVEAU
│   ├── histoire.css                 # Styles page histoire (timeline)
│   ├── perimetre.css                # Styles cartes Leaflet
│   └── modals.css                   # Styles modals membres équipe
│
├── 📁 js/
│   ├── main.js                      # Script principal
│   ├── cookies.js                   # Gestion cookies RGPD & analytics 🍪 NOUVEAU
│   ├── maps.js                      # Cartes Leaflet interactives
│   └── modals.js                    # Modals membres équipe
│
├── 📁 images/
│   ├── logo-acad.png                # Logo académie (500x500px)
│   ├── GAR.png                      # Logo GAR
│   └── 📁 equipe/
│       ├── hafid-mokadem.png        # Photos membres (400x400px)
│       ├── vincent-benard.png
│       └── ...
│
├── 📁 components/
│   ├── header.html                  # Header réutilisable
│   ├── footer.html                  # Footer réutilisable
│   └── cookie-banner.html           # Bandeau cookies 🍪 NOUVEAU
│
└── 📁 docs/
    ├── README.md                    # Ce fichier
    ├── GUIDE_MISE_A_JOUR.md         # Guide de mise à jour
    └── GUIDE_TECHNIQUE.md           # Documentation technique
```

---

## 💻 Technologies utilisées {#technologies}

### Frontend

| Technologie | Version | Usage |
|------------|---------|-------|
| **HTML5** | - | Structure sémantique |
| **CSS3** | - | Styles et animations |
| **JavaScript** | ES6+ | Interactivité (Vanilla JS) |

### Bibliothèques externes

| Bibliothèque | Version | CDN | Usage |
|-------------|---------|-----|-------|
| **Leaflet** | 1.7.1 | cdnjs.cloudflare.com | Cartes interactives |

### Compatibilité navigateurs

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobiles iOS/Android

---

## ⚙️ Fonctionnalités principales {#fonctionnalités}

### 1. Système de cookies RGPD & Analytics

**Fichiers** : `js/cookies.js`, `css/cookies.css`, `components/cookie-banner.html`

- ✅ Bandeau de consentement au premier chargement (centre écran, fond flouté)
- ✅ Modal de personnalisation des préférences
- ✅ Analytics anonymes : collecte de données sans identification personnelle
- ✅ Stockage local des choix (localStorage)
- ✅ Dashboard admin avec statistiques détaillées
- ✅ Export CSV et JSON des données
- ✅ Conformité CNIL/RGPD totale

**Cookies utilisés** :
- `drasi_cookie_consent` : Stockage des préférences (365 jours)
- `drasi_analytics` : Données analytics anonymes (395 jours)
- `drasi_session` : Identifiant de session (sessionStorage)

**Données collectées** (si accepté) :
- Pages visitées (URL)
- Temps passé sur chaque page
- Provenance (site référent anonyme)
- Session (ID anonymisé)
- Date/heure de visite

**Important** : Aucune donnée personnelle identifiable (pas d'IP, pas de nom, pas d'email).

### 2. Navigation dynamique

**Fichiers** : `js/main.js`, `components/header.html`

- ✅ Menu hamburger responsive (mobile/tablette)
- ✅ Indicateur de page active
- ✅ Smooth scroll pour ancres
- ✅ Composants chargés dynamiquement (header/footer)

### 3. Cartes interactives Leaflet

**Fichiers** : `js/maps.js`, `css/perimetre.css`, `perimetre.html`

**Carte 1 - EPLE** (Établissements publics locaux d'enseignement) :
- 41 collèges publics
- 21 lycées
- 3 GRETA

**Carte 2 - Services académiques** :
- 11 IEN (Inspections de l'Éducation Nationale)
- 8 CMS (Centres Médico-Scolaires)
- 4 CIO (Centres d'Information et d'Orientation)
- 1 DSDEN (Direction des Services Départementaux)
- 1 SDJES (Service Départemental à la Jeunesse)
- 1 SMA (Service Médical Académique)

**Total** : 90 structures référencées avec géolocalisation

### 4. Portfolio équipe avec modals

**Fichiers** : `js/modals.js`, `css/modals.css`, `equipes.html`

- ✅ 8 fiches membres interactives
- ✅ Modal détaillée au clic
- ✅ Présentation, missions, contact
- ✅ Photos haute qualité
- ✅ Animation fluide

### 5. Timeline historique

**Fichiers** : `css/histoire.css`, `histoire.html`

- ✅ Frise chronologique interactive
- ✅ 4 grandes périodes :
  - Avant 2018 : 3 équipes distinctes
  - 2018 : Création DAIP 56
  - 2022 : Naissance DSII de proximité 56
  - 2025 : Évolution vers DRASI de proximité

### 6. Formulaire de contact

**Fichiers** : `contact.html`

- ✅ Validation côté client
- ✅ Champs obligatoires marqués
- ✅ Case RGPD obligatoire
- ✅ Design responsive
- ✅ Horaires d'ouverture affichés

### 7. Design responsive

**Fichiers** : `css/responsive.css`

**Points de rupture** :
- 🖥️ Desktop : > 1024px
- 📱 Tablette : 768px - 1024px
- 📱 Mobile : < 768px
- 📱 Petit mobile : < 480px

---

## 🔄 Guide de mise à jour rapide {#mise-à-jour}

### ✨ Principe "Facile de MAJ"

Ce site est conçu pour être facilement modifiable, même sans connaissances en développement web.

### Outils nécessaires
- **Éditeur de texte** : Notepad++, VS Code, Sublime Text, ou Bloc-notes
- **Logiciel FTP** : FileZilla, WinSCP, ou gestionnaire de fichiers

### Workflow de modification

1. **Sauvegarde** : Toujours faire une copie du fichier original
2. **Téléchargement** : Via FTP, télécharger le fichier à modifier
3. **Édition** : Ouvrir avec un éditeur de texte
4. **Modification** : Effectuer les changements nécessaires
5. **Test local** : Tester dans un navigateur si possible
6. **Upload** : Ré-uploader sur le serveur
7. **Vérification** : Tester en ligne (Ctrl+F5 pour vider le cache)

### Modifications rapides

#### Modifier les statistiques (page d'accueil)

Fichier : `index.html`

```html
<!-- Cherchez cette section -->
<div class="stat-box">
    <div class="stat-number">8</div>
    <div class="stat-label">Membres de l'équipe</div>
</div>
```

Modifiez les chiffres selon vos besoins.

#### Modifier le texte de présentation

Cherchez dans `index.html` :

```html
<h2 class="hero-title">Une équipe engagée pour l'éducation</h2>
<p class="hero-text">
    L'équipe académique de Vannes accompagne...
</p>
```

Changez le titre et le texte entre les balises.

#### Modifier les informations de contact

Ouvrez `contact.html` et cherchez :

```html
<p class="card-text">
    Standard : 02 XX XX XX XX<br>
    Fax : 02 XX XX XX XX
</p>
```

Remplacez par les vrais numéros.

#### Modifier les couleurs du site

Fichier : `css/style.css`

```css
:root {
    --bleu-france: #228BCC;       /* Couleur principale */
    --bleu-france-hover: #1212B8; /* Couleur au survol */
    --rouge-marianne: #E1000F;    /* Couleur accent */
    --gris-50: #808080;           /* Gris moyen */
    --gris-85: #262626;           /* Gris foncé textes */
    --gris-clair: #f8f9fa;
    --blanc: #FFFFFF;
}
```

---

## 🍪 Système de cookies et analytics {#cookies-analytics}

### Vue d'ensemble

Le site intègre un système de **gestion des cookies conforme RGPD** avec analytics anonymisés pour mesurer la fréquentation du site.

### Fonctionnalités

✅ **Bandeau de consentement** : Apparaît au centre de l'écran avec fond flouté
✅ **Analytics anonymes** : Collecte de données sans identification personnelle
✅ **Respect RGPD** : Conformité totale avec la réglementation
✅ **Données locales** : Stockage dans le navigateur (localStorage)
✅ **Dashboard admin** : Visualisation des statistiques
✅ **Export des données** : CSV et JSON

### Fichiers du système

```
components/cookie-banner.html  → HTML du bandeau
css/cookies.css               → Styles du bandeau
js/cookies.js                 → Logique cookies & analytics
admin-analytics.html          → Dashboard statistiques
```

### Configuration

Dans `js/cookies.js`, vous pouvez modifier :

```javascript
const COOKIE_CONFIG = {
    consentName: 'drasi_cookie_consent',      // Nom du cookie de consentement
    analyticsName: 'drasi_analytics',         // Nom stockage analytics
    consentDuration: 365,                     // Durée consentement (jours)
    analyticsDuration: 395,                   // Durée conservation data (jours)
    sessionName: 'drasi_session'              // Nom session
};
```

### Personnaliser le bandeau

Pour modifier le texte du bandeau, éditez `components/cookie-banner.html` :

```html
<h3 class="cookie-banner-title">🍪 Gestion des cookies</h3>
<p class="cookie-banner-description">
    Votre texte personnalisé ici...
</p>
```

---

## 📊 Accéder aux statistiques {#statistiques}

### Dashboard d'administration

**URL** : `https://votre-site.fr/admin-analytics.html`

### Fonctionnalités du dashboard

📈 **Statistiques principales** :
- Nombre total de visites
- Nombre de sessions uniques
- Temps moyen par page
- Statut des cookies (actifs/inactifs)

📄 **Pages les plus visitées** :
- Classement des pages par popularité
- Pourcentage de visites par page

🕐 **Historique des visites** :
- 20 dernières visites
- Date/heure, page, provenance, session

⏱️ **Temps passé par page** :
- Moyenne du temps par page
- Nombre de mesures

### Actions disponibles

🔄 **Actualiser** : Recharge les données
💾 **Exporter CSV** : Export au format CSV (Excel)
📄 **Exporter JSON** : Export au format JSON
🗑️ **Effacer données** : Supprime toutes les analytics

### Accès depuis la console

Vous pouvez aussi accéder aux stats directement depuis la console du navigateur (F12) :

```javascript
// Afficher toutes les statistiques
showAnalyticsStats()

// Accéder aux données brutes
Analytics.getStats()

// Effacer les données
Analytics.clearData()
```

### Protection du dashboard

⚠️ **Important** : Le fichier `admin-analytics.html` est accessible publiquement par défaut.

**Pour le protéger**, vous pouvez :

1. **Renommer le fichier** avec un nom difficile à deviner :
   ```
   admin-analytics.html → stats-x8k2m9p3.html
   ```

2. **Ajouter une authentification serveur** (.htaccess sur Apache) :
   ```apache
   <Files "admin-analytics.html">
       AuthType Basic
       AuthName "Zone réservée"
       AuthUserFile /chemin/.htpasswd
       Require valid-user
   </Files>
   ```

3. **Utiliser les permissions serveur** pour restreindre l'accès par IP :
   ```apache
   <Files "admin-analytics.html">
       Order Deny,Allow
       Deny from all
       Allow from 192.168.1.100
   </Files>
   ```

### Export des données

#### Format CSV

Le CSV contient toutes les données dans un tableau :

```csv
Type,Date,Page,SessionID,Referrer,TimeSpent
pageview,2025-12-12T10:30:00.000Z,/index.html,sess_123...,direct,-
time,2025-12-12T10:35:00.000Z,/index.html,sess_123...,-,45
```

Utilisable directement dans Excel, Google Sheets, etc.

#### Format JSON

Le JSON contient les données structurées + statistiques calculées :

```json
{
  "exportDate": "2025-12-12T10:35:00.000Z",
  "statistics": {
    "totalPageviews": 150,
    "totalSessions": 42,
    "averageTime": 65,
    "mostVisitedPages": [...]
  },
  "rawData": {
    "pageviews": [...],
    "time": [...]
  }
}
```

---

## 👥 Ajouter des membres d'équipe {#ajouter-membres}

### Étape 1 : Préparer la photo

1. Photo format **carré** (400x400px recommandé)
2. Format **PNG** ou **JPG**
3. Nommez le fichier : `prenom-nom.png` (ex: `marie-dupont.png`)
4. Placez-le dans le dossier `images/equipe/`

### Étape 2 : Ajouter la carte membre dans equipes.html

Ouvrez `equipes.html` et trouvez une carte membre existante :

```html
<div class="member-card">
    <img src="images/equipe/hafid-mokadem.png" alt="Hafid MOKADEM" class="member-photo">
    <div class="member-info">
        <h4 class="member-name">Hafid MOKADEM</h4>
        <p class="member-role">IGE - Responsable</p>
        <p class="member-contact">📧 hafid.mokadem@ac-rennes.fr</p>
        <p class="member-contact">📍 Vannes</p>
    </div>
</div>
```

### Étape 3 : Copier-coller et modifier

1. **Copiez** tout le bloc `<div class="member-card">...</div>`
2. **Collez** après la dernière carte de la section
3. **Modifiez** :
   - `src="images/equipe/marie-dupont.png"` → votre nouvelle photo
   - `alt="Marie DUPONT"` → nom du membre
   - `Marie DUPONT` → nom complet
   - `Chargée de mission` → fonction du membre
   - `marie.dupont@ac-rennes.fr` → email du membre

### Étape 4 : Ajouter les données pour la modal (js/modals.js)

Ouvrez `js/modals.js` et ajoutez dans l'objet `membersData` :

```javascript
'marie-dupont': {
    name: 'Marie DUPONT',
    role: 'Chargée de mission',
    email: 'marie.dupont@ac-rennes.fr',
    location: 'Vannes',
    photo: 'images/equipe/marie-dupont.png',
    missions: [
        'Mission 1',
        'Mission 2',
        'Mission 3'
    ],
    description: 'Description du membre...'
}
```

---

## 🖼️ Préparation des images {#images}

### Logo académique

**Fichier** : `images/logo-acad.png`

**Spécifications** :
- Format : PNG avec fond transparent
- Dimensions : 500x500px minimum (200x200px recommandé pour web)
- Poids : < 100 Ko

### Photos des membres

**Dossier** : `images/equipe/`

**Spécifications** :
- Format : PNG ou JPG
- Dimensions : 400x400px (carré, ratio 1:1)
- Qualité : Haute résolution, visage bien visible
- Fond : Neutre, uni, ou fond académique
- Poids : < 200 Ko par photo
- Nommage : `prenom-nom.png` (ex: `marie-dupont.png`)

### Conseils pour les photos

✅ **À faire** :
- Photos de qualité professionnelle
- Éclairage uniforme
- Fond neutre (gris, blanc, bleu clair)
- Visage centré et souriant
- Tenue professionnelle

❌ **À éviter** :
- Photos floues ou pixellisées
- Fonds chargés ou distrayants
- Photos de groupe (une personne par photo)
- Photos trop sombres
- Fichiers trop lourds (> 500 Ko)

### Outils de traitement d'images

- [TinyPNG](https://tinypng.com/) - Compression d'images
- [Remove.bg](https://www.remove.bg/) - Suppression arrière-plan
- [Squoosh](https://squoosh.app/) - Optimisation d'images

---

## 🎨 Personnalisation avancée {#personnalisation}

### Modifier les sections

Vous pouvez ajouter, supprimer ou réorganiser les sections en copiant/collant des blocs complets :

```html
<section style="padding: 60px 0;">
    <div class="container">
        <h3 class="section-title">Titre de la section</h3>
        <!-- Contenu -->
    </div>
</section>
```

### Ajouter une nouvelle page

1. **Dupliquez** un fichier HTML existant (ex: `missions.html`)
2. **Renommez** le fichier (ex: `projets.html`)
3. **Modifiez** le contenu
4. **Ajoutez** un lien dans la navigation de **tous les fichiers** :

```html
<a href="projets.html" class="nav-pill" data-page="projets">Projets</a>
```

### Modifier les actualités

Dans la section actualités de `index.html`, dupliquez ce bloc :

```html
<article class="actualite-item">
    <div class="actualite-date">10 Décembre 2025</div>
    <h3 class="actualite-title">Titre de l'actualité</h3>
    <p class="actualite-excerpt">
        Description courte de l'actualité...
    </p>
</article>
```

---

## 🛠️ Support et maintenance {#support}

### Problèmes courants et solutions

#### 1. Les images ne s'affichent pas

**Causes possibles** :
- ❌ Chemin incorrect dans le code
- ❌ Nom de fichier différent (majuscules/minuscules)
- ❌ Fichier non uploadé sur le serveur

**Solutions** :
```html
<!-- Vérifier le chemin exact -->
<img src="images/equipe/membre-01.png" alt="...">

<!-- Sur Linux, les majuscules comptent ! -->
membre-01.png ≠ Membre-01.png
```

#### 2. Le menu mobile ne fonctionne pas

**Solutions** :
- Vérifier que `js/main.js` est bien chargé
- Vider le cache du navigateur (Ctrl + F5)
- Vérifier la console JavaScript (F12)

#### 3. Les modifications ne s'affichent pas

**Solutions** :
- Vider le cache navigateur : `Ctrl + Shift + Del` (Chrome/Firefox)
- Forcer le rechargement : `Ctrl + F5`
- Vérifier le fichier uploadé (bonne version)
- Attendre quelques minutes (propagation cache serveur)

#### 4. Les cartes Leaflet ne se chargent pas

**Causes possibles** :
- ❌ CDN Leaflet bloqué
- ❌ Fichier `js/maps.js` non chargé
- ❌ Élément `<div id="map-eple">` manquant

**Solutions** :
```html
<!-- Vérifier que le CDN est chargé -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>

<!-- Vérifier l'élément dans perimetre.html -->
<div id="map-eple" class="leaflet-map"></div>
```

#### 5. Bandeau cookies ne s'affiche pas

**Solutions** :
- Vérifier que `components/cookie-banner.html` existe
- Vérifier le chargement dans `js/main.js`
- Supprimer les cookies du site dans le navigateur
- Vérifier `js/cookies.js` chargé APRÈS le HTML
- Regarder la console (F12) pour les messages avec émojis :
  - 🍪 = Cookies
  - 📊 = Analytics
  - ✅ = Succès
  - ❌ = Erreur

### Optimisation des performances

**Images** :
- ✅ Compresser toutes les images < 200 Ko
- ✅ Utiliser WebP si possible (fallback JPG/PNG)
- ✅ Lazy loading pour images hors viewport

**CSS/JS** :
- ✅ Minifier en production (optionnel)
- ✅ Combiner les fichiers si nombreuses requêtes
- ✅ Utiliser le cache navigateur

**SEO** :
- ✅ Balises `<meta description>` remplies
- ✅ Attributs `alt` sur toutes les images
- ✅ Balises `<title>` descriptives
- ✅ Structure HTML sémantique (`<header>`, `<nav>`, `<main>`, `<footer>`)

### Accessibilité (RGAA)

**Niveau visé** : AA

**Points d'attention** :
- ✅ Contraste texte/fond suffisant
- ✅ Navigation au clavier possible
- ✅ Textes alternatifs sur images
- ✅ Formulaire avec labels explicites
- ⚠️ Audit complet à réaliser

### Validation du code

Testez votre code sur :
- [W3C Validator](https://validator.w3.org/) - Validation HTML
- [CSS Validator](https://jigsaw.w3.org/css-validator/) - Validation CSS

---

## 📚 Documentation complémentaire {#documentation}

### Guides disponibles

| Guide | Contenu | Lien |
|-------|---------|------|
| **GUIDE_MISE_A_JOUR.md** | Procédures de mise à jour détaillées | [Voir le guide](GUIDE_MISE_A_JOUR.md) |
| **GUIDE_TECHNIQUE.md** | Architecture technique complète | [Voir le guide](GUIDE_TECHNIQUE.md) |

### Ressources externes utiles

**HTML/CSS/JavaScript** :
- [MDN Web Docs](https://developer.mozilla.org/fr/) - Documentation de référence
- [W3Schools](https://www.w3schools.com/) - Tutoriels et exemples
- [Can I Use](https://caniuse.com/) - Compatibilité navigateurs

**Outils de développement** :
- [VS Code](https://code.visualstudio.com/) - Éditeur de code recommandé
- [FileZilla](https://filezilla-project.org/) - Client FTP
- [TinyPNG](https://tinypng.com/) - Compression d'images
- [Remove.bg](https://www.remove.bg/) - Suppression arrière-plan

**Leaflet** :
- [Documentation Leaflet](https://leafletjs.com/) - Cartes interactives
- [Leaflet plugins](https://leafletjs.com/plugins.html) - Extensions

**RGPD & Cookies** :
- [CNIL - Cookies et traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs)
- [Guide RGPD](https://www.cnil.fr/fr/rgpd-par-ou-commencer)

---

## 🔐 Sécurité et confidentialité

### Données personnelles

✅ **Aucune donnée personnelle n'est collectée** :
- Pas d'adresse IP
- Pas de nom ou email
- Pas de cookies de tracking tiers
- Pas de partage avec des services externes

### Stockage des données

📦 **Stockage local uniquement** :
- Les données sont dans le navigateur de l'utilisateur
- Pas de base de données serveur
- Pas d'envoi vers des serveurs externes
- L'utilisateur contrôle ses données

### Conformité RGPD

✅ **100% conforme** :
- Consentement explicite requis
- Droit de refus respecté
- Durée de conservation limitée (13 mois)
- Transparence totale sur les données collectées
- Possibilité d'effacement des données

---

## 📞 Contact et support

### Équipe technique

**Responsable technique** :
- Hafid MOKADEM (IGE)
- 📧 hafid.mokadem@ac-rennes.fr

**Responsable adjoint** :
- Vincent BENARD (ASI)
- 📧 vincent.benard@ac-rennes.fr

### Signaler un problème

Pour signaler un bug ou demander une évolution :

1. **Par email** : Contacter l'équipe technique
2. **Informations à fournir** :
   - URL de la page concernée
   - Description du problème
   - Navigateur et version
   - Captures d'écran si possible

---

## 📝 Changelog

### Version 2.0 (Décembre 2025)

**✨ Nouveautés** :
- Ajout système de cookies conforme RGPD
- Dashboard analytics avec statistiques détaillées
- Export CSV et JSON des données
- Bandeau de consentement moderne
- Analytics anonymes et respectueux de la vie privée

**🐛 Corrections** :
- Responsive optimisé mobile/tablette
- Navigation menu hamburger améliorée
- Chargement des composants sécurisé

### Version 1.1 (Décembre 2025)

**✨ Nouveautés** :
- Ajout des cartes interactives Leaflet (90 structures)
- Système de modals pour les membres de l'équipe
- Timeline interactive page histoire
- Amélioration accessibilité

**🐛 Corrections** :
- Responsive optimisé mobile/tablette
- Navigation menu hamburger améliorée
- Chargement des composants sécurisé

### Version 1.0 (Novembre 2025)

**🎉 Lancement initial** :
- Structure complète du site
- 8 pages principales
- Design conforme charte graphique
- Responsive mobile/tablette/desktop

---

## 📜 Mentions légales

**Site édité par** :
- Direction Régionale Académique des Systèmes d'Information (DRASI)
- Académie de Rennes
- Morbihan (56)

**Hébergement** :
- [À compléter selon votre hébergeur]

**Crédits** :
- Développement : Équipe DRASI Vannes
- Design : Charte graphique Éducation Nationale
- Cartographie : Leaflet (Open Source)
- Données : Académie de Rennes

**Technologies** : HTML5, CSS3, JavaScript Vanilla  
**Navigateurs supportés** : Chrome, Firefox, Safari, Edge (dernières versions)  
**Responsive** : Mobile, Tablette, Desktop  
**Accessibilité** : RGAA (niveau AA visé)  
**RGPD** : Conforme - Données anonymes uniquement  
**Stockage** : localStorage (navigateur uniquement)

---

## 📄 Licence

© 2025 Académie de Rennes - Direction Régionale Académique des Systèmes d'Information

Tous droits réservés. Usage interne Éducation Nationale.

---

**Dernière mise à jour** : Décembre 2025 
**Version** : 2.0  
**Mainteneur** : Équipe DRASI Vannes

---

📧 **Pour toute question, contactez l'équipe technique de l'académie.**