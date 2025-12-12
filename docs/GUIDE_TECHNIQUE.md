# 🔧 Guide Technique - Site DRASI Vannes

**Documentation technique complète pour les développeurs**

---

## 📋 Table des matières

1. [Architecture technique](#architecture)
2. [Structure des fichiers](#structure)
3. [Système de styles](#styles)
4. [JavaScript et interactivité](#javascript)
5. [Système de cookies RGPD](#cookies)
6. [Cartes Leaflet](#leaflet)
7. [Système de modals](#modals)
8. [Composants réutilisables](#composants)
9. [Responsive design](#responsive)
10. [Performance et optimisation](#performance)
11. [Déploiement](#deploiement)
12. [Maintenance](#maintenance)

---

## 🏗️ Architecture technique {#architecture}

### Vue d'ensemble

Le site est une **application web statique** construite avec :
- HTML5 sémantique
- CSS3 avec variables CSS
- JavaScript Vanilla (ES6+)
- Leaflet 1.7.1 pour les cartes

### Principes de conception

**1. Simplicité**
- Pas de framework lourd (React, Vue, Angular)
- Pas de build system (Webpack, Vite)
- Déploiement direct sur serveur web

**2. Modularité**
- Composants réutilisables (header, footer, cookies)
- Séparation CSS par fonctionnalité
- Scripts JavaScript organisés par domaine

**3. Maintenabilité**
- Code commenté et structuré
- Variables CSS pour personnalisation
- Convention de nommage cohérente

**4. Performance**
- Chargement asynchrone des composants
- Lazy loading des images (à implémenter)
- Minification CSS/JS (optionnel en production)

### Stack technique

```
Frontend
├── HTML5 (sémantique, accessibilité)
├── CSS3 (Flexbox, Grid, Variables, Animations)
├── JavaScript ES6+ (Vanilla, pas de framework)
└── Leaflet 1.7.1 (cartes interactives)

Backend
└── Aucun (site statique)

Hébergement
└── Serveur web standard (Apache/Nginx)
```

---

## 📂 Structure des fichiers {#structure}

### Arborescence détaillée

```
site-drasi-vannes/
│
├── 📄 Pages HTML (racine)
│   ├── index.html              # Page d'accueil
│   ├── histoire.html           # Timeline historique
│   ├── equipes.html           # Portfolio équipe
│   ├── missions.html          # Missions (à compléter)
│   ├── perimetre.html         # Cartes Leaflet
│   ├── comitologie.html       # Comitologie (à compléter)
│   ├── services_opérés.html   # Services (à compléter)
│   └── contact.html           # Formulaire contact
│
├── 📁 css/
│   ├── style.css              # Styles principaux (8 sections)
│   ├── responsive.css         # Media queries (3 breakpoints)
│   ├── cookies.css            # Bandeau cookies + modal
│   ├── histoire.css           # Timeline interactive
│   ├── perimetre.css          # Styles cartes Leaflet
│   └── modals.css             # Modals membres équipe
│
├── 📁 js/
│   ├── main.js                # Script principal (menu, nav, etc.)
│   ├── cookies.js             # Gestion cookies RGPD
│   ├── maps.js                # Initialisation cartes Leaflet
│   └── modals.js              # Système de modals équipe
│
├── 📁 images/
│   ├── logo-acad.png          # Logo académie (500x500px)
│   ├── GAR.png                # Logo GAR
│   └── 📁 equipe/
│       ├── hafid-mokadem.png  # Photos membres (400x400px)
│       ├── vincent-benard.png
│       └── ...
│
├── 📁 components/
│   ├── header.html            # Header réutilisable
│   ├── footer.html            # Footer réutilisable
│   └── cookie-banner.html     # Bandeau cookies
│
└── 📁 docs/
    ├── README.md              # Documentation principale
    ├── GUIDE_MISE_A_JOUR.md   # Guide utilisateur
    └── GUIDE_TECHNIQUE.md     # Ce fichier
```

### Conventions de nommage

**HTML** :
```
kebab-case : page-contact.html, services-operes.html
```

**CSS** :
```
Classes : kebab-case (.hero-section, .member-card)
IDs : camelCase (#menuToggle, #cookieBanner)
Variables : kebab-case (--bleu-france, --spacing-lg)
```

**JavaScript** :
```
Variables : camelCase (const memberData, let isVisible)
Fonctions : camelCase (function initMenu(), showBanner())
Classes : PascalCase (class Analytics, class CookieConsent)
Constantes : UPPER_SNAKE_CASE (const COOKIE_CONFIG, API_URL)
```

**Fichiers images** :
```
kebab-case : logo-academie.png, marie-dupont.png
```

---

## 🎨 Système de styles {#styles}

### Variables CSS (Design Tokens)

**Fichier** : `css/style.css`

```css
:root {
    /* Couleurs - Charte graphique Académie de Rennes */
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

### Organisation CSS

**style.css** (fichier principal) :
```css
/* 1. Variables CSS */
/* 2. Reset et styles de base */
/* 3. Layout général et container */
/* 4. Header et navigation */
/* 5. Hero section */
/* 6. Sections de contenu */
/* 7. Cartes et composants */
/* 8. Footer */
```

**Ordre de chargement** :
```html
<link rel="stylesheet" href="css/style.css">        <!-- Styles de base -->
<link rel="stylesheet" href="css/responsive.css">   <!-- Ensuite responsive -->
<link rel="stylesheet" href="css/cookies.css">      <!-- Puis modules -->
<link rel="stylesheet" href="css/histoire.css">     <!-- Spécifiques pages -->
<link rel="stylesheet" href="css/perimetre.css">
<link rel="stylesheet" href="css/modals.css">
```

### Méthodologie CSS

**BEM adapté** :

```css
/* Block */
.member-card { }

/* Element */
.member-card__photo { }
.member-card__info { }
.member-card__name { }

/* Modifier */
.member-card--highlighted { }
.member-card--large { }
```

**Exemple concret** :

```html
<div class="member-card member-card--highlighted">
    <img class="member-card__photo" src="...">
    <div class="member-card__info">
        <h4 class="member-card__name">Nom</h4>
    </div>
</div>
```

**⚠️ Note** : Par souci de simplicité, le projet n'utilise pas strictement BEM partout, mais une approche hybride.

### Responsive - Breakpoints

**Fichier** : `css/responsive.css`

```css
/* Desktop (default) : > 1024px */

/* Tablettes : max 1024px */
@media screen and (max-width: 1024px) {
    /* Grid 2 colonnes, ajustements */
}

/* Tablettes petites + mobiles large : max 768px */
@media screen and (max-width: 768px) {
    /* Grid 1 colonne, menu hamburger */
}

/* Mobiles : max 480px */
@media screen and (max-width: 480px) {
    /* Optimisations mobile */
}

/* Très petits écrans : max 380px */
@media screen and (max-width: 380px) {
    /* Ajustements finaux */
}
```

### Animations CSS

**Fichier** : `css/cookies.css` (exemple)

```css
/* Animation fade in */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Animation slide up */
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Utilisation */
.cookie-banner.visible {
    display: flex;
    animation: fadeIn 0.3s ease;
}
```

---

## ⚙️ JavaScript et interactivité {#javascript}

### Architecture JavaScript

**main.js** - Script principal :
```javascript
// 1. Chargement des composants (header, footer, cookies)
// 2. Initialisation de la navigation
// 3. Gestion du menu hamburger
// 4. Formulaire de contact
// 5. Animations au scroll
// 6. Smooth scroll
// 7. Bouton retour en haut
```

**cookies.js** - Gestion RGPD :
```javascript
// 1. Configuration
// 2. Classe Analytics
// 3. Classe CookieConsent
// 4. Initialisation
// 5. Fonction utilitaire admin
```

**maps.js** - Cartes Leaflet :
```javascript
// 1. Données établissements (colleges, lycées, GRETA)
// 2. Données services (IEN, CIO, CMS, etc.)
// 3. Fonction initMapEPLE()
// 4. Fonction initMapServices()
// 5. Initialisation automatique
```

**modals.js** - Modals équipe :
```javascript
// 1. Données membres (objet membersData)
// 2. Fonction createMemberModal()
// 3. Fonction closeMemberModal()
// 4. Gestion événements (ESC, overlay)
// 5. Initialisation au chargement
```

### Chargement des composants

**Principe** :
Les composants (header, footer, cookies) sont chargés dynamiquement via `fetch()`.

```javascript
// main.js
document.addEventListener('DOMContentLoaded', function() {
    
    // Charger le bandeau cookies
    fetch('components/cookie-banner.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('cookie-banner-placeholder').innerHTML = data;
            // Puis initialiser le système
            if (window.initCookieSystem) {
                window.initCookieSystem();
            }
        })
        .catch(error => console.error('Erreur chargement cookies:', error));
    
    // Charger le header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initMenuToggle();
            setActiveNavLink();
        });
    
    // Charger le footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            // Attacher événements après chargement
            attachFooterEvents();
        });
});
```

**Avantages** :
- ✅ Maintenance facilitée (un seul fichier à modifier)
- ✅ Cohérence sur toutes les pages
- ✅ Réduction de la duplication de code

**Inconvénients** :
- ⚠️ Léger délai de chargement
- ⚠️ Nécessite JavaScript actif

### Menu hamburger

**HTML** :
```html
<button class="menu-toggle" id="menuToggle">
    <span></span>
    <span></span>
    <span></span>
</button>

<nav class="nav-menu" id="navMenu">
    <a href="index.html" class="nav-pill">Accueil</a>
    <!-- ... -->
</nav>
```

**JavaScript** :
```javascript
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Ouvrir/fermer au clic
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fermer au clic sur un lien
    const navLinks = navMenu.querySelectorAll('.nav-pill');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Fermer au clic hors menu
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}
```

### Animations au scroll

**IntersectionObserver** :

```javascript
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments
    const animatedElements = document.querySelectorAll('.card, .member-card, .actualite-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

window.addEventListener('load', initScrollAnimations);
```

---

## 🍪 Système de cookies RGPD {#cookies}

### Architecture

**Fichiers** :
- `js/cookies.js` - Logique métier
- `css/cookies.css` - Styles bandeau + modal
- `components/cookie-banner.html` - Structure HTML

### Configuration

```javascript
const COOKIE_CONFIG = {
    consentName: 'drasi_cookie_consent',    // Nom cookie consentement
    analyticsName: 'drasi_analytics',       // Nom cookie analytics
    consentDuration: 365,                   // 1 an
    analyticsDuration: 395,                 // 13 mois (recommandé CNIL)
    sessionName: 'drasi_session'            // Session ID
};
```

### Classe Analytics

**Collecte anonyme** :

```javascript
class Analytics {
    constructor() {
        this.sessionId = this.getOrCreateSession();
        this.startTime = Date.now();
        this.pageViews = [];
        this.enabled = false;
    }
    
    // Génère un ID de session unique
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Enregistre une page vue
    trackPageView() {
        if (!this.enabled) return;
        
        const pageData = {
            url: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            referrer: document.referrer || 'direct'
        };
        
        this.pageViews.push(pageData);
        this.saveToStorage(pageData);
    }
    
    // Calcule le temps passé sur la page
    trackTimeOnPage() {
        if (!this.enabled) return;
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
            
            const timeData = {
                url: window.location.pathname,
                timeSpent: timeSpent,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };
            
            this.saveToStorage(timeData, 'time');
        });
    }
    
    // Récupère les statistiques
    getStats() {
        const data = JSON.parse(localStorage.getItem(COOKIE_CONFIG.analyticsName) || '{"pageviews": [], "time": []}');
        
        return {
            totalPageviews: data.pageviews.length,
            totalSessions: new Set(data.pageviews.map(p => p.sessionId)).size,
            averageTimePerPage: /* calcul */,
            mostVisitedPages: /* calcul */,
            data: data
        };
    }
}
```

### Classe CookieConsent

**Gestion du bandeau** :

```javascript
class CookieConsent {
    constructor() {
        this.banner = null;
        this.modal = null;
        this.initialized = false;
    }
    
    init() {
        // Attendre que les éléments soient dans le DOM
        this.waitForElements().then(() => {
            this.banner = document.getElementById('cookieBanner');
            this.modal = document.getElementById('cookieModal');
            
            this.attachEventListeners();
            this.checkConsent();
            this.initialized = true;
        });
    }
    
    checkConsent() {
        const consent = this.getConsent();
        
        if (consent === null) {
            // Pas de consentement → afficher le bandeau
            setTimeout(() => this.showBanner(), 1000);
        } else {
            // Consentement existant → appliquer
            if (consent.analytics) {
                analytics.enable();
            }
        }
    }
    
    saveConsent(preferences) {
        const consent = {
            analytics: preferences.analytics,
            timestamp: new Date().toISOString(),
            expires: new Date(Date.now() + COOKIE_CONFIG.consentDuration * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem(COOKIE_CONFIG.consentName, JSON.stringify(consent));
        
        if (consent.analytics) {
            analytics.enable();
        } else {
            analytics.disable();
        }
    }
    
    acceptAll() {
        this.saveConsent({ analytics: true });
        this.hideBanner();
    }
    
    refuseAll() {
        this.saveConsent({ analytics: false });
        this.hideBanner();
    }
}
```

### Initialisation

```javascript
const cookieConsent = new CookieConsent();
const analytics = new Analytics();

// Fonction globale d'initialisation
window.initCookieSystem = function() {
    cookieConsent.init();
};

// Auto-initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => window.initCookieSystem(), 500);
    });
} else {
    setTimeout(() => window.initCookieSystem(), 500);
}
```

### Fonction admin (console)

```javascript
// Afficher les statistiques dans la console
window.showAnalyticsStats = function() {
    const stats = analytics.getStats();
    console.log('📊 STATISTIQUES DU SITE', stats);
    if (stats && stats.mostVisitedPages) {
        console.table(stats.mostVisitedPages);
    }
    return stats;
};

// Utilisation : dans la console du navigateur
// > showAnalyticsStats()
```

### Conformité RGPD

**Points clés** :
- ✅ Bandeau informatif au premier chargement
- ✅ Choix granulaire (accepter/refuser/personnaliser)
- ✅ Cookies essentiels toujours actifs
- ✅ Analytics uniquement si accepté
- ✅ Données anonymes (pas d'IP, pas de tracking cross-site)
- ✅ Durée de conservation conforme (13 mois max)
- ✅ Possibilité de changer d'avis (lien footer)
- ✅ Pas de consentement pré-coché

---

## 🗺️ Cartes Leaflet {#leaflet}

### Installation

**CDN** :
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
```

### Structure des données

**Fichier** : `js/maps.js`

```javascript
// Collèges (41)
const colleges = [
    {nom: "Jules-Simon", commune: "Vannes", lat: 47.65880, lng: -2.76106},
    {nom: "Antoine de Saint-Exupéry", commune: "Vannes", lat: 47.67640, lng: -2.77115},
    // ...
];

// Lycées (21)
const lycees = [
    {nom: "Charles de Gaulle", commune: "Vannes", lat: 47.67633, lng: -2.77259},
    // ...
];

// GRETA (3)
const gretas = [
    {nom: "GRETA-CFA Bretagne Sud - Agence Lorient", commune: "Lorient", lat: 47.74590, lng: -3.38103},
    // ...
];

// Services académiques
const circonscriptions = [
    { nom: "IEN Lorient Nord", lat: 47.80, lon: -3.33, type: 'IEN'},
    // ...
];

const cio = [
    { name: 'CIO Vannes', lat: 47.67626, lng: -2.74773 },
    // ...
];

// ... etc
```

### Initialisation des cartes

**Carte 1 - EPLE** :

```javascript
function initMapEPLE() {
    // Créer la carte
    const map = L.map('map-eple').setView([47.85, -2.85], 9);

    // Ajouter le fond de carte (tiles OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Créer la légende
    const legendEPLE = L.control({position: 'topright'});
    legendEPLE.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <div class="legend-title">Établissements du Morbihan (56)</div>
            <div class="legend-item">
                <div class="legend-color lycee"></div>
                <span>Lycées (${lycees.length})</span>
            </div>
            <!-- ... -->
        `;
        return div;
    };
    legendEPLE.addTo(map);

    // Ajouter les collèges
    colleges.forEach(college => {
        L.circleMarker([college.lat, college.lng], {
            color: '#000080',
            fillColor: '#000091',
            fillOpacity: 0.8,
            radius: 7,
            weight: 2
        }).bindPopup(`<b>Collège ${college.nom}</b><br>${college.commune}`).addTo(map);
    });

    // Ajouter les lycées
    lycees.forEach(lycee => {
        L.circleMarker([lycee.lat, lycee.lng], {
            color: '#c00000',
            fillColor: '#E1000F',
            fillOpacity: 0.8,
            radius: 7,
            weight: 2
        }).bindPopup(`<b>Lycée ${lycee.nom}</b><br>${lycee.commune}`).addTo(map);
    });

    // Ajouter les GRETA
    gretas.forEach(greta => {
        L.circleMarker([greta.lat, greta.lng], {
            color: '#574bad',
            fillColor: '#6A5ACD',
            fillOpacity: 0.8,
            radius: 7,
            weight: 2
        }).bindPopup(`<b>${greta.nom}</b><br>${greta.commune}`).addTo(map);
    });
}
```

**Carte 2 - Services** :

```javascript
function initMapServices() {
    const map = L.map('map-services').setView([47.85, -2.85], 9);
    
    // Même principe que carte EPLE
    // + ajout des services académiques
}
```

### Auto-initialisation

```javascript
window.addEventListener('load', function() {
    setTimeout(function() {
        if (document.getElementById('map-eple')) {
            initMapEPLE();
        }
        
        if (document.getElementById('map-services')) {
            initMapServices();
        }
    }, 100);
});
```

### Personnalisation des markers

**Couleurs par type** :

```javascript
const markerColors = {
    college: { color: '#000080', fill: '#000091' },
    lycee: { color: '#c00000', fill: '#E1000F' },
    greta: { color: '#574bad', fill: '#6A5ACD' },
    ien: { color: '#6A1B9A', fill: '#9C27B0' },
    cio: { color: '#315ca8', fill: '#4169E1' },
    cms: { color: '#1a9089', fill: '#20B2AA' },
    sdjes: { color: '#228B22', fill: '#228B22' },
    dsden: { color: '#FF8C00', fill: '#FF8C00' },
    sma: { color: '#e40a39ff', fill: '#e40a39ff' }
};
```

### Options avancées

**Clustering** (à implémenter) :

```javascript
// Nécessite Leaflet.markercluster
// https://github.com/Leaflet/Leaflet.markercluster

const markers = L.markerClusterGroup();

colleges.forEach(college => {
    const marker = L.marker([college.lat, college.lng]);
    markers.addLayer(marker);
});

map.addLayer(markers);
```

---

## 🎭 Système de modals {#modals}

### Architecture

**Fichiers** :
- `js/modals.js` - Logique et données
- `css/modals.css` - Styles

### Données membres

**Structure** :

```javascript
const membersData = {
    'prenom-nom': {
        name: 'Prénom NOM',
        role: 'Fonction',
        email: 'prenom.nom@ac-rennes.fr',
        location: 'Vannes',
        photo: 'images/equipe/prenom-nom.png',
        missions: [
            'Mission 1',
            'Mission 2',
            'Mission 3',
            'Mission 4'
        ],
        description: 'Présentation détaillée du membre, son parcours, ses compétences, etc.'
    }
};
```

### Création dynamique de modal

**Fonction principale** :

```javascript
function createMemberModal(memberId) {
    const member = membersData[memberId];
    
    if (!member) {
        console.error('Membre non trouvé:', memberId);
        return;
    }
    
    // Créer la modal si elle n'existe pas
    let modal = document.getElementById('memberModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'memberModal';
        modal.className = 'member-modal';
        document.body.appendChild(modal);
    }
    
    // Construire le HTML
    const missionsHTML = member.missions.map(mission => 
        `<li class="mission-item">✓ ${mission}</li>`
    ).join('');
    
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Fermer">✕</button>
            
            <div class="modal-header">
                <img src="${member.photo}" alt="${member.name}" class="modal-photo">
                <div class="modal-header-info">
                    <h3 class="modal-name">${member.name}</h3>
                    <p class="modal-role">${member.role}</p>
                    <div class="modal-contact-info">
                        <p class="modal-contact">📧 ${member.email}</p>
                        <p class="modal-contact">📍 ${member.location}</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <h4 class="modal-section-title">Présentation</h4>
                    <p class="modal-description">${member.description}</p>
                </div>
                
                <div class="modal-section">
                    <h4 class="modal-section-title">Missions principales</h4>
                    <ul class="missions-list">
                        ${missionsHTML}
                    </ul>
                </div>
            </div>
        </div>
    `;