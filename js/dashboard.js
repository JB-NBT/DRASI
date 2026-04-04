


/* ══════════════════════════════════════════════════════════
   1. PROTECTION PAR MOT DE PASSE
   
   Pour changer :
     1. Allez sur https://emn178.github.io/online-tools/sha256.html
     2. Saisissez votre nouveau mot de passe
     3. Remplacez la valeur de HASH_MDP ci-dessous
══════════════════════════════════════════════════════════ */

const HASH_MDP    = '741370be0a3f202cdf144f02126a8fb24aea735b0d9bfcdf88c9bb7654a5f6f5'; 
const SESSION_KEY = 'drasi_admin_auth';
const SESSION_TTL = 8 * 60 * 60 * 1000; // 8 heures en millisecondes

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

function isAuthenticated() {
  try {
    const s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    return s && s.ok && (Date.now() - s.ts < SESSION_TTL);
  } catch { return false; }
}

function unlock() {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ok: true, ts: Date.now() }));
  document.getElementById('lock-screen').style.display = 'none';
  document.getElementById('app-content').style.display = 'block';
}

async function checkPassword() {
  const input = document.getElementById('lock-input');
  const box   = document.getElementById('lock-box');
  const val   = input.value;

  if (!val) { showLockError('Veuillez saisir un mot de passe.'); return; }

  const hash = await sha256(val);
  input.value = '';

  if (hash === HASH_MDP) {
    document.getElementById('lock-error').textContent = '';
    box.classList.add('lock-success');
    setTimeout(unlock, 400);
  } else {
    box.classList.remove('lock-shake');
    void box.offsetWidth; // force reflow pour relancer l'animation
    box.classList.add('lock-shake');
    showLockError('Mot de passe incorrect. Veuillez réessayer.');
  }
}

function showLockError(msg) {
  const e = document.getElementById('lock-error');
  e.textContent = msg;
  e.classList.add('visible');
}

function toggleEye() {
  const input = document.getElementById('lock-input');
  input.type  = input.type === 'password' ? 'text' : 'password';
}

// Vérification immédiate : auth serveur (dashboard.php) ou session JS
if (window.DRASI_SERVER_AUTH || isAuthenticated()) {
  document.addEventListener('DOMContentLoaded', unlock);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lock-screen').style.display = 'flex';
    document.getElementById('app-content').style.display = 'none';
    setTimeout(() => document.getElementById('lock-input').focus(), 100);
  });
}


/* ══════════════════════════════════════════════════════════
   2. PATCH AUTO-REFRESH
   window.storage ne se déclenche PAS dans le même onglet.
   On intercepte saveConsent() pour appeler refreshAll()
   automatiquement après chaque action sur le consentement.
══════════════════════════════════════════════════════════ */

function patchCookieConsent() {
  if (!window.CookieConsent) return;
  const _save = window.CookieConsent.saveConsent.bind(window.CookieConsent);
  window.CookieConsent.saveConsent = function (prefs) {
    _save(prefs);
    setTimeout(refreshAll, 60);
  };
}


/* ══════════════════════════════════════════════════════════
   3. NAVIGATION
══════════════════════════════════════════════════════════ */

function switchTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('panel-' + tab)?.classList.add('active');
  document.getElementById('tab-'   + tab)?.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes(`'${tab}'`)) n.classList.add('active');
  });

  refreshAll();
}


/* ══════════════════════════════════════════════════════════
   4. REFRESH GLOBAL
══════════════════════════════════════════════════════════ */

function refreshAll() {
  renderStats();
  renderConsentPanel();
  renderCookies();
  renderAnalytics();
  renderStorage();
}


/* ══════════════════════════════════════════════════════════
   5. STAT CARDS
══════════════════════════════════════════════════════════ */

function renderStats() {
  document.getElementById('stat-cookies').textContent = getCookies().length;

  const consent = window.CookieConsent?.getConsent?.() ?? null;
  const cc      = document.getElementById('card-consent');

  if (consent) {
    document.getElementById('stat-consent').textContent =
      consent.analytics ? 'Accepté' : 'Refusé';
    document.getElementById('stat-consent-date').textContent =
      new Date(consent.timestamp).toLocaleDateString('fr-FR',
        { day: '2-digit', month: 'short', year: 'numeric' });
    cc.style.borderLeft = `3px solid ${consent.analytics ? 'var(--green)' : 'var(--red)'}`;
  } else {
    document.getElementById('stat-consent').textContent     = 'En attente';
    document.getElementById('stat-consent-date').textContent = 'Pas encore répondu';
    cc.style.borderLeft = '3px solid var(--amber)';
  }

  const s = window.Analytics?.getStats?.() ?? null;
  document.getElementById('stat-pageviews').textContent = s?.totalPageviews    ?? 0;
  document.getElementById('stat-avgtime').textContent   = s?.averageTimePerPage ?? 0;
}


