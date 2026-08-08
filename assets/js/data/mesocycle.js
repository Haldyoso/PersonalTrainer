/**
 * mesocycle.js — 12-týždňový kalendár k plánu zo sekcie 08.
 *
 * Sekcia 10 hovorí, AKO progresovať (dvojitá progresia) a KEDY deloadovať
 * (každých 6–8 týždňov). Tu je to rozpísané na konkrétne týždne, aby sa
 * nemuselo rozhodovať za pochodu — rozhodovanie za pochodu vždy skončí
 * tak, že sa deload odloží na moment, keď už je neskoro.
 */

/** Fázy cyklu. `css` sa mapuje na triedy .f-* v components.css. */
export const PHASES = {
  uc: {
    code: 'uc', css: 'f-uc', name: 'Zaškolenie', short: 'Učenie', weeks: 'týždne 1–2',
    goal: 'Naučiť päť nových cvikov, nie ich odtrénovať.',
    rir: 'RIR 3', volume: '−1 séria na každom novom cviku',
    detail: 'Na hack squate, RDL s voľnou činkou, seated leg curle, overhead extenzii a Bulgarian split squate ideš zámerne ľahko. Váha, ktorú v týchto dvoch týždňoch použiješ, je „technická", nie pracovná. Natoč sa zboku pri prvej sérii každého z nich.'
  },
  ak: {
    code: 'ak', css: 'f-ak', name: 'Akumulácia', short: 'Objem', weeks: 'týždne 3–6',
    goal: 'Naberať opakovania pri konštantnej váhe.',
    rir: 'RIR 2 · izolácie 0–1', volume: 'plný objem podľa plánu',
    detail: 'Tu beží dvojitá progresia naplno: každý týždeň skús pridať jedno opakovanie v každej sérii. Váhu meň až vtedy, keď dáš horný okraj rozsahu vo všetkých sériách. Toto je najdlhší a najdôležitejší blok — tu sa naberá.'
  },
  in: {
    code: 'in', css: 'f-in', name: 'Intenzifikácia', short: 'Tvrdo', weeks: 'týždne 8–11',
    goal: 'Pritvrdiť tam, kde je to lacné.',
    rir: 'RIR 1 · izolácie 0', volume: '+1 séria na hamstringy a zadný deltoid',
    detail: 'Ťažké viackĺbové cviky idú o stupeň bližšie k zlyhaniu (nikdy nie barbell row a RDL — tam ostáva RIR 2). Izolácie idú do zlyhania. Objem navyše ide výhradne do partií, ktoré dobiehajú deficit.'
  },
  de: {
    code: 'de', css: 'f-de', name: 'Deload', short: 'Deload', weeks: 'týždne 7 a 12',
    goal: 'Nechať dobehnúť kĺby a nervovú sústavu.',
    rir: 'RIR 3–4', volume: 'polovica sérií, váha ~90 %',
    detail: 'Polovica sérií pri zachovanej váhe: 4 série → 2, 3 série → 2. Nikde nejdeš do zlyhania. Kardio a chôdzu nechaj tak, alebo pridaj. Voľný týždeň bez posilky nerob — znížený objem pri zachovanej intenzite udrží techniku aj nervový drive, úplná pauza ti vezme oboje.'
  }
};

/** Rozloženie 12 týždňov na fázy. */
export const WEEKS = [
  { week: 1, phase: 'uc' }, { week: 2, phase: 'uc' },
  { week: 3, phase: 'ak' }, { week: 4, phase: 'ak' }, { week: 5, phase: 'ak' }, { week: 6, phase: 'ak' },
  { week: 7, phase: 'de' },
  { week: 8, phase: 'in' }, { week: 9, phase: 'in' }, { week: 10, phase: 'in' }, { week: 11, phase: 'in' },
  { week: 12, phase: 'de' }
];

