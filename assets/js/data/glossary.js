/**
 * glossary.js — slovník pojmov a priznaná miera istoty.
 *
 * Druhá časť je dôležitejšia než prvá. Dokument na viacerých miestach
 * pracuje s číslami, ktoré vyzerajú presne — 12,3 série, 6,3 MET, tier S.
 * Tu je napísané, ktoré z nich sú konsenzus literatúry, ktoré sú správny
 * smer bez presného čísla a ktoré sú odborný odhad tohto dokumentu.
 * Priznaná neistota je viac než falošná presnosť.
 */

export const GLOSSARY = [
  { term: 'RIR', en: 'reps in reserve', def: 'Koľko opakovaní by si ešte zvládol, keby si musel. RIR 2 = mohol si spraviť ešte dve. RIR 0 = zlyhanie.' },
  { term: 'Rozsah pohybu', en: 'ROM — range of motion', def: 'Dráha, ktorú kĺb v cviku prejde. Plný rozsah pri rovnakej záťaži prekonáva skrátený takmer vždy.' },
  { term: 'Zaťaženie v natiahnutí', en: 'stretch-mediated loading', def: 'Odpor pôsobí vtedy, keď je sval najviac predĺžený. Najsilnejší jednotlivý faktor pri výbere cviku.' },
  { term: 'Hip hinge', en: '—', def: 'Pohyb, kde sa bedrá posúvajú dozadu a chrbtica ostáva rovná. Vzor RDL, back extension a deadliftu. Nie je to predklon.' },
  { term: 'Knee flexion', en: '—', def: 'Ohyb v kolene proti odporu, teda leg curl. Vzor, ktorý v pôvodnom pláne chýbal úplne.' },
  { term: 'Anti-extension', en: '—', def: 'Práca trupu proti prehnutiu drieku. Ab wheel, hanging leg raise, plank.' },
  { term: 'Anti-rotácia', en: '—', def: 'Práca trupu proti otočeniu. Pallof press, suitcase carry. Jediné, čo zaťaží šikmé svaly zmysluplne.' },
  { term: 'Loaded carry', en: '—', def: 'Chôdza so záťažou v rukách. Úchop, trapéz, trup, vzpriamovače a kosti naraz.' },
  { term: 'Tier', en: '—', def: 'Hodnotenie cviku S až D vnútri jeho partie. S-tier cvik na lýtka nie je „lepší" ako A-tier cvik na chrbát.' },
  { term: 'Priame série', en: '—', def: 'Série, kde je partia hlavným cieľom cviku. Rátajú sa plnou váhou.' },
  { term: 'Nepriame série', en: '—', def: 'Partia pracuje ako pomocný sval. V tomto dokumente sa rátajú koeficientom 0,5.' },
  { term: 'Dvojitá progresia', en: 'double progression', def: 'Najprv rastú opakovania v danom rozsahu, potom váha. Model, ktorý nepotrebuje testovať maximá.' },
  { term: 'Progresívne preťaženie', en: 'progressive overload', def: 'Postupné zvyšovanie požiadavky. Bez neho nie je rast — a bez zápisníka nie je progresívne preťaženie.' },
  { term: 'Deload', en: '—', def: 'Týždeň so zníženým objemom pri zachovanej váhe. Nie voľno, ale polovica sérií.' },
  { term: 'Mezocyklus', en: '—', def: 'Blok tréningu s jedným zámerom, tu 12 týždňov: zaškolenie → akumulácia → deload → intenzifikácia → deload.' },
  { term: 'Excentrická fáza', en: 'eccentric', def: 'Časť pohybu, kde sval pod záťažou predlžuje — spúšťanie. Kontrolovaná excentrika je väčšina stimulu.' },
  { term: 'Izometrická záťaž', en: 'isometric', def: 'Sval drží polohu bez pohybu. Driek pri barbell rowe pracuje izometricky celú sériu.' },
  { term: 'Axiálne zaťaženie', en: 'axial loading', def: 'Záťaž pôsobiaca pozdĺž chrbtice v stoji. Jediný typ zaťaženia, ktorý reálne pôsobí na hustotu kostí drieku a bedra.' },
  { term: 'Protrakcia / retrakcia lopatky', en: '—', def: 'Posun lopatky dopredu a dozadu po hrudníku. Protrakcia je časť rozsahu, ktorú väčšina ľudí pri ťahoch vynechá.' },
  { term: 'Dorzálna flexia', en: 'dorsiflexion', def: 'Priblíženie špičky k holeni. Obmedzenie v členku priamo limituje hĺbku drepu.' },
  { term: 'Rotátorová manžeta', en: 'rotator cuff', def: 'Štyri malé svaly držiace hlavicu ramennej kosti v jamke. Externú rotáciu trénuje face pull.' },
  { term: 'Rectus femoris', en: '—', def: 'Jediná hlava kvadricepsu, ktorá ide cez bedro aj koleno. V sede je na bedre skrátená, preto potrebuje prácu s vystretým bedrom.' },
  { term: 'Gastrocnemius / soleus', en: '—', def: 'Dve hlavy lýtka. Gastrocnemius ide cez koleno a pracuje v stoji, soleus v sede. Preto treba oba varianty výponov.' },
  { term: 'Brachialis / brachioradialis', en: '—', def: 'Svaly pod bicepsom a na predlaktí. Rozšíria rameno viac než samotný biceps. Trénuje ich hammer curl.' },
  { term: 'Quadratus lumborum', en: '—', def: 'Hlboký sval drieku po stranách chrbtice. Bez anti-rotačnej práce nedostane nič.' },
  { term: 'Patelofemorálny kĺb', en: '—', def: 'Spojenie jabĺčka a stehennej kosti. Tlak v ňom rastie pri ťažkých nízkych opakovaniach na leg extension.' },
  { term: 'Propriocepcia', en: '—', def: 'Vnímanie polohy vlastného tela. U samouka býva posunuté oproti realite — preto to video zboku.' },
  { term: 'Zóna 2', en: '—', def: 'Intenzita, pri ktorej dýchaš zrýchlene, ale vieš rozprávať v celých vetách. Zhruba 60–70 % maximálnej tepovej frekvencie.' },
  { term: 'MET', en: 'metabolic equivalent', def: 'Násobok pokojového výdaja energie. 1 MET = sedenie, 6 MET = zhruba svižná chôdza do kopca.' },
  { term: 'VO₂max', en: '—', def: 'Maximálna spotreba kyslíka, ml/kg/min. Najlepší jednotlivý ukazovateľ kardiorespiračnej zdatnosti.' },
  { term: 'NEAT', en: 'non-exercise activity thermogenesis', def: 'Energia spálená všetkým pohybom okrem tréningu — chôdza, státie, gestá. Pri sedavej práci je to najväčšia páka, ktorou vieš hýbať.' },
  { term: 'BMR / udržiavací príjem', en: 'basal metabolic rate / TDEE', def: 'BMR je výdaj v pokoji, udržiavací príjem je BMR × koeficient aktivity. Oboje je odhad, nie meranie.' },
  { term: 'Rekompozícia', en: 'body recomposition', def: 'Súčasný nárast svalu a pokles tuku. Reálna pri strednom percente tuku, tréningových rezervách a vysokom príjme bielkovín.' },
  { term: 'Lean bulk', en: '—', def: 'Mierny kalorický prebytok (~8 %), ktorý cieli na prírastok 0,2–0,3 kg týždenne.' },
  { term: 'Interferenčný efekt', en: '—', def: 'Zhoršenie silových adaptácií vysokým objemom vytrvalostného tréningu. Pri objemoch v tomto pláne prakticky nehrozí.' },
  { term: 'Denzitometria', en: 'DXA', def: 'Meranie hustoty kostí. Meria sa práve driek a krčok stehennej kosti — teda miesta, ktoré zaťažuje drep a carry.' }
];

