# 📝 Guide de Mise à Jour - Site DRASI

**Guide pratique pour modifier le contenu du site sans connaissances techniques**

---

## 🎯 Principe

Le site est conçu pour être **facilement modifiable** :
- Fichiers HTML simples
- Pas de base de données
- Modifications immédiates après upload
- Structure claire et commentée

---

## 🛠️ Outils nécessaires

### Éditeur de texte
**Recommandés** :
- [Visual Studio Code](https://code.visualstudio.com/) (gratuit)
- [Notepad++](https://notepad-plus-plus.org/) (gratuit)
- [Sublime Text](https://www.sublimetext.com/) (gratuit)

**À éviter** :
- ❌ Microsoft Word
- ❌ Bloc-notes Windows

### Client FTP
- [FileZilla](https://filezilla-project.org/) (gratuit)
- [WinSCP](https://winscp.net/) (Windows)

---

## 🔄 Workflow standard

```
1. SAUVEGARDE
   └─> Copier le fichier original

2. TÉLÉCHARGEMENT
   └─> Via FTP depuis le serveur

3. MODIFICATION
   └─> Ouvrir avec éditeur de texte

4. SAUVEGARDE
   └─> Enregistrer les changements

5. UPLOAD
   └─> Envoyer via FTP sur le serveur

6. VÉRIFICATION
   └─> Tester en ligne (Ctrl+F5)
```

---

## ✏️ Modifications fréquentes

### 1. Modifier les statistiques (accueil)

**Fichier** : `index.html`

**Cherchez** :
```html
<div class="stat-box">
    <div class="stat-number">8</div>
    <div class="stat-label">Membres de l'équipe</div>
</div>
```

**Modifiez** les chiffres et textes :
```html
<div class="stat-number">10</div>
<div class="stat-label">Agents DRASI</div>
```

---

### 2. Changer le texte de présentation

**Fichier** : `index.html`

**Cherchez** :
```html
<h2 class="hero-title">Une équipe engagée pour l'éducation</h2>
<p class="hero-text">
    L'équipe académique de Vannes accompagne...
</p>
```

**Modifiez** le contenu entre les balises.

---

### 3. Modifier les coordonnées

**Fichier** : `contact.html`

**Téléphone** :
```html
<p class="card-text">
    Standard : 02 97 12 34 56<br>
    Fax : 02 97 12 34 57
</p>
```

**Email** :
```html
<p class="card-text">
    Contact général :<br>
    drasi.vannes@ac-rennes.fr
</p>
```

---

### 4. Ajouter une actualité

**Fichier** : `index.html`

**Template à copier** :
```html
<article class="actualite-item">
    <div class="actualite-date">15 Janvier 2025</div>
    <h3 class="actualite-title">Titre de l'actualité</h3>
    <p class="actualite-excerpt">
        Description courte (2-3 phrases maximum).
    </p>
</article>
```

**Conseils** :
- Maximum 3 actualités affichées
- Date format : "Jour Mois Année"
- Titre court (< 60 caractères)
- Description 2-3 phrases

---

## 👥 Ajouter un membre d'équipe

### Étape 1 : Préparer la photo

**Spécifications** :
- Format : PNG ou JPG
- Dimensions : **400x400px** (carré)
- Fond : Neutre ou uniforme
- Poids : < 200 Ko
- Nom : `prenom-nom.png` (minuscules, tirets)

**Outils en ligne** :
- [Photopea](https://www.photopea.com/) - Retouche
- [Remove.bg](https://www.remove.bg/) - Supprimer fond
- [TinyPNG](https://tinypng.com/) - Compresser

### Étape 2 : Ajouter dans equipes.html

**Copier ce template** :
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

**Personnaliser** :
- Nom du fichier photo
- Nom et prénom
- Fonction
- Email
- Localisation

### Étape 3 : Ajouter les détails (modals.js)

**Fichier** : `js/modals.js`

**Ajouter dans `membersData`** :
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

⚠️ **Important** : 
- La clé (`'marie-dupont'`) = nom du fichier photo (sans extension)
- Ne pas oublier la virgule après le bloc

---

## 🗺️ Modifier les cartes

### Ajouter un établissement

**Fichier** : `js/maps.js`

**Pour un collège** :
```javascript
const colleges = [
    {nom: "Jules-Simon", commune: "Vannes", lat: 47.65880, lng: -2.76106},
    {nom: "Nouveau Collège", commune: "Lorient", lat: 47.7500, lng: -3.3700}, // AJOUT
];
```

**Pour un lycée** :
```javascript
const lycees = [
    {nom: "Nouveau Lycée", commune: "Pontivy", lat: 48.0700, lng: -2.9700},
];
```

### Trouver les coordonnées GPS

**Méthode Google Maps** :
1. Rechercher l'établissement
2. Clic droit sur le marker
3. "Plus d'infos sur cet endroit"
4. Copier les coordonnées

**Format** :
```javascript
lat: 47.65880,  // Latitude
lng: -2.76106   // Longitude
```

---

## 🎨 Modifier les couleurs

**Fichier** : `css/common.css`

**Variables au début du fichier** :
```css
:root {
    --bleu-france: #228BCC;       /* Couleur principale */
    --rouge-marianne: #E1000F;    /* Accent */
    --gris-clair: #f8f9fa;        /* Fond */
}
```

Changer les codes couleur (format hexadécimal).

---

## ⚠️ Règles d'or

### À FAIRE
- ✅ **Toujours** faire une sauvegarde
- ✅ Modifier **un fichier** à la fois
- ✅ Tester après chaque modification
- ✅ Vider le cache (Ctrl+F5)

### À NE PAS FAIRE
- ❌ Modifier plusieurs fichiers sans tester
- ❌ Supprimer des balises HTML
- ❌ Oublier les guillemets ou virgules

---

## 🎯 Aide-mémoire HTML

### Balises courantes
```html
<!-- Titres -->
<h1>Titre principal</h1>
<h2>Sous-titre</h2>

<!-- Paragraphe -->
<p>Texte du paragraphe</p>

<!-- Lien -->
<a href="page.html">Texte du lien</a>

<!-- Image -->
<img src="image.png" alt="Description">

<!-- Saut de ligne -->
<br>

<!-- Gras -->
<strong>Texte en gras</strong>
```

---

## 🆘 Problèmes fréquents

### Mes modifications ne s'affichent pas
```
1. Vider le cache : Ctrl + Shift + Del
2. Forcer rechargement : Ctrl + F5
3. Vérifier le fichier uploadé (bonne version ?)
4. Attendre 5-10 minutes (cache serveur)
```

### Les images ne s'affichent pas
```
1. Vérifier le chemin : images/equipe/nom.png
2. Vérifier nom exact (majuscules/minuscules)
3. Vérifier que le fichier est sur le serveur
4. Vérifier la taille (< 2 Mo)
```

### J'ai cassé quelque chose
```
1. Pas de panique ! 😊
2. Restaurer la sauvegarde
3. Uploader l'ancien fichier
4. Recommencer doucement
```

---

## 📚 Ressources utiles

### Tutoriels
- [HTML de base (MDN)](https://developer.mozilla.org/fr/docs/Learn/HTML)
- [Guide FileZilla](https://filezilla-project.org/documentation.php)

### Outils
- [W3C Validator](https://validator.w3.org/) - Valider HTML
- [TinyPNG](https://tinypng.com/) - Compresser images

---

## 🔑 Raccourcis utiles

### Éditeur (VS Code)
```
Ctrl + S         Sauvegarder
Ctrl + F         Rechercher
Ctrl + H         Remplacer
Ctrl + /         Commenter
Ctrl + Z         Annuler
```

### Navigateur
```
Ctrl + F5        Vider cache et actualiser
F12              Outils développeur
Ctrl + U         Voir code source
```

### FTP
```
F5               Rafraîchir
Glisser-déposer  Upload fichiers
```

---

## 📞 Support

**Avant de contacter** :
- Décrire précisément le problème
- Indiquer le fichier concerné
- Joindre capture d'écran si possible
- Préciser navigateur et système

**Contacts** :
- **Hafid MOKADEM** : hafid.mokadem@ac-rennes.fr
- **Vincent BENARD** : vincent.benard@ac-rennes.fr

---

## ✅ Checklist avant publication

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

**🎓 Bon courage pour vos modifications !**

*Version 1.0 - Décembre 2025*