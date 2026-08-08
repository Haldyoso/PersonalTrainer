/**
 * exercise-index.js — filtrovateľný index všetkých hodnotených cvikov.
 *
 * Dokument sa dá čítať odhora nadol, ale v posilke potrebuješ opak:
 * „mám voľný kábel a chýbajú mi hamstringy — čo teraz". Na to je táto sekcia.
 *
 * Filtre: vnútri jednej skupiny platí OR, medzi skupinami AND.
 * Text prehľadáva názov, partiu, náradie aj odôvodnenie tieru.
 */

import { $, esc, fold, mount } from '../util.js';
import { EXERCISES, GROUPS, GEAR, STATE_LABEL, groupLabel } from '../data/exercises.js';

const TIERS = ['S', 'A', 'B', 'C', 'D'];
const STATES = ['keep', 'new', 'cut'];

/** Aktívny výber. Prázdna množina = filter neobmedzuje. */
const selected = { group: new Set(), tier: new Set(), gear: new Set(), state: new Set() };
let query = '';

const FACETS = [
  { key: 'group', label: 'Partia', values: () => GROUPS, text: (v) => v },
  { key: 'tier', label: 'Tier', values: () => TIERS, text: (v) => v },
  { key: 'gear', label: 'Náradie', values: () => GEAR, text: (v) => v },
  { key: 'state', label: 'Stav', values: () => STATES, text: (v) => STATE_LABEL[v] }
];

function matches(ex) {
  if (selected.group.size && !ex.groups.some((g) => selected.group.has(g))) return false;
  if (selected.tier.size && !selected.tier.has(ex.tier)) return false;
  if (selected.gear.size && !ex.gear.some((g) => selected.gear.has(g))) return false;
  if (selected.state.size && !selected.state.has(ex.state)) return false;
  if (query) {
    const haystack = fold([ex.name, groupLabel(ex), ex.gear.join(' '), ex.why, ex.care].join(' '));
    if (!haystack.includes(query)) return false;
  }
  return true;
}

function card(ex) {
  const badge = ex.state === 'new'
    ? '<span class="badge b-new">Nové</span>'
    : ex.state === 'cut' ? '<span class="badge b-cut">Von</span>' : '<span class="badge b-keep">V pláne</span>';
  return `<div class="xcard ${ex.tier}">
    <h4>${esc(ex.name)} <span class="tiercell t${ex.tier}">${ex.tier}</span></h4>
    <p class="meta">${esc(groupLabel(ex))} · ${esc(ex.gear.join(', '))} · ${badge}</p>
    <p><span class="lbl">Prečo tento tier</span>${ex.why}</p>
    <p><span class="lbl">Pozor na</span>${ex.care}</p>
  </div>`;
}

function renderResults() {
  const hits = EXERCISES.filter(matches);
  const counts = TIERS.map((t) => `${t}: ${hits.filter((h) => h.tier === t).length}`).join(' · ');
  mount('#x-count', hits.length
    ? `${hits.length} z ${EXERCISES.length} cvikov &nbsp;·&nbsp; ${counts}`
    : `Žiadny cvik nesedí na túto kombináciu. Uber jeden filter — najčastejšie to je náradie.`);
  mount('#x-grid', hits.map(card).join(''));
}

function renderFilters() {
  const html = FACETS.map((f) => {
    const chips = f.values().map((v) =>
      `<button type="button" class="fchip" data-facet="${f.key}" data-value="${esc(v)}" aria-pressed="false">${esc(f.text(v))}</button>`
    ).join('');
    return `<div class="fgroup"><span class="acclabel">${f.label}</span><div class="fchips">${chips}</div></div>`;
  }).join('');

  const el = mount('#x-filters', html);
  if (!el) return;

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('.fchip');
    if (!btn) return;
    const { facet, value } = btn.dataset;
    const set = selected[facet];
    if (set.has(value)) set.delete(value); else set.add(value);
    btn.setAttribute('aria-pressed', String(set.has(value)));
    renderResults();
  });
}

/** Textové pole nad indexom. */
function initQuery() {
  const input = $('#x-query');
  if (!input) return;
  input.addEventListener('input', () => {
    query = fold(input.value.trim());
    renderResults();
  });
}

/** Vyčistí všetky filtre — volá sa aj z globálneho vyhľadávania. */
export function resetExerciseFilters() {
  Object.values(selected).forEach((s) => s.clear());
  query = '';
  const input = $('#x-query');
  if (input) input.value = '';
  document.querySelectorAll('#x-filters .fchip').forEach((b) => b.setAttribute('aria-pressed', 'false'));
  renderResults();
}

/** Nastaví filter zvonku (napr. z výsledku vyhľadávania) a odscrolluje na index. */
export function filterByName(name) {
  resetExerciseFilters();
  query = fold(name);
  const input = $('#x-query');
  if (input) input.value = name;
  renderResults();
}

export function exerciseIndex() {
  renderFilters();
  initQuery();
  renderResults();
}
