/**
 * plan.js — karty tréningových dní, technika, longevity dashboard,
 * mezocyklus a ťaháky do posilky.
 */

import { esc, mount, plain } from '../util.js';
import { C } from '../util.js';
import { DAYS_4, DAYS_3, CHANGE_LABEL } from '../data/days.js';
import { TECHNIQUE } from '../data/technique.js';
import { LONGEVITY } from '../data/longevity.js';
import { PHASES, WEEKS, WEEK_PLAN, CHECKPOINTS } from '../data/mesocycle.js';

/** Karty tréningových dní — jedna karta = jeden deň rotácie. */
export function dayCards(list, target) {
  mount(target, list.map((d) => {
    const rows = d.rows.map((r) => {
      const [cls, label] = CHANGE_LABEL[r.change];
      return `<tr>
        <td><strong>${r.ex}</strong></td>
        <td class="n">${esc(r.sets)}</td>
        <td class="n">${esc(r.reps)}</td>
        <td class="n">${esc(r.rir)}</td>
        <td class="n">${esc(r.rest)}</td>
        <td class="small">${r.note}</td>
        <td><span class="badge ${cls}">${label}</span></td>
      </tr>`;
    }).join('');

    return `<div class="card">
      <h3 style="margin-bottom:4px">${esc(d.id)} — ${esc(d.title)}</h3>
      <p class="acclabel" style="margin-bottom:12px">${esc(d.mins)}</p>
      <div class="tscroll"><table>
        <thead><tr><th>Cvik</th><th class="n">Série</th><th class="n">Opak.</th><th class="n">RIR</th><th class="n">Pauza</th><th>Poznámka k technike</th><th>Zmena</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
  }).join(''));
}

/** Technika po dňoch — akordeón, v ňom pre každý cvik body / chyba / kontrola. */
export function techniqueSections() {
  mount('#techsections', TECHNIQUE.map((g) => {
    const items = g.items.map((e) => `<div style="padding-bottom:16px;margin-bottom:16px;border-bottom:1px solid var(--line2)">
      <h4 style="margin-bottom:8px;font-size:16px">${esc(e.name)}</h4>
      <p class="acclabel" style="margin-bottom:4px">Kľúčové body</p>
      <ul style="margin:0 0 10px;padding-left:18px;font-size:14px">${e.keys.map((k) => `<li>${k}</li>`).join('')}</ul>
      <p class="acclabel" style="margin-bottom:4px;color:var(--p25)">Najčastejšia chyba samoukov</p>
      <p style="font-size:14px;margin-bottom:10px">${e.mistake}</p>
      <p class="acclabel" style="margin-bottom:4px;color:var(--p10)">Ako si overíš, či to cítiš správne</p>
      <p style="font-size:14px;margin:0">${e.check}</p>
    </div>`).join('');

    return `<details class="acc"><summary>${esc(g.day)} <span class="acclabel">${g.items.length} cvikov</span></summary>
      <div class="accbody">${items}</div></details>`;
  }).join(''));
}

/** Longevity dashboard — šesť kariet s ukazovateľom pokrytia. */
export function longevityDashboard() {
  const state = { ok: ['t-ok', 'pokryté'], part: ['t-part', 'čiastočne'], no: ['t-no', 'chýba'] };
  const barColor = { ok: C.p10, part: C.p15, no: C.p25 };

  mount('#longdash', LONGEVITY.map((c) => {
    const [cls, label] = state[c.state];
    return `<div class="lcard ${c.state}">
      <span class="st tag ${cls}">${label}</span>
      <h4>${esc(c.title)}</h4>
      <div class="meter"><i style="width:${c.pct}%;background:${barColor[c.state]}"></i></div>
      <p class="small" style="margin-bottom:8px">${c.now}</p>
      <p class="small" style="margin:0"><strong>Čo s tým:</strong> ${esc(c.fix)}</p>
    </div>`;
  }).join(''));
}

/** Mezocyklus — pás 12 týždňov, legenda fáz, karty fáz a tabuľka týždeň po týždni. */
export function mesocycle() {
  mount('#meso-weeks', WEEKS.map((w) => {
    const p = PHASES[w.phase];
    return `<div class="wk ${p.css}" title="${esc(p.name)}"><b>${w.week}</b><span>${esc(p.short)}</span></div>`;
  }).join(''));

  mount('#meso-legend', Object.values(PHASES).map((p) =>
    `<span><i class="${p.css}"></i>${esc(p.name)} — ${esc(p.weeks)}</span>`
  ).join(''));

  mount('#meso-phases', Object.values(PHASES).map((p) => `<div class="card tight">
    <h3 style="margin-bottom:2px">${esc(p.name)}</h3>
    <p class="acclabel" style="margin-bottom:10px">${esc(p.weeks)} · ${esc(p.rir)} · ${esc(p.volume)}</p>
    <p style="margin-bottom:8px"><strong>${esc(p.goal)}</strong></p>
    <p class="small" style="margin:0">${esc(p.detail)}</p>
  </div>`).join(''));

  mount('#meso-table', WEEK_PLAN.map((r) => {
    const p = PHASES[r.phase];
    return `<tr>
      <td class="n"><strong>${esc(r.week)}</strong></td>
      <td><span class="badge b-keep">${esc(p.name)}</span></td>
      <td>${esc(r.action)}</td>
      <td class="small">${esc(r.watch)}</td>
    </tr>`;
  }).join(''));

  mount('#meso-checkpoints', CHECKPOINTS.map((c) => `<tr>
    <td><strong>${esc(c.what)}</strong></td>
    <td class="small">${esc(c.how)}</td>
    <td class="small">${esc(c.why)}</td>
  </tr>`).join(''));
}

/** Ťaháky do posilky — jedna karta na tréningový deň, prázdne políčka na dopísanie. */
export function cheatSheets() {
  mount('#sheets', DAYS_4.map((d) => {
    const rows = d.rows.map((r) => `<tr>
      <td><strong>${esc(plain(r.ex))}</strong></td>
      <td class="n">${esc(r.sets)} × ${esc(r.reps)}</td>
      <td class="n"><span class="blank"></span></td>
      <td class="n"><span class="blank"></span></td>
    </tr>`).join('');

    return `<div class="sheet">
      <h3>${esc(d.id)} — ${esc(d.title)}<span>${esc(d.mins)}</span></h3>
      <table>
        <thead><tr><th style="width:38%">Cvik</th><th class="n">Série × opak.</th><th class="n">Váha</th><th class="n">Skutočne</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="small" style="margin:10px 0 0;color:var(--ink2)">Rozcvička 5 min + rozohrievacie série 50 % × 8 → 70 % × 5 → 85 % × 3 na prvý cvik. Progresia: keď dáš horný okraj rozsahu vo všetkých sériách, pridaj váhu.</p>
    </div>`;
  }).join(''));
}

/**
 * Týždenný denník na tlač — prázdna mriežka pre jeden týždeň mezocyklu.
 * Zámerne bez cvikov: použiješ ju na ktorýkoľvek deň rotácie.
 */
export function logbook() {
  const rows = Array.from({ length: 8 }, () => `<tr>
    <td><span class="blank wide"></span></td>
    <td class="n"><span class="blank"></span></td>
    <td class="n"><span class="blank"></span></td>
    <td class="n"><span class="blank"></span></td>
    <td class="n"><span class="blank"></span></td>
  </tr>`).join('');

  mount('#logbook', `<div class="sheet">
    <h3>Denník — týždeň <span class="blank" style="min-width:34px"></span><span>dátum <span class="blank" style="min-width:70px"></span></span></h3>
    <table>
      <thead><tr><th style="width:40%">Cvik</th><th class="n">Váha</th><th class="n">Opakovania</th><th class="n">RIR</th><th class="n">Pozn.</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="small" style="margin:10px 0 0;color:var(--ink2)">Zapisuj <strong>všetky tri</strong> čísla. Bez RIR sa nedá povedať, či +1 opakovanie bola progresia alebo len horší odhad únavy z minulého týždňa.</p>
  </div>`);
}
