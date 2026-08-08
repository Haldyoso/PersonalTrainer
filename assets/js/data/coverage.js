/**
 * coverage.js — dáta troch grafov pokrytia.
 *
 * Hodnoty v RADAR a PATTERNS sú autorská škála 0–10 resp. 0–100 %,
 * nie meraná veličina. Priznané je to v sekcii „Slovník a miera istoty".
 */

/** Graf 2 — radar: pokrytie partií, teraz vs. optimalizovaný plán (0–10). */
export const RADAR = {
  axes: ['Prsia', 'Chrbát – šírka', 'Chrbát – hrúbka', 'Ramená', 'Biceps',
    'Triceps', 'Kvadriceps', 'Hamstringy', 'Gluteus + lýtka', 'Core + úchop'],
  now: [7, 7, 7, 3.5, 8, 5, 4, 2, 3, 0.5],
  opt: [8, 8, 8, 8.5, 8, 9, 8, 9, 8, 8]
};

/** Graf 4 — pokrytie pohybových vzorov v % (now = teraz, opt = po zmene). */
export const PATTERNS = [
  { name: 'Horizontálny tlak',          now: 60, opt: 90 },
  { name: 'Vertikálny tlak',            now: 85, opt: 85 },
  { name: 'Horizontálny ťah',           now: 90, opt: 90 },
  { name: 'Vertikálny ťah',             now: 70, opt: 80 },
  { name: 'Hip hinge',                  now: 55, opt: 90 },
  { name: 'Drep / knee extension',      now: 45, opt: 90 },
  { name: 'Knee flexion',               now: 0,  opt: 90 },
  { name: 'Jednostranná práca v stoji', now: 15, opt: 80 },
  { name: 'Core anti-extension',        now: 0,  opt: 85 },
  { name: 'Core anti-rotácia',          now: 0,  opt: 75 },
  { name: 'Loaded carry / úchop',       now: 0,  opt: 90 }
];

/**
 * Graf 5 — kľúčové pomery. Čísla sú podiel prvej strany (a) v percentách,
 * takže „now: 75" znamená 75 : 25 v prospech hornej časti tela.
 */
export const RATIOS = [
  { title: 'Tlak vs ťah',              a: 'Tlak',       b: 'Ťah',        now: 54.5, opt: 44.8, ideal: 45 },
  { title: 'Horná vs dolná časť tela', a: 'Horná',      b: 'Dolná',      now: 75,   opt: 64,   ideal: 60 },
  { title: 'Kvadriceps vs hamstringy', a: 'Kvadriceps', b: 'Hamstringy', now: 67,   opt: 44,   ideal: 50 }
];
