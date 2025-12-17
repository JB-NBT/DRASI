# Site Web DRASI - Académie de Rennes

**Site web institutionnel de la Direction Régionale Académique des Systèmes d'Information (DRASI) de proximité du Morbihan**

---

## Présentation

Site vitrine moderne présentant l'équipe DRASI, ses missions, son périmètre d'intervention et ses services dans le Morbihan.

### Caractéristiques principales

- **100% statique** - Aucune base de données requise
- **Responsive** - Optimisé mobile, tablette, desktop
- **RGPD compliant** - Bandeau cookies et analytics anonymes
- **Accessible** - Conforme aux standards d'accessibilité
- **Performant** - Chargement rapide, optimisé SEO

---

## Installation rapide

### Prérequis
- Serveur web (Apache/Nginx)
- Accès FTP ou gestionnaire de fichiers
- Pas de base de données nécessaire

### Étapes
1. **Télécharger** les fichiers du projet
2. **Configurer** les images (logo, photos équipe)
3. **Uploader** via FTP en conservant l'arborescence
4. **Tester** sur votre domaine

**Guide complet** : Voir `docs/GUIDE_MISE_A_JOUR.md`

---

## Structure du projet

```
site-drasi/
├── index.html                    # Accueil
├── histoire.html                 # Timeline historique
├── equipes.html                  # Portfolio équipe avec modals
├── missions.html                 # Missions et activités
├── perimetre.html                # Cartes Leaflet interactives
├── comitologie.html              # Organisation et gouvernance
├── services_opérés.html          # Services déployés
├── contact.html                  # Formulaire de contact
├── admin-analytics.html          # Dashboard statistiques 📊
│
├── css/                          # Feuilles de style
│   ├── common.css               # Styles communs (header, footer)
│   ├── [page].css               # Styles spécifiques par page
│   └── cookies.css              # Bandeau cookies RGPD
│
├── js/                          # Scripts JavaScript
│   ├── main.js                  # Script principal
│   ├── cookies.js               # Gestion cookies & analytics
│   ├── maps.js                  # Cartes Leaflet (90 structures)
│   └── modals.js                # Modals membres équipe
│
├── images/
│   ├── logo-acad.png            # Logo académie
│   └── equipe/                  # Photos membres (400x400px)
│
├── components/                   # Composants réutilisables
│   ├── header.html              # Header chargé dynamiquement
│   ├── footer.html              # Footer chargé dynamiquement
│   └── cookie-banner.html       # Bandeau cookies
│
└── docs/                        # Documentation
    ├── GUIDE_MISE_A_JOUR.md     # Guide utilisateur
    └── GUIDE_TECHNIQUE.md       # Documentation technique
```

---

## Fonctionnalités

