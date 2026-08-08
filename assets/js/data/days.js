/**
 * days.js — optimalizovaný plán: 4-dňová rotácia a 3-dňová skrátená verzia.
 *
 * ex     … názov cviku; smie obsahovať <span class="small"> alebo <em> (neescapovať)
 * sets   … počet sérií
 * reps   … rozsah opakovaní alebo vzdialenosť pri carry
 * rir    … reps in reserve; „—" = neaplikovateľné
 * rest   … pauza medzi sériami
 * note   … poznámka k technike alebo dôvod zmeny
 * change … 'new' | 'keep' | 'move' | 'mod' | 'cut' — štítok v poslednom stĺpci
 */

export const CHANGE_LABEL = {
  new: ['b-new', 'Nové'],
  keep: ['b-keep', 'Ostáva'],
  move: ['b-move', 'Presunuté'],
  mod: ['b-mod', 'Upravené'],
  cut: ['b-cut', 'Von']
};

/** Hlavná verzia — 4 dni, rotujú sa bez ohľadu na deň v týždni. */
export const DAYS_4 = [
  {
    id: 'Deň 1', title: 'Prsia + triceps + zadný deltoid', mins: '~50 min', rows: [
      { ex: 'DB incline bench press', sets: '4', reps: '6–10', rir: '1–2', rest: '2–3 min', note: 'Lavička 30°. Prvý cvik dňa, tu je najviac energie.', change: 'keep' },
      { ex: 'Machine chest press <span class="small">al. flat DB press</span>', sets: '3–4', reps: '8–12', rir: '1–2', rest: '2 min', note: 'Ťažký horizontálny tlak — nahrádza low cable crossover.', change: 'new' },
      { ex: 'Machine fly (pec deck)', sets: '3', reps: '10–15', rir: '0–1', rest: '90 s', note: 'Izolácia po tlakoch. Lakte zafixované.', change: 'keep' },
      { ex: 'Overhead cable triceps extension', sets: '3', reps: '8–12', rir: '1', rest: '90 s', note: 'Rameno nad hlavou = dlhá hlava v natiahnutí. Nahrádza EZ bar pushdown.', change: 'new' },
      { ex: 'Cable triceps pushdown', sets: '3', reps: '10–15', rir: '0–1', rest: '75 s', note: 'Zostáva ako doplnok, už nie ako hlavný tricepsový cvik.', change: 'keep' },
      { ex: 'Reverse pec deck', sets: '3', reps: '12–20', rir: '0–1', rest: '60 s', note: 'Protiváha k trom tlakom. Ľahko a veľa opakovaní.', change: 'new' },
      { ex: '<em>V pauzách:</em> Pallof press', sets: '2', reps: '10 / strana', rir: '—', rest: '—', note: 'Anti-rotácia, nestojí extra čas.', change: 'new' }
    ]
  },
  {
    id: 'Deň 2', title: 'Chrbát + biceps + úchop', mins: '~50 min', rows: [
      { ex: 'Barbell bent-over row <span class="small">al. chest-supported row</span>', sets: '3–4', reps: '6–10', rir: '2', rest: '2–3 min', note: 'Nikdy bližšie než RIR 2. Krk v predĺžení chrbtice.', change: 'keep' },
      { ex: 'Lat pulldown <span class="small">al. pull-up</span>', sets: '3–4', reps: '8–12', rir: '1', rest: '2 min', note: 'Nechaj ramená ísť úplne hore v natiahnutí.', change: 'keep' },
      { ex: 'Single-arm seated cable row', sets: '3', reps: '10–15', rir: '1', rest: '90 s', note: 'Plný rozsah lopatky. Najlepší chrbtový cvik v pláne.', change: 'keep' },
      { ex: 'DB shrug', sets: '3', reps: '10–15', rir: '0–1', rest: '75 s', note: 'Horný trapéz — v pláne úplne chýbal.', change: 'new' },
      { ex: 'Hammer curl', sets: '3', reps: '8–12', rir: '1', rest: '90 s', note: 'Brachialis a brachioradialis.', change: 'keep' },
      { ex: 'Preacher curl machine', sets: '2', reps: '10–15', rir: '0–1', rest: '75 s', note: 'Znížené z 3–4 sérií — biceps mal najviac objemu z celého plánu.', change: 'mod' },
      { ex: "Farmer's carry", sets: '2', reps: '30–40 m', rir: '—', rest: '90 s', note: 'Najťažšie jednoručky, ktoré udržíš. Úchop + trup + kosti.', change: 'new' },
      { ex: '<em>V pauzách:</em> ab wheel rollout', sets: '3', reps: '8–15', rir: '1–2', rest: '—', note: 'Anti-extension. Alternatíva: cable crunch.', change: 'new' }
    ]
  },
  {
    id: 'Deň 3', title: 'Ramená + hamstringy + core', mins: '~48 min', rows: [
      { ex: 'DB seated shoulder press', sets: '3', reps: '6–10', rir: '1–2', rest: '2 min', note: 'Opierka ~80°, nie kolmo.', change: 'keep' },
      { ex: 'DB lateral raise', sets: '4', reps: '12–20', rir: '0–1', rest: '75 s', note: 'Zvýšené z 3 na 4 série. Ľahšie, viac opakovaní.', change: 'mod' },
      { ex: 'Cable lateral raise', sets: '3', reps: '12–20', rir: '0–1', rest: '60 s', note: 'Iná krivka odporu než jednoručka — odpor od prvého cm.', change: 'new' },
      { ex: 'Face pull', sets: '3', reps: '15–20', rir: '0–1', rest: '60 s', note: 'Zadný deltoid + externá rotácia. Kábel nad hlavou.', change: 'new' },
      { ex: 'Seated leg curl', sets: '3', reps: '10–15', rir: '0–1', rest: '90 s', note: 'Druhý dotyk hamstringov v týždni. Panvu drž pri operadle.', change: 'new' },
      { ex: '45° back extension', sets: '3', reps: '10–15', rir: '1–2', rest: '75 s', note: 'Gluteus + hamstringy + cielený tréning drieku.', change: 'new' },
      { ex: 'Hanging leg raise', sets: '3', reps: '8–15', rir: '1', rest: '60 s', note: 'Core + úchop. Panvu zaklop skôr, než dvihneš nohy.', change: 'new' },
      { ex: '<em>V pauzách:</em> seated calf raise', sets: '3', reps: '12–20', rir: '0', rest: '—', note: 'Soleus. Presunuté sem z dňa nôh.', change: 'move' }
    ]
  },
  {
    id: 'Deň 4', title: 'Nohy + lýtka', mins: '~55 min', rows: [
      { ex: 'Hack squat <span class="small">al. Smith squat</span>', sets: '4', reps: '6–10', rir: '1–2', rest: '2–3 min', note: 'Drepový vzor — v pláne chýbal. Stehná pod vodorovnú.', change: 'new' },
      { ex: 'Romanian deadlift <span class="small">voľná činka / jednoručky</span>', sets: '3–4', reps: '8–12', rir: '2', rest: '2 min', note: 'Preč zo Smithu. Váha pôjde dole o ~40 %, je to iný cvik.', change: 'mod' },
      { ex: 'Seated leg curl', sets: '3', reps: '10–15', rir: '0–1', rest: '90 s', note: 'Knee flexion — najväčšia diera plánu.', change: 'new' },
      { ex: 'Bulgarian split squat', sets: '2', reps: '8–12 / nohu', rir: '1–2', rest: '90 s', note: 'Nahrádza jednonožný leg press. Rovnováha a gluteus medius.', change: 'new' },
      { ex: 'Machine leg extension', sets: '3', reps: '12–20', rir: '0', rest: '60 s', note: 'Presunuté dozadu — izolácia patrí za viackĺbové cviky.', change: 'move' },
      { ex: 'Standing calf raise', sets: '4', reps: '8–15', rir: '0–1', rest: '75 s', note: 'Gastrocnemius — v pláne úplne chýbal. Plný rozsah, pauza dole.', change: 'new' },
      { ex: '<em>V rozcvičke:</em> 2 × 10 pogo hops', sets: '2', reps: '10', rir: '—', rest: '—', note: 'Nárazový podnet pre kosti. 60 sekúnd.', change: 'new' }
    ]
  }
];

