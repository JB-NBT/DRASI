// ========================================
// CONTACT.JS - Gestion du formulaire
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const recaptchaError = document.getElementById('recaptchaError');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche l'envoi par défaut
        
        // Masquer les messages précédents
        formMessage.style.display = 'none';
        recaptchaError.style.display = 'none';
        
        // Vérifier le reCAPTCHA EN PREMIER
        const recaptchaResponse = grecaptcha.getResponse();
        
        if (recaptchaResponse.length === 0) {
            // Si reCAPTCHA pas coché, on arrête tout
            recaptchaError.style.display = 'block';
            recaptchaError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false; // IMPORTANT : on arrête l'exécution
        }
        
        // Si on arrive ici, c'est que le reCAPTCHA est OK
        recaptchaError.style.display = 'none';
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        formData.append('g-recaptcha-response', recaptchaResponse);
        
        // Afficher un état de chargement
        const btnSubmit = contactForm.querySelector('.btn-submit');
        const originalText = btnSubmit.textContent;
        btnSubmit.textContent = 'Envoi en cours...';
        btnSubmit.disabled = true;
        
        // Envoyer le formulaire via AJAX
        fetch('php/traitement_contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Réactiver le bouton
            btnSubmit.textContent = originalText;
            btnSubmit.disabled = false;
            
            if (data.success) {
                formMessage.textContent = 'Votre message a été envoyé avec succès !';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                contactForm.reset();
                grecaptcha.reset();
                
                // Scroll vers le message de succès
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Masquer le message après 5 secondes
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                formMessage.textContent = data.message || 'Une erreur est survenue. Veuillez réessayer.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        })
        .catch(error => {
            // Réactiver le bouton
            btnSubmit.textContent = originalText;
            btnSubmit.disabled = false;
            
            formMessage.textContent = 'Erreur de connexion. Veuillez réessayer.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.error('Erreur:', error);
        });
    });
});