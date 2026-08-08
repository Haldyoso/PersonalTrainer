/**
 * main.js — jediný vstupný bod. index.html načítava len tento súbor,
 * všetko ostatné visí na ňom cez ES moduly.
 *
 * Poradie je zámerné: najprv sa vykreslí obsah, až potom sa nad hotovým
 * DOM-om postaví navigácia, vyhľadávanie a vysvetlivky pojmov — všetky tri
 * si čítajú hotový text zo stránky.
 */

import { renderCharts } from './render/charts.js';
import { volumeTable, frequencyTable, tierBoard, tierTables, substitutionTable } from './render/tables.js';
import { dayCards, techniqueSections, longevityDashboard, mesocycle, cheatSheets, logbook } from './render/plan.js';
import { quickstart } from './render/quickstart.js';
import { exerciseIndex } from './render/exercise-index.js';
import { deskEffects, deskProtocol, glossary, confidence } from './render/reference.js';
import { initNav, initReveal, initPrint, initExpander } from './render/nav.js';
import { initSearch } from './render/search.js';
import { initTerms } from './render/terms.js';
import { DAYS_4, DAYS_3 } from './data/days.js';

function renderAll() {
  quickstart();
  renderCharts();

  volumeTable();
  frequencyTable();
  tierBoard();
  tierTables();
  substitutionTable();

  dayCards(DAYS_4, '#daycards');
  dayCards(DAYS_3, '#daycards3');
  techniqueSections();
  longevityDashboard();
  mesocycle();
  cheatSheets();
  logbook();

  exerciseIndex();
  deskEffects();
  deskProtocol();
  glossary();
  confidence();
}

function boot() {
  renderAll();
  initNav();
  initReveal();
  initPrint();
  initExpander();
  initSearch();
  initTerms();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
