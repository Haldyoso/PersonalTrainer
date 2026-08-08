/**
 * technique.js — technika po dňoch.
 *
 * keys    … kľúčové body prevedenia (POZOR: smú obsahovať <em>, neescapovať)
 * mistake … najčastejšia chyba samoukov a ako ju spoznáš (smie obsahovať HTML)
 * check   … ako si overíš, či cvik cítiš tam, kde máš (smie obsahovať HTML)
 *
 * Tri roky bez trénera znamená tri roky utuženého vzoru — dobrého aj zlého.
 * Preto je pri každom cviku aj kontrola, nielen zoznam bodov.
 */
export const TECHNIQUE = [
  {
    day: 'Utorok — Prsia + triceps + zadný deltoid',
    items: [
      {
        name: 'DB incline bench press',
        keys: [
          'Lavička 30–35°, nie 45°. Nad 35° prevezme pohyb predný deltoid.',
          'Lakte ~45° od trupu. Zápästia priamo nad lakťami po celú dráhu.',
          'Dole ísť po hranicu, kde cítiš ťah v prsníku, nie hlbšie za rameno.'
        ],
        mistake: 'Príliš strmá lavička a lakte roztiahnuté do 90°. Spoznáš to tak, že po sérii ťa pália predné ramená viac než prsia, a druhý deň ťa bolia ramená, nie prsia.',
        check: 'Na vrchole pohybu (hore) vedome stlač prsníky k sebe a podrž pol sekundy. Ak nevieš nájsť to napätie, váha je príliš vysoká alebo je uhol zlý.'
      },
      {
        name: 'Machine chest press / flat DB press',
        keys: [
          'Sedadlo nastav tak, aby madlá boli vo výške stredu hrudníka.',
          'Lopatky stiahnuté a pritlačené k opierke po celú sériu.',
          'Nezablokuj lakte úplne hore — napätie má zostať.'
        ],
        mistake: 'Nastavenie sedadla príliš vysoko, takže tlačíš šikmo hore a robíš z toho tlak na ramená. Spoznáš to podľa toho, že madlá máš pri kľúčnych kostiach, nie pri bradavkách.',
        check: 'Ak sa ti počas série lopatky „odlepia" od opierky, prsníky pracujú menej. Skús jednu sériu s vedomým zatlačením lopatiek — rozdiel v pocite je okamžitý.'
      },
      {
        name: 'Machine fly (pec deck)',
        keys: [
          'Lakte mierne pokrčené a v tomto uhle zamrznuté.',
          'Ramená v jednej rovine s madlami, nie vyššie.',
          'V natiahnutí choď len po hranicu pohodlia — nie maximálne dozadu.'
        ],
        mistake: 'Tlačenie madiel rukami namiesto pohybu z ramena. Spoznáš to tak, že ti v priebehu série ubúda uhol v lakti — začínaš s vystretou rukou, končíš s pokrčenou. Vtedy si postupne premenil fly na tlak.',
        check: 'Zavri oči na jednu sériu a sústreď sa len na to, či napätie ide zvnútra hrudníka smerom k pazuche. Ak to cítiš v prednom ramene, ramená máš príliš vysoko.'
      },
      {
        name: 'Overhead cable triceps extension',
        keys: [
          'Chrbtom k stroju, kábel nastavený nízko, lano pretiahni ponad hlavu.',
          'Lakte pri hlave a smerujú dopredu, počas celého pohybu sa nehýbu.',
          'Trup mierne predklonený, aby bola dráha priama.'
        ],
        mistake: 'Rozťahovanie lakťov do strán, čím sa zmenší natiahnutie dlhej hlavy. Spoznáš to podľa toho, že si v spodnej polohe nepociťuješ ťah pozdĺž zadnej strany ramena až k pazuche.',
        check: 'V spodnej polohe (ruky za hlavou) musíš cítiť <strong>ťah</strong>, nie len prácu. Ak ho necítiš, buď máš rozťahané lakte, alebo nejdeš dosť hlboko.'
      },
      {
        name: 'Cable triceps pushdown',
        keys: [
          'Lakte pri tele a fixné, hýbe sa len predlaktie.',
          'Trup vzpriamený, mierny predklon je v poriadku, ale nesmie sa počas série meniť.',
          'Hore nechaj predlaktia vyjsť nad vodorovnú — tam začína rozsah.'
        ],
        mistake: 'Naklonenie sa celou váhou nad kábel a tlačenie hmotnosťou tela. Spoznáš to tak, že sa v druhej polovici série pri každom opakovaní hýbeš trupom hore-dole.',
        check: 'Postav sa o krok ďalej od stroja a uber váhu o 20 %. Ak zrazu cítiš triceps oveľa viac, predtým si ho z veľkej časti obchádzal.'
      },
      {
        name: 'Reverse pec deck',
        keys: [
          'Hrudník opretý o podložku, lakte mierne pokrčené a vyššie než zápästia.',
          'Pohyb končí, keď sú ruky v jednej rovine s trupom — nie za ňou.',
          'Ľahká váha, 12–20 opakovaní, tempo pomalé.'
        ],
        mistake: 'Sťahovanie lopatiek k sebe. Vtedy pohyb prevezmú rhomboidy a stredný trapéz a zadný deltoid, kvôli ktorému to robíš, ostane nezaťažený. Spoznáš to tak, že cítiš prácu medzi lopatkami, nie vzadu na ramene.',
        check: 'Predstav si, že ruky sú len laná a ťaháš lakťami von do strán. Lopatky nechaj úmyselne uvoľnené. Rozdiel v pocite je veľmi zreteľný.'
      }
    ]
  },
  {
    day: 'Štvrtok — Chrbát + biceps + úchop',
    items: [
      {
        name: 'Barbell bent-over row',
        keys: [
          'Trup ~30–45° od vodorovnej, kolená mierne pokrčené, bedrá dozadu.',
          'Tyč ťahaj k spodnej časti hrudníka až k pupku, nie k prsníkom.',
          'Krk v predĺžení chrbtice — pozeraj na bod ~2 m pred sebou na zemi.'
        ],
        mistake: 'Postupné narovnávanie trupu počas série a pozeranie sa hore do zrkadla. Prvé znamená, že si prešiel na ľahší cvik uprostred série; druhé zaťažuje krčnú chrbticu v hyperextenzii. <strong>Natoč sa zboku — toto je cvik, kde je video u samouka povinné.</strong>',
        check: 'Na konci série musíš cítiť únavu medzi lopatkami a v širokom svale, nie v drieku. Ak ťa najviac bolí driek, buď je váha vysoká, alebo sa trup dvíha.'
      },
      {
        name: 'Lat pulldown',
        keys: [
          'Kolená pevne pod valcom, trup mierne vzad (~15°) a v tom uhle zostáva.',
          'Hore nechaj ramená úplne vyjsť — lopatka sa má rotovať nahor.',
          'Ťahaj lakťami k bokom, nie rukami k bradavkám.'
        ],
        mistake: 'Ťahanie rukami a hojdanie trupu. Spoznáš to tak, že v hornej polohe nemáš úplne vystreté ruky a lopatky ostávajú stiahnuté — vynechávaš práve tú časť rozsahu, kde sa lat naťahuje.',
        check: 'Skús jednu sériu s 30 % nižšou váhou, dvojsekundovým zostupom a plným natiahnutím hore. Ak zrazu cítiš širokú svalovú prácu pod pazuchou, predtým ti chýbal rozsah.'
      },
      {
        name: 'Single-arm seated cable row',
        keys: [
          'Voľná ruka na kolene alebo na opierke, trup sa nerotuje.',
          'V natiahnutí nechaj lopatku ísť dopredu (protrakcia), potom ťahaj.',
          'Lakeť ide tesne popri trupe dozadu, nie do strany.'
        ],
        mistake: 'Rotovanie trupu za rukou. Vyzerá to ako väčší rozsah, ale rozsah sa deje v chrbtici, nie v ramene. Spoznáš to tak, že v natiahnutí máš rameno otočené k stroju.',
        check: 'Sadni si bokom k zrkadlu. Ak sa ti počas série hýbe hrudná kosť do strán, rotuješ.'
      },
      {
        name: 'DB shrug',
        keys: [
          'Ramená hore priamo k ušiam, nie dozadu ani do kruhu.',
          'Pauza hore 1 sekundu — bez nej je to len hojdanie.',
          'Dole nechaj ramená úplne klesnúť.'
        ],
        mistake: 'Krúženie ramenami. Nepridá to nič, a v hornej zadnej fáze zbytočne zaťažuje rameno.',
        check: 'Ak necítiš prácu hore na trapéze pri krku, pravdepodobne máš príliš veľkú váhu a hýbeš sa celým telom.'
      },
      {
        name: 'Hammer curl',
        keys: [
          'Neutrálny úchop (palce hore), lakte pri tele.',
          'Trup nehybný — chrbtom sa neopieraj o nič, čo ti dovolí švihať.',
          'Dole nechaj ruku úplne vystrieť.'
        ],
        mistake: 'Švihanie trupom a zdvíhanie lakťov dopredu. Spoznáš to tak, že sa ti na konci pohybu lakte dostávajú pred trup — vtedy pohyb prevzal predný deltoid.',
        check: 'Postav sa chrbtom k stene. Ak sa počas série od steny odlepíš, švihal si.'
      },
      {
        name: 'Preacher curl machine',
        keys: [
          'Podpazušie pevne na podložke, rameno sa nedvíha.',
          'Dole kontroluj posledných 15° — nepadaj do plného vystretia.',
          'Hore nechoď až tam, kde napätie zmizne.'
        ],
        mistake: 'Odraz zo spodnej polohy. Vyzerá to ako viac opakovaní, ale je to jediná vec, ktorá pri tomto cviku môže dráždiť úpon bicepsu — a distálne bicepsové problémy sú dlhé.',
        check: 'Nastav si tempo 1 s hore, 1 s pauza, 3 s dole. Ak pri tomto tempe nedáš pôvodný počet opakovaní, predtým si sa odrážal.'
      },
      {
        name: "Farmer's carry",
        keys: [
          'Zdvihni jednoručky ako deadlift — bedrami, nie chrbtom.',
          'Ramená dolu a dozadu, rebrá zaklopené, hrudník hore.',
          'Kráčaj normálnym krokom, dýchaj.'
        ],
        mistake: 'Krčenie ramien počas chôdze a zadržiavanie dychu. Prvé z toho robí zbytočne unavujúci shrug, druhé ti vezme polovicu vzdialenosti.',
        check: 'Cieľ je, aby ti prvý zlyhal <strong>úchop</strong>, nie chrbát ani dych. Ak ti prvý zlyháva chrbát, váha je príliš vysoká alebo držíš zlé postavenie.'
      }
    ]
  },
  {
    day: 'Piatok — Ramená + hamstringy + core',
    items: [
      {
        name: 'DB seated shoulder press',
        keys: [
          'Opierka ~80°, mierne odklonená — šetrnejšie k ramenu než kolmá.',
          'Jednoručky drž tak, aby lakte boli mierne pred rovinou trupu, nie úplne do strán.',
          'Rebrá zaklopené — driek sa nesmie preklenúť.'
        ],
        mistake: 'Preklenutie drieku, aby sa dalo zdvihnúť viac. Spoznáš to tak, že ti pri poslednom opakovaní vyskočí hrudník dopredu a chrbát sa oblúkom odlepí od opierky — vtedy sa z toho stáva incline press.',
        check: 'Pritlač driek k opierke a udrž ho tam. Ak zrazu nedáš rovnaký počet opakovaní, predtým ti pomáhal chrbát.'
      },
      {
        name: 'DB lateral raise',
        keys: [
          'Ľahká váha, 12–20 opakovaní. Ramená dolu.',
          'Ruky idú do strany a mierne dopredu (rovina lopatky), nie striktne do boku.',
          'Zastav vo výške ramien — vyššie preberá pohyb trapéz.'
        ],
        mistake: 'Príliš ťažká váha a švih z nôh. Spoznáš to tak, že sa pri každom opakovaní nadvihneš na špičkách alebo sa ti krčia ramená k ušiam.',
        check: 'Sadni si na lavičku bez opierky. Ak zrazu nedáš ani polovicu opakovaní, celý cvik si robil švihom.'
      },
      {
        name: 'Cable lateral raise',
        keys: [
          'Kábel vedie spoza tela, madlo chytíš vzdialenejšou rukou.',
          'Ruka ide do strany po oblúku, mierne pokrčený lakeť.',
          'V spodnej polohe napätie neuvoľňuj — v tom je rozdiel oproti jednoručke.'
        ],
        mistake: 'Postavenie príliš blízko stroja, čím sa v spodnej polohe stratí odpor a zopakuje sa nevýhoda jednoručky.',
        check: 'V najspodnejšej polohe musíš cítiť ťah v bočnom deltoide. Ak necítiš nič, odstúp o pol kroka.'
      },
      {
        name: 'Face pull',
        keys: [
          'Kábel nad úrovňou hlavy, lano chytíš palcami dozadu.',
          'Ťahaj k čelu a zároveň rotuj predlaktia dozadu, akoby si robil dvojité „biceps pózu".',
          'Ľahká váha, 15–20 opakovaní.'
        ],
        mistake: 'Ťahanie k hrudníku namiesto k čelu a bez rotácie. Vtedy z toho zostane obyčajný horizontálny ťah a externá rotácia — pointa cviku — vypadne.',
        check: 'Na konci pohybu musíš mať lakte vyššie než zápästia a dlane smerovať dopredu. Ak nie, nerotoval si.'
      },
      {
        name: 'Seated leg curl',
        keys: [
          'Panva pevne pri operadle, valec tesne nad päty.',
          'Bedrový pás dotiahni — ak sa ti panva dvíha, hamstringy sa skracujú.',
          'Spúšťaj 2–3 sekundy, v natiahnutí neuvoľni.'
        ],
        mistake: 'Nadvihovanie panvy a bokov, aby sa dalo pretiahnuť viac váhy. Spoznáš to tak, že sa ti na konci série dvíha zadok zo sedadla.',
        check: 'Musíš cítiť ťah po zadnej strane stehna od kolena hore. Ak cítiš prácu len tesne za kolenom, skús pomalší zostup a menšiu váhu.'
      },
      {
        name: '45° back extension',
        keys: [
          'Podložka na úrovni panvových kostí, nie na bruchu.',
          'Pohyb ide z bedra — trup a chrbtica ostávajú v jednej línii.',
          'Hore zastav v rovine, nechoď do preklenutia.'
        ],
        mistake: 'Hyperextenzia hore. Cvik sa volá „back extension", takže ľudia inštinktívne idú do prehnutia — a tým zaťažujú kĺbne výbežky drieku namiesto svalu.',
        check: 'Ak stlačíš zadok a zastavíš v rovine, mala by pracovať zadná strana stehna a zadok. Ak to cítiš iba v drieku, buď si podložku nastavil vysoko, alebo ideš do prehnutia.'
      },
      {
        name: 'Hanging leg raise',
        keys: [
          'Najprv zaklop panvu dozadu, až potom dvíhaj nohy.',
          'Nehojdaj sa — ak sa hojdáš, cvik nerobíš.',
          'Dole spúšťaj pomaly, nespadni.'
        ],
        mistake: 'Dvíhanie nôh bez zaklopenia panvy. Vtedy pracujú flexory bedra, nie brucho — a je to zároveň ťah do preklenutia drieku.',
        check: 'Skús variant s pokrčenými kolenami a vedomým zaklopením panvy. Ak zrazu cítiš spodnú časť brucha, predtým si robil cvik na flexory bedra.'
      }
    ]
  },
  {
    day: 'Pondelok — Nohy + lýtka',
    items: [
      {
        name: 'Hack squat',
        keys: [
          'Chodidlá na šírku ramien, mierne vytočené, na strede plošiny.',
          'Choď do hĺbky, kde sú stehná pod vodorovnou.',
          'Chrbát pritlačený k opierke po celý čas, päty na plošine.'
        ],
        mistake: 'Polovičný rozsah. Je to najčastejšia chyba na drepových strojoch — váha vyzerá impozantne, ale kvadriceps nikdy nedostane natiahnutie, kvôli ktorému cvik robíš.',
        check: 'Ubere váhu na polovicu a choď tak hlboko, ako vieš pri pätách na plošine. Ak cítiš výrazne väčšiu prácu v stehnách než predtým, robil si polovičný cvik.'
      },
      {
        name: 'Romanian deadlift (voľná činka)',
        keys: [
          'Tyč sa šúcha po stehnách po celú dráhu — držíš ju pri tele.',
          'Bedrá idú <em>dozadu</em>, kolená sa ohýbajú len minimálne.',
          'Ideš dole len po hranicu, kde udržíš rovný chrbát — u väčšiny ľudí to je do polovice holene.'
        ],
        mistake: 'Vnímanie RDL ako predklonu namiesto posunu bedier dozadu. Spoznáš to tak, že tyč sa ti počas pohybu vzdiali od nôh a driek začne guľatieť. Druhá častá chyba: ísť na zem za každú cenu.',
        check: 'Musíš cítiť silný ťah v zadnej strane stehna, kým je chrbát ešte rovný. <strong>Vo chvíli, keď ťah zmizne a začne sa ohýbať chrbát, si prekročil svoj rozsah</strong> — tam sa zastav a odtiaľ ťahaj.'
      },
      {
        name: 'Bulgarian split squat',
        keys: [
          'Zadná noha na lavičke, predná dosť ďaleko, aby koleno neprechádzalo výrazne pred špičku.',
          'Váha na celom chodidle prednej nohy, hlavne na päte.',
          'Mierny predklon trupu = viac gluteus; vzpriamený trup = viac kvadriceps.'
        ],
        mistake: 'Príliš krátky krok, takže sa všetko presunie na koleno prednej nohy a na špičku. Spoznáš to podľa tlaku v prednej časti kolena namiesto práce v stehne a zadku.',
        check: 'Prvý týždeň to bude o rovnováhe, nie o svaloch. Prichyť sa jednou rukou stojana. Keď zvládneš 2 × 10 bez podpory, začni pridávať jednoručky.'
      },
      {
        name: 'Machine leg extension',
        keys: [
          'Valec tesne nad členkom, chrbát opretý.',
          '12–20 opakovaní, pauza hore 1 s.',
          'Spúšťaj kontrolovane, neodpúšťaj váhu.'
        ],
        mistake: 'Príliš ťažká váha a švih z bokov. Pri tomto cviku to okrem zbytočného rizika pre koleno nič nepridá.',
        check: 'Ak sa pri poslednom opakovaní dvíhaš zo sedadla alebo sa držíš madiel silou, uber váhu.'
      },
      {
        name: 'Standing calf raise',
        keys: [
          'Päta úplne dole, pauza 1 s v natiahnutí.',
          'Hore úplne na špičky, pauza pol sekundy.',
          'Koleno vystreté — v tom je celý rozdiel oproti seated verzii.'
        ],
        mistake: 'Malý rozsah a odrážanie sa. Lýtko má krátky rozsah pohybu, takže vynechanie natiahnutia znamená vynechanie väčšiny cviku. Spoznáš to podľa toho, že sa pohyb podobá skôr na drobné pruženie.',
        check: 'Rátaj tempo nahlas: <strong>1 dole – pauza – hore – pauza</strong>. Ak zrazu nedáš ani polovicu opakovaní, predtým si sa odrážal.'
      },
      {
        name: 'Machine seated calf raise',
        keys: [
          'Koleno ohnuté ~90°, podložka na spodnej časti stehna.',
          'Plný rozsah, pauza dole.',
          '12–20 opakovaní, vyššie počty sú v poriadku.'
        ],
        mistake: 'Rovnaká ako pri stojacej verzii — malý rozsah. Soleus znesie veľa opakovaní, takže tu je najmenší dôvod šetriť rozsahom.',
        check: 'Ak po sérii necítiš pálenie hlboko v lýtku (nie hore pod kolenom), pravdepodobne ti chýba rozsah.'
      }
    ]
  }
];
