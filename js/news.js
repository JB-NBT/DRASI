/* ══════════════════════════════════════════════
   NEWS — Carrousel (max 6, affiche 3, navigation)
   Lit depuis /drasi/php/api/news.php (public)
══════════════════════════════════════════════ */

(function () {

  let allItems  = [];
  let pageIndex = 0;          // page courante (0 = items 0-2, 1 = items 3-5)
  const PER_PAGE = 3;

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

  /* ── Rendu d'une page du carrousel ──────── */
  function renderPage() {
    const grid = document.getElementById('actualites-grid');
    if (!grid) return;

    const start = pageIndex * PER_PAGE;
    const slice = allItems.slice(start, start + PER_PAGE);
    const total = allItems.length;
    const totalPages = Math.ceil(total / PER_PAGE);

    grid.innerHTML = slice.map((item, i) => {
      const idx = start + i;
      const imgHtml = item.image
        ? `<div class="actualite-img" style="background-image:url('/drasi/${esc(item.image)}')"></div>`
        : '';
      return `
        <article class="actualite-item actualite-card" data-index="${idx}" tabindex="0" role="button" aria-label="Lire : ${esc(item.titre)}">
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
      const open = () => openNewsModal(allItems[parseInt(card.dataset.index)]);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });

    /* Navigation */
    const nav = document.getElementById('news-carousel-nav');
    if (nav) {
      nav.innerHTML = totalPages > 1
        ? `<button class="news-carousel-btn" id="news-prev" ${pageIndex === 0 ? 'disabled' : ''}>&#8592; Précédentes</button>
           <span class="news-carousel-count">${pageIndex + 1} / ${totalPages}</span>
           <button class="news-carousel-btn" id="news-next" ${pageIndex >= totalPages - 1 ? 'disabled' : ''}>Suivantes &#8594;</button>`
        : '';

      document.getElementById('news-prev')?.addEventListener('click', () => { pageIndex--; renderPage(); });
      document.getElementById('news-next')?.addEventListener('click', () => { pageIndex++; renderPage(); });
    }
  }

  /* ── Chargement ──────────────────────────── */
  function loadNews() {
    const grid = document.getElementById('actualites-grid');
    if (!grid) return;

    /* Injecter le conteneur de navigation s'il n'existe pas */
    let nav = document.getElementById('news-carousel-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.id = 'news-carousel-nav';
      nav.className = 'news-carousel-nav';
      grid.parentElement.appendChild(nav);
    }

    fetch('/drasi/php/api/news.php')
      .then(r => r.json())
      .then(items => {
        allItems  = items.slice(0, 6); // max 6
        pageIndex = 0;
        if (!allItems.length) {
          grid.innerHTML = '<p style="color:var(--gris-50);grid-column:1/-1">Aucune actualité disponible.</p>';
          return;
        }
        renderPage();
      })
      .catch(() => {
        if (grid) grid.innerHTML = '<p style="color:var(--gris-50)">Impossible de charger les actualités.</p>';
      });
  }

  document.addEventListener('DOMContentLoaded', loadNews);

})();
