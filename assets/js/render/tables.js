/**
 * tables.js — tabuľky, ktoré sa generujú z dát: objem, frekvencia,
 * tier list a jeho dve detailné tabuľky, náhradné cviky.
 */

import { esc, fx, mount } from '../util.js';
import { VOLUME, FREQUENCY } from '../data/volume.js';
import { EXERCISES, groupLabel } from '../data/exercises.js';
import { SUBSTITUTIONS } from '../data/substitutions.js';

/** Tabuľka objemu vrátane verdiktu, či je partia v odporúčanom pásme. */
export function volumeTable() {
  const verdict = (v, min, max) => v < min
    ? ['t-no', 'pod rozsahom']
    : v > max ? ['t-part', 'nad rozsahom'] : ['t-ok', 'v rozsahu'];

  mount('#voltable', VOLUME.map((r) => {
    const [cls, label] = verdict(r.total4, r.min, r.max);
    return `<tr>
      <td><strong>${esc(r.group)}</strong></td>
      <td class="n">${fx(r.direct)}</td>
      <td class="n">${fx(r.indirect)}</td>
      <td class="n"><strong>${fx(r.total4)}</strong></td>
      <td class="n">${fx(r.total4 * 0.75)}</td>
      <td class="n">${r.min}–${r.max}</td>
      <td><span class="tag ${cls}">${label}</span></td>
    </tr>`;
  }).join(''));
}

/** Frekvencia zaťaženia partií — koľkokrát za týždeň teraz vs. optimum. */
export function frequencyTable() {
  mount('#freqtable', FREQUENCY.map((r) => `<tr>
    <td>${esc(r.group)}</td>
    <td class="n">${esc(r.now)}</td>
    <td class="n">${esc(r.opt)}</td>
    <td>${esc(r.note)}</td>
  </tr>`).join(''));
}

/** Tier board — päť riadkov S až D s kartičkami cvikov. */
export function tierBoard() {
  const tiers = ['S', 'A', 'B', 'C', 'D'];
  const empty = '<span class="small" style="color:var(--ink3);padding:4px">Žiadny cvik v tejto kategórii — a to je dobrá správa.</span>';

  mount('#tierboard', tiers.map((t) => {
    const items = EXERCISES.filter((e) => e.tier === t);
    const chips = items.length
      ? items.map((e) => {
        const state = e.state === 'new' ? ' new' : e.state === 'cut' ? ' cut' : '';
        return `<span class="chip${state}">${esc(e.name)}<span class="mg">${esc(groupLabel(e))}</span></span>`;
      }).join('')
      : empty;
    return `<div class="trow"><div class="tlabel t${t}">${t}</div><div class="titems">${chips}</div></div>`;
  }).join(''));
}

/** Dve detailné tabuľky pod tier boardom: čo máš teraz a čo odporúčam doplniť. */
export function tierTables() {
  const row = (e) => {
    const badge = e.state === 'new'
      ? ' <span class="badge b-new">Nové</span>'
      : e.state === 'cut' ? ' <span class="badge b-cut">Von</span>' : '';
    return `<tr>
      <td><strong>${esc(e.name)}</strong>${badge}</td>
      <td class="small">${esc(groupLabel(e))}</td>
      <td class="n"><span class="tiercell t${e.tier}">${e.tier}</span></td>
      <td>${e.why}</td>
      <td>${e.care}</td>
    </tr>`;
  };
  mount('#tiertable-current', EXERCISES.filter((e) => e.state !== 'new').map(row).join(''));
  mount('#tiertable-new', EXERCISES.filter((e) => e.state === 'new').map(row).join(''));

  // počty do nadpisov akordeónov, aby sa nemuseli udržiavať ručne
  const setCount = (sel, n, word) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = `${n} ${word}`;
  };
  setCount('#count-current', EXERCISES.filter((e) => e.state !== 'new').length, 'cvikov');
  setCount('#count-new', EXERCISES.filter((e) => e.state === 'new').length, 'cvikov');
}

/** Náhradné cviky, keď je stroj obsadený. */
export function substitutionTable() {
  mount('#substable', SUBSTITUTIONS.map((r) => `<tr>
    <td><strong>${esc(r.ex)}</strong></td>
    <td>${esc(r.a)}</td>
    <td>${esc(r.b)}</td>
    <td class="small">${esc(r.care)}</td>
  </tr>`).join(''));
}
