/**
 * nav.js — zvýrazňovanie aktívnej sekcie v navigácii, postupné odhaľovanie
 * obsahu pri scrollovaní a otváranie akordeónov pred tlačou.
 */

import { $$ } from '../util.js';
import { showAllExercises } from './exercise-index.js';

/** Podfarbí odkaz sekcie, ktorá je práve na obrazovke, a doscrolluje ho do pásu. */
export function initNav() {
  const links = $$('#nav a');
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === `#${e.target.id}`));
      const on = document.querySelector('#nav a.on');
      if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }, { rootMargin: '-15% 0px -70% 0px' });

  sections.forEach((s) => io.observe(s));
}

/** Karty a akordeóny sa objavia až keď na ne prídeš. Pri prefers-reduced-motion sa nič nedeje. */
export function initReveal() {
  const els = $$('section > .card, section > details, .sechead');
  els.forEach((e) => e.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => io.observe(e));
}

/**
 * Tlačidlá „Rozbaliť všetko / Zbaliť všetko".
 *
 * Akordeóny sú zámerne zavreté — dokument má cez 40 rozbaliteľných blokov
 * a otvorené naraz pôsobia ako stena textu. Kto chce čítať všetko, klikne raz.
 */
export function initExpander() {
  const all = () => $$('details.acc');
  const setAll = (open) => all().forEach((d) => { d.open = open; });

  $$('[data-expand]').forEach((btn) => {
    btn.addEventListener('click', () => setAll(btn.dataset.expand === 'open'));
  });
}

/**
 * Pred tlačou otvorí všetky akordeóny, po tlači vráti pôvodný stav.
 * Bez toho by sa vytlačila polovica dokumentu.
 */
export function initPrint() {
  const all = () => document.querySelectorAll('details.acc');
  window.addEventListener('beforeprint', () => {
    showAllExercises();
    all().forEach((d) => {
      d.dataset.was = d.open ? '1' : '0';
      d.open = true;
    });
  });
  window.addEventListener('afterprint', () => all().forEach((d) => {
    if (d.dataset.was === '0') d.open = false;
  }));

  $$('.printbtn').forEach((b) => b.addEventListener('click', () => window.print()));
}
