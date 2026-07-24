// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Project screenshot deck — cards swap places around the active one
const deck = document.getElementById('oms-deck');
if (deck) {
  const cards = Array.from(deck.querySelectorAll('.deck__card'));
  const labels = Array.from(document.querySelectorAll('.shots__tab'));
  const status = document.getElementById('deck-status');
  const names = labels.map((l) => l.textContent.trim());
  let index = 0;

  function renderDeck() {
    cards.forEach((card, i) => {
      const rel = (i - index + cards.length) % cards.length;
      const active = rel === 0;
      card.classList.toggle('is-active', active);
      card.classList.toggle('is-next', rel === 1);
      card.classList.toggle('is-prev', rel === cards.length - 1);
      // Only the front card is reachable — the ones behind are decorative
      card.setAttribute('aria-hidden', String(!active));
      const zoom = card.querySelector('.shots__zoom');
      if (zoom) zoom.tabIndex = active ? 0 : -1;
    });
    labels.forEach((l, i) => {
      if (i === index) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
    if (status) {
      status.textContent = `${index + 1} / ${cards.length} · ${names[index]} — tap the card to view it full size`;
    }
  }

  function moveDeck(delta) {
    index = (index + delta + cards.length) % cards.length;
    renderDeck();
  }

  labels.forEach((label, i) =>
    label.addEventListener('click', () => {
      index = i;
      renderDeck();
    })
  );
  deck.querySelector('.deck__nav--prev').addEventListener('click', () => moveDeck(-1));
  deck.querySelector('.deck__nav--next').addEventListener('click', () => moveDeck(1));
  deck.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    moveDeck(e.key === 'ArrowRight' ? 1 : -1);
  });

  renderDeck();
}

// Screenshot lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
let lastFocused = null;

function openLightbox(img, trigger) {
  lastFocused = trigger || document.activeElement;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

if (lightbox) {
  document.querySelectorAll('.shots__zoom').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(btn.querySelector('img'), btn));
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
