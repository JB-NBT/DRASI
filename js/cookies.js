/* ========================================
   SYSTÈME DE GESTION DES COOKIES ET ANALYTICS
   Conforme RGPD pour l'Éducation Nationale
   Fichier: cookies.js
======================================== */

// ========================================
// CONFIGURATION
// ========================================
const COOKIE_CONFIG = {
    consentName: 'drasi_cookie_consent',
    analyticsName: 'drasi_analytics',
    consentDuration: 365, // 1 an
    analyticsDuration: 395, // 13 mois (recommandé CNIL)
    sessionName: 'drasi_session'
};

// ========================================
// CLASSE ANALYTICS - Collecte anonyme des données
// ========================================
class Analytics {
    constructor() {
        this.sessionId = this.getOrCreateSession();
        this.startTime = Date.now();
        this.pageViews = [];
        this.enabled = false;
    }
    
    // Créer ou récupérer un ID de session anonyme
    getOrCreateSession() {
        let sessionId = sessionStorage.getItem(COOKIE_CONFIG.sessionName);
        if (!sessionId) {
            sessionId = this.generateSessionId();
            sessionStorage.setItem(COOKIE_CONFIG.sessionName, sessionId);
        }
        return sessionId;
    }
    
    // Générer un ID de session anonyme (non identifiant)
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Activer le tracking
    enable() {
        this.enabled = true;
        this.trackPageView();
        this.trackTimeOnPage();
        console.log('📊 Analytics activées');
    }
    
    // Désactiver le tracking
    disable() {
        this.enabled = false;
        this.clearData();
        console.log('🚫 Analytics désactivées');
    }
    
    // Enregistrer une visite de page
    trackPageView() {
        if (!this.enabled) return;
        
        const pageData = {
            url: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            referrer: document.referrer || 'direct'
        };
        
        this.pageViews.push(pageData);
        this.saveToStorage(pageData);
        
        console.log('📄 Page vue enregistrée:', pageData);
    }
    
    // Suivre le temps passé sur la page
    trackTimeOnPage() {
        if (!this.enabled) return;
        
        // Enregistrer le temps au changement de page ou fermeture
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - this.startTime) / 1000); // en secondes
            
            const timeData = {
                url: window.location.pathname,
                timeSpent: timeSpent,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };
            
            this.saveToStorage(timeData, 'time');
            console.log(`⏱️ Temps sur la page: ${timeSpent}s`);
        });
    }
    
    // Sauvegarder les données (simulation - à remplacer par votre système)
    saveToStorage(data, type = 'pageview') {
        // IMPORTANT: Ici vous devez remplacer par votre système de stockage
        // Options possibles:
        // 1. Envoi vers un serveur interne
        // 2. Stockage dans une base de données
        // 3. Service analytics de l'Éducation Nationale
        
        try {
            // Récupérer les données existantes
            let analyticsData = JSON.parse(localStorage.getItem(COOKIE_CONFIG.analyticsName) || '{"pageviews": [], "time": []}');
            
            // Ajouter la nouvelle donnée
            if (type === 'time') {
                analyticsData.time = analyticsData.time || [];
                analyticsData.time.push(data);
            } else {
                analyticsData.pageviews = analyticsData.pageviews || [];
                analyticsData.pageviews.push(data);
            }
            
            // Limiter le stockage (garder seulement les 100 dernières entrées)
            if (analyticsData.pageviews.length > 100) {
                analyticsData.pageviews = analyticsData.pageviews.slice(-100);
            }
            if (analyticsData.time && analyticsData.time.length > 100) {
                analyticsData.time = analyticsData.time.slice(-100);
            }
            
            // Sauvegarder
            localStorage.setItem(COOKIE_CONFIG.analyticsName, JSON.stringify(analyticsData));
            
            // TODO: Envoyer au serveur
            // this.sendToServer(data);
            
        } catch (e) {
            console.error('Erreur sauvegarde analytics:', e);
        }
    }
    
    // Méthode pour envoyer au serveur (à implémenter)
    async sendToServer(data) {
        // EXEMPLE - À adapter selon votre infrastructure
        /*
        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Erreur envoi analytics:', error);
        }
        */
    }
    
    // Récupérer les statistiques (pour admin)
    getStats() {
        try {
            const data = JSON.parse(localStorage.getItem(COOKIE_CONFIG.analyticsName) || '{"pageviews": [], "time": []}');
            
            // Calculer des statistiques basiques
            const stats = {
                totalPageviews: data.pageviews.length,
                totalSessions: new Set(data.pageviews.map(p => p.sessionId)).size,
                averageTimePerPage: data.time.length > 0 
                    ? Math.round(data.time.reduce((acc, t) => acc + t.timeSpent, 0) / data.time.length)
                    : 0,
                mostVisitedPages: this.getMostVisitedPages(data.pageviews),
                data: data
            };
            
            return stats;
        } catch (e) {
            console.error('Erreur lecture stats:', e);
            return null;
        }
    }
    
    // Obtenir les pages les plus visitées
    getMostVisitedPages(pageviews) {
        const counts = {};
        pageviews.forEach(pv => {
            counts[pv.url] = (counts[pv.url] || 0) + 1;
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([url, count]) => ({ url, count }));
    }
    
    // Effacer toutes les données
    clearData() {
        localStorage.removeItem(COOKIE_CONFIG.analyticsName);
        sessionStorage.removeItem(COOKIE_CONFIG.sessionName);
        this.pageViews = [];
    }
}

