/* ========================================
   MAIN.JS - Script principal du site
   Académie de Rennes - Équipe de Vannes
======================================== */

// ========================================
// CHARGEMENT DES COMPOSANTS (Header & Footer)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Charger le header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initMenuToggle();
            setActiveNavLink();
        })
        .catch(error => console.error('Erreur lors du chargement du header:', error));
    
    // Charger le footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Erreur lors du chargement du footer:', error));
});

// ========================================
// FONCTION : Définir le lien actif dans la navigation
// ========================================
function setActiveNavLink() {
    // Attendre que le header soit chargé
    setTimeout(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-pill');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page') + '.html';
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }, 100);
}

// ========================================
// FONCTION : Menu hamburger pour mobile
// ========================================
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-pill');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ========================================
// GESTION DU FORMULAIRE DE CONTACT
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            objet: document.getElementById('objet').value,
            message: document.getElementById('message').value,
            rgpd: document.getElementById('rgpd').checked
        };
        
        // Validation
        if (!formData.nom || !formData.email || !formData.objet || !formData.message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        if (!formData.rgpd) {
            alert('Veuillez accepter la politique de confidentialité.');
            return;
        }
        
        // Validation email basique
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Simulation d'envoi (à remplacer par votre propre système d'envoi)
        console.log('Données du formulaire:', formData);
        
        // Message de confirmation
        alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// ========================================
// ANIMATION AU SCROLL (optionnel)
// ========================================
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
    
    // Observer les cartes et sections
    const animatedElements = document.querySelectorAll('.card, .member-card, .actualite-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialiser les animations au chargement
window.addEventListener('load', initScrollAnimations);

// ========================================
// SMOOTH SCROLL pour les liens d'ancrage
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens # vides ou sans cible
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// FONCTION : Retour en haut de page
// ========================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(button);
    
    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    // Action du bouton
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Créer le bouton au chargement
window.addEventListener('load', createBackToTopButton);

// ========================================
// CONSOLE INFO
// ========================================
console.log('%c🎓 Académie de Rennes - Équipe de Vannes', 'font-size: 16px; font-weight: bold; color: #000091;');
console.log('%cSite web développé avec ❤️', 'font-size: 12px; color: #666;');