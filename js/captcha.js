/* ========================================
   SYSTÈME DE CAPTCHA MATHÉMATIQUE
   Protection anti-spam pour formulaire
======================================== */

class MathCaptcha {
    constructor() {
        this.num1 = 0;
        this.num2 = 0;
        this.correctAnswer = 0;
        this.operators = ['+', '-', 'x'];
        this.currentOperator = '+';
    }

    // Générer un nouveau calcul
    generate() {
        // Choisir un opérateur aléatoire
        this.currentOperator = this.operators[Math.floor(Math.random() * this.operators.length)];
        
        // Générer des nombres selon l'opérateur
        switch(this.currentOperator) {
            case '+':
                // Addition : nombres entre 1 et 20
                this.num1 = Math.floor(Math.random() * 20) + 1;
                this.num2 = Math.floor(Math.random() * 20) + 1;
                this.correctAnswer = this.num1 + this.num2;
                break;
                
            case '-':
                // Soustraction : s'assurer que le résultat est positif
                this.num1 = Math.floor(Math.random() * 20) + 10;
                this.num2 = Math.floor(Math.random() * 10) + 1;
                this.correctAnswer = this.num1 - this.num2;
                break;
                
            case 'x':
                // Multiplication : petits nombres
                this.num1 = Math.floor(Math.random() * 10) + 1;
                this.num2 = Math.floor(Math.random() * 10) + 1;
                this.correctAnswer = this.num1 * this.num2;
                break;
        }
        
        console.log('🔢 Nouveau CAPTCHA généré:', this.getQuestion(), '=', this.correctAnswer);
        
        return this.getQuestion();
    }

    // Obtenir la question formatée
    getQuestion() {
        return `${this.num1} ${this.currentOperator} ${this.num2}`;
    }

    // Vérifier la réponse
    verify(userAnswer) {
        const answer = parseInt(userAnswer);
        const isCorrect = answer === this.correctAnswer;
        
        console.log(isCorrect ? '✅ CAPTCHA correct' : '❌ CAPTCHA incorrect');
        
        return isCorrect;
    }
}

// Instance globale du CAPTCHA
const mathCaptcha = new MathCaptcha();

// ========================================
// INITIALISATION DU CAPTCHA
// ========================================
function initCaptcha() {
    console.log('🛡️ Initialisation du système CAPTCHA...');
    
    const captchaQuestion = document.getElementById('captchaQuestion');
    const captchaInput = document.getElementById('captcha');
    const refreshBtn = document.getElementById('refreshCaptcha');
    const contactForm = document.getElementById('contactForm');
    
    if (!captchaQuestion || !captchaInput || !refreshBtn || !contactForm) {
        console.error('❌ Éléments CAPTCHA non trouvés');
        return;
    }
    
    // Générer le premier CAPTCHA
    generateNewCaptcha();
    
    // Bouton refresh
    refreshBtn.addEventListener('click', function(e) {
        e.preventDefault();
        generateNewCaptcha();
        captchaInput.value = '';
        captchaInput.focus();
    });
    
    // Validation du formulaire avec CAPTCHA
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Vérifier tous les champs
        const formData = {
            nom: document.getElementById('nom').value.trim(),
            email: document.getElementById('email').value.trim(),
            telephone: document.getElementById('telephone').value.trim(),
            objet: document.getElementById('objet').value.trim(),
            message: document.getElementById('message').value.trim(),
            captcha: document.getElementById('captcha').value.trim(),
            rgpd: document.getElementById('rgpd').checked
        };
        
        // Validation des champs obligatoires
        if (!formData.nom || !formData.email || !formData.objet || !formData.message) {
            showError('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showError('Veuillez entrer une adresse email valide.');
            highlightField('email');
            return;
        }
        
        // Validation RGPD
        if (!formData.rgpd) {
            showError('Veuillez accepter la politique de confidentialité.');
            return;
        }
        
        // VÉRIFICATION DU CAPTCHA
        if (!formData.captcha) {
            showError('Veuillez répondre à la question de vérification.');
            highlightField('captcha');
            return;
        }
        
        if (!mathCaptcha.verify(formData.captcha)) {
            showError('La réponse au calcul est incorrecte. Veuillez réessayer.');
            highlightField('captcha');
            generateNewCaptcha();
            captchaInput.value = '';
            captchaInput.focus();
            return;
        }
        
        // ✅ TOUT EST BON - Envoyer le formulaire
        console.log('✅ Formulaire validé avec succès', formData);
        
        // Afficher un message de succès
        showSuccess('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        generateNewCaptcha();
        
        // Ici, vous pouvez ajouter l'envoi réel du formulaire vers un serveur
        // Par exemple avec fetch() vers un script PHP ou une API
    });
    
    console.log('✅ Système CAPTCHA initialisé');
}

// ========================================
// FONCTION : Générer un nouveau CAPTCHA
// ========================================
function generateNewCaptcha() {
    const captchaQuestion = document.getElementById('captchaQuestion');
    if (captchaQuestion) {
        const question = mathCaptcha.generate();
        captchaQuestion.textContent = question;
        
        // Animation de changement
        captchaQuestion.style.animation = 'none';
        setTimeout(() => {
            captchaQuestion.style.animation = 'captchaChange 0.3s ease';
        }, 10);
    }
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

// Afficher un message d'erreur
function showError(message) {
    // Supprimer les anciens messages
    removeMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message form-error';
    errorDiv.innerHTML = `
        <span class="message-icon">⚠️</span>
        <span class="message-text">${message}</span>
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Scroll vers le message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Afficher un message de succès
function showSuccess(message) {
    // Supprimer les anciens messages
    removeMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message form-success';
    successDiv.innerHTML = `
        <span class="message-icon">✅</span>
        <span class="message-text">${message}</span>
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll vers le message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Supprimer après 8 secondes
    setTimeout(() => {
        successDiv.remove();
    }, 8000);
}

// Supprimer les messages existants
function removeMessages() {
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(msg => msg.remove());
}

// Mettre en évidence un champ avec erreur
function highlightField(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('field-error');
        field.focus();
        
        // Retirer l'effet après 3 secondes
        setTimeout(() => {
            field.classList.remove('field-error');
        }, 3000);
    }
}

// ========================================
// INITIALISATION AU CHARGEMENT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que le formulaire soit chargé
    setTimeout(initCaptcha, 500);
});

// Export pour utilisation externe
window.MathCaptcha = MathCaptcha;
window.generateNewCaptcha = generateNewCaptcha;