// Instance globale
const analytics = new Analytics();

// ========================================
// GESTION DU CONSENTEMENT COOKIES
// ========================================
class CookieConsent {
    constructor() {
        this.banner = null;
        this.modal = null;
    }
    
    // Initialiser le système
    init() {
        this.createElements();
        this.attachEventListeners();
        this.checkConsent();
    }
    
    // Créer les éléments DOM
    createElements() {
        // Charger le HTML du bandeau et de la modal
        // (déjà présent dans le HTML via cookie-banner.html)
        this.banner = document.getElementById('cookieBanner');
        this.modal = document.getElementById('cookieModal');
    }
    
    // Attacher les événements
    attachEventListeners() {
        // Boutons du bandeau
        document.getElementById('acceptCookies')?.addEventListener('click', () => this.acceptAll());
        document.getElementById('refuseCookies')?.addEventListener('click', () => this.refuseAll());
        document.getElementById('customizeCookies')?.addEventListener('click', () => this.openModal());
        
        // Modal
        document.getElementById('closeModal')?.addEventListener('click', () => this.closeModal());
        document.querySelector('.cookie-modal-overlay')?.addEventListener('click', () => this.closeModal());
        document.getElementById('savePreferences')?.addEventListener('click', () => this.savePreferences());
    }
    
    // Vérifier le consentement existant
    checkConsent() {
        const consent = this.getConsent();
        
        if (consent === null) {
            // Pas de consentement : afficher le bandeau
            setTimeout(() => this.showBanner(), 1000);
        } else if (consent.analytics) {
            // Consentement accepté : activer analytics
            analytics.enable();
        }
    }
    
    // Récupérer le consentement stocké
    getConsent() {
        try {
            const consent = localStorage.getItem(COOKIE_CONFIG.consentName);
            return consent ? JSON.parse(consent) : null;
        } catch (e) {
            return null;
        }
    }
    
    // Sauvegarder le consentement
    saveConsent(preferences) {
        const consent = {
            analytics: preferences.analytics,
            timestamp: new Date().toISOString(),
            expires: new Date(Date.now() + COOKIE_CONFIG.consentDuration * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem(COOKIE_CONFIG.consentName, JSON.stringify(consent));
        
        // Activer/désactiver analytics selon le choix
        if (consent.analytics) {
            analytics.enable();
        } else {
            analytics.disable();
        }
    }
    
    // Accepter tous les cookies
    acceptAll() {
        this.saveConsent({ analytics: true });
        this.hideBanner();
        console.log('✅ Cookies acceptés');
    }
    
    // Refuser tous les cookies
    refuseAll() {
        this.saveConsent({ analytics: false });
        this.hideBanner();
        console.log('❌ Cookies refusés');
    }
    
    // Sauvegarder les préférences personnalisées
    savePreferences() {
        const analyticsEnabled = document.getElementById('analyticsToggle').checked;
        this.saveConsent({ analytics: analyticsEnabled });
        this.closeModal();
        this.hideBanner();
        console.log('💾 Préférences sauvegardées');
    }
    
    // Afficher le bandeau
    showBanner() {
        if (this.banner) {
            this.banner.classList.add('visible');
        }
    }
    
    // Masquer le bandeau
    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('visible');
        }
    }
    
    // Ouvrir la modal
    openModal() {
        if (this.modal) {
            // Pré-remplir l'état du toggle
            const consent = this.getConsent();
            if (consent) {
                document.getElementById('analyticsToggle').checked = consent.analytics;
            }
            this.modal.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Fermer la modal
    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('visible');
            document.body.style.overflow = '';
        }
    }
}

// ========================================
// INITIALISATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍪 Système de cookies initialisé');
    const cookieConsent = new CookieConsent();
    cookieConsent.init();
});

// ========================================
// FONCTION UTILITAIRE POUR ADMINISTRATEUR
// ========================================
// Taper dans la console : showAnalyticsStats()
window.showAnalyticsStats = function() {
    const stats = analytics.getStats();
    console.log('📊 STATISTIQUES DU SITE', stats);
    console.table(stats.mostVisitedPages);
    return stats;
};

// Export pour utilisation externe si nécessaire
window.Analytics = analytics;