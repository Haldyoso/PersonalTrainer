/**
 * longevity.js — dashboard šiestich oblastí, ktoré sa nedajú dobehnúť neskôr.
 *
 * state … 'ok' | 'part' | 'no'
 * pct   … naplnenie ukazovateľa 0–100; je to autorský odhad pokrytia, nie meranie
 * now   … stav dnes (smie obsahovať <em>, neescapovať)
 * fix   … čo s tým (čistý text)
 */
export const LONGEVITY = [
  {
    title: 'Kardio — zóna 2', state: 'part', pct: 30,
    now: '40 min týždenne pri ~6,3 MET, čo je spodná hranica zóny 2.',
    fix: 'Predĺž chôdzu po tréningu na 20 min a zdvihni na 5 km/h pri sklone 12 % v dva dni. Zvyšok dobehni krokmi mimo posilky.'
  },
  {
    title: 'Práca na VO₂max', state: 'no', pct: 0,
    now: 'Nič. VO₂max je jeden z najsilnejších jednotlivých prediktorov celkovej mortality.',
    fix: '12 min po tréningu ramien: 10 × (30 s tvrdo / 30 s ľahko) na bicykli. Raz týždenne stačí.'
  },
  {
    title: 'Sila úchopu', state: 'no', pct: 10,
    now: 'Žiadny cielený tréning. Stroje a preacher curl nemajú takmer žiadnu nároku na úchop.',
    fix: "Farmer's carry 2 × 30–40 m na koniec dňa chrbta + dead hang. Prestaň používať trhačky na ľahších sériách."
  },
  {
    title: 'Mobilita a rozsah', state: 'no', pct: 10,
    now: 'Žiadna cielená práca. Rozcvička je iba pás.',
    fix: 'Bedrá, hrudná chrbtica, ramená, členky — do rozcvičky a do pauzy medzi sériami. Nula extra času.'
  },
  {
    title: 'Jednonožná stabilita', state: 'part', pct: 25,
    now: 'Jednonožný leg press, ale <em>v sede</em> — panva je opretá, stabilizátory bedra nerobia nič.',
    fix: 'Bulgarian split squat namiesto leg pressu. Otestuj sa: stoj na jednej nohe so zavretými očami, cieľ 30 s.'
  },
  {
    title: 'Hustota kostí', state: 'part', pct: 30,
    now: 'Iba Smith RDL a barbell row dávajú niečo axiálne. Leg press a stroje v sede nedávajú kostiam nič.',
    fix: "Farmer's carry + 2 × 10 pogo hopov pred dňom nôh. Dlhodobo sa nauč barbell back squat."
  }
];
