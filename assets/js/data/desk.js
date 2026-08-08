/**
 * desk.js — sekcia „Osem hodín za stolom".
 *
 * Dôvod, prečo je v dokumente: tréning sú štyri hodiny týždenne, teda
 * ~2 % času. Sedavá práca je 40 hodín, teda ~24 %. Ak ide osem hodín denne
 * proti tomu, čo sa v posilke snažíš vybudovať, rozhoduje tá dlhšia strana.
 *
 * Nie je to zdravotná rada ani liečba bolesti — pri pretrvávajúcich
 * ťažkostiach patrí slovo fyzioterapeutovi, nie tomuto dokumentu.
 */

/** Čo sedenie robí štrukturálne a ako to zasahuje do konkrétnych cvikov v pláne. */
export const DESK_EFFECTS = [
  {
    area: 'Bedrové flexory a gluteus',
    sitting: 'Osem hodín drží flexory bedra v skrátenej polohe a gluteus v podstate bez práce. Pri vstávaní od stola telo vyrovnáva rozdiel driekom.',
    training: 'Ide priamo proti RDL a 45° back extension — oba potrebujú, aby pohyb viedlo bedro. Ak je bedro tuhé, prevezme ho driek a cvik trénuje niečo iné, než má.',
    fix: 'Half-kneeling hip flexor stretch 30 s / strana pri každej druhej prestávke. V pláne: RDL, back extension, Bulgarian split squat.'
  },
  {
    area: 'Hrudná chrbtica',
    sitting: 'Dlhé hodiny v miernej flexii. Hrudník klesne, rebrá sa zatvoria a extenzia sa postupne stráca.',
    training: 'Toto je najhoršia kombinácia v celom tvojom profile: tuhá hrudná chrbtica + tri tlakové cviky + nula zadných deltoidov. Ak sa nedostaneš do extenzie, overhead cviky sa presunú do drieku a ramena.',
    fix: 'Extenzia cez operadlo stoličky 5–8× pri každej prestávke. V pláne: face pull, reverse pec deck, mobilita v rozcvičke.'
  },
  {
    area: 'Lopatky a krk',
    sitting: 'Ruky pred telom celý deň = protrakcia lopatiek. Monitor nižšie než oči = hlava dopredu a krčná chrbtica drží jej váhu v predklone.',
    training: 'Predsunuté rameno mení dráhu tlakov aj bočného rozpaženia. Práve tu sa dráždenie ramena roky pripravuje a potom „príde z ničoho nič".',
    fix: 'Wall slides 10× a chin tuck 10× denne. V pláne: DB shrug, face pull, reverse pec deck.'
  },
  {
    area: 'Členky',
    sitting: 'Noha stojí v jednej polohe celý deň, dorzálna flexia sa nepoužíva.',
    training: 'Obmedzený členok priamo limituje hĺbku hack squatu a Bulgarian split squatu — a hĺbka je pri nich celý zmysel cviku.',
    fix: 'Knee-to-wall 2 × 10 / strana pred dňom nôh. Meraj raz mesačne, cieľ 10–12 cm.'
  },
  {
    area: 'Predlaktia a zápästia',
    sitting: 'Myš a klávesnica sú tichá statická záťaž na extenzory predlaktia, osem hodín denne, päť dní v týždni.',
    training: 'Predlaktia už do posilky prichádzajú unavené. Ak ťa niečo dráždi pri curloch alebo pri ťahoch, príčina býva skôr pri stole než v posilke.',
    fix: 'Striedaj úchop myši a klávesnicu, každú hodinu 20 s otvor a zatvor dlaň. V pláne: farmer\'s carry a dead hang budujú tolerancia úchopu, nie ju míňajú.'
  },
  {
    area: 'Celkový denný výdaj (NEAT)',
    sitting: 'Sedenie je energeticky takmer nula. Odhad udržiavacieho príjmu ~2 700–2 850 kcal počíta s bežnou dennou aktivitou — pri sedavom dni bez krokov je skôr o 150–250 kcal nižší.',
    training: 'Ak sa hmotnosť nehýbe podľa očakávania, prvá vec na kontrolu nie je tréning ani makrá, ale počet krokov.',
    fix: 'Cieľ 8–10 tisíc krokov denne. Chôdza mimo posilky je z hľadiska výdaja aj zdravia takmer rovnako hodnotná ako plánované kardio.'
  }
];

