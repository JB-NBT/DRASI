// ========================================
// INITIALISATION DES CARTES LEAFLET
// ========================================

console.log('maps.js chargé');

// Données des établissements
const colleges = [
    {nom: "Jules-Simon", commune: "Vannes", lat: 47.65880, lng: -2.76106},
    {nom: "Antoine de Saint-Exupéry", commune: "Vannes", lat: 47.67640, lng: -2.77115},
    {nom: "Auguste Brizeux", commune: "Lorient", lat: 47.74581, lng: -3.36127},
    {nom: "Anita Conti", commune: "Lorient", lat: 47.73682, lng: -3.38082},
    {nom: "Tréfaven", commune: "Lorient", lat: 47.76375, lng: -3.36709},
    {nom: "Beg Er Vil", commune: "Quiberon", lat: 47.47930, lng: -3.11138},
    {nom: "Charles Langlais", commune: "Pontivy", lat: 48.06075, lng: -2.96893},
    {nom: "Cousteau", commune: "Séné", lat: 47.64622, lng: -2.72100},
    {nom: "Kerdurand", commune: "Riantec", lat: 47.71563, lng: -3.31945},
    {nom: "Rhuys", commune: "Sarzeau", lat: 47.52764, lng: -2.75966},
    {nom: "Émile Mazé", commune: "Guémené-sur-Scorff", lat: 48.06430, lng: -3.20063},
    {nom: "François-René de Chateaubriand", commune: "Gourin", lat: 48.13423, lng: -3.61207},
    {nom: "Max Jacob", commune: "Josselin", lat: 47.95979, lng: -2.55164},
    {nom: "Yves Coppens", commune: "Malestroit", lat: 47.80870, lng: -2.37238},
    {nom: "Mathurin Martin", commune: "Baud", lat: 47.87382, lng: -3.01364},
    {nom: "Jean Rostand", commune: "Muzillac", lat: 47.56653, lng: -2.50737},
    {nom: "René Guy Cadou", commune: "Malansac", lat: 47.67620, lng: -2.29886},
    {nom: "Jean Loup Chrétien", commune: "Questembert", lat: 47.66448, lng: -2.46381},
    {nom: "Marcel Pagnol", commune: "Plouay", lat: 47.91733, lng: -3.34018},
    {nom: "Simone Veil", commune: "Elven", lat: 47.72384, lng: -2.58654},
    {nom: "Charles de Gaulle", commune: "Ploemeur", lat: 47.73530, lng: -3.43489},
    {nom: "Henri Wallon", commune: "Lanester", lat: 47.77251, lng: -3.34452},
    {nom: "Jean Moulin", commune: "Hennebont", lat: 47.88236, lng: -2.82903},
    {nom: "Le Verger", commune: "Auray", lat: 47.66304, lng: -2.98613},
    {nom: "Michel Lotte", commune: "Le Palais", lat: 47.33781, lng: -3.16127},
    {nom: "Beaumanoir", commune: "Ploërmel", lat: 47.92266, lng: -2.39590},
    {nom: "Eugène Guillevic", commune: "Saint-Jean-Brévelay", lat: 47.84161, lng: -2.74555},
    {nom: "Paul Langevin", commune: "Hennebont", lat: 47.80261, lng: -3.27244},
    {nom: "Les Korrigans", commune: "Carnac", lat: 47.58967, lng: -3.07776},
    {nom: "La Riviere", commune: "Etel", lat: 47.65180, lng: -3.20156},
    {nom: "Jean Corentin Carré", commune: "Faouet", lat: 48.03560, lng: -3.49920},
    {nom: "Pierre & Marie Curie", commune: "Hennebont", lat: 47.80917, lng: -3.25881},
    {nom: "Anne Franck", commune: "Plescop", lat: 47.69934, lng: -2.79834},
    {nom: "Kerfontaine", commune: "Pluneret", lat: 47.67331, lng: -2.96286},
    {nom: "Madame de Sevigne", commune: "Mauron", lat: 48.14249, lng: -2.32326},
    {nom: "Yves Le Bec", commune: "Rohan", lat: 48.07809, lng: -2.75488},
    {nom: "Romain Rolland", commune: "Pontivy", lat: 48.06680, lng: -2.97712},
    {nom: "Jean Lurçat", commune: "Lanester", lat: 47.76334, lng: -3.33945},
    {nom: "Goh Lanno", commune: "Pluvignier", lat: 47.77894, lng: -3.00636},
    {nom: "Gilles Gahinet", commune: "Arradon", lat: 47.62680, lng: -2.83091},
    {nom: "Joseph Kerbellec", commune: "Queven", lat: 47.79119, lng: -3.42736}
];