/* ══════════════════════════════════════════════════════════
   6. PANNEAU CONSENTEMENT
══════════════════════════════════════════════════════════ */

function renderConsentPanel() {
  const consent = window.CookieConsent?.getConsent?.() ?? null;
  const el      = document.getElementById('consent-content');

  if (!consent) {
    el.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🔍</div>
      <div class="empty-title">Aucun consentement enregistré</div>
      <div class="empty-desc">Cliquez sur <strong>Revoir le bandeau</strong> pour tester.</div>
    </div>`;
    return;
  }

  const fmt = d => new Date(d);
  el.innerHTML = `
    <div class="consent-row">
      <div>
        <div class="consent-label">Cookies analytiques</div>
        <div class="consent-desc">Suivi anonyme des pages vues et temps passé</div>
      </div>
      <span class="badge ${consent.analytics ? 'badge-green' : 'badge-red'}">
        ${consent.analytics ? '✓ Autorisé' : '✕ Refusé'}
      </span>
    </div>
    <div class="consent-row">
      <div>
        <div class="consent-label">Cookies essentiels</div>
        <div class="consent-desc">Session et navigation (obligatoires)</div>
      </div>
      <span class="badge badge-green">✓ Toujours actif</span>
    </div>
    <div class="consent-row">
      <div><div class="consent-label">Enregistré le</div></div>
      <span class="code">${fmt(consent.timestamp).toLocaleString('fr-FR')}</span>
    </div>
    <div class="consent-row">
      <div>
        <div class="consent-label">Expire le</div>
        <div class="consent-desc">Durée légale : 1 an (CNIL)</div>
      </div>
      <span class="code">${fmt(consent.expires).toLocaleDateString('fr-FR',
        { day: '2-digit', month: 'long', year: 'numeric' })}</span>
    </div>
    <div class="consent-row">
      <div><div class="consent-label">Clé localStorage</div></div>
      <span class="code badge badge-gray">drasi_cookie_consent</span>
    </div>`;
}


/* ══════════════════════════════════════════════════════════
   7. LECTURE UNIFIÉE DU STOCKAGE
   cookies.js stocke dans localStorage/sessionStorage,
   pas dans document.cookie. On lit les trois sources.
══════════════════════════════════════════════════════════ */

function getBrowserCookies() {
  const raw = document.cookie;
  if (!raw.trim()) return [];
  return raw.split(';').map(c => {
    const i = c.indexOf('=');
    return { name: c.slice(0, i).trim(), value: c.slice(i + 1).trim(), src: 'cookie' };
  }).filter(c => c.name);
}

function getLocalStorageItems() {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    items.push({ name: key, value: localStorage.getItem(key), src: 'local' });
  }
  return items;
}

function getSessionStorageItems() {
  const items = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key === SESSION_KEY) continue; // on masque la clé d'auth interne
    items.push({ name: key, value: sessionStorage.getItem(key), src: 'session' });
  }
  return items;
}

// Toutes les entrées combinées (utilisé pour le compteur)
function getCookies() {
  return [...getBrowserCookies(), ...getLocalStorageItems(), ...getSessionStorageItems()];
}


/* ══════════════════════════════════════════════════════════
   8. TABLEAU COOKIES
══════════════════════════════════════════════════════════ */

function renderCookies() {
  const q      = (document.getElementById('cookie-search')?.value || '').toLowerCase();
  const filter = list =>
    q ? list.filter(c =>
      c.name.toLowerCase().includes(q) || c.value.toLowerCase().includes(q)) : list;

  const localList   = filter(getLocalStorageItems());
  const sessionList = filter(getSessionStorageItems());
  const browserList = filter(getBrowserCookies());
  const total       = localList.length + sessionList.length + browserList.length;

  document.getElementById('cookie-count-label').textContent = `(${total})`;
  const tbody = document.getElementById('cookie-table-body');

  if (!total) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state">
      <div class="empty-icon">🍪</div>
      <div class="empty-title">Aucune donnée trouvée</div>
      <div class="empty-desc">Acceptez les cookies sur une page du site pour les voir ici.</div>
    </div></td></tr>`;
    return;
  }

  const makeRow = (c, idx, badge, badgeCls, deleteAction) => {
    const isDrasi = c.name.startsWith('drasi_');
    let val = c.value || '';
    try { val = JSON.stringify(JSON.parse(val)); } catch (e) {}
    const short = val.length > 80 ? val.slice(0, 80) + '…' : val;
    return `<tr>
      <td style="color:var(--muted);font-family:var(--mono);font-size:11px">${String(idx).padStart(2, '0')}</td>
      <td>
        <span class="code" style="color:var(--blue)">${esc(c.name)}</span>
        ${isDrasi ? '<span class="badge badge-blue" style="margin-left:4px">DRASI</span>' : ''}
      </td>
      <td><span class="badge ${badgeCls}">${badge}</span></td>
      <td>
        <span class="code truncate" style="display:block;max-width:300px" title="${esc(val)}">
          ${esc(short) || '<em style="opacity:.4">vide</em>'}
        </span>
      </td>
      <td><button class="btn btn-danger btn-sm" onclick="${deleteAction}">✕</button></td>
    </tr>`;
  };

  let html = '';
  let idx  = 1;

  if (localList.length) {
    html += sectionHeader(`💾 localStorage (${localList.length})`, '— utilisé par cookies.js');
    localList.forEach(c => {
      html += makeRow(c, idx++, 'localStorage', 'badge-blue', `deleteLocalItem('${esc(c.name)}')`);
    });
  }

  if (sessionList.length) {
    html += sectionHeader(`🔄 sessionStorage (${sessionList.length})`);
    sessionList.forEach(c => {
      html += makeRow(c, idx++, 'sessionStorage', 'badge-amber', `deleteSessionItem('${esc(c.name)}')`);
    });
  }

  if (browserList.length) {
    html += sectionHeader(`🌐 Cookies HTTP (${browserList.length})`);
    browserList.forEach(c => {
      html += makeRow(c, idx++, 'cookie HTTP', 'badge-gray', `deleteBrowserCookie('${esc(c.name)}')`);
    });
  }

  tbody.innerHTML = html;
}