/** Mikroprotokol počas pracovného dňa. Nič z toho nepotrebuje náradie ani prezliekanie. */
export const DESK_PROTOCOL = [
  {
    when: 'Každých 45–60 min', title: 'Mikroprestávka', cost: '90 s × 6 denne ≈ 9 minút',
    steps: [
      'Postav sa a stoj aspoň 30 sekúnd — už samotné vstanie je polovica efektu.',
      'Extenzia hrudnej chrbtice cez operadlo stoličky, 5–8 pomalých opakovaní.',
      'Wall slide alebo len stiahnutie lopatiek dozadu a dole, 10 opakovaní.',
      'Každá druhá prestávka navyše: half-kneeling hip flexor stretch, 30 s na stranu.'
    ]
  },
  {
    when: 'Raz denne, obed', title: 'Desať minút vonku', cost: '10 min, ktoré aj tak stojíš v rade',
    steps: [
      '8–10 minút svižnej chôdze, ideálne vonku a na dennom svetle.',
      'Je to zhruba 1 000–1 200 krokov, teda desatina denného cieľa.',
      'Zároveň to rozbije najdlhší nepretržitý blok sedenia v dni — to je hlavný zmysel.'
    ]
  },
  {
    when: 'Večer alebo pred tréningom', title: 'Dva minúty na to, čo sa cez deň stratilo', cost: '2 min',
    steps: [
      'Dead hang 2 × 30 s — úchop, dekompresia chrbtice a mobilita ramena naraz.',
      '90/90 hip switch, 10 opakovaní — vnútorná a vonkajšia rotácia bedra.',
      'Knee-to-wall 10 × na stranu, ak ideš na nohy.'
    ]
  },
  {
    when: 'Raz, potom už nikdy', title: 'Nastavenie pracoviska', cost: '15 min jednorazovo',
    steps: [
      'Horný okraj monitora na úrovni očí alebo tesne pod ňou. Notebook bez podstavca to nikdy nesplní.',
      'Monitor na dĺžku ruky. Lakte pri tele ~90°, zápästia v neutrále, nie zalomené hore.',
      'Chodidlá celou plochou na zemi. Ak nedosiahnu, podnožka — nie špičky.',
      'Ak máš polohovateľný stôl, striedaj sed a stoj po 30–40 minútach. Celý deň v stoji nie je cieľ, striedanie áno.'
    ]
  }
];

/** Vety, ktoré je pri tejto téme treba povedať nahlas, aby sa sekcia nečítala ako strašenie. */
export const DESK_NOTES = {
  posture: 'Najlepšia poloha je tá ďalšia. Neexistuje jedna správna poloha sedenia, ktorú stačí nájsť a držať — problém nerobí konkrétny uhol, ale to, že sa osem hodín nemení. Preto je v protokole vstávanie a nie „narovnaj sa".',
  gadgets: 'Korektory držania tela, ortopedické vankúše a špeciálne stoličky riešia symptóm zvonku. To, čo drží lopatku a hrudník na mieste, sú svaly, ktoré v pláne pribudli — face pull, reverse pec deck, shrug a back extension. Peniaze míňaj skôr na monitor v správnej výške.',
  pain: 'Bolesť, ktorá trvá viac než pár týždňov, mravčenie do ruky alebo do nohy, alebo slabosť — to nie je téma pre tréningový dokument. Tam patrí fyzioterapeut alebo lekár, a čím skôr, tým kratšie to trvá.'
};