### 1. Système de cookies RGPD
- Bandeau de consentement au premier chargement
- Analytics anonymes (pas d'IP, pas de tracking)
- Modal de personnalisation des préférences
- Dashboard admin avec export CSV/JSON

### 2. Cartes interactives Leaflet
- **Carte EPLE** : 65 établissements (collèges, lycées, GRETA)
- **Carte Services** : 26 services académiques (IEN, CIO, CMS, etc.)
- Markers personnalisés par type
- Popups informatives

### 3. Portfolio équipe
- 8 membres avec fiches détaillées
- Modals interactives au clic
- Photos professionnelles
- Missions et coordonnées

### 4. Timeline historique
- Évolution 2018-2025
- Animation au scroll
- Design moderne et engageant

### 5. Formulaire de contact
- Validation côté client
- Protection anti-spam (reCAPTCHA - optionnel)
- Champs RGPD obligatoires

---

### Technologies utilisées

| Technologie          | Usage                            |
|----------------------|----------------------------------|
| **HTML5**            | Structure sémantique             |
| **CSS3**             | Styles, animations, responsive   |
| **JavaScript ES6+**  | Interactivité (Vanilla JS)       |
| **PHP**              | Envoye de mail                   |
| **Leaflet 1.7.1**    | Cartes interactives              |
| **localStorage**     | Stockage local cookies/analytics |

**Pas de framework** - Site léger et performant

---

## Dashboard Analytics

**URL** : `admin-analytics.html`

### Fonctionnalités
- Statistiques de fréquentation
- Pages les plus visitées
- Temps moyen par page
- Export CSV/JSON
- Gestion des données

### Sécurisation
Par défaut, le dashboard est public. Pour le protéger :
- Renommer le fichier
- Ajouter authentification .htaccess
- Restreindre par IP

**Documentation** : Voir `docs/GUIDE_TECHNIQUE.md#analytics`

---

## Modifications courantes

### Changer les statistiques (page d'accueil)
**Fichier** : `index.html`
```html
<div class="stat-number">8</div>
<div class="stat-label">Membres de l'équipe</div>
```

### Ajouter un membre d'équipe
1. Photo 400x400px → `images/equipe/prenom-nom.png`
2. Ajouter dans `equipes.html` (copier un bloc existant)
3. Ajouter données dans `js/modals.js`

### Modifier les contacts
**Fichier** : `contact.html`
```html
<p class="card-text">
    Standard : 02 XX XX XX XX
</p>
```

**Guide complet** : `docs/GUIDE_MISE_A_JOUR.md`

---

## 🍪 Conformité RGPD

### Données collectées (si accepté)
- Pages visitées (URL)
- Temps passé sur chaque page
- Provenance (site référent anonyme)
- Session (ID anonymisé)

### Ce qui N'EST PAS collecté
- ❌ Adresse IP
- ❌ Nom ou email
- ❌ Cookies tiers
- ❌ Tracking cross-site

### Durée de conservation
- Consentement : 365 jours
- Analytics : 395 jours (13 mois CNIL)

---

## Sécurité

### Bonnes pratiques appliquées
- ✅ Pas de base de données (pas d'injection SQL)
- ✅ Pas de code serveur (pas de faille PHP)
- ✅ Cookies sécurisés
- ✅ Validation formulaires côté client

### À faire côté serveur
- Utiliser HTTPS (certificat SSL)
- Configurer en-têtes de sécurité
- Sauvegardes régulières

---

## 📱 Responsive Design

### Points de rupture
- 🖥️ **Desktop** : > 1024px
- 📱 **Tablette** : 768px - 1024px
- 📱 **Mobile** : < 768px
- 📱 **Petit mobile** : < 480px

Testé sur Chrome, Firefox, Safari, Edge

---

## Support

### Problèmes fréquents

**Les images ne s'affichent pas**
- Vérifier le chemin exact
- Vérifier majuscules/minuscules
- Vider le cache (Ctrl+F5)

**Menu mobile ne fonctionne pas**
- Vérifier que `js/main.js` est chargé
- Vider le cache navigateur

**Modifications invisibles**
- Forcer rechargement : Ctrl+Shift+R
- Attendre propagation cache serveur

### Contacts
- **Responsable** : Hafid MOKADEM - hafid.mokadem@ac-rennes.fr
- **Adjoint** : Vincent BENARD - vincent.benard@ac-rennes.fr

---

## Documentation

| Document                    | Description                                |
|-----------------------------|--------------------------------------------|
| **GUIDE_MISE_A_JOUR.md**    | Guide utilisateur pour modifier le contenu |
| **GUIDE_TECHNIQUE.md**      | Documentation technique pour développeurs  |
| **Guide reCAPTCHA**         | Installation du système anti-spam          |

---

## Changelog

### Version 2.0 (Décembre 2025)
- ✨ Système cookies RGPD complet
- 📊 Dashboard analytics
- 💾 Export CSV/JSON
- 🍪 Bandeau consentement moderne
- 📱 Responsive optimisé
- 🗺️ Cartes Leaflet (90 structures)
- 👥 Portfolio équipe avec modals
- 📖 Timeline historique

---

## Licence

© 2025 Académie de Rennes - Direction Régionale Académique des Systèmes d'Information

**Usage interne Éducation Nationale**

---

## Roadmap

### Prochaines fonctionnalités
- [ ] Mode sombre
- [ ] Agenda événements

---

**Questions ? Contactez l'équipe DRASI Vannes**

**Site** : [À compléter avec votre URL]

---

*Dernière mise à jour : Décembre 2025 | Version 2.0*