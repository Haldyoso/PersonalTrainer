/**
 * volume.js — objem po partiách.
 *
 * direct   … priame série za týždeň
 * indirect … nepriame série, už prenásobené koeficientom 0,5
 * total4   … direct + indirect
 * min/max  … odporúčané pásmo pre hypertrofiu (série / týždeň)
 * after    … objem po zmenách z optimalizovaného plánu
 *
 * Všetky čísla platia na týždeň so štyrmi tréningmi na pevných dňoch,
 * teda každá partia dostane svoj podnet raz za týždeň (hamstringy dvakrát).
 */
export const VOLUME = [
  { group: 'Prsia',              direct: 10.5, indirect: 0,   total4: 10.5, min: 10, max: 20, after: 10.5 },
  { group: 'Latissimus',         direct: 10.5, indirect: 0,   total4: 10.5, min: 10, max: 20, after: 10 },
  { group: 'Stredný chrbát',     direct: 3.5,  indirect: 3.5, total4: 7.0,  min: 8,  max: 16, after: 8.8 },
  { group: 'Predný deltoid',     direct: 3.5,  indirect: 1.8, total4: 5.3,  min: 6,  max: 12, after: 7.3 },
  { group: 'Bočný deltoid',      direct: 3.5,  indirect: 1.8, total4: 5.3,  min: 8,  max: 20, after: 8.5 },
  { group: 'Zadný deltoid',      direct: 0,    indirect: 1.8, total4: 1.8,  min: 6,  max: 16, after: 7.8 },
  { group: 'Horný trapéz',       direct: 0,    indirect: 0.9, total4: 0.9,  min: 4,  max: 12, after: 4.5 },
  { group: 'Biceps',             direct: 7.0,  indirect: 5.3, total4: 12.3, min: 8,  max: 16, after: 10 },
  { group: 'Triceps',            direct: 7.0,  indirect: 3.5, total4: 10.5, min: 8,  max: 16, after: 11.5 },
  { group: 'Predlaktia / úchop', direct: 0,    indirect: 2.6, total4: 2.6,  min: 3,  max: 8,  after: 6.5 },
  { group: 'Kvadriceps',         direct: 7.0,  indirect: 0,   total4: 7.0,  min: 10, max: 20, after: 9 },
  { group: 'Hamstringy',         direct: 3.5,  indirect: 0,   total4: 3.5,  min: 8,  max: 18, after: 11.5 },
  { group: 'Gluteus',            direct: 3.5,  indirect: 1.8, total4: 5.3,  min: 8,  max: 16, after: 10 },
  { group: 'Lýtka',              direct: 3.5,  indirect: 0,   total4: 3.5,  min: 6,  max: 16, after: 7 },
  { group: 'Vzpriamovače',       direct: 0,    indirect: 3.5, total4: 3.5,  min: 4,  max: 10, after: 8 },
  { group: 'Core',               direct: 0,    indirect: 0,   total4: 0,    min: 6,  max: 12, after: 8 }
];

/** Koľkokrát za týždeň partia dostane podnet — teraz vs. optimum. */
export const FREQUENCY = [
  { group: 'Prsia',          now: '1×', opt: '2×',
    note: 'Pri 10+ sériách na jeden tréning klesá kvalita posledných sérií. Rozdelenie na 2× týždenne dá lepší stimul pri rovnakom objeme — ale pri štyroch dňoch je 1× akceptovateľné, ak držíš intenzitu.' },
  { group: 'Chrbát',         now: '1×', opt: '2×',
    note: 'To isté. Chrbát znesie vysokú frekvenciu, regeneruje rýchlo.' },
  { group: 'Bočný deltoid',  now: '1×', opt: '2–3×',
    note: 'Malý sval, rýchla regenerácia, veľmi dobre reaguje na frekvenciu. Toto je najlacnejší zisk v pláne — pridaj bočné rozpaženie aj do dňa prsníkov.' },
  { group: 'Zadný deltoid',  now: '0×', opt: '2–3×',
    note: 'Nula priamej práce. Pri 3 tlakových cvikoch na prsia je to priama cesta k dopredu zrotovaným ramenám.' },
  { group: 'Biceps',         now: '1×', opt: '1–2×',
    note: 'Objem je nad rozsahom, frekvencia v poriadku. Skôr uber cvik než pridaj deň.' },
  { group: 'Triceps',        now: '1× (+ nepriamo 2×)', opt: '2×',
    note: 'Dva takmer identické cviky v jeden deň. Rozdeľ ich a zmeň jeden na overhead.' },
  { group: 'Kvadriceps',     now: '1×', opt: '2×',
    note: 'Pri 7 sériách raz týždenne je stimul podprahový pre niekoho, kto chce naberať.' },
  { group: 'Hamstringy',     now: '1×', opt: '2×',
    note: 'Najhoršie postihnutá partia. Riešenie: druhý dotyk (leg curl) v deň ramien.' },
  { group: 'Lýtka',          now: '1×', opt: '2–3×',
    note: 'Lýtka majú vysoký podiel pomalých vlákien a znesú vysokú frekvenciu. Seated calf raise trénuje soleus, gastrocnemius nemáš vôbec.' },
  { group: 'Core',           now: '0×', opt: '2–3×',
    note: 'Nula. Riešenie je zadarmo — do páuz medzi sériami.' }
];
