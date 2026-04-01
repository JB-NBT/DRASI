# Guide de mise à jour - Site DRASI

**Guide pratique pour modifier le contenu du site sans connaissances techniques approfondies**

---

## Principe

Le site est conçu pour être facilement modifiable :
- Fichiers HTML simples, éditables avec n'importe quel éditeur de texte
- Pas de base de données
- Modifications visibles immédiatement après upload
- Structure claire et commentée

---

## Outils nécessaires

### Éditeur de texte

Recommandés :
- Visual Studio Code (gratuit) — https://code.visualstudio.com/
- Notepad++ (gratuit) — https://notepad-plus-plus.org/
- Sublime Text (gratuit) — https://www.sublimetext.com/

À éviter : Microsoft Word, Bloc-notes Windows (risque de corruption du fichier).

### Client FTP

- FileZilla (gratuit) — https://filezilla-project.org/
- WinSCP (Windows) — https://winscp.net/

---

## Procédure standard de modification

```
1. SAUVEGARDE      — copier le fichier original avant toute modification
2. TÉLÉCHARGEMENT  — récupérer le fichier via FTP depuis le serveur
3. MODIFICATION    — ouvrir et modifier avec l'éditeur de texte
4. ENREGISTREMENT  — sauvegarder les changements
5. UPLOAD          — déposer le fichier modifié via FTP
6. VÉRIFICATION    — tester en ligne (Ctrl+F5 pour vider le cache)
```

---

## Modifications fréquentes

### 1. Modifier les statistiques (page d'accueil)

Fichier : `index.html`

Repérer le bloc suivant et modifier les valeurs :
```html
<div class="stat-box">
    <div class="stat-number">8</div>
    <div class="stat-label">Membres de l'équipe</div>
</div>
```

### 2. Modifier le texte de présentation

Fichier : `index.html`

Repérer le bloc hero et modifier le contenu entre les balises :
```html
<h2 class="hero-title">Une équipe engagée pour l'éducation</h2>
<p class="hero-text">
    L'équipe académique de Vannes accompagne...
</p>
```

### 3. Modifier les coordonnées de contact

Fichier : `contact.html`

Téléphone :
```html
<p class="card-text">
    Standard : 02 97 12 34 56<br>
    Fax : 02 97 12 34 57
</p>
```

Email :
```html
<p class="card-text">
    Contact général :<br>
    drasi.vannes@ac-rennes.fr
</p>
```

### 4. Ajouter une actualité

Fichier : `index.html`

Template à copier dans la section `.actualites-grid` :
```html
<article class="actualite-item">
    <div class="actualite-date">15 Janvier 2026</div>
    <h3 class="actualite-title">Titre de l'actualité</h3>
    <p class="actualite-excerpt">
        Description courte (2-3 phrases maximum).
    </p>
</article>
```

Conseils :
- Maximum 3 actualités affichées simultanément
- Format de la date : "Jour Mois Année"
- Titre court (moins de 60 caractères)

---

## Ajouter un membre d'équipe

### Étape 1 — Préparer la photo

Spécifications :
- Format : PNG ou JPG
- Dimensions : 400x400 pixels (format carré obligatoire)
- Fond neutre ou uniforme
- Poids : inférieur à 200 Ko
- Nom de fichier : `prenom-nom.png` (minuscules, tirets, sans accent)

Outils en ligne :
- Photopea — retouche : https://www.photopea.com/
- TinyPNG — compression : https://tinypng.com/

### Étape 2 — Ajouter dans equipes.html

Copier ce bloc et l'adapter :
```html
<div class="member-card">
    <img src="images/equipe/marie-dupont.png" alt="Marie DUPONT" class="member-photo">
    <div class="member-info">
        <h4 class="member-name">Marie DUPONT</h4>
        <p class="member-role">Chargée de mission</p>
        <p class="member-contact">marie.dupont@ac-rennes.fr</p>
        <p class="member-contact">Vannes</p>
    </div>
</div>
```

Champs à personnaliser : nom du fichier photo, nom et prénom, fonction, email, localisation.

### Étape 3 — Ajouter les détails dans modals.js

Fichier : `js/modals.js`

