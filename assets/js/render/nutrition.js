/**
 * nutrition.js — vykreslenie jedálnička po odomknutí.
 *
 * Súčty kalórií a makier sa NEPÍŠU do dát, počítajú sa tu z tabuľky potravín.
 * Inak by stačilo zmeniť gramáž jednej položky a čísla v hlavičke by ticho
 * prestali sedieť — presne ten druh chyby, ktorý si nikto nevšimne.
 */

import { esc } from '../util.js';
import { lockedSection } from './locked.js';
import { STRAVA_ENC } from '../data/strava.enc.js';

const STORAGE_KEY = 'gapline.strava.code';

/** Sčíta kcal a makrá jedla podľa tabuľky potravín. */
function sumMeal(meal, foods) {
  return meal.items.reduce((acc, [key, grams]) => {
    const f = foods[key];
    if (!f) return acc;
    ['kcal', 'p', 'c', 'f'].forEach((k) => { acc[k] += f.per100[k] * grams / 100; });
    return acc;
  }, { kcal: 0, p: 0, c: 0, f: 0 });
}

const round = (n) => Math.round(n);
const macros = (s) => `${round(s.kcal)} kcal · ${round(s.p)} g B · ${round(s.c)} g S · ${round(s.f)} g T`;

function mealTable(meal, foods) {
  const rows = meal.items.map(([key, grams]) => {
    const f = foods[key];
    if (!f) return `<tr><td colspan="3">neznáma potravina: ${esc(key)}</td></tr>`;
    const kcal = round(f.per100.kcal * grams / 100);
    const p = (f.per100.p * grams / 100).toFixed(0);
    return `<tr>
      <td>${esc(f.name)}</td>
      <td class="n">${grams} ${esc(f.unit || 'g')}</td>
      <td class="n">${kcal} kcal</td>
      <td class="n">${p} g</td>
    </tr>`;
  }).join('');

  const s = sumMeal(meal, foods);
  return `<div class="meal">
    <h4><span class="mealwhen">${esc(meal.when)}</span> ${esc(meal.name)}
      <span class="mealsum">${round(s.kcal)} kcal · ${round(s.p)} g B</span></h4>
    <div class="tscroll"><table class="narrow">
      <thead><tr><th>Potravina</th><th class="n">Množstvo</th><th class="n">Energia</th><th class="n">Bielkoviny</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    ${meal.note ? `<p class="small" style="margin:8px 0 0">${esc(meal.note)}</p>` : ''}
  </div>`;
}

function dayCard(day, foods) {
  const total = day.meals.reduce((acc, m) => {
    const s = sumMeal(m, foods);
    ['kcal', 'p', 'c', 'f'].forEach((k) => { acc[k] += s[k]; });
    return acc;
  }, { kcal: 0, p: 0, c: 0, f: 0 });

  return `<details class="acc" open>
    <summary>${esc(day.name)} <span class="acclabel">${round(total.kcal)} kcal · ${round(total.p)} g B</span></summary>
    <div class="accbody">
      <p class="daysum">${macros(total)} &nbsp;·&nbsp; ${(total.p / 85).toFixed(1)} g bielkovín na kg</p>
      <p class="small" style="margin-bottom:16px">${esc(day.note)}</p>
      ${day.meals.map((m) => mealTable(m, foods)).join('')}
    </div>
  </details>`;
}

/** Vykreslí celý jedálniček do prvku, ktorý dodá zámok. */
function renderPlan(d, el) {
  el.innerHTML = `
    <p class="lead">${esc(d.intro)}</p>

    <div class="lgrid" style="margin-bottom:18px">
      ${d.targets.map((t) => `<div class="lcard">
        <h4>${esc(t.name)}</h4>
        <p class="acclabel" style="margin-bottom:8px">${esc(t.kcal)} · ${esc(t.protein)}</p>
        <p class="small" style="margin:0">${esc(t.note)}</p>
      </div>`).join('')}
    </div>

    ${d.days.map((day) => dayCard(day, d.foods)).join('')}

    <div class="grid2" style="margin-top:14px">
      ${d.adjust.map((a) => `<div class="note ${a.delta.startsWith('+') ? 'good' : 'warn'}">
        <b>${esc(a.name)} — ${esc(a.delta)}</b>
        <p class="small" style="margin:0 0 8px"><em>${esc(a.when)}</em></p>
        <ul style="margin:0;padding-left:18px;font-size:14px">
          ${a.steps.map((s) => `<li>${esc(s)}</li>`).join('')}
        </ul>
      </div>`).join('')}
    </div>

    <details class="acc" style="margin-top:14px">
      <summary>Výmeny — čím sa dá čo nahradiť <span class="acclabel">${d.swaps.length} položiek</span></summary>
      <div class="accbody"><div class="tscroll"><table>
        <thead><tr><th>V pláne</th><th>Namiesto toho</th><th>Pozor na</th></tr></thead>
        <tbody>${d.swaps.map((s) => `<tr>
          <td><strong>${esc(s.base)}</strong></td>
          <td>${s.alts.map(esc).join('<br>')}</td>
          <td class="small">${esc(s.note)}</td>
        </tr>`).join('')}</tbody>
      </table></div></div>
    </details>

    <details class="acc">
      <summary>Päť pravidiel k jedlu <span class="acclabel">bez nich to nefunguje</span></summary>
      <div class="accbody">
        ${d.rules.map((r, i) => `<div class="qrule">
          <span class="qnum">${i + 1}</span>
          <div><h4>${esc(r.title)}</h4><p>${esc(r.body)}</p></div>
        </div>`).join('')}
      </div>
    </details>

    <p class="small" style="margin-top:14px">${esc(d.disclaimer)}</p>
    <p class="acclabel" style="margin-top:10px">Naposledy upravené: ${esc(d.updated)}</p>`;
}

export function nutrition() {
  lockedSection({
    mount: '#strava',
    payload: STRAVA_ENC,
    storageKey: STORAGE_KEY,
    render: renderPlan
  });
}
