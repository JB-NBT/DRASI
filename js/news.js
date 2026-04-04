/* ══════════════════════════════════════════════
   NEWS — Chargement dynamique + modals
   Lit depuis /drasi/php/api/news.php (public)
══════════════════════════════════════════════ */

(function () {

  function fmtDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  function esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── Modal ───────────────────────────────── */
  function openNewsModal(item) {
    let modal = document.getElementById('news-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'news-modal';
      modal.className = 'news-modal';
      document.body.appendChild(modal);
    }

    const imgHtml = item.image
      ? `<div class="news-modal-img" style="background-image:url('/drasi/${esc(item.image)}')"></div>`
      : '';

    modal.innerHTML = `
      <div class="news-modal-overlay"></div>
      <div class="news-modal-content" role="dialog" aria-modal="true">
        <button class="news-modal-close" aria-label="Fermer">&#10005;</button>
        ${imgHtml}
        <div class="news-modal-inner">
          <div class="news-modal-date">${fmtDate(item.date_publication)}</div>
          <h3 class="news-modal-title">${esc(item.titre)}</h3>
          <div class="news-modal-body">${esc(item.contenu || item.extrait).replace(/\n/g, '<br>')}</div>
        </div>
      </div>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const close = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
    const onKey = e => { if (e.key === 'Escape') close(); };

    modal.querySelector('.news-modal-close').addEventListener('click', close);
    modal.querySelector('.news-modal-overlay').addEventListener('click', close);
    document.addEventListener('keydown', onKey);
  }

  /* ── Rendu des cartes ─────────────────────── */
  function renderNews(items) {
    const grid = document.getElementById('actualites-grid');
    if (!grid) return;

    if (!items.length) {
      grid.innerHTML = '<p style="color:var(--gris-50);grid-column:1/-1">Aucune actualité disponible.</p>';
      return;
    }

    grid.innerHTML = items.map((item, i) => {
      const imgHtml = item.image
        ? `<div class="actualite-img" style="background-image:url('/drasi/${esc(item.image)}')"></div>`
        : '';
      return `
        <article class="actualite-item actualite-card" data-index="${i}" tabindex="0" role="button" aria-label="Lire : ${esc(item.titre)}">
          ${imgHtml}
          <div class="actualite-body">
            <div class="actualite-date">${fmtDate(item.date_publication)}</div>
            <h3 class="actualite-title">${esc(item.titre)}</h3>
            <p class="actualite-excerpt">${esc(item.extrait)}</p>
            <span class="actualite-lire">Lire la suite <span aria-hidden="true">→</span></span>
          </div>
        </article>`;
    }).join('');

    grid.querySelectorAll('.actualite-card').forEach(card => {
      const open = () => openNewsModal(items[parseInt(card.dataset.index)]);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });
  }

  /* ── Chargement ──────────────────────────── */
  function loadNews() {
    fetch('/drasi/php/api/news.php')
      .then(r => r.json())
      .then(renderNews)
      .catch(() => {
        const grid = document.getElementById('actualites-grid');
        if (grid) grid.innerHTML = '<p style="color:var(--gris-50)">Impossible de charger les actualités.</p>';
      });
  }

  document.addEventListener('DOMContentLoaded', loadNews);

})();
