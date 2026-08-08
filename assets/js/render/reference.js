/**
 * reference.js — sekcie „Osem hodín za stolom" a „Slovník a miera istoty".
 */

import { esc, mount } from '../util.js';
import { DESK_EFFECTS, DESK_PROTOCOL, DESK_NOTES } from '../data/desk.js';
import { GLOSSARY, CONFIDENCE, CONFIDENCE_LEVELS } from '../data/glossary.js';

/** Tabuľka: čo sedenie robí, ako to zasahuje do tréningu, čím to vyvážiť. */
export function deskEffects() {
  mount('#desk-effects', DESK_EFFECTS.map((r) => `<tr>
    <td><strong>${esc(r.area)}</strong></td>
    <td>${esc(r.sitting)}</td>
    <td>${esc(r.training)}</td>
    <td class="small">${esc(r.fix)}</td>
  </tr>`).join(''));
}

/** Karty mikroprotokolu počas pracovného dňa. */
export function deskProtocol() {
  mount('#desk-protocol', DESK_PROTOCOL.map((c) => `<div class="dcard">
    <span class="when">${esc(c.when)}</span>
    <h4>${esc(c.title)}</h4>
    <ol>${c.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    <p class="cost">Stojí to: ${esc(c.cost)}</p>
  </div>`).join(''));

  mount('#desk-notes', `
    <div class="note"><b>Najlepšia poloha je tá ďalšia</b>${esc(DESK_NOTES.posture)}</div>
    <div class="note warn"><b>Čo si nekupovať</b>${esc(DESK_NOTES.gadgets)}</div>
    <div class="note bad"><b>Kde končí tento dokument</b>${esc(DESK_NOTES.pain)}</div>
  `);
}

/** Slovník pojmov — dva stĺpce, na mobile jeden. */
export function glossary() {
  mount('#glossary', GLOSSARY.map((g) => `<dl class="gterm">
    <dt>${esc(g.term)}${g.en && g.en !== '—' ? ` <span class="en">${esc(g.en)}</span>` : ''}</dt>
    <dd>${esc(g.def)}</dd>
  </dl>`).join(''));
}

/** Tabuľka priznanej miery istoty. */
export function confidence() {
  mount('#confidence', CONFIDENCE.map((c) => {
    const lvl = CONFIDENCE_LEVELS[c.level];
    return `<tr>
      <td>${esc(c.claim)}</td>
      <td><span class="conf ${lvl.css}">${esc(lvl.label)}</span></td>
      <td class="small">${c.note}</td>
    </tr>`;
  }).join(''));

  const counts = Object.entries(CONFIDENCE_LEVELS).map(([key, lvl]) =>
    `<span><i class="${lvl.css}"></i>${esc(lvl.label)} — ${CONFIDENCE.filter((c) => c.level === key).length}×</span>`
  ).join('');
  mount('#confidence-legend', counts);
}
