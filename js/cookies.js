/* ========================================
   SYSTÈME DE GESTION DES COOKIES ET ANALYTICS
   Conforme RGPD pour l'Éducation Nationale
   Fichier: cookies.js - VERSION CORRIGÉE
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
    
    getOrCreateSession() {
        let sessionId = sessionStorage.getItem(COOKIE_CONFIG.sessionName);
        if (!sessionId) {
            sessionId = this.generateSessionId();
            sessionStorage.setItem(COOKIE_CONFIG.sessionName, sessionId);
        }
        return sessionId;
    }
    
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    enable() {
        this.enabled = true;
        this.trackPageView();
        this.trackTimeOnPage();
        console.log('📊 Analytics activées');
    }
    
    disable() {
        this.enabled = false;
        this.clearData();
        console.log('🚫 Analytics désactivées');
    }
    
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
    
    trackTimeOnPage() {
        if (!this.enabled) return;
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
            
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
    
    saveToStorage(data, type = 'pageview') {
        try {
            let analyticsData = JSON.parse(localStorage.getItem(COOKIE_CONFIG.analyticsName) || '{"pageviews": [], "time": []}');
            
            if (type === 'time') {
                analyticsData.time = analyticsData.time || [];
                analyticsData.time.push(data);
            } else {
                analyticsData.pageviews = analyticsData.pageviews || [];
                analyticsData.pageviews.push(data);
            }
            
            if (analyticsData.pageviews.length > 100) {
                analyticsData.pageviews = analyticsData.pageviews.slice(-100);
            }
            if (analyticsData.time && analyticsData.time.length > 100) {
                analyticsData.time = analyticsData.time.slice(-100);
            }
            
            localStorage.setItem(COOKIE_CONFIG.analyticsName, JSON.stringify(analyticsData));
            
        } catch (e) {
            console.error('Erreur sauvegarde analytics:', e);
        }
    }
    
    getStats() {
        try {
            const data = JSON.parse(localStorage.getItem(COOKIE_CONFIG.analyticsName) || '{"pageviews": [], "time": []}');
            
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
    
    clearData() {
        localStorage.removeItem(COOKIE_CONFIG.analyticsName);
        sessionStorage.removeItem(COOKIE_CONFIG.sessionName);
        this.pageViews = [];
    }
}

const analytics = new Analytics();

// ========================================
// GESTION DU CONSENTEMENT COOKIES
// ========================================
class CookieConsent {
    constructor() {
        this.banner = null;
        this.modal = null;
        this.initialized = false;
    }
    
    // Initialiser le système (appelé après chargement du HTML)
    init() {
        console.log('🍪 Initialisation du système de cookies...');
        
        // Attendre que les éléments soient dans le DOM
        this.waitForElements().then(() => {
            this.banner = document.getElementById('cookieBanner');
            this.modal = document.getElementById('cookieModal');
            
            if (!this.banner || !this.modal) {
                console.error('❌ Éléments cookies non trouvés dans le DOM');
                return;
            }
            
            this.attachEventListeners();
            this.checkConsent();
            this.initialized = true;
            
            console.log('✅ Système de cookies initialisé');
        });
    }
    
    // Attendre que les éléments HTML soient chargés
    waitForElements() {
        return new Promise((resolve) => {
            const checkElements = () => {
                const banner = document.getElementById('cookieBanner');
                const modal = document.getElementById('cookieModal');
                
                if (banner && modal) {
                    resolve();
                } else {
                    setTimeout(checkElements, 100);
                }
            };
            checkElements();
        });
    }
    
    attachEventListeners() {
        // Boutons du bandeau
        document.getElementById('acceptCookies')?.addEventListener('click', () => this.acceptAll());
        document.getElementById('refuseCookies')?.addEventListener('click', () => this.refuseAll());
        document.getElementById('customizeCookies')?.addEventListener('click', () => this.openModal());
        
        // Modal
        document.getElementById('closeModal')?.addEventListener('click', () => this.closeModal());
        document.querySelector('.cookie-modal-overlay')?.addEventListener('click', () => this.closeModal());
        document.getElementById('savePreferences')?.addEventListener('click', () => this.savePreferences());
        
        // Lien "Gérer les cookies" dans le footer
        document.getElementById('manageCookiesLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showBanner();
        });
        
        console.log('✅ Event listeners attachés');
    }
    
    checkConsent() {
        const consent = this.getConsent();
        
        if (consent === null) {
            console.log('ℹ️ Pas de consentement trouvé, affichage du bandeau');
            setTimeout(() => this.showBanner(), 1000);
        } else {
            console.log('ℹ️ Consentement trouvé:', consent);
            if (consent.analytics) {
                analytics.enable();
            }
        }
    }
    
    getConsent() {
        try {
            const consent = localStorage.getItem(COOKIE_CONFIG.consentName);
            return consent ? JSON.parse(consent) : null;
        } catch (e) {
            return null;
        }
    }
    
    saveConsent(preferences) {
        const consent = {
            analytics: preferences.analytics,
            timestamp: new Date().toISOString(),
            expires: new Date(Date.now() + COOKIE_CONFIG.consentDuration * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem(COOKIE_CONFIG.consentName, JSON.stringify(consent));
        
        if (consent.analytics) {
            analytics.enable();
        } else {
            analytics.disable();
        }
        
        console.log('💾 Consentement sauvegardé:', consent);
    }
    
    acceptAll() {
        this.saveConsent({ analytics: true });
        this.hideBanner();
        console.log('✅ Tous les cookies acceptés');
    }
    
    refuseAll() {
        this.saveConsent({ analytics: false });
        this.hideBanner();
        console.log('❌ Tous les cookies refusés');
    }
    
    savePreferences() {
        const analyticsEnabled = document.getElementById('analyticsToggle')?.checked || false;
        this.saveConsent({ analytics: analyticsEnabled });
        this.closeModal();
        this.hideBanner();
        console.log('💾 Préférences personnalisées sauvegardées');
    }
    
    showBanner() {
        if (this.banner) {
            this.banner.classList.add('visible');
            console.log('👀 Bandeau affiché');
        }
    }
    
    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('visible');
            console.log('👋 Bandeau masqué');
        }
    }
    
    openModal() {
        if (this.modal) {
            const consent = this.getConsent();
            if (consent) {
                const toggle = document.getElementById('analyticsToggle');
                if (toggle) {
                    toggle.checked = consent.analytics;
                }
            }
            this.modal.classList.add('visible');
            document.body.style.overflow = 'hidden';
            console.log('📋 Modal ouverte');
        }
    }
    
    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('visible');
            document.body.style.overflow = '';
            console.log('📋 Modal fermée');
        }
    }
}

// ========================================
// INITIALISATION
// ========================================
const cookieConsent = new CookieConsent();

// Fonction d'initialisation globale
window.initCookieSystem = function() {
    console.log('🔄 Initialisation du système de cookies demandée');
    cookieConsent.init();
};

// Initialiser automatiquement si le DOM est déjà chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => window.initCookieSystem(), 500);
    });
} else {
    setTimeout(() => window.initCookieSystem(), 500);
}

// ========================================
// FONCTION UTILITAIRE POUR ADMINISTRATEUR
// ========================================
window.showAnalyticsStats = function() {
    const stats = analytics.getStats();
    console.log('📊 STATISTIQUES DU SITE', stats);
    if (stats && stats.mostVisitedPages) {
        console.table(stats.mostVisitedPages);
    }
    return stats;
};

// Export pour utilisation externe
window.Analytics = analytics;
window.CookieConsent = cookieConsent;