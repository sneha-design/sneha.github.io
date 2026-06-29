// main.js — interactions for the static portfolio site.
// Replaces the prototype's React state with plain DOM handlers:
//   • mobile nav drawer (hamburger)
//   • case-study visual lightbox (click a figure to enlarge)
//   • book-cover fade-in once the image actually decodes
//   • current year in the footer

(() => {
  // ── mobile nav ────────────────────────────────────────────────
  const burger = document.querySelector('.nav-burger');
  const drawer = document.querySelector('.nav-drawer');
  if (burger && drawer) {
    const setNav = (open) => {
      burger.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', () => setNav(!drawer.classList.contains('open')));
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setNav(false)));
    const mark = document.querySelector('.nav-mark');
    if (mark) mark.addEventListener('click', () => setNav(false));
  }

  // ── book covers: reveal once the real cover decodes ───────────
  document.querySelectorAll('.book-cover-img').forEach((img) => {
    const reveal = () => { if (img.naturalWidth > 1) img.closest('.book-cover').classList.add('loaded'); };
    if (img.complete) reveal(); else img.addEventListener('load', reveal);
  });

  // ── case-study visual lightbox ────────────────────────────────
  let lightbox = null;
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  function close() {
    if (!lightbox) return;
    lightbox.remove();
    lightbox = null;
    document.removeEventListener('keydown', onKey);
  }
  function open(viz) {
    close();
    lightbox = document.createElement('div');
    lightbox.className = 'cc-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cc-lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '✕';

    const figure = document.createElement('div');
    figure.className = 'cc-lightbox-fig';
    figure.appendChild(viz.cloneNode(true));

    lightbox.append(closeBtn, figure);
    lightbox.addEventListener('click', close);
    figure.addEventListener('click', (e) => e.stopPropagation());
    closeBtn.addEventListener('click', close);

    document.body.appendChild(lightbox);
    document.addEventListener('keydown', onKey);
  }
  document.querySelectorAll('.cc-fig').forEach((fig) => {
    fig.addEventListener('click', () => {
      const viz = fig.querySelector('.viz');
      if (viz) open(viz);
    });
  });

  // ── footer year ───────────────────────────────────────────────
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
