/**
 * util.js — spoločné pomôcky pre všetky renderery.
 *
 * Pozor na dva druhy reťazcov v dátach:
 *  - "čistý text"  → vždy prehnať cez esc()
 *  - "text s <em>"  → v dátach je zámerne HTML, escapovať sa NESMIE
 * Ktorý je ktorý, je zdokumentované pri každom poli v data/*.js.
 */

/** Paleta odvodená od CSS premenných v base.css — SVG ju potrebuje ako hodnoty. */
export const C = {
  ink: '#0e1216', ink2: '#5a636e', ink3: '#8d959e', line: '#d2d7dd',
  p25: '#bf3a2b', p20: '#17559b', p15: '#d99b00', p10: '#1f7a44', p05: '#78828d',
  band: '#cfe3d5', old: '#a8b0b8'
};

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Escapovanie pre text, ktorý ide do innerHTML. */
export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Číslo v slovenskom zápise: 10.5 → „10,5", 7.0 → „7". */
export const fx = (n) => Number(n).toFixed(1).replace('.', ',').replace(',0', '');

/** Obal na inline SVG s pevným viewBoxom — grafy sú responzívne cez šírku 100 %. */
export const svg = (w, h, inner) =>
  `<svg viewBox="0 0 ${w} ${h}" role="img" preserveAspectRatio="xMidYMin meet">${inner}</svg>`;

/**
 * Bezdiakritické malé písmená na porovnávanie pri vyhľadávaní.
 * „Zadný deltoid" a „zadny deltoid" musia nájsť to isté.
 */
const COMBINING = /[\u0300-\u036f]/g;
export const fold = (s) => String(s)
  .toLowerCase()
  .normalize('NFD')
  .replace(COMBINING, '');

/** Vloží HTML do prvku, ak prvok existuje. Chýbajúci cieľ nie je chyba — sekcia mohla vypadnúť. */
export const mount = (sel, html) => {
  const el = $(sel);
  if (el) el.innerHTML = html;
  return el;
};

/** Odstráni inline HTML z názvu cviku (alternatívy v <span class="small">, kurzíva). */
export const plain = (s) => String(s).replace(/<[^>]+>/g, '').trim();
