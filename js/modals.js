// ========================================
// SYSTÈME DE MODALS POUR LES MEMBRES DE L'ÉQUIPE
// ========================================

// Données détaillées des membres (à personnaliser selon vos besoins)
const membersData = {
    'marc-dupont': {
        name: 'Marc Dupont',
        role: 'IGE - Responsable',
        email: 'marc.dupont@ac-rennes.fr',
        location: 'Vannes',
        photo: 'https://robohash.org/marc.dupont?set=set4&size=200x200',
        missions: [
            'Coordination générale de l\'équipe académique',
            'Gestion des projets stratégiques',
            'Supervision des activités techniques et pédagogiques',
            'Liaison avec le rectorat et les établissements'
        ],
        description: 'En tant que responsable de l\'équipe, Marc coordonne l\'ensemble des missions de la DRASI de Vannes et assure le lien avec les différents acteurs du système éducatif.'
    },
    'sophie-martin': {
        name: 'Sophie Martin',
        role: 'ASI - Responsable adjoint',
        email: 'sophie.martin@ac-rennes.fr',
        location: 'Vannes',
        photo: 'https://robohash.org/sophie.martin?set=set4&size=200x200',
        missions: [
            'Assistance à la direction',
            'Gestion des systèmes d\'information',
            'Coordination des projets numériques',
            'Support technique de niveau expert'
        ],
        description: 'Sophie assiste le responsable dans la gestion quotidienne et pilote les projets liés aux systèmes d\'information de l\'académie.'
    },
    'lucas-bernard': {
        name: 'Lucas Bernard',
        role: 'TECH',
        email: 'lucas.bernard@ac-rennes.fr',
        location: 'Vannes',
        photo: 'https://robohash.org/lucas.bernard?set=set4&size=200x200',
        missions: [
            'Support technique aux établissements',
            'Maintenance des infrastructures réseau',
            'Installation et configuration des équipements',
            'Formation des utilisateurs'
        ],
        description: 'Lucas assure le support technique de proximité et intervient dans les établissements pour résoudre les problématiques informatiques.'
    },
    'emma-leroy': {
        name: 'Emma Leroy',
        role: 'TECH CS',
        email: 'emma.leroy@ac-rennes.fr',
        location: 'Vannes',
        photo: 'https://robohash.org/emma.leroy?set=set4&size=200x200',
        missions: [
            'Support technique spécialisé',
            'Gestion des serveurs et infrastructures',
            'Cybersécurité',
            'Administration systèmes et réseaux'
        ],
        description: 'Emma est spécialisée dans l\'administration des systèmes complexes et la sécurité informatique de l\'académie.'
    },
    'pierre-moreau': {
        name: 'Pierre Moreau',
        role: 'ENS',
        email: 'pierre.moreau@ac-rennes.fr',
        location: 'Vannes',
        photo: 'https://robohash.org/pierre.moreau?set=set4&size=200x200',
        missions: [
            'Accompagnement pédagogique au numérique',
            'Formation des enseignants',
            'Développement de ressources numériques',
            'Conseil en intégration des TICE'
        ],
        description: 'Pierre accompagne les enseignants dans l\'intégration du numérique dans leurs pratiques pédagogiques.'
    },
    'julie-dubois': {
        name: 'Julie Dubois',
        role: 'TECH',
        email: 'julie.dubois@ac-rennes.fr',
        location: 'Queven',
        photo: 'https://robohash.org/julie.dubois?set=set4&size=200x200',
        missions: [
            'Support technique secteur Queven',
            'Maintenance préventive et curative',
            'Gestion du parc informatique',
            'Assistance aux utilisateurs'
        ],
        description: 'Julie assure le support technique pour le secteur de Queven et les établissements environnants.'
    },
    'thomas-petit': {
        name: 'Thomas Petit',
        role: 'ASI',
        email: 'thomas.petit@ac-rennes.fr',
        location: 'Queven',
        photo: 'https://robohash.org/thomas.petit?set=set4&size=200x200',
        missions: [
            'Administration des systèmes d\'information',
            'Gestion des bases de données',
            'Développement d\'applications',
            'Optimisation des processus'
        ],
        description: 'Thomas gère les systèmes d\'information et développe des solutions adaptées aux besoins des établissements.'
    },
    'camille-roux': {
        name: 'Camille Roux',
        role: 'ENS',
        email: 'camille.roux@ac-rennes.fr',
        location: 'Queven',
        photo: 'https://robohash.org/camille.roux?set=set4&size=200x200',
        missions: [
            'Formation au numérique éducatif',
            'Accompagnement des projets pédagogiques',
            'Création de contenus numériques',
            'Animation d\'ateliers pour enseignants'
        ],
        description: 'Camille forme et accompagne les équipes pédagogiques dans l\'usage des outils numériques en classe.'
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
    const memberCards = document.querySelectorAll('.member-card[data-member-id]');

    memberCards.forEach(card => {
        card.style.cursor = 'pointer';
        const memberId = card.getAttribute('data-member-id');

        card.addEventListener('click', function(e) {
            e.preventDefault();
            createMemberModal(memberId);
        });

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
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

