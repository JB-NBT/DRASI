# 🎓 Site Web - Équipe Académique de Vannes

Site web portfolio de l'équipe académique de Vannes - Académie de Rennes

## 📋 Table des matières

1. [Installation et mise en ligne](#installation)
2. [Structure du projet](#structure)
3. [Guide de mise à jour](#mise-à-jour)
4. [Modifier le contenu](#modifier-contenu)
5. [Ajouter des membres d'équipe](#ajouter-membres)
6. [Préparation des images](#images)
7. [Support et maintenance](#support)

---

## 🚀 Installation et mise en ligne {#installation}

### Prérequis
- Un serveur web (Apache, Nginx, etc.)
- Accès FTP ou gestionnaire de fichiers
- Aucune base de données requise (site statique)

### Étapes d'installation

1. **Télécharger les fichiers**
   - Récupérez tous les fichiers du projet

2. **Préparer le logo et les photos**
   - Placez le logo académique dans `images/logo-academie-rennes.png`
   - Placez les photos des membres dans `images/equipe/`

3. **Uploader sur le serveur**
   - Transférez tous les fichiers via FTP dans le répertoire web
   - Conservez l'arborescence exacte des dossiers

4. **Tester le site**
   - Accédez à l'URL de votre site
   - Vérifiez que toutes les pages fonctionnent
   - Testez sur mobile et desktop

### URLs importantes
- Page d'accueil : `index.html`
- Portfolio équipe : `equipes.html`
- Contact : `contact.html`

---

## 📁 Structure du projet {#structure}

```
site-academie-vannes/
│
├── index.html              # Page d'accueil
├── histoire.html           # Page histoire
├── equipes.html           # Page portfolio équipe ⭐
├── missions.html          # Page missions
├── perimetre.html         # Page périmètre avec carte
├── contact.html           # Page contact avec formulaire
│
├── css/
│   └── style.css          # Feuille de style principale
│
├── js/
│   └── main.js            # Scripts JavaScript
│
├── images/
│   ├── logo-academie-rennes.png    # Logo officiel
│   └── equipe/                     # Photos membres
│       ├── membre-01.png
│       ├── membre-02.png
│       └── ...
│
└── README.md              # Ce fichier
```

---

## 🔄 Guide de mise à jour {#mise-à-jour}

### ✨ Principe "Facile de MAJ"

Ce site est conçu pour être facilement modifiable, même sans connaissances en développement web.

### Outils nécessaires
- **Éditeur de texte** : Notepad++, VS Code, Sublime Text, ou même Bloc-notes Windows
- **Logiciel FTP** : FileZilla, WinSCP, ou gestionnaire de fichiers de l'hébergeur

### Workflow de modification

1. **Télécharger le fichier** à modifier depuis le serveur (via FTP)
2. **Ouvrir avec un éditeur** de texte
3. **Modifier le contenu** (voir sections suivantes)
4. **Sauvegarder** le fichier
5. **Ré-uploader** sur le serveur
6. **Tester** les modifications sur le site

---

## ✏️ Modifier le contenu {#modifier-contenu}

### Modifier la page d'accueil (index.html)

#### Changer les statistiques du hero

Cherchez dans le fichier `index.html` :

```html
<div class="stat-box">
    <div class="stat-number">24</div>
    <div class="stat-label">Membres de l'équipe</div>
</div>
```

Modifiez les chiffres et les textes selon vos besoins.

#### Modifier le texte de présentation

Cherchez :

```html
<h2 class="hero-title">Une équipe engagée pour l'éducation</h2>
<p class="hero-text">
    L'équipe académique de Vannes accompagne...
</p>
```

Changez le titre et le texte entre les balises.

#### Modifier les actualités

Dans la section actualités, dupliquez ce bloc pour ajouter une actualité :

```html
<article class="actualite-item">
    <div class="actualite-date">10 Décembre 2024</div>
    <h3 class="actualite-title">Titre de l'actualité</h3>
    <p class="actualite-excerpt">
        Description courte de l'actualité...
    </p>
</article>
```

### Modifier les informations de contact

Ouvrez `contact.html` et cherchez :

```html
<p class="card-text">
    Standard : 02 XX XX XX XX<br>
    Fax : 02 XX XX XX XX
</p>
```

Remplacez `02 XX XX XX XX` par les vrais numéros.

### Modifier les couleurs (avancé)

Ouvrez `css/style.css` et modifiez les variables au début du fichier :

```css
:root {
    --bleu-france: #000091;    /* Couleur principale */
    --rouge-marianne: #E1000F;  /* Couleur d'accent */
    /* ... */
}
```

---

## 👥 Ajouter des membres d'équipe {#ajouter-membres}

### Étape 1 : Préparer la photo

1. Photo format **carré** (400x400px recommandé)
2. Format **PNG** ou **JPG**
3. Nommez le fichier : `membre-XX.png` (ex: `membre-13.png`)
4. Placez-le dans le dossier `images/equipe/`

### Étape 2 : Ajouter la carte membre

Ouvrez `equipes.html` et trouvez une carte membre existante :

```html
<div class="member-card">
    <img src="images/equipe/membre-01.png" alt="Prénom NOM" class="member-photo">
    <div class="member-info">
        <h4 class="member-name">Prénom NOM</h4>
        <p class="member-role">Fonction</p>
        <p class="member-contact">📧 prenom.nom@ac-rennes.fr</p>
    </div>
</div>
```

### Étape 3 : Copier-coller et modifier

1. **Copiez** tout le bloc `<div class="member-card">...</div>`
2. **Collez** après la dernière carte de la section
3. **Modifiez** :
   - `src="images/equipe/membre-XX.png"` → votre nouvelle photo
   - `alt="Prénom NOM"` → nom du membre
   - `Prénom NOM` → nom complet
   - `Fonction` → fonction du membre
   - `prenom.nom@ac-rennes.fr` → email du membre

### Exemple complet

```html
<!-- NOUVEAU MEMBRE -->
<div class="member-card">
    <img src="images/equipe/membre-13.png" alt="Marie DUPONT" class="member-photo">
    <div class="member-info">
        <h4 class="member-name">Marie DUPONT</h4>
        <p class="member-role">Chargée de mission</p>
        <p class="member-contact">📧 marie.dupont@ac-rennes.fr</p>
    </div>
</div>
```

---

## 🖼️ Préparation des images {#images}

### Logo académique

**Fichier** : `images/logo-academie-rennes.png`

**Spécifications** :
- Format : PNG avec fond transparent
- Dimensions : 200x200px minimum
- Poids : < 100 Ko

### Photos des membres

**Dossier** : `images/equipe/`

**Spécifications** :
- Format : PNG ou JPG
- Dimensions : 400x400px (carré, ratio 1:1)
- Qualité : Haute résolution, visage bien visible
- Fond : Neutre, uni, ou fond académique
- Poids : < 200 Ko par photo
- Nommage : `membre-01.png`, `membre-02.png`, etc.

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

### Outils de retouche recommandés

**En ligne (gratuit)** :
- [Photopea](https://www.photopea.com/) - Éditeur en ligne complet
- [Remove.bg](https://www.remove.bg/) - Supprimer l'arrière-plan
- [TinyPNG](https://tinypng.com/) - Compresser les images

**Logiciels desktop** :
- GIMP (gratuit)
- Paint.NET (gratuit, Windows)
- Photoshop (payant)

---

## 🎨 Personnalisation avancée

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
<a href="projets.html" class="nav-pill">Projets</a>
```

---

## 🛠️ Support et maintenance {#support}

### Problèmes courants

#### Les images ne s'affichent pas
- Vérifiez le chemin : `images/equipe/membre-01.png`
- Vérifiez les majuscules/minuscules (important sur Linux)
- Vérifiez que l'image existe bien sur le serveur

#### Le menu ne fonctionne pas sur mobile
- Vérifiez que le fichier `js/main.js` est bien uploadé
- Videz le cache du navigateur (Ctrl + F5)

#### Les modifications ne s'affichent pas
- Videz le cache du navigateur
- Vérifiez que vous avez uploadé le bon fichier
- Vérifiez qu'il n'y a pas d'erreur dans le code HTML

### Validation du code

Testez votre code HTML sur :
- [W3C Validator](https://validator.w3.org/)

### Optimisation

**Performance** :
- Compressez toutes les images avant upload
- Gardez chaque image < 200 Ko
- Testez sur mobile

**SEO** :
- Remplissez les balises `<meta description>`
- Utilisez des `alt` sur toutes les images
- Gardez des URLs propres

---

## 📞 Aide et documentation

### Ressources utiles

**HTML/CSS** :
- [MDN Web Docs](https://developer.mozilla.org/fr/)
- [W3Schools](https://www.w3schools.com/)

**Outils** :
- [FileZilla](https://filezilla-project.org/) - Client FTP
- [VS Code](https://code.visualstudio.com/) - Éditeur de code

### Changelog

**Version 1.0** (Décembre 2024)
- Création du site
- Pages : Accueil, Histoire, Équipes, Missions, Périmètre, Contact
- Design responsive
- Conformité charte graphique

---

## 📄 Mentions techniques

**Technologies** : HTML5, CSS3, JavaScript Vanilla  
**Navigateurs supportés** : Chrome, Firefox, Safari, Edge (dernières versions)  
**Responsive** : Mobile, Tablette, Desktop  
**Accessibilité** : RGAA (niveau AA visé)

---

## 👨‍💻 Crédits

Site développé pour l'Académie de Rennes - Équipe de Vannes  
Respect de la charte graphique académique  
Design : Portfolio visuel moderne

---

**📧 Pour toute question, contactez l'équipe technique de l'académie.**