const lycees = [
    {nom: "Charles de Gaulle", commune: "Vannes", lat: 47.67633, lng: -2.77259},
    {nom: "Alain-René Lesage", commune: "Vannes", lat: 47.64772, lng: -2.77034},
    {nom: "Jean Guehenno", commune: "Vannes", lat: 47.66005, lng: -2.78286},
    {nom: "Colbert", commune: "Lorient", lat: 47.74556, lng: -3.38256},
    {nom: "Dupuy de Lôme", commune: "Lorient", lat: 47.74775, lng: -3.36955},
    {nom: "Marie le Franc", commune: "Lorient", lat: 47.74756, lng: -3.38037},
    {nom: "Benjamin Franklin", commune: "Auray", lat: 47.67377, lng: -2.97952},
    {nom: "Bertrand Du Guesclin", commune: "Brech", lat: 47.68511, lng: -2.99809},
    {nom: "Emile James", commune: "Etel", lat: 47.66347, lng: -3.20453},
    {nom: "Ampère", commune: "Josselin", lat: 47.95974, lng: -2.54715},
    {nom: "Blavet", commune: "Pontivy", lat: 48.05933, lng: -2.96021},
    {nom: "Joseph Loth", commune: "Pontivy", lat: 48.06713, lng: -2.96235},
    {nom: "Julien Crozet", commune: "Port-Louis", lat: 47.70649, lng: -3.35653},
    {nom: "Marcelin Berthelot", commune: "Questembert", lat: 47.66378, lng: -2.46497},
    {nom: "Victor Hugo", commune: "Hennebont", lat: 47.80876, lng: -3.26213},
    {nom: "Émile Zola", commune: "Hennebont", lat: 47.80322, lng: -3.27015},
    {nom: "Brocéliande", commune: "Guer", lat: 47.95086, lng: -2.13710},
    {nom: "Erea les Pins", commune: "Ploemeur", lat: 47.71566, lng: -3.41395},
    {nom: "Louis Armand", commune: "Locmine", lat: 47.87917, lng: -2.82785},
    {nom: "Jean Mace", commune: "Lanester", lat: 47.76524, lng: -3.34340},
    {nom: "Mona Ozouf", commune: "Ploermel", lat: 47.92711, lng: -2.38675}
];

const gretas = [
    {nom: "GRETA-CFA Bretagne Sud - Agence Lorient", commune: "Lorient", lat: 47.74590, lng: -3.38103},
    {nom: "GRETA-CFA Bretagne Sud - Agence Vannes", commune: "Vannes", lat: 47.64817, lng: -2.77501},
    {nom: "GRETA-CFA Bretagne Sud - Agence Pontivy", commune: "Pontivy", lat: 48.05806, lng: -2.96007}
];

// Services académiques
const services = [
    { name: 'SDJES Vannes', lat: 47.64692, lng: -2.77769, type: 'SDJES' },
    { name: 'DSDEN Vannes', lat: 47.66724, lng: -2.74062, type: 'DSDEN' }
];

const cio = [
    { name: 'CIO Vannes', lat: 47.67626, lng: -2.74773 },
    { name: 'CIO Lorient', lat: 47.76236, lng: -3.37029 },
    { name: 'CIO Ploërmel', lat: 47.93361, lng: -2.39970 },
    { name: 'CIO Pontivy', lat: 48.06988, lng: -2.96438}
];

const cms = [
    { name: 'CMS Vannes', lat: 47.66195, lng: -2.75993 },
    { name: 'CMS Lorient', lat: 47.75496, lng: -3.36845 },
    { name: 'CMS Ploërmel', lat: 47.93316, lng: -2.39959 },
    { name: 'CMS Pontivy', lat: 48.06637, lng: -2.96680 },
    { name: 'CMS Questembert', lat: 47.66187, lng: -2.45850 },
    { name: 'CMS Auray', lat: 47.67019, lng: -2.99719 },
    { name: 'CMS Hennebont', lat: 47.80494, lng: -3.27604 },
    { name: 'CMS Lanester', lat: 47.76140, lng: -3.35187 }
];

const sma = [
    { name: 'SMA Lorient', lat: 47.75496, lng: -3.36845 }
];

