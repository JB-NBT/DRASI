# Guide Technique - Site DRASI

**Documentation technique complète pour développeurs et administrateurs système**

---

## Table des matières

1. [Architecture technique](#architecture)
2. [Stack technologique](#stack)
3. [Structure des fichiers](#structure)
4. [Système de styles CSS](#css)
5. [JavaScript et interactivité](#javascript)
6. [Système de cookies RGPD](#cookies)
7. [Cartes Leaflet](#leaflet)
8. [Dashboard Analytics](#analytics)
9. [Cas pratiques](#cas-pratiques)
10. [Performance et optimisation](#performance)
11. [Sécurité](#securite)
12. [Déploiement](#deploiement)

---

## Architecture technique {#architecture}

### Vue d'ensemble

Le site est une **application web statique** construite avec des technologies natives :
- HTML5 sémantique
- CSS3 avec variables CSS (Custom Properties)
- JavaScript Vanilla ES6+ (pas de framework)
- Leaflet 1.7.1 pour les cartes interactives

### Principes de conception

**1. Simplicité**
- Pas de framework lourd (React, Vue, Angular)
- Pas de build system (Webpack, Vite, Parcel)
- Déploiement direct sur n'importe quel serveur web

**2. Modularité**
- Composants réutilisables (header, footer, cookies)
- Séparation CSS par fonctionnalité
- Scripts JavaScript organisés par domaine

**3. Performance**
- Chargement asynchrone des composants
- Pas de dépendances externes (sauf Leaflet)
- Code minifié en production (optionnel)

**4. Maintenabilité**
- Code commenté et structuré
- Variables CSS pour personnalisation rapide
- Convention de nommage cohérente

### Diagramme d'architecture

```
┌─────────────────────────────────────────┐
│         Navigateur (Client)             │
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌───────┐  │
│  │   HTML   │  │   CSS    │  │  JS   │  │
│  └──────────┘  └──────────┘  └───────┘  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │   localStorage / sessionStorage │    │
│  │  (cookies, analytics, session)  │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
              ▲
              │ HTTP/HTTPS
              ▼
┌─────────────────────────────────────────┐
│       Serveur Web (Apache/Nginx)        │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │   Fichiers statiques (.html,     │   │
│  │   .css, .js, images)             │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Stack technologique {#stack}

### Frontend

| Technologie       | Version   | Usage                                     |
|-------------------|-----------|-------------------------------------------|
| **HTML5**         | -         | Structure sémantique, accessibilité       |
| **CSS3**          | -         | Styles, animations, responsive design     |
| **JavaScript**    | ES6+      | Interactivité (Vanilla, pas de framework) |
| **PHP**           |           | Gestion envoye de mail                    |
| **Leaflet**       | 1.7.1     | Cartes interactives                       |

### APIs Browser

| API                       | Usage                         |
|---------------------------|-------------------------------|
| **localStorage**          | Stockage cookies, analytics   |
| **sessionStorage**        | Session utilisateur           |
| **fetch()**               | Chargement composants         |
| **IntersectionObserver**  | Animations au scroll          |

### Bibliothèques externes

**Leaflet.js** (Seule dépendance)
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
```

### Compatibilité navigateurs

| Navigateur | Version minimale | Support         |
|----------- |------------------|-----------------|
| Chrome     | 90+              | ✅ Complet      |
| Firefox    | 88+              | ✅ Complet      |
| Safari     | 14+              | ✅ Complet      |
| Edge       | 90+              | ✅ Complet      |
| IE 11      | -                | ❌ Non supporté |

---

## Structure des fichiers {#structure}

### Arborescence détaillée

```
site-drasi/
│
├── 📄 Pages HTML (racine)
│   ├── index.html                    # Page d'accueil
│   ├── histoire.html                 # Timeline historique
│   ├── equipes.html                  # Portfolio équipe
│   ├── missions.html                 # Missions et activités
│   ├── perimetre.html                # Cartes Leaflet
│   ├── comitologie.html              # Organisation
│   ├── services_opérés.html          # Services déployés
│   ├── contact.html                  # Formulaire contact
│
├── 📁 css/
│   ├── common.css                    # Styles communs (header, footer, base)
│   ├── index.css                     # Styles page d'accueil
│   ├── histoire.css                  # Styles timeline
│   ├── equipe.css                    # Styles portfolio + modals
│   ├── missions.css                  # Styles page missions
│   ├── services.css                  # Styles services opérés
│   ├── comitologie.css               # Styles comitologie
│   ├── perimetre.css                 # Styles cartes Leaflet
│   ├── contact.css                   # Styles formulaire
│   └── cookies.css                   # Styles bandeau cookies RGPD
│
├── 📁 js/
│   ├── main.js                       # Script principal (menu, nav, scroll)
│   ├── cookies.js                    # Gestion cookies RGPD + analytics
│   ├── maps.js                       # Cartes Leaflet (90 structures)
│   └── modals.js                     # Modals membres équipe
│
├── 📁 images/
│   ├── logo-acad.png                 # Logo académie (500x500px)
│   ├── GAR.png                       # Logo GAR
│   └── 📁 equipe/
│       ├── hafid-mokadem.png         # Photos membres (400x400px)
│       ├── vincent-benard.png
│       └── ...
│
├── 📁 components/
│   ├── header.html                   # Header réutilisable
│   ├── footer.html                   # Footer réutilisable
│   └── cookie-banner.html            # Bandeau cookies RGPD
│
└── 📁 docs/
    ├── README.md                     # Documentation principale
    ├── GUIDE_MISE_A_JOUR.md          # Guide utilisateur
    ├── GUIDE_TECHNIQUE.md            # Ce fichier
    └── Guide_reCAPTCHA.pdf           # Installation anti-spam
```

### Conventions de nommage

**HTML** : `kebab-case`
```
index.html
services-operes.html
admin-analytics.html
```

**CSS** :
```css
/* Classes */
.hero-section { }
.member-card { }

/* IDs */
#menuToggle { }
#cookieBanner { }

/* Variables */
--bleu-france: #228BCC;
--spacing-lg: 40px;
```

**JavaScript** :
```javascript
/* Variables */
const memberData = {};
let isVisible = false;

/* Fonctions */
function initMenu() { }
function showBanner() { }

/* Classes */
class Analytics { }
class CookieConsent { }

/* Constantes */
const COOKIE_CONFIG = {};
const API_URL = '';
```

**Fichiers images** : `kebab-case`
```
logo-academie.png
marie-dupont.png
```

---

## Système de styles CSS {#css}

### Variables CSS (Design Tokens)

**Fichier** : `css/common.css`

```css
:root {
    /* Couleurs - Charte graphique Académie */
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

**Ordre de chargement** :
```html
<link rel="stylesheet" href="css/common.css">      <!-- 1. Base -->
<link rel="stylesheet" href="css/[page].css">      <!-- 2. Page spécifique -->
<link rel="stylesheet" href="css/cookies.css">     <!-- 3. Modules -->
```

**Structure d'un fichier CSS** :
```css
/* 1. Variables spécifiques */
/* 2. Styles desktop */
/* 3. Responsive - Tablettes (max 1024px) */
/* 4. Responsive - Mobiles (max 768px) */
/* 5. Responsive - Petits mobiles (max 480px) */
```

### Responsive - Breakpoints

```css
/* Desktop (default) : > 1024px */
/* Pas de media query */

/* Tablettes : max 1024px */
@media screen and (max-width: 1024px) {
    /* 2 colonnes */
}

/* Mobiles : max 768px */
@media screen and (max-width: 768px) {
    /* 1 colonne, menu hamburger */
}

/* Petits mobiles : max 480px */
@media screen and (max-width: 480px) {
    /* Optimisations finales */
}
```

### Animations CSS

**Exemples utilisés** :

```css
/* Fade in */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Utilisation */
.cookie-banner.visible {
    display: flex;
    animation: fadeIn 0.3s ease;
}
```

---

## JavaScript et interactivité {#javascript}

### Architecture JavaScript

**main.js** - Script principal
```javascript
// 1. Chargement composants (header, footer, cookies)
// 2. Initialisation navigation
// 3. Menu hamburger
// 4. Formulaire contact
// 5. Animations scroll
// 6. Smooth scroll
// 7. Bouton retour haut
```

**Chargement des composants**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    
    // Charger bandeau cookies
    fetch('components/cookie-banner.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('cookie-banner-placeholder').innerHTML = data;
            if (window.initCookieSystem) {
                window.initCookieSystem();
            }
        });
    
    // Charger header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setTimeout(() => {
                initMenuToggle();
                setActiveNavLink();
            }, 100);
        });
});
```

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
    
    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Bloquer scroll si menu ouvert
        document.body.style.overflow = navMenu.classList.contains('active') 
            ? 'hidden' 
            : '';
    });
    
    // Fermer au clic sur lien
    navMenu.querySelectorAll('.nav-pill').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer au clic extérieur
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && 
            !menuToggle.contains(event.target) && 
            navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
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
    const elements = document.querySelectorAll('.card, .member-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
```

---

## 🍪 Système de cookies RGPD {#cookies}

### Architecture

**3 fichiers** :
- `js/cookies.js` - Logique métier
- `css/cookies.css` - Styles bandeau + modal
- `components/cookie-banner.html` - Structure HTML

### Configuration

```javascript
const COOKIE_CONFIG = {
    consentName: 'drasi_cookie_consent',    // Nom cookie consentement
    analyticsName: 'drasi_analytics',       // Nom données analytics
    consentDuration: 365,                   // 1 an
    analyticsDuration: 395,                 // 13 mois (CNIL)
    sessionName: 'drasi_session'            // ID session
};
```

### Classe Analytics

**Collecte anonyme** :

```javascript
class Analytics {
    constructor() {
        this.sessionId = this.getOrCreateSession();
        this.startTime = Date.now();
        this.enabled = false;
    }
    
    // Génère ID session unique
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + 
               Math.random().toString(36).substr(2, 9);
    }
    
    // Enregistre page vue
    trackPageView() {
        if (!this.enabled) return;
        
        const pageData = {
            url: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            referrer: document.referrer || 'direct'
        };
        
        this.saveToStorage(pageData);
    }
    
    // Enregistre temps passé
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
    
    // Sauvegarde dans localStorage
    saveToStorage(data, type = 'pageview') {
        try {
            let analyticsData = JSON.parse(
                localStorage.getItem(COOKIE_CONFIG.analyticsName) || 
                '{"pageviews": [], "time": []}'
            );
            
            if (type === 'time') {
                analyticsData.time.push(data);
            } else {
                analyticsData.pageviews.push(data);
            }
            
            // Garder seulement 100 dernières entrées
            if (analyticsData.pageviews.length > 100) {
                analyticsData.pageviews = analyticsData.pageviews.slice(-100);
            }
            
            localStorage.setItem(
                COOKIE_CONFIG.analyticsName, 
                JSON.stringify(analyticsData)
            );
        } catch (e) {
            console.error('Erreur sauvegarde analytics:', e);
        }
    }
}
```

### Classe CookieConsent

**Gestion du bandeau** :

```javascript
class CookieConsent {
    init() {
        this.waitForElements().then(() => {
            this.banner = document.getElementById('cookieBanner');
            this.modal = document.getElementById('cookieModal');
            
            this.attachEventListeners();
            this.checkConsent();
        });
    }
    
    checkConsent() {
        const consent = this.getConsent();
        
        if (consent === null) {
            // Pas de consentement → afficher bandeau
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
            expires: new Date(
                Date.now() + COOKIE_CONFIG.consentDuration * 24 * 60 * 60 * 1000
            ).toISOString()
        };
        
        localStorage.setItem(
            COOKIE_CONFIG.consentName, 
            JSON.stringify(consent)
        );
        
        if (consent.analytics) {
            analytics.enable();
        } else {
            analytics.disable();
        }
    }
}
```

---

## Cartes Leaflet {#leaflet}

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
    // ...
];

// Lycées (21)
const lycees = [
    {nom: "Charles de Gaulle", commune: "Vannes", lat: 47.67633, lng: -2.77259},
    // ...
];

// GRETA (3)
const gretas = [
    {nom: "GRETA-CFA Bretagne Sud", commune: "Lorient", lat: 47.74590, lng: -3.38103},
    // ...
];
```

### Initialisation carte EPLE

```javascript
function initMapEPLE() {
    // Créer carte centrée sur Morbihan
    const map = L.map('map-eple').setView([47.85, -2.85], 9);

    // Fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Légende
    const legend = L.control({position: 'topright'});
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <div class="legend-title">Établissements du Morbihan</div>
            <div class="legend-item">
                <div class="legend-color lycee"></div>
                <span>Lycées (${lycees.length})</span>
            </div>
            <!-- ... -->
        `;
        return div;
    };
    legend.addTo(map);

    // Ajouter les collèges
    colleges.forEach(college => {
        L.circleMarker([college.lat, college.lng], {
            color: '#000080',
            fillColor: '#000091',
            fillOpacity: 0.8,
            radius: 7,
            weight: 2
        })
        .bindPopup(`<b>Collège ${college.nom}</b><br>${college.commune}`)
        .addTo(map);
    });
}
```

---

## Dashboard Analytics {#analytics}

### Fichier : `admin-analytics.html`

### Fonctionnalités

**1. Statistiques principales**
```javascript
// Récupérer données
const data = JSON.parse(localStorage.getItem('drasi_analytics'));

// Calculer stats
const stats = {
    totalPageviews: data.pageviews.length,
    totalSessions: new Set(data.pageviews.map(p => p.sessionId)).size,
    averageTime: calculateAverageTime(data.time),
    mostVisitedPages: getMostVisitedPages(data.pageviews)
};
```

**2. Export CSV**
```javascript
function exportCSV() {
    const data = Analytics.getStats();
    let csv = 'Type,Date,Page,SessionID,Referrer,TimeSpent\n';
    
    data.data.pageviews.forEach(pv => {
        csv += `pageview,${pv.timestamp},${pv.url},${pv.sessionId},${pv.referrer},-\n`;
    });
    
    data.data.time.forEach(t => {
        csv += `time,${t.timestamp},${t.url},${t.sessionId},-,${t.timeSpent}\n`;
    });
    
    // Télécharger
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}
```

**3. Export JSON**
```javascript
function exportJSON() {
    const stats = Analytics.getStats();
    const json = JSON.stringify(stats, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}
```

---

## Cas pratiques {#cas-pratiques}

### CAS PRATIQUE 1 : Installation du système de cookies

[Voir guide détaillé sur l'installation complète]

**Fichiers concernés** :
- `components/cookie-banner.html`
- `js/cookies.js`
- `css/cookies.css`

**Étapes** :
1. Créer le fichier HTML du bandeau
2. Intégrer le script JavaScript
3. Ajouter les styles CSS
4. Initialiser dans main.js
5. Tester le consentement

---

### CAS PRATIQUE 2 : Ajouter une nouvelle carte Leaflet

**Objectif** : Créer une carte des services de restauration scolaire

**Étape 1 : Créer les données**

```javascript
// Fichier: js/maps.js
const restaurants = [
    {nom: "Restaurant Collège Jules-Simon", commune: "Vannes", lat: 47.65880, lng: -2.76106},
    {nom: "Restaurant Lycée Charles de Gaulle", commune: "Vannes", lat: 47.67633, lng: -2.77259},
    // ... autres restaurants
];
```

**Étape 2 : Créer la fonction d'initialisation**

```javascript
function initMapRestaurants() {
    // Créer la carte
    const map = L.map('map-restaurants').setView([47.85, -2.85], 9);

    // Ajouter fond de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    }).addTo(map);

    // Ajouter les restaurants
    restaurants.forEach(resto => {
        L.circleMarker([resto.lat, resto.lng], {
            color: '#FF8C00',
            fillColor: '#FFA500',
            fillOpacity: 0.8,
            radius: 8,
            weight: 2
        })
        .bindPopup(`<b>${resto.nom}</b><br>${resto.commune}`)
        .addTo(map);
    });
}
```

**Étape 3 : Créer la page HTML**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Restauration Scolaire - DRASI</title>
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/perimetre.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
</head>
<body>
    <div id="header-placeholder"></div>
    
    <section class="page-intro">
        <div class="container">
            <h2 class="section-title">Restauration Scolaire</h2>
        </div>
    </section>

    <section class="map-section">
        <div class="container">
            <h3 class="map-title">Services de Restauration</h3>
            <div class="map-container">
                <div id="map-restaurants" class="leaflet-map"></div>
            </div>
        </div>
    </section>

    <div id="footer-placeholder"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
    <script src="js/main.js"></script>
    <script src="js/maps.js"></script>
</body>
</html>
```

**Étape 4 : Initialiser au chargement**

```javascript
// Dans maps.js
window.addEventListener('load', function() {
    if (document.getElementById('map-restaurants')) {
        initMapRestaurants();
    }
});
```

---

### CAS PRATIQUE 3 : Personnaliser le dashboard analytics

**Objectif** : Ajouter un graphique des visites par jour

**Étape 1 : Installer Chart.js**

```html
<!-- Dans admin-analytics.html -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

**Étape 2 : Créer l'élément canvas**

```html
<section class="chart-section">
    <div class="container">
        <h3>Visites par jour</h3>
        <canvas id="visitsChart"></canvas>
    </div>
</section>
```

**Étape 3 : Préparer les données**

```javascript
function getVisitsByDay() {
    const data = JSON.parse(localStorage.getItem('drasi_analytics'));
    const visitsByDay = {};
    
    data.pageviews.forEach(pv => {
        const date = pv.timestamp.split('T')[0]; // Format: YYYY-MM-DD
        visitsByDay[date] = (visitsByDay[date] || 0) + 1;
    });
    
    // Convertir en tableau
    const labels = Object.keys(visitsByDay).sort();
    const values = labels.map(date => visitsByDay[date]);
    
    return { labels, values };
}
```

**Étape 4 : Créer le graphique**

```javascript
function createVisitsChart() {
    const { labels, values } = getVisitsByDay();
    
    const ctx = document.getElementById('visitsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Visites',
                data: values,
                borderColor: '#228BCC',
                backgroundColor: 'rgba(34, 139, 204, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Évolution des visites'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Appeler au chargement
window.addEventListener('load', createVisitsChart);
```

---

### CAS PRATIQUE 4 : Sécuriser le dashboard analytics

**Méthode 1 : Renommer le fichier**

```bash
# Au lieu de admin-analytics.html
admin-stats-x8k2m9p3.html
```

**Méthode 2 : Protection .htaccess (Apache)**

```apache
# Créer un fichier .htaccess dans le dossier racine
<Files "admin-analytics.html">
    AuthType Basic
    AuthName "Zone réservée"
    AuthUserFile /chemin/absolu/.htpasswd
    Require valid-user
</Files>
```

**Créer le fichier .htpasswd** :
```bash
# Ligne de commande
htpasswd -c .htpasswd admin

# Ou en ligne sur : https://htpasswdgenerator.net/
```

**Méthode 3 : Restriction par IP**

```apache
<Files "admin-analytics.html">
    Order Deny,Allow
    Deny from all
    Allow from 192.168.1.100
    Allow from 10.0.0.0/8
</Files>
```

---

### CAS PRATIQUE 5 : Migration vers HTTPS

**Prérequis** :
- Nom de domaine configuré
- Accès au serveur

**Étape 1 : Obtenir un certificat SSL**

**Option A - Let's Encrypt (Gratuit)** :
```bash
# Installer Certbot
sudo apt-get install certbot python3-certbot-apache

# Obtenir certificat
sudo certbot --apache -d drasi.ac-rennes.fr
```

**Option B - Certificat payant** :
- Acheter auprès d'un fournisseur
- Suivre instructions d'installation

**Étape 2 : Configurer Apache**

```apache
# /etc/apache2/sites-available/drasi-ssl.conf
<VirtualHost *:443>
    ServerName drasi.ac-rennes.fr
    DocumentRoot /var/www/drasi

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/drasi.ac-rennes.fr/cert.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/drasi.ac-rennes.fr/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/drasi.ac-rennes.fr/chain.pem

    # Headers de sécurité
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>
```

**Étape 3 : Rediriger HTTP vers HTTPS**

```apache
# /etc/apache2/sites-available/drasi.conf
<VirtualHost *:80>
    ServerName drasi.ac-rennes.fr
    Redirect permanent / https://drasi.ac-rennes.fr/
</VirtualHost>
```

**Étape 4 : Activer et redémarrer**

```bash
# Activer les modules
sudo a2enmod ssl
sudo a2enmod headers

# Activer les sites
sudo a2ensite drasi-ssl
sudo a2ensite drasi

# Redémarrer Apache
sudo systemctl restart apache2
```

**Étape 5 : Tester**

- Accéder à http://drasi.ac-rennes.fr → doit rediriger vers HTTPS
- Vérifier le cadenas dans le navigateur
- Tester sur : https://www.ssllabs.com/ssltest/

---

## Performance et optimisation {#performance}

### Analyse des performances

**1. Google PageSpeed Insights**
- URL : https://pagespeed.web.dev/
- Objectif : Score > 90

**2. GTmetrix**
- URL : https://gtmetrix.com/
- Analyser temps de chargement

### Optimisations recommandées

**1. Images**
```bash
# Compresser avec TinyPNG
# Avant : 2 Mo → Après : 200 Ko

# Utiliser WebP avec fallback
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description">
</picture>
```

**2. CSS**
```bash
# Minifier en production
cssnano style.css -o style.min.css

# Purger CSS inutilisé
purgecss --css style.css --content *.html --output style-purged.css
```

**3. JavaScript**
```bash
# Minifier avec Terser
terser main.js -o main.min.js -c -m
```

**4. Cache navigateur**
```apache
# .htaccess
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

**5. Compression Gzip**
```apache
# .htaccess
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## Sécurité {#securite}

### En-têtes de sécurité

**.htaccess (Apache)** :
```apache
# Bloquer l'accès aux fichiers sensibles
<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|inc|bak)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Headers de sécurité
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# HTTPS strict (après migration SSL)
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

### Protection formulaire

**1. Validation côté client**
```javascript
// Déjà implémenté dans main.js
if (!formData.nom || !formData.email) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(formData.email)) {
    alert('Email invalide');
    return;
}
```

**2. reCAPTCHA (optionnel)**
- Voir : `docs/Guide_reCAPTCHA.pdf`

### Sauvegardes

**Script de sauvegarde** :
```bash
#!/bin/bash
# backup-site.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/drasi"
SITE_DIR="/var/www/drasi"

# Créer archive
tar -czf $BACKUP_DIR/site_$DATE.tar.gz $SITE_DIR

# Garder seulement 30 derniers jours
find $BACKUP_DIR -name "site_*.tar.gz" -mtime +30 -delete

echo "Sauvegarde créée : site_$DATE.tar.gz"
```

**Cron job (quotidien à 2h)** :
```bash
crontab -e
# Ajouter :
0 2 * * * /opt/scripts/backup-site.sh
```

---

## Déploiement {#deploiement}

### Checklist pré-déploiement

```
□ Toutes les images optimisées (< 200 Ko)
□ Liens testés (aucun lien mort)
□ Formulaires testés
□ Cartes Leaflet fonctionnelles
□ Analytics initialisés
□ Bandeau cookies opérationnel
□ Tests responsive (mobile, tablette, desktop)
□ Tests multi-navigateurs (Chrome, Firefox, Safari)
□ Validation HTML (validator.w3.org)
□ Validation CSS (jigsaw.w3.org/css-validator)
□ Vérification accessibilité
□ Certificat SSL installé (si HTTPS)
□ Headers de sécurité configurés
□ Sauvegardes configurées
```

### Déploiement via FTP

**1. Préparer les fichiers**
```bash
# Structure à uploader
site-drasi/
├── *.html
├── css/
├── js/
├── images/
├── components/
└── .htaccess (si Apache)
```

**2. Connexion FTP**
```
Hôte : ftp.votre-serveur.fr
Port : 21 (ou 990 pour FTPS)
Utilisateur : votre_login
Mot de passe : ********
```

**3. Upload**
- Transférer tous les fichiers
- Conserver l'arborescence
- Mode : Binaire pour images, Auto pour le reste

**4. Permissions**
```
Dossiers : 755
Fichiers : 644
```

### Déploiement via SSH/SFTP

```bash
# Connexion SSH
ssh user@server.fr

# Naviguer vers dossier web
cd /var/www/html

# Cloner depuis dépôt Git (si applicable)
git clone https://github.com/votre-repo/site-drasi.git

# Ou copier via SCP
scp -r /local/site-drasi/* user@server.fr:/var/www/html/
```

### Vérifications post-déploiement

```bash
# 1. Vérifier URL principale
curl -I https://drasi.ac-rennes.fr

# 2. Tester redirection HTTP → HTTPS
curl -I http://drasi.ac-rennes.fr

# 3. Vérifier headers de sécurité
curl -I https://drasi.ac-rennes.fr | grep -E "X-|Strict"

# 4. Tester chargement pages
for page in index.html equipes.html contact.html; do
    echo "Test $page..."
    curl -s -o /dev/null -w "%{http_code}" https://drasi.ac-rennes.fr/$page
done
```

---

## Support et maintenance

### Contacts techniques

**Responsable technique** :
- Hafid MOKADEM - hafid.mokadem@ac-rennes.fr

**Adjoint technique** :
- Vincent BENARD - vincent.benard@ac-rennes.fr

### Ressources

**Documentation** :
- MDN Web Docs : https://developer.mozilla.org/fr/
- Leaflet Docs : https://leafletjs.com/reference.html
- CNIL Cookies : https://www.cnil.fr/fr/cookies-et-autres-traceurs

**Outils** :
- W3C Validator : https://validator.w3.org/
- PageSpeed : https://pagespeed.web.dev/
- SSL Test : https://www.ssllabs.com/ssltest/

---

## 📝 Changelog

**Version 2.0** (Décembre 2025)
- ✨ Système cookies RGPD complet
- 📊 Dashboard analytics
- 💾 Export CSV/JSON
- 🔒 Headers sécurité
- 📱 Responsive optimisé

**Version 2.0** (Décembre 2025/Janvier 2026)
- Lancement initial

---

**Questions techniques ? Contactez l'équipe DRASI**

*Version 2.0 - Décembre 2025*