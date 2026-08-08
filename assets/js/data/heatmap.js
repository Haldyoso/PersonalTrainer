/**
 * heatmap.js — Graf 3: cvik × svalová partia v SÚČASNOM pláne.
 *
 * Hodnoty: 2 = primárne zapojenie, 1 = sekundárne, 0 = nulové.
 * Poradie čísel v `cells` presne kopíruje poradie v COLUMNS.
 * Prázdne stĺpce sú diery v pláne — to je celá pointa grafu.
 */
export const COLUMNS = ['Prsia', 'Pred. D', 'Boč. D', 'Zad. D', 'Lats', 'Str. chrbát',
  'Trapéz', 'Biceps', 'Triceps', 'Úchop', 'Kvadr.', 'Hamstr.', 'Gluteus', 'Lýtka', 'Core'];

export const HEATMAP = [
  { ex: 'DB incline bench press',       cells: [2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
  { ex: 'Machine fly (pec deck)',       cells: [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { ex: 'Low cable crossover',          cells: [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { ex: 'Cable triceps pushdown',       cells: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0] },
  { ex: 'EZ bar pushdown',              cells: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0] },
  { ex: 'Barbell bent-over row',        cells: [0, 0, 0, 1, 2, 2, 1, 1, 0, 1, 0, 0, 0, 0, 1] },
  { ex: 'Fixed lat pulldown',           cells: [0, 0, 0, 0, 2, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0] },
  { ex: 'Vertical row (stroj)',         cells: [0, 0, 0, 0, 2, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0] },
  { ex: 'Single-arm seated cable row',  cells: [0, 0, 0, 1, 2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 1] },
  { ex: 'Hammer curl',                  cells: [0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0] },
  { ex: 'DB alternating curl',          cells: [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0] },
  { ex: 'Preacher curl machine',        cells: [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0] },
  { ex: 'DB lateral raise',             cells: [0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
  { ex: 'DB seated shoulder press',     cells: [0, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
  { ex: 'Smith Romanian deadlift',      cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 0, 1] },
  { ex: 'Machine leg extension',        cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0] },
  { ex: 'Machine leg press (1 noha)',   cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0] },
  { ex: 'Machine seated calf raise',    cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0] }
];
