/* ========================================
   MAIN.JS - Script principal du site - VERSION CORRIGÉE
   Académie de Rennes - Équipe de Vannes
======================================== */

// ========================================
// CHARGEMENT DES COMPOSANTS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🚀 Initialisation du site...');
    
    // Charger le bandeau cookies
    fetch('components/cookie-banner.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('cookie-banner-placeholder').innerHTML = data;
            console.log('✅ HTML cookies chargé');
            if (window.initCookieSystem) {
                window.initCookieSystem();
            }
        })
        .catch(error => console.error('❌ Erreur chargement cookies:', error));
    
    // Charger le header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            console.log('✅ Header chargé');
            initMenuToggle();
            setActiveNavLink();
        })
        .catch(error => console.error('❌ Erreur chargement header:', error));
    
    // Charger le footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            console.log('✅ Footer chargé');
            
            setTimeout(() => {
                const manageCookiesLink = document.getElementById('manageCookiesLink');
                if (manageCookiesLink && window.CookieConsent) {
                    manageCookiesLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.CookieConsent.showBanner();
                    });
                }
            }, 500);
        })
        .catch(error => console.error('❌ Erreur chargement footer:', error));
});

// ========================================
// FONCTION : Définir le lien actif
// ========================================
function setActiveNavLink() {
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
}

// ========================================
// FONCTION : Menu hamburger - VERSION CORRIGÉE
// ========================================
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) {
        console.error('❌ Éléments menu non trouvés');
        return;
    }
    
    console.log('✅ Menu toggle initialisé');
    
    // Toggle du menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('🔘 Click sur menu toggle');
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Bloquer le scroll quand le menu est ouvert
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = navMenu.querySelectorAll('.nav-pill');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Click sur lien nav');
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            console.log('🔘 Click en dehors - fermeture menu');
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le menu lors du redimensionnement vers desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
}

// ========================================
// GESTION DU FORMULAIRE DE CONTACT
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            objet: document.getElementById('objet').value,
            message: document.getElementById('message').value,
            rgpd: document.getElementById('rgpd').checked
        };
        
        if (!formData.nom || !formData.email || !formData.objet || !formData.message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        if (!formData.rgpd) {
            alert('Veuillez accepter la politique de confidentialité.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        console.log('Données du formulaire:', formData);
        alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
        contactForm.reset();
    });
}

// ========================================
// ANIMATION AU SCROLL
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
    
    const animatedElements = document.querySelectorAll('.card, .member-card, .actualite-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

window.addEventListener('load', initScrollAnimations);

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
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
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

window.addEventListener('load', createBackToTopButton);

// ========================================
// CONSOLE INFO
// ========================================
console.log('%cAcadémie de Rennes - Équipe de Vannes', 'font-size: 16px; font-weight: bold; color: #228BCC;');
console.log('%cSite web responsive', 'font-size: 12px; color: #666;');