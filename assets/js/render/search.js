/**
 * search.js — jedno pole, ktoré nájde sekciu, cvik aj pojem.
 *
 * Ctrl+F v prehliadači hľadá len to, čo je práve rozbalené — a väčšina
 * dokumentu je v zabalených akordeónoch. Toto pole hľadá v dátach,
 * takže nájde aj cvik, ktorý je schovaný v zavretej tabuľke.
 */

import { $, esc, fold } from '../util.js';
import { EXERCISES, groupLabel } from '../data/exercises.js';
import { GLOSSARY } from '../data/glossary.js';
import { filterByName } from './exercise-index.js';

const MAX_PER_GROUP = 5;
let index = [];
let active = -1;

/** Postaví index až po vykreslení sekcií — názvy sekcií číta priamo z DOM. */
function buildIndex() {
  const sections = [...document.querySelectorAll('section[id]')].map((s) => {
    const h2 = s.querySelector('.sechead h2');
    const eyebrow = s.querySelector('.sechead .eyebrow');
    return {
      type: 'Sekcia',
      label: h2 ? h2.textContent.trim() : s.id,
      sub: eyebrow ? eyebrow.textContent.trim() : '',
      href: `#${s.id}`
    };
  });

  const exercises = EXERCISES.map((e) => ({
    type: 'Cvik',
    label: e.name,
    sub: `${groupLabel(e)} · tier ${e.tier}`,
    href: '#cviky',
    filter: e.name
  }));

  const terms = GLOSSARY.map((g) => ({
    type: 'Pojem',
    label: g.term,
    sub: g.def.length > 90 ? g.def.slice(0, 88) + '…' : g.def,
    href: '#slovnik'
  }));

  index = [...sections, ...exercises, ...terms].map((item) => ({
    ...item,
    hay: fold(`${item.label} ${item.sub}`)
  }));
}

function highlight(text, q) {
  if (!q) return esc(text);
  const i = fold(text).indexOf(q);
  if (i < 0) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}

function render(hits, q, box) {
  if (!hits.length) {
    box.innerHTML = '<p class="sempty">Nič také tu nie je. Skús názov cviku po anglicky — všetky sú vedené oficiálnym anglickým názvom.</p>';
    return;
  }
  const groups = ['Sekcia', 'Cvik', 'Pojem'];
  box.innerHTML = groups.map((g) => {
    const rows = hits.filter((h) => h.type === g).slice(0, MAX_PER_GROUP);
    if (!rows.length) return '';
    const links = rows.map((h) => {
      const filter = h.filter ? ` data-filter="${esc(h.filter)}"` : '';
      return `<a href="${h.href}"${filter}>${highlight(h.label, q)}<em>${esc(h.sub)}</em></a>`;
    }).join('');
    return `<div class="sgroup">${g}</div>${links}`;
  }).join('');
}

function setActive(box, delta) {
  const links = [...box.querySelectorAll('a')];
  if (!links.length) return;
  links.forEach((l) => l.classList.remove('on'));
  active = (active + delta + links.length) % links.length;
  links[active].classList.add('on');
  links[active].scrollIntoView({ block: 'nearest' });
}

export function initSearch() {
  const input = $('#site-search');
  const box = $('#site-results');
  const clear = $('#site-clear');
  if (!input || !box) return;

  buildIndex();

  const close = () => { box.hidden = true; active = -1; };

  const run = () => {
    const q = fold(input.value.trim());
    if (q.length < 2) { close(); return; }
    const hits = index.filter((i) => i.hay.includes(q));
    render(hits, q, box);
    box.hidden = false;
    active = -1;
  };

  input.addEventListener('input', run);
  input.addEventListener('focus', run);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { close(); input.blur(); return; }
    if (box.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(box, 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(box, -1); }
    else if (e.key === 'Enter') {
      const links = [...box.querySelectorAll('a')];
      const target = links[active] || links[0];
      if (target) { e.preventDefault(); target.click(); }
    }
  });

  box.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    if (a.dataset.filter) filterByName(a.dataset.filter);
    close();
    input.blur();
  });

  if (clear) {
    clear.addEventListener('click', () => { input.value = ''; close(); input.focus(); });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.searchbar')) close();
  });

  // Ctrl/Cmd + K otvorí vyhľadávanie odkiaľkoľvek
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });
}