function sectionHeader(label, sub = '') {
  return `<tr><td colspan="5" style="background:var(--bg);padding:8px 18px">
    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)">
      ${label}
      ${sub ? `<span style="font-weight:400;opacity:.7"> ${sub}</span>` : ''}
    </span>
  </td></tr>`;
}

function addCookie() {
  const name  = document.getElementById('new-cookie-name').value.trim();
  const value = document.getElementById('new-cookie-value').value.trim();
  const type  = document.getElementById('new-cookie-type').value;
  if (!name) { toast('⚠ Nom requis', 'amber'); return; }

  if (type === 'local') {
    localStorage.setItem(name, value);
  } else if (type === 'session') {
    sessionStorage.setItem(name, value);
  } else {
    const days = parseInt(document.getElementById('new-cookie-days').value) || 7;
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${new Date(Date.now() + days * 864e5).toUTCString()}; path=/`;
  }

  document.getElementById('new-cookie-name').value  = '';
  document.getElementById('new-cookie-value').value = '';
  const label = type === 'local' ? 'localStorage' : type === 'session' ? 'sessionStorage' : 'cookie HTTP';
  toast(`"${name}" créé (${label})`);
  renderCookies(); renderStats();
}

function deleteBrowserCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  toast(`Cookie "${name}" supprimé`);
  renderCookies(); renderStats();
}

function deleteLocalItem(name) {
  localStorage.removeItem(name);
  toast(`localStorage "${name}" supprimé`);
  renderCookies(); renderStats();
}

function deleteSessionItem(name) {
  sessionStorage.removeItem(name);
  toast(`sessionStorage "${name}" supprimé`);
  renderCookies(); renderStats();
}

function deleteCookie(name) { deleteBrowserCookie(name); } // rétrocompatibilité


/* ══════════════════════════════════════════════════════════
   9. ANALYTICS
══════════════════════════════════════════════════════════ */

function renderAnalytics() {
  const s    = window.Analytics?.getStats?.() ?? null;
  const pvEl = document.getElementById('analytics-pageviews');
  const tmEl = document.getElementById('analytics-time');

  if (!s || !s.data.pageviews.length) {
    pvEl.innerHTML = `<div class="empty-state">
      <div class="empty-icon">📊</div>
      <div class="empty-title">Aucune donnée</div>
      <div class="empty-desc">Activez les analytics et naviguez sur le site.</div>
    </div>`;
  } else {
    pvEl.innerHTML =
      `<table><thead><tr>
        <th>URL</th><th>Titre</th><th>Horodatage</th><th>Session</th><th>Referrer</th>
      </tr></thead><tbody>` +
      s.data.pageviews.slice(-20).reverse().map(p => `<tr>
        <td class="code" style="color:var(--blue)">${esc(p.url)}</td>
        <td>${esc(p.title)}</td>
        <td class="code" style="font-size:11px">${new Date(p.timestamp).toLocaleString('fr-FR')}</td>
        <td class="code" style="font-size:11px;color:var(--muted)">${esc(p.sessionId.slice(0, 16))}…</td>
        <td class="code" style="font-size:11px">${esc(p.referrer || 'direct')}</td>
      </tr>`).join('') + `</tbody></table>`;
  }

  if (!s || !s.data.time?.length) {
    tmEl.innerHTML = `<div class="empty-state">
      <div class="empty-icon">⏱️</div>
      <div class="empty-title">Aucune donnée de temps</div>
    </div>`;
  } else {
    tmEl.innerHTML =
      `<table><thead><tr><th>URL</th><th>Temps (s)</th><th>Horodatage</th></tr></thead><tbody>` +
      s.data.time.slice(-20).reverse().map(t => `<tr>
        <td class="code" style="color:var(--blue)">${esc(t.url)}</td>
        <td><span class="badge badge-blue">${t.timeSpent}s</span></td>
        <td class="code" style="font-size:11px">${new Date(t.timestamp).toLocaleString('fr-FR')}</td>
      </tr>`).join('') + `</tbody></table>`;
  }
}


/* ══════════════════════════════════════════════════════════
   10. STOCKAGE LOCAL (vue JSON)
══════════════════════════════════════════════════════════ */

function renderStorage() {
  const drasiEl    = document.getElementById('storage-drasi');
  const sessEl     = document.getElementById('storage-session');
  const drasiItems = ['drasi_cookie_consent', 'drasi_analytics']
    .map(k => ({ key: k, value: localStorage.getItem(k) }))
    .filter(i => i.value !== null);

  drasiEl.innerHTML = !drasiItems.length
    ? `<div class="empty-state">
        <div class="empty-icon">💾</div>
        <div class="empty-title">Aucune donnée DRASI dans le localStorage</div>
      </div>`
    : drasiItems.map(item => `
        <div style="margin-bottom:12px">
          <div style="font-size:12px;font-weight:600;color:var(--blue);margin-bottom:6px;font-family:var(--mono)">
            ${esc(item.key)}
          </div>
          <div class="json-viewer">${syntaxHighlight(item.value)}</div>
        </div>`).join('');

  const sv = sessionStorage.getItem('drasi_session');
  sessEl.innerHTML = sv
    ? `<div class="consent-row">
        <div class="consent-label">drasi_session</div>
        <span class="code badge badge-gray">${esc(sv)}</span>
      </div>`
    : `<div class="empty-state">
        <div class="empty-icon">🔄</div>
        <div class="empty-title">Aucune session active</div>
      </div>`;
}


/* ══════════════════════════════════════════════════════════
   11. HELPERS
══════════════════════════════════════════════════════════ */

function syntaxHighlight(json) {
  try { json = JSON.stringify(JSON.parse(json), null, 2); } catch (e) { return esc(json); }
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+\.?\d*)/g,
    m => {
      let c = 'json-num';
      if (/^"/.test(m))         c = /:$/.test(m) ? 'json-key' : 'json-str';
      else if (/true|false/.test(m)) c = 'json-bool';
      else if (/null/.test(m))   c = 'json-null';
      return `<span class="${c}">${m}</span>`;
    }
  );
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function resetConsent() {
  localStorage.removeItem('drasi_cookie_consent');
  window.Analytics?.clearData?.();
  setTimeout(() => { window.CookieConsent?.showBanner?.(); refreshAll(); }, 100);
  toast('Consentement réinitialisé');
}

function clearEverything() {
  if (!confirm('Effacer tout le stockage DRASI et les cookies ?')) return;
  getBrowserCookies().forEach(c => {
    document.cookie = `${c.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  });
  localStorage.removeItem('drasi_cookie_consent');
  window.Analytics?.clearData?.();
  refreshAll();
  toast('Tout a été effacé');
}

