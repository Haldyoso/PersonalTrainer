/**
 * quickstart.js — úvodná obrazovka „Tvoj plán".
 *
 * Dlaždice dní sa počítajú z DAYS_4, nie prepisujú ručne — inak by sa po
 * zmene plánu rozišiel počet cvikov medzi úvodom a sekciou 08.
 */

import { esc, mount } from '../util.js';
import { DAYS_4 } from '../data/days.js';
import { RULES, HOLES, NEXT } from '../data/quickstart.js';

/** Štyri dlaždice tréningových dní — deň v týždni, náplň, počet cvikov, čas. */
export function dayTiles() {
  mount('#qs-days', DAYS_4.map((d) => `<a class="qtile" href="#plan">
    <span class="qday">${esc(d.id)}</span>
    <b>${esc(d.title)}</b>
    <span class="qmeta">${d.rows.length} cvikov · ${esc(d.mins)}</span>
  </a>`).join(''));
}

/** Päť pravidiel — očíslované, bez žargónu. */
export function rules() {
  mount('#qs-rules', RULES.map((r, i) => `<div class="qrule">
    <span class="qnum">${i + 1}</span>
    <div><h4>${esc(r.title)}</h4><p>${esc(r.body)}</p></div>
  </div>`).join(''));
}

/** Tri diery, každá jednou vetou v bežnej reči. */
export function holes() {
  mount('#qs-holes', HOLES.map((h) => `<div class="qhole">
    <h4>${esc(h.what)}</h4>
    <p>${esc(h.plain)}</p>
    <p class="qfix">${esc(h.fix)}</p>
  </div>`).join(''));
}

/** Rozcestník — odtiaľto sa ide do podrobností, ak ich chceš. */
export function next() {
  mount('#qs-next', NEXT.map((n) => `<a class="qnext" href="${n.href}">
    <b>${esc(n.label)}</b>
    <span>${esc(n.body)}</span>
  </a>`).join(''));
}

export function quickstart() {
  dayTiles();
  rules();
  holes();
  next();
}
