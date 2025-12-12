# 📝 Guide de Mise à Jour - Site DRASI Vannes

**Guide complet pour mettre à jour le contenu du site sans connaissances techniques**

---

## 📋 Sommaire

1. [Introduction](#introduction)
2. [Outils nécessaires](#outils)
3. [Workflow de modification](#workflow)
4. [Modifications courantes](#modifications)
5. [Ajouter un membre d'équipe](#membre)
6. [Modifier les cartes](#cartes)
7. [Gérer les actualités](#actualites)
8. [Bonnes pratiques](#bonnes-pratiques)

---

## 🎯 Introduction {#introduction}

Ce guide vous explique **pas à pas** comment mettre à jour le contenu du site, même si vous n'avez aucune expérience en développement web.

### Principe "Facile de MAJ"

Le site a été conçu pour être **facilement modifiable** :
- ✅ Fichiers HTML simples à éditer
- ✅ Pas de base de données
- ✅ Modifications immédiates après upload
- ✅ Structure claire et commentée

### Quoi modifier ?

Vous pouvez modifier :
- 📝 Textes (titres, paragraphes, descriptions)
- 🖼️ Images (photos membres, logo)
- 📊 Statistiques (chiffres page d'accueil)
- 📰 Actualités
- 👥 Membres de l'équipe
- 📍 Établissements sur les cartes

---

## 🛠️ Outils nécessaires {#outils}

### 1. Éditeur de texte

**Recommandé** :
- [Visual Studio Code](https://code.visualstudio.com/) (gratuit, Windows/Mac/Linux)
- [Notepad++](https://notepad-plus-plus.org/) (gratuit, Windows)
- [Sublime Text](https://www.sublimetext.com/) (gratuit, tous systèmes)

**À éviter** :
- ❌ Microsoft Word (modifie le formatage)
- ❌ Bloc-notes Windows (risque d'encodage)

### 2. Client FTP

**Recommandé** :
- [FileZilla](https://filezilla-project.org/) (gratuit, simple)
- [WinSCP](https://winscp.net/) (gratuit, Windows)

**Alternative** :
- Gestionnaire de fichiers de l'hébergeur (via navigateur)

### 3. Éditeur d'images (optionnel)

**En ligne (gratuit)** :
- [Photopea](https://www.photopea.com/) - Similaire à Photoshop
- [Remove.bg](https://www.remove.bg/) - Supprimer l'arrière-plan
- [TinyPNG](https://tinypng.com/) - Compresser les images

**Desktop** :
- GIMP (gratuit)
- Paint.NET (gratuit, Windows)
- Photoshop (payant)

---

## 🔄 Workflow de modification {#workflow}

### Étapes standards (à suivre à chaque fois)

```
1. SAUVEGARDE
   └─> Télécharger le fichier original via FTP
   └─> Faire une copie locale (backup)

2. MODIFICATION
   └─> Ouvrir avec éditeur de texte
   └─> Effectuer les changements
   └─> Sauvegarder le fichier

3. TEST LOCAL (optionnel mais recommandé)
   └─> Ouvrir le fichier HTML dans un navigateur
   └─> Vérifier que tout s'affiche correctement

4. UPLOAD
   └─> Se connecter au serveur via FTP
   └─> Uploader le fichier modifié
   └─> Écraser l'ancien fichier

5. VÉRIFICATION
   └─> Actualiser la page web (Ctrl+F5)
   └─> Vérifier que les modifications apparaissent
   └─> Tester sur mobile si possible
```

### ⚠️ Règles d'or

- ✅ **TOUJOURS** faire une sauvegarde avant modification
- ✅ Modifier **UN SEUL fichier** à la fois
- ✅ Tester après chaque modification
- ✅ Vider le cache du navigateur (Ctrl+F5)
- ❌ **JAMAIS** modifier plusieurs fichiers sans tester
- ❌ **JAMAIS** supprimer des balises HTML si vous ne savez pas ce qu'elles font

---

## ✏️ Modifications courantes {#modifications}

### 1. Modifier les statistiques de la page d'accueil

**Fichier** : `index.html`

**Cherchez cette section** :

```html
<div class="hero-right">
    <div class="stat-box">
        <div class="stat-number">8</div>
        <div class="stat-label">Membres de l'équipe</div>
    </div>
    <div class="stat-box">
        <div class="stat-number">64</div>
        <div class="stat-label">Établissements suivis</div>
    </div>
    <div class="stat-box">
        <div class="stat-number">26</div>
        <div class="stat-label">Services disponibles</div>
    </div>
</div>
```

**Modifier les chiffres** :

```html
<!-- AVANT -->
<div class="stat-number">8</div>

<!-- APRÈS (exemple : passer à 10 membres) -->
<div class="stat-number">10</div>
```

**Modifier les textes** :

```html
<!-- AVANT -->
<div class="stat-label">Membres de l'équipe</div>

<!-- APRÈS -->
<div class="stat-label">Agents DRASI</div>
```

### 2. Modifier le texte de présentation

**Fichier** : `index.html`

**Cherchez** :

```html
<div class="hero-left">
    <h2 class="hero-title">Une équipe engagée pour l'éducation</h2>
    <p class="hero-text">
        L'équipe académique de Vannes accompagne...
    </p>
</div>
```

**Modifiez le contenu entre les balises** :

```html
<h2 class="hero-title">Nouveau titre ici</h2>
<p class="hero-text">
    Nouveau texte de présentation sur plusieurs lignes
    si besoin. Respectez les balises HTML.
</p>
```

### 3. Modifier les informations de contact

**Fichier** : `contact.html`

**Cherchez** :

```html
<div class="card">
    <div class="card-icon">📞</div>
    <h3 class="card-title">Téléphone</h3>
    <p class="card-text">
        Standard : 02 XX XX XX XX<br>
        Fax : 02 XX XX XX XX
    </p>
</div>
```

**Remplacez les numéros** :

```html
<p class="card-text">
    Standard : 02 97 12 34 56<br>
    Fax : 02 97 12 34 57
</p>
```

**Email** :

```html
<!-- AVANT -->
<p class="card-text">
    Contact général :<br>
    vannes@ac-rennes.fr
</p>

<!-- APRÈS -->
<p class="card-text">
    Contact général :<br>
    drasi.vannes@ac-rennes.fr
</p>
```

### 4. Modifier les horaires d'ouverture

**Fichier** : `contact.html`

**Cherchez** :

```html
<table class="horaires-table">
    <tr>
        <td>Lundi - Vendredi</td>
        <td class="horaires-time">8h30 - 12h00 | 13h30 - 17h00</td>
    </tr>
    <tr>
        <td>Samedi - Dimanche</td>
        <td class="horaires-time">Fermé</td>
    </tr>
</table>
```

**Modifiez les horaires** :

```html
<td class="horaires-time">9h00 - 12h30 | 14h00 - 17h30</td>
```

---

## 👥 Ajouter un membre d'équipe {#membre}

### Étape 1 : Préparer la photo

**Spécifications** :
- Format : PNG ou JPG
- Dimensions : **400x400 pixels** (carré parfait)
- Fond : Neutre ou uniforme
- Qualité : Professionnelle
- Poids : < 200 Ko
- Nommage : `prenom-nom.png` (tout en minuscules, tirets)

**Exemple** :
- ✅ `marie-dupont.png`
- ❌ `Marie Dupont.PNG`
- ❌ `photo_marie.jpg`

**Retouche rapide** (si nécessaire) :
1. Ouvrir sur [Photopea](https://www.photopea.com/)
2. Recadrer en carré (400x400px)
3. Enlever l'arrière-plan sur [Remove.bg](https://www.remove.bg/)
4. Compresser sur [TinyPNG](https://tinypng.com/)
5. Exporter en PNG

**Upload** :
- Via FTP : placer dans `images/equipe/`
- Vérifier le nom exact du fichier

### Étape 2 : Ajouter les données de la modal

**Fichier** : `js/modals.js`

**Cherchez** :

```javascript
const membersData = {
    'hafid-mokadem': {
        name: 'Hafid MOKADEM',
        // ... données ...
    },
    // AJOUTEZ ICI
};
```

**Ajoutez un nouveau membre** :

```javascript
const membersData = {
    'hafid-mokadem': { ... },
    
    // 👇 NOUVEAU MEMBRE
    'marie-dupont': {
        name: 'Marie DUPONT',
        role: 'Chargée de mission',
        email: 'marie.dupont@ac-rennes.fr',
        location: 'Vannes',
        photo: 'images/equipe/marie-dupont.png',
        missions: [
            'Accompagnement pédagogique au numérique',
            'Formation des enseignants',
            'Développement de ressources',
            'Support technique établissements'
        ],
        description: 'Marie accompagne les établissements dans leurs projets numériques et forme les équipes pédagogiques aux outils innovants.'
    }
};
```

**⚠️ Important** :
- La clé (`'marie-dupont'`) doit correspondre **exactement** au nom du fichier photo (sans extension)
- Respectez la virgule `,` après chaque bloc
- Les missions sont entre `[ ]` et séparées par des virgules
- Les textes longs sont entre guillemets simples `'...'`

### Étape 3 : Ajouter la carte visuelle

**Fichier** : `equipes.html`

**Cherchez la section appropriée** (Direction, Vannes, ou Queven) :

```html
<section class="team-section">
    <div class="container">
        <h3 class="team-section-title">Équipe Vannes</h3>
        
        <div class="team-grid">
            <!-- Cartes existantes -->
            
            <!-- 👇 AJOUTEZ ICI -->
            
        </div>
    </div>
</section>
```

**Copiez-collez ce template** :

```html
<div class="member-card">
    <img src="images/equipe/marie-dupont.png" alt="Marie DUPONT" class="member-photo">
    <div class="member-info">
        <h4 class="member-name">Marie DUPONT</h4>
        <p class="member-role">Chargée de mission</p>
        <p class="member-contact">📧 marie.dupont@ac-rennes.fr</p>
        <p class="member-contact">📍 Vannes</p>
    </div>
</div>
```

**Modifiez** :
- `src="images/equipe/marie-dupont.png"` → votre fichier photo
- `alt="Marie DUPONT"` → nom complet
- `Marie DUPONT` → nom affiché
- `Chargée de mission` → fonction
- `marie.dupont@ac-rennes.fr` → email
- `Vannes` → localisation

### Étape 4 : Tester

1. Uploader les 2 fichiers modifiés :
   - `images/equipe/marie-dupont.png`
   - `js/modals.js`
   - `equipes.html`

2. Actualiser la page `equipes.html`

3. Vérifier :
   - ✅ La carte s'affiche
   - ✅ La photo est visible
   - ✅ Le clic ouvre la modal
   - ✅ Toutes les informations sont correctes

---

## 🗺️ Modifier les cartes {#cartes}

### Ajouter un établissement sur la carte

**Fichier** : `js/maps.js`

#### Pour un collège

**Cherchez** :

```javascript
const colleges = [
    {nom: "Jules-Simon", commune: "Vannes", lat: 47.65880, lng: -2.76106},
    // AJOUTEZ ICI
];
```

**Ajoutez** :

```javascript
const colleges = [
    {nom: "Jules-Simon", commune: "Vannes", lat: 47.65880, lng: -2.76106},
    {nom: "Nouveau Collège", commune: "Lorient", lat: 47.7500, lng: -3.3700},
];
```

#### Pour un lycée

```javascript
const lycees = [
    {nom: "Charles de Gaulle", commune: "Vannes", lat: 47.67633, lng: -2.77259},
    {nom: "Nouveau Lycée", commune: "Pontivy", lat: 48.0700, lng: -2.9700},
];
```

#### Trouver les coordonnées GPS

**Méthode 1 - Google Maps** :
1. Aller sur [Google Maps](https://www.google.com/maps)
2. Rechercher l'établissement
3. Clic droit sur le marker → "Plus d'infos sur cet endroit"
4. Copier les coordonnées affichées

**Méthode 2 - OpenStreetMap** :
1. Aller sur [OpenStreetMap](https://www.openstreetmap.org/)
2. Rechercher l'adresse
3. Clic droit → "Afficher l'adresse"
4. Noter latitude (lat) et longitude (lng)

**Format** :
```javascript
lat: 47.65880,  // Latitude (Nord/Sud)
lng: -2.76106   // Longitude (Est/Ouest)
```

#### Modifier un établissement existant

```javascript
// AVANT
{nom: "Collège Ancien Nom", commune: "Vannes", lat: 47.6588, lng: -2.7611},

// APRÈS
{nom: "Collège Nouveau Nom", commune: "Vannes", lat: 47.6588, lng: -2.7611},
```

#### Supprimer un établissement

```javascript
// Supprimez simplement la ligne complète
{nom: "Collège à Supprimer", commune: "Vannes", lat: 47.6588, lng: -2.7611}, // ← Supprimer
```

⚠️ **Attention** : Ne pas oublier la virgule `,` entre chaque élément (sauf le dernier)

### Mettre à jour les statistiques des cartes

Les totaux se mettent à jour **automatiquement** en fonction du nombre d'éléments dans chaque tableau.

Si vous voulez forcer un total différent :

**Fichier** : `perimetre.html`

```html
<!-- Cherchez -->
<div class="stat-number">41</div>
<div class="stat-label">Collèges publics</div>

<!-- Modifiez le chiffre -->
<div class="stat-number">42</div>
```

---

## 📰 Gérer les actualités {#actualites}

**Fichier** : `index.html`

### Ajouter une actualité

**Cherchez** :

```html
<div class="actualites-grid">
    <!-- Actualités existantes -->
</div>
```

**Template à copier-coller** :

```html
<article class="actualite-item">
    <div class="actualite-date">15 Janvier 2025</div>
    <h3 class="actualite-title">Titre de la nouvelle actualité</h3>
    <p class="actualite-excerpt">
        Description courte de l'actualité (2-3 phrases maximum).
        Soyez concis et informatif.
    </p>
</article>
```

**Exemple concret** :

```html
<article class="actualite-item">
    <div class="actualite-date">20 Décembre 2025</div>
    <h3 class="actualite-title">Formation au numérique éducatif</h3>
    <p class="actualite-excerpt">
        Une nouvelle session de formation sur les outils numériques 
        sera organisée en janvier pour tous les enseignants du secteur.
    </p>
</article>
```

### Modifier une actualité

```html
<!-- AVANT -->
<div class="actualite-date">10 Décembre 2025</div>
<h3 class="actualite-title">Ancien titre</h3>
<p class="actualite-excerpt">Ancien texte...</p>

<!-- APRÈS -->
<div class="actualite-date">15 Décembre 2025</div>
<h3 class="actualite-title">Nouveau titre</h3>
<p class="actualite-excerpt">Nouveau texte mis à jour...</p>
```

### Supprimer une actualité

Supprimez le bloc complet :

```html
<!-- 👇 Supprimez tout ce bloc -->
<article class="actualite-item">
    <div class="actualite-date">...</div>
    <h3 class="actualite-title">...</h3>
    <p class="actualite-excerpt">...</p>
</article>
<!-- 👆 Jusqu'ici -->
```

### Bonnes pratiques actualités

- ✅ Maximum 3 actualités affichées
- ✅ Date au format "Jour Mois Année" (ex: 15 Décembre 2025)
- ✅ Titre court et percutant (< 60 caractères)
- ✅ Description 2-3 phrases max
- ✅ Actualités récentes (< 3 mois)
- ✅ Supprimer les anciennes actualités régulièrement

---

## ✅ Bonnes pratiques {#bonnes-pratiques}

### Organisation du travail

**Avant de commencer** :
1. ✅ Lister les modifications à faire
2. ✅ Préparer tous les fichiers nécessaires (images, textes)
3. ✅ Faire une sauvegarde complète du site

**Pendant les modifications** :
1. ✅ Modifier UN fichier à la fois
2. ✅ Tester après chaque modification
3. ✅ Garder une copie locale de sauvegarde
4. ✅ Documenter ce qui a été changé

**Après les modifications** :
1. ✅ Vérifier toutes les pages impactées
2. ✅ Tester sur plusieurs navigateurs
3. ✅ Tester la version mobile
4. ✅ Vider le cache (Ctrl+F5)

### Nommage des fichiers

**Images** :
```
✅ marie-dupont.png
✅ logo-academie.png
✅ photo-equipe-2025.jpg

❌ Marie DUPONT.PNG
❌ photo final v2 (1).jpg
❌ IMG_2025.jpeg
```

**Règles** :
- Tout en **minuscules**
- Pas d'espaces (utiliser `-`)
- Pas d'accents ni caractères spéciaux
- Noms descriptifs
- Extensions en minuscules (`.png`, `.jpg`)

### Gestion des images

**Avant upload** :
1. ✅ Vérifier les dimensions (voir spécifications)
2. ✅ Compresser l'image (< 200 Ko)
3. ✅ Vérifier le format (PNG pour logo, JPG pour photos)
4. ✅ Tester l'affichage

**Outils de compression** :
- [TinyPNG](https://tinypng.com/) - Compression sans perte de qualité
- [Squoosh](https://squoosh.app/) - Comparaison avant/après

### Sécurité et sauvegardes

**Système de backup** :

```
📁 Backups/
├── 2025-12-15_index.html
├── 2025-12-15_equipes.html
├── 2025-12-15_modals.js
└── 2025-12-20_index.html
```

**Fréquence des sauvegardes** :
- Avant chaque modification importante
- Une fois par mois (sauvegarde complète)
- Après une refonte majeure

**Où sauvegarder** :
- ✅ Disque dur local
- ✅ Clé USB
- ✅ Cloud (OneDrive, Google Drive)
- ✅ Serveur FTP (dossier séparé)

### Validation du code

**Avant de publier** :

1. **HTML** : [W3C Validator](https://validator.w3.org/)
   - Uploader votre fichier
   - Corriger les erreurs éventuelles

2. **CSS** : [CSS Validator](https://jigsaw.w3.org/css-validator/)
   - Valider les modifications de style

3. **Test responsive** :
   - Redimensionner la fenêtre du navigateur
   - Tester sur mobile réel si possible
   - Utiliser les DevTools (F12 → Mode responsive)

### Checklist avant publication

```
□ Sauvegarde effectuée
□ Modifications testées localement
□ Fichiers uploadés correctement
□ Cache navigateur vidé (Ctrl+F5)
□ Test sur la version en ligne
□ Vérification mobile
□ Vérification liens
□ Vérification images
□ Pas d'erreurs console (F12)
```

---

## 🆘 Aide et support

### Problèmes fréquents

**"Mes modifications ne s'affichent pas"**
```
1. Vider le cache : Ctrl + Shift + Del
2. Forcer le rechargement : Ctrl + F5
3. Vérifier le fichier uploadé (bonne version ?)
4. Attendre 5-10 minutes (cache serveur)
```

**"J'ai cassé quelque chose"**
```
1. Pas de panique ! 😊
2. Restaurer la sauvegarde
3. Uploader à nouveau l'ancien fichier
4. Recommencer doucement
```

**"Les accents ne s'affichent pas"**
```
1. Vérifier l'encodage du fichier (UTF-8)
2. Dans VS Code : clic en bas à droite → UTF-8
3. Sauvegarder et re-uploader
```

**"Une image ne s'affiche pas"**
```
1. Vérifier le chemin : images/equipe/nom.png
2. Vérifier le nom exact (majuscules/minuscules)
3. Vérifier que le fichier est sur le serveur
4. Vérifier la taille du fichier (< 2 Mo)
```

### Contacts

**Support technique** :
- Hafid MOKADEM : hafid.mokadem@ac-rennes.fr
- Vincent BENARD : vincent.benard@ac-rennes.fr

**Avant de contacter** :
- Décrire précisément le problème
- Indiquer le fichier concerné
- Joindre une capture d'écran si possible
- Préciser navigateur et système d'exploitation

---

## 📚 Ressources

### Tutoriels

**HTML de base** :
- [Cours HTML (OpenClassrooms)](https://openclassrooms.com/fr/courses/1603881-creez-votre-site-web-avec-html5-et-css3)
- [HTML pour débutants (MDN)](https://developer.mozilla.org/fr/docs/Learn/HTML)

**FTP** :
- [Guide FileZilla](https://filezilla-project.org/documentation.php)
- [Tutoriel FTP](https://www.youtube.com/watch?v=example)

**Images** :
- [Optimisation images web](https://www.alsacreations.com/article/lire/1851-optimiser-images-web.html)
- [Guide compression](https://kinsta.com/fr/blog/optimiser-images-pour-le-web/)

### Aide-mémoire HTML

**Balises courantes** :

```html
<!-- Titre principal -->
<h1>Titre niveau 1</h1>
<h2>Titre niveau 2</h2>
<h3>Titre niveau 3</h3>

<!-- Paragraphe -->
<p>Texte de paragraphe</p>

<!-- Lien -->
<a href="page.html">Texte du lien</a>

<!-- Image -->
<img src="image.png" alt="Description">

<!-- Saut de ligne -->
<br>

<!-- Gras -->
<strong>Texte en gras</strong>

<!-- Italique -->
<em>Texte en italique</em>
```

**Structure** :

```html
<div class="conteneur">
    <h2>Titre</h2>
    <p>Contenu...</p>
</div>
```

---

## ✨ Astuces et raccourcis

### Raccourcis éditeur (VS Code)

```
Ctrl + S         Sauvegarder
Ctrl + F         Rechercher
Ctrl + H         Rechercher/Remplacer
Ctrl + /         Commenter/Décommenter
Ctrl + Z         Annuler
Ctrl + Shift + Z Rétablir
Alt + ↑/↓        Déplacer une ligne
```

### Raccourcis navigateur

```
Ctrl + F5        Actualiser (vider cache)
F12              Ouvrir DevTools
Ctrl + Shift + I Ouvrir Inspecteur
Ctrl + U         Voir code source
Ctrl + +         Zoom avant
Ctrl + -         Zoom arrière
Ctrl + 0         Réinitialiser zoom
```

### Astuces FTP

```
- Glisser-déposer les fichiers
- Comparer dates de modification
- Utiliser la file d'attente
- Rafraîchir la liste (F5)
- Garder la connexion active
```

---

**📅 Dernière mise à jour** : Décembre 2025 
**👤 Auteur** : Équipe DRASI Vannes  
**📧 Contact** : hafid.mokadem@ac-rennes.fr