Ajouter une entrée dans l'objet `membersData` :
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
    description: 'Présentation du membre...'
}
```

Important :
- La clé (ex. `'marie-dupont'`) doit correspondre exactement au nom du fichier photo sans extension
- Ne pas oublier la virgule après le bloc si ce n'est pas le dernier élément

---

## Modifier les cartes

### Ajouter un établissement

Fichier : `js/maps.js`

Pour un collège :
```javascript
const colleges = [
    {nom: "Jules-Simon", commune: "Vannes", lat: 47.65880, lng: -2.76106},
    {nom: "Nouveau Collège", commune: "Lorient", lat: 47.7500, lng: -3.3700},
];
```

Pour un lycée :
```javascript
const lycees = [
    {nom: "Nouveau Lycée", commune: "Pontivy", lat: 48.0700, lng: -2.9700},
];
```

### Trouver les coordonnées GPS

Via Google Maps :
1. Rechercher l'établissement
2. Clic droit sur le marqueur
3. Sélectionner "Plus d'infos sur cet endroit"
4. Copier les coordonnées affichées

Format attendu dans le fichier :
```javascript
lat: 47.65880,   // Latitude
lng: -2.76106    // Longitude
```

---

## Modifier les couleurs

Fichier : `css/common.css`

Les couleurs sont définies en variables au début du fichier :
```css
:root {
    --bleu-france: #228BCC;       /* Couleur principale */
    --rouge-marianne: #E1000F;    /* Couleur d'accent */
    --gris-clair: #f8f9fa;        /* Fond des sections */
}
```

Modifier les codes hexadécimaux pour changer les couleurs du site.

---

## Règles essentielles

À faire systématiquement :
- Faire une sauvegarde avant toute modification
- Modifier un fichier à la fois
- Tester après chaque modification
- Vider le cache navigateur (Ctrl+F5)

À ne jamais faire :
- Supprimer des balises HTML sans comprendre leur rôle
- Oublier de fermer une balise ou un guillemet
- Modifier plusieurs fichiers sans tester entre chaque

---

## Aide-mémoire HTML

Balises courantes :
```html
<!-- Titres -->
<h1>Titre principal</h1>
<h2>Sous-titre de section</h2>

<!-- Paragraphe -->
<p>Texte du paragraphe</p>

<!-- Lien -->
<a href="page.html">Texte du lien</a>

<!-- Image -->
<img src="image.png" alt="Description de l'image">

<!-- Saut de ligne -->
<br>

<!-- Mise en gras -->
<strong>Texte en gras</strong>
```

---

## Problèmes fréquents

### Les modifications ne s'affichent pas
```
1. Vider le cache : Ctrl + Shift + Del
2. Forcer le rechargement : Ctrl + F5
3. Vérifier que le bon fichier a été uploadé
4. Attendre 5 à 10 minutes si le serveur utilise un cache
```

### Les images ne s'affichent pas
```
1. Vérifier le chemin : images/equipe/nom-fichier.png
2. Vérifier la casse exacte du nom (majuscules/minuscules)
3. Vérifier que le fichier est bien présent sur le serveur
4. Vérifier que le poids du fichier est inférieur à 2 Mo
```

### Une modification a cassé le rendu
```
1. Restaurer la sauvegarde effectuée avant la modification
2. Uploader l'ancien fichier pour revenir à l'état précédent
3. Recommencer la modification plus prudemment
```

---

## Raccourcis utiles

Éditeur de texte (VS Code) :
```
Ctrl + S    Sauvegarder
Ctrl + F    Rechercher
Ctrl + H    Rechercher et remplacer
Ctrl + /    Commenter / décommenter une ligne
Ctrl + Z    Annuler
```

Navigateur :
```
Ctrl + F5       Vider le cache et actualiser
F12             Outils développeur
Ctrl + U        Voir le code source
```

---

## Checklist avant publication

```
[ ] Sauvegarde effectuée
[ ] Modifications testées localement
[ ] Fichiers uploadés correctement
[ ] Cache navigateur vidé (Ctrl+F5)
[ ] Test sur la version en ligne
[ ] Vérification sur mobile
[ ] Vérification des liens
[ ] Vérification des images
[ ] Pas d'erreur dans la console (F12)
```

---

## Ressources

- HTML (MDN) : https://developer.mozilla.org/fr/docs/Learn/HTML
- Guide FileZilla : https://filezilla-project.org/documentation.php
- Validation HTML : https://validator.w3.org/
- Compression images : https://tinypng.com/

---

## Contact support

Pour toute question, fournir les informations suivantes :
- Description précise du problème
- Fichier concerné
- Capture d'écran si possible
- Navigateur et système d'exploitation utilisés

Contacts :
- DSI : ****@ac-rennes.fr
- Adjoint DSI : ****@ac-rennes.fr

---

*Version 1.0 — Décembre 2025*
