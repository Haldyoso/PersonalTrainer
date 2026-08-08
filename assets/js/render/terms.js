/**
 * terms.js — vysvetlivky odborných pojmov priamo v texte.
 *
 * Slovník na konci dokumentu je dobrý na dohľadanie, ale zlý na čítanie:
 * pri slove „hip hinge" nikto neodskočí o desať sekcií ďalej. Tento modul
 * podčiarkne prvý výskyt pojmu v každej sekcii a po kliknutí ukáže definíciu
 * na mieste.
 *
 * Prečo len prvý výskyt v sekcii: keby sa podčiarkli všetky, text by vyzeral
 * ako rozbité HTML a vysvetlivka by prestala byť signál.
 */

import { $, esc } from '../util.js';
import { GLOSSARY, INLINE_TERMS } from '../data/glossary.js';

/** Uzly, v ktorých sa pojmy nehľadajú — nadpisy, odkazy, ovládacie prvky. */
const SKIP = new Set(['A', 'BUTTON', 'H1', 'H2', 'H3', 'H4', 'SUMMARY', 'CODE', 'INPUT', 'OPTION']);
const LETTER = /\p{L}/u;

/** Definície podľa hesla, aby sa nemuselo hľadať v poli pri každom kliknutí. */
const DEFS = new Map(GLOSSARY.map((g) => [g.term, g]));

/**
 * Jeden regex pre všetky tvary naraz. Dlhšie tvary musia byť skôr,
 * inak by „RIR" zjedlo začiatok dlhšej frázy a „axiálne zaťaženie"
 * by sa nikdy nechytilo celé.
 */
function buildPattern() {
  const forms = [];
  INLINE_TERMS.forEach((t) => {
    if (!DEFS.has(t.term)) return; // heslo v slovníku neexistuje — ticho preskoč
    t.forms.forEach((f) => forms.push({ form: f, term: t.term }));
  });
  forms.sort((a, b) => b.form.length - a.form.length);
  const byForm = new Map(forms.map((f) => [f.form.toLowerCase(), f.term]));
  const escaped = forms.map((f) => f.form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return { re: new RegExp(`(${escaped.join('|')})`, 'giu'), byForm };
}

/** Pojem sa uzná len ako celé slovo — „MET" nesmie vyskočiť v strede slova. */
function isWholeWord(text, start, end) {
  const before = start > 0 ? text[start - 1] : '';
  const after = end < text.length ? text[end] : '';
  return !(before && LETTER.test(before)) && !(after && LETTER.test(after));
}

/** Nájde textové uzly, do ktorých sa smie zasahovať. */
function textNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || node.nodeValue.trim().length < 3) return NodeFilter.FILTER_REJECT;
      for (let el = node.parentElement; el && el !== root; el = el.parentElement) {
        if (SKIP.has(el.tagName) || el.classList.contains('term') || el.classList.contains('sechead')) {
          return NodeFilter.FILTER_REJECT;
        }
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const out = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) out.push(n);
  return out;
}

function markSection(section, pattern) {
  const used = new Set();
  textNodes(section).forEach((node) => {
    const text = node.nodeValue;
    pattern.re.lastIndex = 0;
    let match = null;
    // v jednom textovom uzle stačí prvý použiteľný nález
    for (let m = pattern.re.exec(text); m; m = pattern.re.exec(text)) {
      const term = pattern.byForm.get(m[0].toLowerCase());
      if (!term || used.has(term)) continue;
      if (!isWholeWord(text, m.index, m.index + m[0].length)) continue;
      match = { term, index: m.index, length: m[0].length };
      break;
    }
    if (!match) return;

    used.add(match.term);
    const after = node.splitText(match.index);
    after.splitText(match.length);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'term';
    btn.dataset.term = match.term;
    btn.setAttribute('aria-label', `${after.nodeValue} — vysvetliť pojem`);
    btn.textContent = after.nodeValue;
    after.parentNode.replaceChild(btn, after);
  });
}

/** Bublina s definíciou. Je len jedna a presúva sa — nie jedna na každý pojem. */
function createPopover() {
  const pop = document.createElement('div');
  pop.className = 'termpop';
  pop.hidden = true;
  pop.setAttribute('role', 'dialog');
  document.body.appendChild(pop);
  return pop;
}

export function initTerms() {
  const sections = [...document.querySelectorAll('section[id]')]
    .filter((s) => s.id !== 'slovnik'); // v slovníku by to bolo samo na seba
  if (!sections.length) return;

  const pattern = buildPattern();
  sections.forEach((s) => markSection(s, pattern));

  const pop = createPopover();
  let anchor = null;

  const hide = () => { pop.hidden = true; anchor = null; };

  const show = (btn) => {
    const def = DEFS.get(btn.dataset.term);
    if (!def) return;
    const en = def.en && def.en !== '—' ? ` <span class="en">${esc(def.en)}</span>` : '';
    pop.innerHTML = `<b>${esc(def.term)}${en}</b><p>${esc(def.def)}</p>
      <a href="#slovnik">celý slovník ↓</a>`;
    pop.hidden = false;

    const r = btn.getBoundingClientRect();
    const w = Math.min(320, window.innerWidth - 24);
    pop.style.width = `${w}px`;
    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
    const below = window.innerHeight - r.bottom;
    pop.style.left = `${left}px`;
    if (below < pop.offsetHeight + 16 && r.top > pop.offsetHeight + 16) {
      pop.style.top = `${r.top - pop.offsetHeight - 8}px`;
    } else {
      pop.style.top = `${r.bottom + 8}px`;
    }
    anchor = btn;
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.term');
    if (btn) {
      e.preventDefault();
      if (anchor === btn) hide(); else show(btn);
      return;
    }
    if (!e.target.closest('.termpop')) hide();
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
  window.addEventListener('scroll', () => { if (anchor) hide(); }, { passive: true });
  window.addEventListener('resize', hide);

  return { marked: document.querySelectorAll('.term').length };
}
