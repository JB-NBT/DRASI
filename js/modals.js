// ========================================
// SYSTÈME DE MODALS POUR LES MEMBRES DE L'ÉQUIPE
// ========================================

// Données détaillées des membres (à personnaliser selon vos besoins)
const membersData = {
    'hafid-mokadem': {
        name: 'Hafid MOKADEM',
        role: 'IGE - Responsable',
        email: 'hafid.mokadem@ac-rennes.fr',
        location: 'Vannes',
        photo: 'images/equipe/hafid-mokadem.png',
        missions: [
            'Coordination générale de l\'équipe académique',
            'Gestion des projets stratégiques',
            'Supervision des activités techniques et pédagogiques',
            'Liaison avec le rectorat et les établissements'
        ],
        description: 'En tant qu\'Inspecteur Général de l\'Éducation, Hafid coordonne l\'ensemble des missions de l\'équipe de Vannes et assure le lien avec les différents acteurs du système éducatif.'
    },
    'vincent-benard': {
        name: 'Vincent BENARD',
        role: 'ASI - Responsable adjoint',
        email: 'vincent.benard@ac-rennes.fr',
        location: 'Vannes',
        photo: 'images/equipe/vincent-benard.png',
        missions: [
            'Assistance à la direction',
            'Gestion des systèmes d\'information',
            'Coordination des projets numériques',
            'Support technique de niveau expert'
        ],
        description: 'Vincent assiste le responsable dans la gestion quotidienne et pilote les projets liés aux systèmes d\'information de l\'académie.'
    },
    'guillaume-besson': {
        name: 'Guillaume BESSON',
        role: 'TECH',
        email: 'guillaume.besson@ac-rennes.fr',
        location: 'Vannes',
        photo: 'images/equipe/guillaume-besson.png',
        missions: [
            'Support technique aux établissements',
            'Maintenance des infrastructures réseau',
            'Installation et configuration des équipements',
            'Formation des utilisateurs'
        ],
        description: 'Guillaume assure le support technique de proximité et intervient dans les établissements pour résoudre les problématiques informatiques.'
    },
    'didier-calcagno': {
        name: 'Didier CALCAGNO',
        role: 'TECH CS',
        email: 'didier.calcagno@ac-rennes.fr',
        location: 'Vannes',
        photo: 'images/equipe/didier-calcagno.png',
        missions: [
            'Support technique spécialisé',
            'Gestion des serveurs et infrastructures',
            'Cybersécurité',
            'Administration systèmes et réseaux'
        ],
        description: 'Didier est spécialisé dans l\'administration des systèmes complexes et la sécurité informatique de l\'académie.'
    },
    'pierre-yves-molgat': {
        name: 'Pierre-Yves MOLGAT',
        role: 'ENS',
        email: 'pierre-yves.molgat@ac-rennes.fr',
        location: 'Vannes',
        photo: 'images/equipe/pierre-yves-molgat.png',
        missions: [
            'Accompagnement pédagogique au numérique',
            'Formation des enseignants',
            'Développement de ressources numériques',
            'Conseil en intégration des TICE'
        ],
        description: 'Pierre-Yves accompagne les enseignants dans l\'intégration du numérique dans leurs pratiques pédagogiques.'
    },
    'gildas-samson': {
        name: 'Gildas SAMSON',
        role: 'TECH',
        email: 'gildas.samson@ac-rennes.fr',
        location: 'Queven',
        photo: 'images/equipe/gildas-samson.png',
        missions: [
            'Support technique secteur Queven',
            'Maintenance préventive et curative',
            'Gestion du parc informatique',
            'Assistance aux utilisateurs'
        ],
        description: 'Gildas assure le support technique pour le secteur de Queven et les établissements environnants.'
    },
    'christian-josse': {
        name: 'Christian JOSSE',
        role: 'ASI',
        email: 'christian.josse@ac-rennes.fr',
        location: 'Queven',
        photo: 'images/equipe/christian-josse.png',
        missions: [
            'Administration des systèmes d\'information',
            'Gestion des bases de données',
            'Développement d\'applications',
            'Optimisation des processus'
        ],
        description: 'Christian gère les systèmes d\'information et développe des solutions adaptées aux besoins des établissements.'
    },
    'alain-le-thomas': {
        name: 'Alain Le Thomas',
        role: 'ENS',
        email: 'alain.le-thomas@ac-rennes.fr',
        location: 'Queven',
        photo: 'images/equipe/alain-le-thomas.png',
        missions: [
            'Formation au numérique éducatif',
            'Accompagnement des projets pédagogiques',
            'Création de contenus numériques',
            'Animation d\'ateliers pour enseignants'
        ],
        description: 'Alain forme et accompagne les équipes pédagogiques dans l\'usage des outils numériques en classe.'
    }
};

// ========================================
// FONCTION : Créer et afficher la modal
// ========================================
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
    
    // Construire le HTML de la modal
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
    
    // Afficher la modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
    
    // Gérer la fermeture
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeMemberModal);
    overlay.addEventListener('click', closeMemberModal);
    
    // Fermeture avec la touche Échap
    document.addEventListener('keydown', handleEscapeKey);
}

// ========================================
// FONCTION : Fermer la modal
// ========================================
function closeMemberModal() {
    const modal = document.getElementById('memberModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le scroll
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

// ========================================
// FONCTION : Gestion de la touche Échap
// ========================================
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeMemberModal();
    }
}

// ========================================
// INITIALISATION : Ajouter les événements aux cartes
// ========================================
function initMemberCards() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        // Rendre la carte cliquable
        card.style.cursor = 'pointer';
        
        // Extraire l'ID du membre depuis l'image
        const img = card.querySelector('.member-photo');
        if (img) {
            const imgSrc = img.getAttribute('src');
            const memberId = imgSrc.split('/').pop().replace('.png', '');
            
            // Ajouter l'événement click
            card.addEventListener('click', function(e) {
                e.preventDefault();
                createMemberModal(memberId);
            });
            
            // Ajouter un effet visuel pour indiquer que c'est cliquable
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-8px)';
            });
        }
    });
}

// ========================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ========================================
// Attendre que le DOM et les cartes soient chargés
document.addEventListener('DOMContentLoaded', function() {
    // Petit délai pour s'assurer que les cartes sont dans le DOM
    setTimeout(initMemberCards, 500);
});

// Réinitialiser si la page change (pour les SPA)
if (window.location.pathname.includes('equipe')) {
    window.addEventListener('load', function() {
        setTimeout(initMemberCards, 1000);
    });
}