/** Skrátená verzia — keď stihneš len 3 tréningy. Rotuj A → B → C → A → … */
export const DAYS_3 = [
  {
    id: 'Deň A', title: 'Tlak — prsia, ramená, triceps', mins: '~55 min', rows: [
      { ex: 'DB incline bench press', sets: '4', reps: '6–10', rir: '1–2', rest: '2–3 min', note: '', change: 'keep' },
      { ex: 'Machine chest press', sets: '3', reps: '8–12', rir: '1–2', rest: '2 min', note: '', change: 'new' },
      { ex: 'Machine fly (pec deck)', sets: '3', reps: '10–15', rir: '0–1', rest: '90 s', note: '', change: 'keep' },
      { ex: 'DB lateral raise', sets: '4', reps: '12–20', rir: '0–1', rest: '75 s', note: 'Presunuté sem z dňa ramien.', change: 'move' },
      { ex: 'Overhead cable triceps extension', sets: '3', reps: '8–12', rir: '1', rest: '90 s', note: '', change: 'new' },
      { ex: 'Reverse pec deck', sets: '3', reps: '12–20', rir: '0–1', rest: '60 s', note: '', change: 'new' }
    ]
  },
  {
    id: 'Deň B', title: 'Ťah — chrbát, zadný deltoid, biceps', mins: '~55 min', rows: [
      { ex: 'Barbell bent-over row', sets: '3', reps: '6–10', rir: '2', rest: '2–3 min', note: '', change: 'keep' },
      { ex: 'Lat pulldown', sets: '3', reps: '8–12', rir: '1', rest: '2 min', note: '', change: 'keep' },
      { ex: 'Single-arm seated cable row', sets: '3', reps: '10–15', rir: '1', rest: '90 s', note: '', change: 'keep' },
      { ex: 'Face pull', sets: '3', reps: '15–20', rir: '0–1', rest: '60 s', note: '', change: 'new' },
      { ex: 'Hammer curl', sets: '3', reps: '8–12', rir: '1', rest: '90 s', note: '', change: 'keep' },
      { ex: 'Preacher curl machine', sets: '2', reps: '10–15', rir: '0–1', rest: '75 s', note: '', change: 'keep' },
      { ex: "Farmer's carry", sets: '2', reps: '30–40 m', rir: '—', rest: '90 s', note: '', change: 'new' }
    ]
  },
  {
    id: 'Deň C', title: 'Nohy + core', mins: '~58 min', rows: [
      { ex: 'Hack squat', sets: '4', reps: '6–10', rir: '1–2', rest: '2–3 min', note: '', change: 'new' },
      { ex: 'Romanian deadlift (voľná činka)', sets: '3', reps: '8–12', rir: '2', rest: '2 min', note: '', change: 'mod' },
      { ex: 'Seated leg curl', sets: '4', reps: '10–15', rir: '0–1', rest: '90 s', note: '4 série — pri 3 tréningoch je to jediný dotyk hamstringov.', change: 'new' },
      { ex: 'Bulgarian split squat', sets: '2', reps: '8–12 / nohu', rir: '1–2', rest: '90 s', note: '', change: 'new' },
      { ex: 'Standing calf raise', sets: '3', reps: '8–15', rir: '0–1', rest: '75 s', note: '', change: 'new' },
      { ex: 'Machine seated calf raise', sets: '2', reps: '12–20', rir: '0', rest: '60 s', note: '', change: 'keep' },
      { ex: 'Hanging leg raise', sets: '3', reps: '8–15', rir: '1', rest: '60 s', note: '', change: 'new' }
    ]
  }
];