/** Čo sa v ktorom týždni reálne mení. */
export const WEEK_PLAN = [
  { week: '1', phase: 'uc', action: 'Nové cviky o sériu menej, ľahká váha, video zboku na hack squate a RDL.', watch: 'Technika, nie váha. Zapíš si počiatočné váhy.' },
  { week: '2', phase: 'uc', action: 'Rovnaké váhy ako v týždni 1, pridaj chýbajúcu sériu na nových cvikoch.', watch: 'Ak sa RDL stále nedá s rovným chrbtom, uber váhu ešte o 20 %.' },
  { week: '3', phase: 'ak', action: 'Plný objem. Prvý týždeň, kde sa čísla počítajú.', watch: 'Zapisuj váhu, opakovania aj RIR. Bez zápisu progresia nefunguje.' },
  { week: '4', phase: 'ak', action: '+1 opakovanie v každej sérii oproti minulému týždňu.', watch: 'Rozsah pohybu sa nesmie skrátiť — inak to nie je progresia.' },
  { week: '5', phase: 'ak', action: '+1 opakovanie. Kde už máš horný okraj vo všetkých sériách, pridaj váhu.', watch: 'Skok: horné telo +2,5 kg, dolné +5 kg, izolácie +1–2,5 kg.' },
  { week: '6', phase: 'ak', action: 'Posledný ťažký týždeň bloku. Tu má byť najviac driny.', watch: 'Bolia kĺby ráno viac než svaly? Deload posuň o týždeň dopredu.' },
  { week: '7', phase: 'de', action: 'Deload: polovica sérií, váha ~90 %, RIR 3–4.', watch: 'Prvý kontrolný bod — zmeraj sa podľa tabuľky nižšie.' },
  { week: '8', phase: 'in', action: 'Späť na plný objem, RIR o stupeň nižšie na strojoch a izoláciách.', watch: 'Barbell row a RDL ostávajú na RIR 2. Vždy.' },
  { week: '9', phase: 'in', action: '+1 séria na seated leg curl a reverse pec deck.', watch: 'Tréning nesmie prekročiť 60 minút — ak áno, škrtaj podľa poradia zo sekcie 10.' },
  { week: '10', phase: 'in', action: 'Pridávaj váhu všade, kde dáš horný okraj rozsahu.', watch: 'Spánok a chuť do posilky sú tu prvé, čo sa pokazí.' },
  { week: '11', phase: 'in', action: 'Najťažší týždeň cyklu. Izolácie do zlyhania.', watch: 'Ak dva tréningy po sebe klesli opakovania, ukonči blok o týždeň skôr.' },
  { week: '12', phase: 'de', action: 'Deload + kontrolné meranie + rozhodnutie o ďalšom cykle.', watch: 'Druhý kontrolný bod. Porovnaj s týždňom 1 a 7.' }
];

/**
 * Kontrolné body. Merať v týždni 1, 7 a 12 — vždy za rovnakých podmienok
 * (ráno, nalačno, tá istá váha, ten istý stroj).
 */
export const CHECKPOINTS = [
  { what: 'Telesná hmotnosť', how: 'Týždenný priemer zo 7 denných meraní ráno nalačno.', why: 'Denné výkyvy ±1,5 kg sú voda. Rozhoduje trend, nie číslo.' },
  { what: 'Obvod pása na pupku', how: 'Ráno nalačno, uvoľnené brucho, ten istý bod.', why: 'Spolu s hmotnosťou rozlíši, či pribúda sval alebo tuk.' },
  { what: 'DB incline bench press', how: 'Váha × opakovania v prvej pracovnej sérii.', why: 'Hlavný ukazovateľ hornej časti tela.' },
  { what: 'Hack squat', how: 'Váha × opakovania v prvej pracovnej sérii, rovnaká hĺbka.', why: 'Hlavný ukazovateľ dolnej časti tela.' },
  { what: 'Seated leg curl', how: 'Váha × opakovania.', why: 'Cvik, ktorý rieši najväčšiu dieru plánu — tu chceš vidieť najrýchlejší posun.' },
  { what: "Farmer's carry", how: 'Najťažšie jednoručky × vzdialenosť do zlyhania úchopu.', why: 'Najlacnejší ukazovateľ sily úchopu, ak nemáš dynamometer.' },
  { what: 'Dead hang', how: 'Čas v sekundách do pustenia. Cieľ 60 s.', why: 'Úchop plus mobilita ramena naraz.' },
  { what: 'Stoj na jednej nohe, zavreté oči', how: 'Čas v sekundách, obe nohy. Cieľ 30 s.', why: 'Funkčný marker stability bedra a členka.' },
  { what: 'Knee-to-wall', how: 'Vzdialenosť palca od steny pri dotyku kolena, obe nohy. Cieľ 10–12 cm.', why: 'Dorzálna flexia členka — limituje hĺbku drepu.' }
];