/** Úrovne istoty — mapujú sa na triedy .c-high / .c-mid / .c-low. */
export const CONFIDENCE_LEVELS = {
  high: { css: 'c-high', label: 'Konsenzus' },
  mid: { css: 'c-mid', label: 'Smer áno, číslo nie' },
  low: { css: 'c-low', label: 'Odborný odhad' }
};

export const CONFIDENCE = [
  {
    claim: 'Objem sa pri hypertrofii dá naberať zhruba v 5–30 opakovaniach, ak ideš dostatočne blízko zlyhania.',
    level: 'high',
    note: 'Jeden z najlepšie zopakovaných výsledkov v silovej literatúre. Rozhoduje blízkosť k zlyhaniu, nie konkrétny počet opakovaní.'
  },
  {
    claim: 'Bielkoviny 1,7–2,2 g na kg telesnej hmotnosti denne.',
    level: 'high',
    note: 'Široká zhoda. Nad horný okraj sa prínos nepreukazuje, pod dolný sa pri deficite stráca svalová hmota.'
  },
  {
    claim: 'Kreatín monohydrát 5 g denne, bez nasycovacej fázy.',
    level: 'high',
    note: 'Najlepšie preskúmaný doplnok vôbec. Dávka aj forma sú ustálené.'
  },
  {
    claim: 'Sila úchopu a VO₂max sú silné prediktory celkovej mortality.',
    level: 'high',
    note: 'Ide o dobre doloženú <em>asociáciu</em>, nie o dokázanú príčinu. Úchop odráža celkovú svalovú hmotu a nervovú funkciu — silné predlaktia samy o sebe život nepredlžujú.'
  },
  {
    claim: 'Odporúčané pásmo 10–20 sérií na partiu za týždeň.',
    level: 'mid',
    note: 'Ako orientačný rozsah je to konsenzus. Presné hranice sú individuálne a menia sa s tréningovým vekom — čísla v tabuľkách ber ako stred cieľa, nie ako hranicu, ktorú treba trafiť.'
  },
  {
    claim: 'Zaťaženie svalu v natiahnutí dáva väčší rast než rovnaká práca v skrátenej polohe.',
    level: 'mid',
    note: 'Smer je konzistentný a dobre podložený. Veľkosť rozdielu a to, či platí pri každom cviku rovnako, doložené nie je. Väčšina tierov v tomto dokumente stojí práve na tomto kritériu.'
  },
  {
    claim: 'Seated leg curl prekonáva lying leg curl pri rovnakom objeme.',
    level: 'mid',
    note: 'Vychádza z priameho porovnania, ale ide o malý počet prác. Rozdiel je reálny, ale nie taký veľký, aby sa oplatilo cvik vynechať, keď je stroj obsadený.'
  },
  {
    claim: 'Frekvencia 2× týždenne prekonáva 1× týždenne pri rovnakom objeme.',
    level: 'mid',
    note: 'Rozdiel existuje, ale je menší, než sa bežne tvrdí. Celkový týždenný objem rozhoduje viac než jeho rozloženie.'
  },
  {
    claim: 'Pomer sily hamstringov ku kvadricepsu (H:Q) pod ~0,6 sa spája s vyšším rizikom poranenia.',
    level: 'mid',
    note: 'Asociácia je opísaná, konkrétna prahová hodnota je orientačná a závisí od spôsobu merania. Ako dôvod dotrénovať hamstringy stačí; ako diagnostické kritérium nie.'
  },
  {
    claim: 'Kosť reaguje na veľkosť zaťaženia, rýchlosť jeho nárastu a miesto pôsobenia.',
    level: 'mid',
    note: 'Princíp je dobre podložený. Koľko presne pridá 2 × 10 pogo hopov týždenne, doložené nie je — je to lacný podnet s nízkym rizikom, nie zaručený výsledok.'
  },
  {
    claim: 'Mifflin–St Jeor a z nej odvodené kalórie (~2 700–2 850 kcal udržiavací príjem).',
    level: 'mid',
    note: 'Rovnica je publikovaná a bežne používaná, ale individuálna odchýlka býva ±10–15 %. Skutočný udržiavací príjem zistíš len dvoma týždňami rovnakého jedenia a sledovaním váhy.'
  },
  {
    claim: 'ACSM rovnica pre chôdzu a z nej 6,3 MET pri 4 km/h a sklone 10 %.',
    level: 'mid',
    note: 'Rovnica je publikovaná a platí pre chôdzu zhruba do 6 km/h. Výsledok je odhad výdaja, nie meranie tvojho tela.'
  },
  {
    claim: 'Tvoj VO₂max je niekde okolo 40–45 ml/kg/min.',
    level: 'low',
    note: 'Čistý odhad z profilu „silový tréning, žiadne kardio". Bez merania to môže byť pokojne o 8 jednotiek vedľa a celý výpočet zóny 2 sa tým posunie.'
  },
  {
    claim: 'Tier hodnotenia S až D pri jednotlivých cvikoch.',
    level: 'low',
    note: 'Odborný úsudok podľa ôsmich kritérií zo sekcie 06, nie meranie. Iný tréner by pri niektorých cvikoch zaradil o stupeň inak — hlavne pri B a C.'
  },
  {
    claim: 'Percentá pokrytia pohybových vzorov a body 0–10 v radarovom grafe.',
    level: 'low',
    note: 'Autorská škála vytvorená pre tento dokument, aby sa rozdiel dal ukázať obrázkom. Nie je to merateľná veličina a nedá sa porovnávať s ničím mimo tohto dokumentu.'
  },
  {
    claim: 'Nepriame série sa rátajú koeficientom 0,5.',
    level: 'low',
    note: 'Rozšírená konvencia, nie meranie. Skutočný príspevok pomocného svalu závisí od cviku a je niekde medzi 0,3 a 0,7 — 0,5 je rozumný stred.'
  },
  {
    claim: 'Deload každých 6–8 týždňov.',
    level: 'low',
    note: 'Praktická konvencia. Doložený optimálny interval neexistuje — preto sú v sekcii 10 aj štyri konkrétne príznaky, podľa ktorých sa deload posúva dopredu.'
  },
  {
    claim: 'Odhady dĺžky tréningov (46–55 min).',
    level: 'low',
    note: 'Vypočítané z počtu sérií a predpísaných páuz. Reálny čas závisí od obsadenosti posilňovne a od toho, koľko strávíš pri telefóne.'
  }
];