function toast(msg, type = 'green') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.borderLeftColor = type === 'amber' ? 'var(--amber)' : '#f0c040';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}


/* ══════════════════════════════════════════════════════════
   12. INITIALISATION
══════════════════════════════════════════════════════════ */

window.addEventListener('load', function () {

  // Affiche/masque le champ "Durée" selon le type sélectionné
  document.getElementById('new-cookie-type')?.addEventListener('change', function () {
    const wrap = document.getElementById('new-cookie-days-wrap');
    if (wrap) wrap.style.display = this.value === 'http' ? '' : 'none';
  });

  // Chargement du vrai composant cookie-banner.html (comme main.js sur le site)
  fetch('components/cookie-banner.html')
    .then(r => {
      if (!r.ok) throw new Error('Composant introuvable');
      return r.text();
    })
    .then(html => {
      document.getElementById('cookie-banner-mount').innerHTML = html;
      if (typeof window.initCookieSystem === 'function') {
        window.initCookieSystem();
      }
      setTimeout(() => {
        patchCookieConsent();
        refreshAll();
      }, 600);
    })
    .catch(err => {
      console.warn('[Dashboard] cookie-banner.html non trouvé :', err.message);
      setTimeout(() => {
        patchCookieConsent();
        refreshAll();
      }, 800);
    });
});