// CARTE 1 : ÉTABLISSEMENTS PUBLICS LOCAUX D'ENSEIGNEMENT
function initMapEPLE() {
    console.log('Initialisation carte EPLE...');
    
    try {
        // Initialisation de la carte centrée sur le Morbihan
        const map = L.map('map-eple').setView([47.85, -2.85], 9);

        // Ajout du fond de carte
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Création de la légende
        const legendEPLE = L.control({position: 'topright'});
        legendEPLE.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'legend');
            div.innerHTML = `
                <div class="legend-title">Établissements du Morbihan (56)</div>
                <div class="legend-item">
                    <div class="legend-color lycee"></div>
                    <span>Lycées (${lycees.length})</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color college"></div>
                    <span>Collèges (${colleges.length})</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color greta"></div>
                    <span>GRETA-CFA (${gretas.length})</span>
                </div>
                <div class="legend-total">
                    <strong>Total : ${colleges.length + lycees.length + gretas.length} établissements</strong>
                </div>
            `;
            return div;
        };
        legendEPLE.addTo(map);

        // Ajout des collèges (bleu)
        colleges.forEach(college => {
            L.circleMarker([college.lat, college.lng], {
                color: '#000080',
                fillColor: '#000091',
                fillOpacity: 0.8,
                radius: 7,
                weight: 2
            }).bindPopup(`<b>Collège ${college.nom}</b><br>${college.commune}`).addTo(map);
        });

        // Ajout des lycées (rouge)
        lycees.forEach(lycee => {
            L.circleMarker([lycee.lat, lycee.lng], {
                color: '#c00000',
                fillColor: '#E1000F',
                fillOpacity: 0.8,
                radius: 7,
                weight: 2
            }).bindPopup(`<b>Lycée ${lycee.nom}</b><br>${lycee.commune}`).addTo(map);
        });

        // Ajout des GRETA (violet)
        gretas.forEach(greta => {
            L.circleMarker([greta.lat, greta.lng], {
                color: '#574bad',
                fillColor: '#6A5ACD',
                fillOpacity: 0.8,
                radius: 7,
                weight: 2
            }).bindPopup(`<b>${greta.nom}</b><br>${greta.commune}`).addTo(map);
        });

        console.log('✅ Carte EPLE initialisée avec succès');
    } catch (error) {
        console.error('❌ Erreur initialisation carte EPLE:', error);
    }
}

// CARTE 2 : SERVICES ACADÉMIQUES
function initMapServices() {
    console.log('Initialisation carte Services...');
    
    try {
        // Initialisation de la carte centrée sur le Morbihan
        const map = L.map('map-services').setView([47.85, -2.85], 9);

        // Ajout du fond de carte
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Création de la légende
        const legendServices = L.control({position: 'topright'});
        legendServices.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'legend');
            div.innerHTML = `
                <div class="legend-title">Services Académiques</div>
                <div class="legend-item">
                    <div class="legend-color sdjes"></div>
                    <span>SDJES Vannes</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color dsden"></div>
                    <span>DSDEN</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color cio"></div>
                    <span>CIO (${cio.length})</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color cms"></div>
                    <span>CMS (${cms.length})</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color sma"></div>
                    <span>SMA (${sma.length})</span>
                </div>
                <div class="legend-total">
                    <strong>Total : ${services.length + cio.length + cms.length + sma.length} services</strong>
                </div>
            `;
            return div;
        };
        legendServices.addTo(map);

        // Ajout des CMS
        cms.forEach(centre => {
            L.circleMarker([centre.lat, centre.lng], {
                color: '#1a9089',
                fillColor: '#20B2AA',
                fillOpacity: 0.8,
                radius: 7,
                weight: 2
            }).bindPopup(`<b>${centre.name}</b>`).addTo(map);
        });


        // Ajout des CIO
        cio.forEach(centre => {
            L.circleMarker([centre.lat, centre.lng], {
                color: '#315ca8',
                fillColor: '#4169E1',
                fillOpacity: 0.8,
                radius: 8,
                weight: 2
            }).bindPopup(`<b>${centre.name}</b>`).addTo(map);
        });

        // Ajout des services SDJES et DSDEN
        services.forEach(service => {
            const color = service.type === 'SDJES' ? '#228B22' : '#FF8C00';
            L.circleMarker([service.lat, service.lng], {
                color: color,
                fillColor: color,
                fillOpacity: 0.9,
                radius: 10,
                weight: 2
            }).bindPopup(`<b>${service.name}</b>`).addTo(map);
        });

        // Ajout du SMA
        sma.forEach(centre => {
            L.circleMarker([centre.lat, centre.lng], {
                color: '#e40a39ff',
                fillColor: '#e40a39ff',
                fillOpacity: 0.8,
                radius: 8,
                weight: 2
            }).bindPopup(`<b>${centre.name}</b>`).addTo(map);
        });

        console.log('✅ Carte Services initialisée avec succès');
    } catch (error) {
        console.error('❌ Erreur initialisation carte Services:', error);
    }
}

// Initialisation automatique au chargement de la page
window.addEventListener('load', function() {
    console.log('🚀 Démarrage initialisation des cartes...');
    
    // Vérifier que Leaflet est chargé
    if (typeof L === 'undefined') {
        console.error('❌ Leaflet n\'est pas chargé !');
        return;
    }
    
    // Petite pause pour s'assurer que tout est prêt
    setTimeout(function() {
        if (document.getElementById('map-eple')) {
            initMapEPLE();
        } else {
            console.log('⚠️ Élément map-eple non trouvé');
        }
        
        if (document.getElementById('map-services')) {
            initMapServices();
        } else {
            console.log('⚠️ Élément map-services non trouvé');
        }
    }, 100);
});