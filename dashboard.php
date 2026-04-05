<?php
require_once 'php/auth.php';
requireAuth();
$userEmail = htmlspecialchars($_SESSION['user_email'] ?? '');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DRASI - Tableau de bord RGPD</title>
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/dashboard-cookies.css">
  <link rel="stylesheet" href="css/cookies.css">
  <link rel="icon" type="image/png" href="images/logo-acad.png">
  <style>
    .logout-btn {
      font-size: 12px;
      padding: 6px 14px;
      border: 1px solid var(--border, #2d3748);
      border-radius: 6px;
      background: transparent;
      color: var(--muted, #94a3b8);
      cursor: pointer;
      text-decoration: none;
    }
    .logout-btn:hover { color: var(--red, #f87171); border-color: var(--red, #f87171); }
    .user-badge { font-size: 12px; color: var(--muted, #94a3b8); margin-right: 10px; }
    .bdd-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 20px; }
    .bdd-card { background: var(--surface, #1e2433); border: 1px solid var(--border, #2d3748); border-radius: 10px; padding: 16px; }
    .bdd-card-label { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted, #94a3b8); margin-bottom: 6px; }
    .bdd-card-value { font-size: 28px; font-weight: 700; }
    .bdd-card-sub { font-size: 11px; color: var(--muted, #94a3b8); margin-top: 4px; }
    .bdd-section { background: var(--surface, #1e2433); border: 1px solid var(--border, #2d3748); border-radius: 10px; padding: 18px; margin-bottom: 16px; }
    .bdd-section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--muted, #94a3b8); margin-bottom: 12px; }
    .bdd-loading { color: var(--muted, #94a3b8); font-size: 13px; padding: 20px 0; text-align: center; }
    .bdd-error { color: var(--red, #f87171); font-size: 13px; padding: 12px; }
    .rgpd-note { font-size: 11px; color: var(--muted, #94a3b8); border-left: 3px solid var(--amber, #f59e0b); padding-left: 10px; margin-bottom: 16px; }

    /* Séparateur + onglet Contenu */
    .tab-divider {
      display: inline-block;
      width: 1px;
      height: 18px;
      background: var(--border, #2d3748);
      margin: 0 6px;
      vertical-align: middle;
      align-self: center;
    }
    .tab.tab-content { color: var(--blue, #3b82f6); }
    .tab.tab-content.active { background: rgba(59,130,246,.12); color: var(--blue, #3b82f6); border-bottom-color: var(--blue, #3b82f6); }

    /* Toast amélioré */
    #toast {
      top: auto !important;
      bottom: 30px !important;
      right: 50% !important;
      transform: translateX(50%) translateY(16px) !important;
      padding: 14px 24px !important;
      border-radius: 10px !important;
      font-size: 14px !important;
      min-width: 220px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0,0,0,.35) !important;
    }
    #toast.show { transform: translateX(50%) translateY(0) !important; }

    /* Bannière succès formulaire news */
    .news-save-ok {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(74,222,128,.1);
      border: 1px solid #4ade80;
      border-radius: 8px;
      padding: 12px 16px;
      color: #4ade80;
      font-size: 13px;
      font-weight: 600;
      margin-top: 4px;
    }

    /* Champs formulaire dashboard */
    .dash-input {
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 9px 12px;
      font-size: 13px;
      color: #1e293b;
      font-family: inherit;
      outline: none;
      transition: border-color .15s, box-shadow .15s;
      resize: vertical;
    }
    .dash-input:focus {
      border-color: var(--blue, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59,130,246,.12);
    }
    .dash-input::placeholder { color: #94a3b8; }

    /* Upload image */
    .dash-file-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 10px 14px;
      border: 2px dashed #cbd5e1;
      border-radius: 6px;
      color: #64748b;
      font-size: 13px;
      transition: border-color .15s, color .15s;
    }
    .dash-file-label:hover { border-color: var(--blue, #3b82f6); color: var(--blue, #3b82f6); }
    .dash-file-input { display: none; }
    .news-img-preview {
      margin-top: 10px;
      position: relative;
      display: inline-block;
    }
    .news-img-preview img {
      max-width: 220px;
      max-height: 130px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      display: block;
    }
    .news-img-remove {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #ef4444;
      color: #fff;
      border: none;
      font-size: 11px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>

<div id="app-content">

  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo-area">
          <a href="index.html" aria-label="Retour à l'accueil">
            <img src="images/logo-acad.png" alt="Logo Académie de Rennes" class="logo-img">
          </a>
        </div>
        <div class="logo-area-text">
          <div class="logo-text">
            <p class="logo-title">Direction Régionale Académique des Systèmes d'Information</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="dashboard-header-badge">Tableau de bord RGPD &mdash; Accès restreint</span>
          <span class="user-badge"><?= $userEmail ?></span>
          <a href="/drasi/logout.php" class="logout-btn">Déconnexion</a>
        </div>
      </div>
    </div>
  </header>

  <div class="layout">

    <aside class="sidebar">
      <div class="sidebar-section">Navigation</div>
      <button class="nav-item active" onclick="switchTab('consentement')">Consentement</button>
      <button class="nav-item"        onclick="switchTab('cookies')">Cookies navigateur</button>
      <button class="nav-item"        onclick="switchTab('bdd'); loadBddStats();">Stats base de données</button>

      <div class="sidebar-section">Contenu du site</div>
      <button class="nav-item"        onclick="switchTab('news'); newsLoad();">Actualités</button>

      <div class="sidebar-section">Outils</div>
      <a class="nav-item" href="http://localhost/phpmyadmin5.2.3/" target="_blank" style="display:block;text-decoration:none">&#128451; phpMyAdmin</a>
      <a class="nav-item" href="http://localhost/glpi/public/" target="_blank" style="display:block;text-decoration:none">&#128295; GLPI</a>

      <div class="sidebar-section">Actions</div>
      <button class="nav-item" onclick="window.CookieConsent?.showBanner?.()">Revoir le bandeau</button>
      <button class="nav-item" onclick="refreshAll()">Rafraîchir</button>
    </aside>

    <main class="main">

      <div class="page-header">
        <div>
          <h2 class="page-title">Gestion des cookies</h2>
          <p class="page-sub">Tableau de bord RGPD &mdash; inspection en temps réel</p>
        </div>
        <div class="flex-gap">
          <button class="btn btn-danger btn-sm" onclick="clearEverything()">Tout effacer (local)</button>
        </div>
      </div>

      <!-- STATISTIQUES -->
      <div class="cards">
        <div class="card blue">
          <div class="card-label">Cookies</div>
          <div class="card-value" id="stat-cookies">&mdash;</div>
          <div class="card-sub">dans le navigateur</div>
        </div>
        <div class="card" id="card-consent">
          <div class="card-label">Consentement</div>
          <div class="card-value" id="stat-consent">&mdash;</div>
          <div class="card-sub" id="stat-consent-date">&ndash;</div>
        </div>
        <div class="card green">
          <div class="card-label">Pages vues</div>
          <div class="card-value" id="stat-pageviews">&mdash;</div>
          <div class="card-sub">analytics enregistrées</div>
        </div>
        <div class="card amber">
          <div class="card-label">Temps moyen</div>
          <div class="card-value" id="stat-avgtime">&mdash;</div>
          <div class="card-sub">secondes / page</div>
        </div>
      </div>

      <!-- ONGLETS -->
      <div class="tabs">
        <button class="tab active" id="tab-consentement" onclick="switchTab('consentement')">Consentement</button>
        <button class="tab"        id="tab-cookies"      onclick="switchTab('cookies')">Cookies navigateur</button>
        <button class="tab"        id="tab-bdd"          onclick="switchTab('bdd'); loadBddStats();">Stats BDD</button>
        <span class="tab-divider" aria-hidden="true"></span>
        <button class="tab tab-content" id="tab-news" onclick="switchTab('news'); newsLoad();">&#9998; Actualités</button>
      </div>

      <!-- PANNEAU : CONSENTEMENT -->
      <div class="tab-panel active" id="panel-consentement">
        <div class="info-block">
          Ce panneau reflète l'état du consentement enregistré par <code>cookies.js</code>
          via <code>localStorage["drasi_cookie_consent"]</code>.
          Le tableau de bord se met à jour <strong>automatiquement</strong> dès que l'utilisateur
          accepte, refuse ou personnalise les cookies.
        </div>
        <div class="consent-box">
          <div class="section-title">État du consentement actuel</div>
          <div id="consent-content">
            <div class="empty-state">
              <div class="empty-title">Aucun consentement enregistré</div>
              <div class="empty-desc">L'utilisateur n'a pas encore répondu au bandeau.</div>
            </div>
          </div>
        </div>
        <div class="flex-gap">
          <button class="btn btn-primary" onclick="window.CookieConsent?.acceptAll?.()">Accepter tout</button>
          <button class="btn"             onclick="window.CookieConsent?.refuseAll?.()">Refuser tout</button>
          <button class="btn btn-danger btn-sm" onclick="resetConsent()">Réinitialiser</button>
        </div>
      </div>

      <!-- PANNEAU : COOKIES -->
      <div class="tab-panel" id="panel-cookies">
        <div class="table-wrap">
          <div class="table-header">
            <span class="table-title">
              Données de stockage
              <span id="cookie-count-label" style="color:var(--muted);font-weight:400"></span>
            </span>
            <input
              type="text"
              id="cookie-search"
              class="table-filter"
              placeholder="Filtrer..."
              oninput="renderCookies()"
            >
          </div>
          <table>
            <thead>
              <tr><th>#</th><th>Nom</th><th>Type</th><th>Valeur</th><th>Action</th></tr>
            </thead>
            <tbody id="cookie-table-body"></tbody>
          </table>
        </div>
      </div>

      <!-- PANNEAU : ACTUALITÉS -->
      <div class="tab-panel" id="panel-news">
        <div class="page-header" style="margin-bottom:16px">
          <div><h3 style="margin:0;font-size:15px">Gestion des actualités</h3></div>
          <button class="btn btn-primary btn-sm" onclick="newsOpenForm()">+ Nouvelle actualité</button>
        </div>

        <!-- Formulaire ajout / édition -->
        <div class="bdd-section" id="news-form-wrap" style="display:none;margin-bottom:16px">
          <div class="bdd-section-title" id="news-form-title">Nouvelle actualité</div>
          <input type="hidden" id="nf-id">
          <div style="display:grid;gap:10px">
            <div>
              <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:4px">Titre *</label>
              <input type="text" id="nf-titre" class="dash-input" placeholder="Titre de l'actualité">
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <div>
                <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:4px">Date de publication</label>
                <input type="date" id="nf-date" class="dash-input">
              </div>
              <div>
                <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:4px">Ordre d'affichage</label>
                <input type="number" id="nf-ordre" class="dash-input" value="0" min="0">
              </div>
            </div>
            <div>
              <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:4px">Extrait (affiché sur la carte)</label>
              <textarea id="nf-extrait" class="dash-input" rows="2" placeholder="Court résumé..."></textarea>
            </div>
            <div>
              <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:4px">Contenu complet (affiché dans la modal)</label>
              <textarea id="nf-contenu" class="dash-input" rows="5" placeholder="Texte complet de l'actualité..."></textarea>
            </div>
            <div>
              <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:6px">Image</label>
              <label class="dash-file-label">
                <span>&#128247; Choisir une image (JPG, PNG, WebP — max 5 Mo)</span>
                <input type="file" id="nf-image-file" class="dash-file-input" accept="image/jpeg,image/png,image/webp,image/gif">
              </label>
              <input type="hidden" id="nf-image">
              <div id="nf-image-preview"></div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <input type="checkbox" id="nf-actif" checked>
              <label for="nf-actif" style="font-size:13px;cursor:pointer">Publier (visible sur le site)</label>
            </div>
            <div class="flex-gap">
              <button class="btn btn-primary" onclick="newsSave()">Enregistrer</button>
              <button class="btn" onclick="newsCloseForm()">Annuler</button>
            </div>
          </div>
        </div>

        <!-- Liste des actualités -->
        <div id="news-list"><div class="bdd-loading">Chargement…</div></div>
      </div>

      <!-- PANNEAU : STATS BDD -->
      <div class="tab-panel" id="panel-bdd">
        <div class="rgpd-note">
          Données issues de la base MySQL — rétention RGPD : consentements 3 ans (CNIL), analytics 13 mois.
        </div>
        <div id="bdd-content"><div class="bdd-loading">Chargement des données…</div></div>
      </div>

    </main>
  </div>

  <div id="cookie-banner-mount"></div>
  <div class="toast" id="toast"></div>

</div>

<script>
  // Signale au dashboard.js que l'auth est gérée côté serveur
  window.DRASI_SERVER_AUTH = true;

  /* ── Sécurité fermeture d'onglet ────────────────────────
     sessionStorage est vidé automatiquement quand l'onglet
     se ferme. Si le flag n'existe pas au chargement,
     on force la déconnexion (session PHP encore valide
     mais onglet réouvert = reconnexion obligatoire).
  ──────────────────────────────────────────────────────── */
  (function() {
    const FLAG = 'drasi_tab_active';
    const params = new URLSearchParams(window.location.search);

    if (params.has('login')) {
      // Connexion fraîche : on pose le flag et on nettoie l'URL
      sessionStorage.setItem(FLAG, '1');
      history.replaceState(null, '', '/drasi/dashboard.php');
    } else if (!sessionStorage.getItem(FLAG)) {
      // Onglet rouvert sans connexion → déconnexion forcée
      window.location.href = '/drasi/logout.php';
    }
  })();

  /* ── Timeout AFK ─────────────────────────────────────────
     Même durée que SESSION_TIMEOUT côté PHP (30 min).
     Avertissement à 5 min de la fin, déconnexion auto ensuite.
  ──────────────────────────────────────────────────────── */
  (function() {
    const TIMEOUT_MS  = 30 * 60 * 1000; // 30 min
    const WARN_BEFORE = 5  * 60 * 1000; // avertir 5 min avant
    let   timer, warnTimer;

    function resetTimers() {
      clearTimeout(timer);
      clearTimeout(warnTimer);
      dismissWarn();

      warnTimer = setTimeout(showWarn,    TIMEOUT_MS - WARN_BEFORE);
      timer     = setTimeout(autoLogout,  TIMEOUT_MS);
    }

    function showWarn() {
      let w = document.getElementById('afk-warn');
      if (!w) {
        w = document.createElement('div');
        w.id = 'afk-warn';
        w.style.cssText = `
          position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
          background:#1e2433;border:1px solid #f59e0b;border-radius:10px;
          padding:14px 22px;color:#e2e8f0;font-size:13px;z-index:9999;
          display:flex;align-items:center;gap:14px;box-shadow:0 8px 30px rgba(0,0,0,.4)`;
        document.body.appendChild(w);
      }
      w.innerHTML = `
        <span>⚠ Session inactive — déconnexion dans <strong id="afk-countdown">5:00</strong></span>
        <button onclick="window._afkReset()" style="
          background:var(--blue,#3b82f6);border:none;color:#fff;
          padding:5px 14px;border-radius:6px;cursor:pointer;font-size:12px">
          Rester connecté
        </button>`;
      startCountdown(WARN_BEFORE);
    }

    function startCountdown(ms) {
      const end = Date.now() + ms;
      const tick = () => {
        const el = document.getElementById('afk-countdown');
        if (!el) return;
        const left = Math.max(0, end - Date.now());
        const m    = Math.floor(left / 60000);
        const s    = Math.floor((left % 60000) / 1000);
        el.textContent = `${m}:${String(s).padStart(2,'0')}`;
        if (left > 0) setTimeout(tick, 1000);
      };
      tick();
    }

    function dismissWarn() {
      const w = document.getElementById('afk-warn');
      if (w) w.remove();
    }

    function autoLogout() {
      window.location.href = '/drasi/logout.php';
    }

    window._afkReset = function() {
      resetTimers();
    };

    // Réinitialise à chaque interaction utilisateur
    ['mousemove','keydown','click','scroll','touchstart'].forEach(ev => {
      document.addEventListener(ev, resetTimers, { passive: true });
    });

    resetTimers();
  })();
</script>
<script src="js/cookies.js"></script>
<script src="js/dashboard.js" defer></script>
<script>
/* ── Stats BDD ─────────────────────────────────────────── */
function loadBddStats() {
  const el = document.getElementById('bdd-content');
  fetch('/drasi/php/api/stats.php')
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(d => renderBddStats(d, el))
    .catch(e => { el.innerHTML = `<div class="bdd-error">Erreur : ${e.message}</div>`; });
}

function renderBddStats(d, el) {
  const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const fmtDate = s => s ? new Date(s).toLocaleString('fr-FR') : '—';
  const pct = (v, t) => t ? Math.round(v / t * 100) + '%' : '—';

  const c = d.consents || {};
  const pv = d.pageviews || {};

  let html = `
    <div class="bdd-grid">
      <div class="bdd-card">
        <div class="bdd-card-label">Consentements total</div>
        <div class="bdd-card-value">${c.total ?? 0}</div>
        <div class="bdd-card-sub">en base de données</div>
      </div>
      <div class="bdd-card" style="border-left:3px solid var(--green)">
        <div class="bdd-card-label">Acceptés</div>
        <div class="bdd-card-value" style="color:var(--green)">${c.accepted ?? 0}</div>
        <div class="bdd-card-sub">${pct(c.accepted, c.total)} du total</div>
      </div>
      <div class="bdd-card" style="border-left:3px solid var(--red)">
        <div class="bdd-card-label">Refusés</div>
        <div class="bdd-card-value" style="color:var(--red)">${c.refused ?? 0}</div>
        <div class="bdd-card-sub">${pct(c.refused, c.total)} du total</div>
      </div>
      <div class="bdd-card" style="border-left:3px solid var(--blue)">
        <div class="bdd-card-label">Pages vues (BDD)</div>
        <div class="bdd-card-value" style="color:var(--blue)">${pv.total ?? 0}</div>
        <div class="bdd-card-sub">${pv.sessions ?? 0} sessions distinctes</div>
      </div>
    </div>`;

  // Logs de connexion
  const ls = d.loginStats || {};
  html += `<div class="bdd-section">
    <div class="bdd-section-title">Connexions au dashboard (login.php)</div>
    <div class="bdd-grid" style="margin-bottom:14px">
      <div class="bdd-card"><div class="bdd-card-label">Total tentatives</div><div class="bdd-card-value">${ls.total ?? 0}</div></div>
      <div class="bdd-card" style="border-left:3px solid var(--green)"><div class="bdd-card-label">Réussies</div><div class="bdd-card-value" style="color:var(--green)">${ls.success ?? 0}</div></div>
      <div class="bdd-card" style="border-left:3px solid var(--red)"><div class="bdd-card-label">Échouées</div><div class="bdd-card-value" style="color:var(--red)">${ls.failed ?? 0}</div></div>
    </div>`;
  if (!d.loginLogs?.length) {
    html += `<div class="bdd-loading">Aucune connexion enregistrée</div>`;
  } else {
    html += `<table><thead><tr><th>Date</th><th>Email</th><th>Résultat</th><th>IP</th></tr></thead><tbody>`;
    d.loginLogs.forEach(r => {
      const badge = r.success == 1
        ? '<span class="badge badge-green">✓ Succès</span>'
        : '<span class="badge badge-red">✕ Échec</span>';
      html += `<tr>
        <td class="code" style="font-size:11px">${fmtDate(r.logged_at)}</td>
        <td>${esc(r.user_email)}</td>
        <td>${badge}</td>
        <td class="code" style="font-size:11px;color:var(--muted)">${esc(r.ip_address)}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  }
  html += `</div>`;

  // Derniers consentements
  html += `<div class="bdd-section">
    <div class="bdd-section-title">Derniers consentements enregistrés</div>`;
  if (!d.lastConsents?.length) {
    html += `<div class="bdd-loading">Aucune donnée</div>`;
  } else {
    html += `<table><thead><tr><th>Date</th><th>Action</th><th>Analytics</th><th>Session</th><th>Expire le</th></tr></thead><tbody>`;
    d.lastConsents.forEach(r => {
      const badge = r.analytics
        ? '<span class="badge badge-green">✓ Accepté</span>'
        : '<span class="badge badge-red">✕ Refusé</span>';
      html += `<tr>
        <td class="code" style="font-size:11px">${fmtDate(r.consented_at)}</td>
        <td><span class="badge badge-gray">${esc(r.action)}</span></td>
        <td>${badge}</td>
        <td class="code" style="font-size:11px;color:var(--muted)">${esc(r.session_id?.slice(0,20))}…</td>
        <td class="code" style="font-size:11px">${fmtDate(r.expires_at)}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  }
  html += `</div>`;

  // Top pages
  html += `<div class="bdd-section">
    <div class="bdd-section-title">Pages les plus visitées (analytics BDD)</div>`;
  if (!d.topPages?.length) {
    html += `<div class="bdd-loading">Aucune donnée analytics en base</div>`;
  } else {
    html += `<table><thead><tr><th>URL</th><th>Vues</th><th>Temps moyen</th></tr></thead><tbody>`;
    const timeMap = {};
    (d.avgTime || []).forEach(t => { timeMap[t.url] = t.avg_time; });
    d.topPages.forEach(p => {
      html += `<tr>
        <td class="code" style="color:var(--blue)">${esc(p.url)}</td>
        <td><span class="badge badge-blue">${p.views}</span></td>
        <td>${timeMap[p.url] ? timeMap[p.url] + 's' : '—'}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  }
  html += `</div>`;

  el.innerHTML = html;
}

/* ── Gestion des actualités ──────────────────────────────── */
let _newsList = [];

function newsLoad() {
  fetch('/drasi/php/api/news-admin.php')
    .then(r => r.json())
    .then(items => { _newsList = items; newsRender(items); })
    .catch(e => { document.getElementById('news-list').innerHTML = `<div class="bdd-error">Erreur : ${e.message}</div>`; });
}

function newsRender(items) {
  const el = document.getElementById('news-list');
  if (!items.length) {
    el.innerHTML = '<div class="bdd-loading">Aucune actualité. Créez-en une !</div>';
    return;
  }
  const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  el.innerHTML = items.map(n => `
    <div class="bdd-section" style="margin-bottom:10px;display:flex;align-items:flex-start;gap:14px;flex-wrap:wrap">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-weight:600;font-size:14px">${esc(n.titre)}</span>
          ${n.actif == 1 ? '<span class="badge badge-green">Publié</span>' : '<span class="badge badge-gray">Masqué</span>'}
        </div>
        <div style="font-size:12px;color:var(--muted)">${new Date(n.date_publication).toLocaleDateString('fr-FR')} &mdash; Ordre : ${n.ordre}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px">${esc(n.extrait?.slice(0,80))}…</div>
      </div>
      <div class="flex-gap" style="flex-shrink:0">
        <button class="btn btn-sm"            data-action="edit"   data-id="${n.id}">Modifier</button>
        <button class="btn btn-sm"            data-action="toggle" data-id="${n.id}">${n.actif == 1 ? 'Masquer' : 'Publier'}</button>
        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${n.id}">Supprimer</button>
      </div>
    </div>`).join('');

}

function newsOpenForm() {
  document.getElementById('nf-id').value       = '';
  document.getElementById('nf-titre').value    = '';
  document.getElementById('nf-date').value     = new Date().toISOString().slice(0,10);
  document.getElementById('nf-extrait').value  = '';
  document.getElementById('nf-contenu').value  = '';
  document.getElementById('nf-ordre').value    = 0;
  document.getElementById('nf-actif').checked  = true;
  newsRemoveImage();
  document.getElementById('news-form-title').textContent = 'Nouvelle actualité';
  document.getElementById('news-form-wrap').style.display = '';
  document.getElementById('nf-titre').focus();
}

function newsEdit(n) {
  document.getElementById('nf-id').value       = n.id;
  document.getElementById('nf-titre').value    = n.titre;
  document.getElementById('nf-date').value     = n.date_publication;
  document.getElementById('nf-extrait').value  = n.extrait ?? '';
  document.getElementById('nf-contenu').value  = n.contenu ?? '';
  document.getElementById('nf-ordre').value    = n.ordre;
  document.getElementById('nf-actif').checked  = n.actif == 1;
  document.getElementById('nf-image').value    = n.image ?? '';
  newsShowPreview(n.image);
  document.getElementById('news-form-title').textContent = 'Modifier l\'actualité';
  document.getElementById('news-form-wrap').style.display = '';
  document.getElementById('nf-titre').focus();
}

function newsCloseForm() {
  document.getElementById('news-form-wrap').style.display = 'none';
}

function newsSave() {
  const id     = document.getElementById('nf-id').value;
  const titre  = document.getElementById('nf-titre').value.trim();
  if (!titre) { toast('Titre requis', 'amber'); return; }

  const payload = {
    id:               id ? parseInt(id) : undefined,
    titre,
    date_publication: document.getElementById('nf-date').value,
    extrait:          document.getElementById('nf-extrait').value.trim(),
    contenu:          document.getElementById('nf-contenu').value.trim(),
    image:            document.getElementById('nf-image').value || null,
    ordre:            parseInt(document.getElementById('nf-ordre').value) || 0,
    actif:            document.getElementById('nf-actif').checked,
  };

  const method = id ? 'PUT' : 'POST';
  fetch('/drasi/php/api/news-admin.php', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(d => {
    if (!d.ok) throw new Error(d.error ?? 'Erreur');
    const msg = id ? 'Actualité modifiée avec succès' : 'Actualité créée avec succès';
    // Bannière verte dans le formulaire avant de le fermer
    const wrap = document.getElementById('news-form-wrap');
    const banner = document.createElement('div');
    banner.className = 'news-save-ok';
    banner.innerHTML = `<span>✓</span> ${msg}`;
    wrap.appendChild(banner);
    setTimeout(() => { newsCloseForm(); newsLoad(); }, 900);
    toast(msg);
  })
  .catch(e => toast(e.message, 'amber'));
}

function newsToggle(id, currentActif) {
  const item = _newsList.find(n => n.id == id);
  if (!item) return;
  fetch('/drasi/php/api/news-admin.php', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, actif: currentActif == 1 ? 0 : 1 })
  })
  .then(() => { newsLoad(); toast(currentActif == 1 ? 'Actualité masquée' : 'Actualité publiée'); })
  .catch(e => toast(e.message, 'amber'));
}

function newsDelete(id) {
  if (!confirm('Supprimer cette actualité ?')) return;
  fetch('/drasi/php/api/news-admin.php', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  .then(() => { newsLoad(); toast('Actualité supprimée'); })
  .catch(e => toast(e.message, 'amber'));
}

/* ── Upload image ─────────────────────────────────────────── */
document.addEventListener('change', function(e) {
  if (e.target.id !== 'nf-image-file') return;
  const file = e.target.files[0];
  if (!file) return;

  const fd = new FormData();
  fd.append('image', file);

  const preview = document.getElementById('nf-image-preview');
  preview.innerHTML = '<span style="font-size:12px;color:var(--muted)">Envoi en cours…</span>';

  fetch('/drasi/php/api/upload.php', { method: 'POST', body: fd })
    .then(r => r.json())
    .then(d => {
      if (!d.path) throw new Error(d.error ?? 'Erreur');
      document.getElementById('nf-image').value = d.path;
      newsShowPreview(d.path);
      toast('Image uploadée');
    })
    .catch(e => { preview.innerHTML = ''; toast(e.message, 'amber'); });
});

function newsShowPreview(path) {
  const preview = document.getElementById('nf-image-preview');
  if (!path) { preview.innerHTML = ''; return; }
  preview.innerHTML = `
    <div class="news-img-preview">
      <img src="/drasi/${path}" alt="Aperçu">
      <button class="news-img-remove" onclick="newsRemoveImage()" title="Supprimer l'image">&#10005;</button>
    </div>`;
}

function newsRemoveImage() {
  document.getElementById('nf-image').value = '';
  document.getElementById('nf-image-preview').innerHTML = '';
  document.getElementById('nf-image-file').value = '';
}

// Délégation d'événements pour les boutons de la liste actualités (ajouté une seule fois)
document.addEventListener('click', function(e) {
  const btn = e.target.closest('#news-list [data-action]');
  if (!btn) return;
  const id   = parseInt(btn.dataset.id);
  const item = _newsList.find(n => n.id == id);
  if (!item) return;
  const action = btn.dataset.action;
  if (action === 'edit')   newsEdit(item);
  if (action === 'toggle') newsToggle(item.id, item.actif);
  if (action === 'delete') newsDelete(item.id);
});

// Préchargement automatique — données prêtes dès l'arrivée sur le dashboard
window.addEventListener('load', function () {
  loadBddStats();
  newsLoad();
});

</script>

</body>
</html>
