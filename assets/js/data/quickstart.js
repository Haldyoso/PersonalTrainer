/**
 * quickstart.js — obsah úvodnej obrazovky „Tvoj plán".
 *
 * Pravidlo pre túto sekciu: žiadny odborný pojem bez okamžitého vysvetlenia
 * v zátvorke a žiadna veta dlhšia než dva riadky. Kto chce presné čísla,
 * odôvodnenia a rozbor, klikne ďalej. Kto chce vedieť, čo robiť v pondelok,
 * skončí tu a je to v poriadku.
 */

/** Päť pravidiel, ktoré platia na každý tréning. Bez žargónu. */
export const RULES = [
  {
    title: 'Ťažké cviky prvé',
    body: 'Prvé tri cviky dňa sú tie, kde je väčšina výsledku. Cviky na jeden kĺb (predkopávanie, bicepsový zdvih) patria na koniec, nie na začiatok.'
  },
  {
    title: 'Nechaj si jedno-dve opakovania v zálohe',
    body: 'Sériu ukonči vtedy, keď by si ešte jedno alebo dve opakovania zvládol. Úplne na doraz choď len na ľahkých cvikoch na konci tréningu — nikdy nie na ťahoch s veľkou činkou a nikdy nie na mŕtvom ťahu.'
  },
  {
    title: 'Zapisuj si váhu a opakovania',
    body: 'Bez zápisu nevieš, či rastieš. Keď dáš horný okraj predpísaného rozsahu vo všetkých sériách, nabudúce pridaj váhu a spadneš na spodný okraj. To je celá progresia.'
  },
  {
    title: 'Každý siedmy týždeň uber',
    body: 'Jeden týždeň polovica sérií a rovnaká váha. Nie je to voľno — len menej práce. Kĺbom a nervovej sústave to dá dobehnúť a ďalší blok potom ide lepšie.'
  },
  {
    title: 'Prestávky využi na brucho a mobilitu',
    body: 'Medzi ťažkými sériami stojíš dve minúty. Práve tam sa zmestí brucho a rozhýbanie bedier a hrudníka — bez toho by sa tréning predĺžil o desať minút.'
  }
];

/** Tri najväčšie diery, každá jednou vetou. Podrobnosti sú v sekcii 08. */
export const HOLES = [
  {
    what: 'Zadné stehno',
    plain: 'Zadnú stranu stehna vieš zaťažiť dvoma spôsobmi: predklonom so záťažou (to robíš) alebo ohybom v kolene (to nerobíš vôbec). Každý zasiahne inú časť svalu.',
    fix: 'Pridaj leg curl, dvakrát týždenne.'
  },
  {
    what: 'Brucho a trup',
    plain: 'Nemáš na trup ani jednu sériu. Pritom robíš dva cviky, ktoré silný trup predpokladajú — veslovanie s veľkou činkou a mŕtvy ťah na rovných nohách.',
    fix: 'Ab wheel alebo hanging leg raise, do prestávok.'
  },
  {
    what: 'Zadné rameno',
    plain: 'Máš tri tlakové cviky na prsia a nič, čo by ťahalo rameno dozadu. Po rokoch sa to prejaví na držaní tela a na zdraví ramena.',
    fix: 'Reverse pec deck a face pull.'
  }
];

/** Rozcestník na koniec úvodnej obrazovky. */
export const NEXT = [
  {
    href: '#plan',
    label: 'Presné cviky, série a opakovania',
    body: 'Štyri karty s celým rozpisom: koľko sérií, koľko opakovaní, aká pauza a poznámka k technike pri každom cviku.'
  },
  {
    href: '#diery',
    label: 'Prečo práve tieto cviky',
    body: 'Sedem dier v pôvodnom pláne zoradených podľa toho, koľko ťa stoja — a pri každej, čo pridať a čo za to vypustiť.'
  },
  {
    href: '#technika',
    label: 'Ako cvik správne spraviť',
    body: 'Pri každom cviku kľúčové body, najčastejšia chyba samoukov a spôsob, ako si overíš, či to cítiš tam, kde máš.'
  },
  {
    href: '#tahak',
    label: 'Vytlačiť a vziať do posilky',
    body: 'Štyri karty na tréningové dni plus prázdny denník na zapisovanie váh.'
  }
];
