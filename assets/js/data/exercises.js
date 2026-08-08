/**
 * exercises.js — všetky hodnotené cviky (tier list + index cvikov).
 *
 * name   … oficiálny anglický názov, tak ako sa cvik pýta v posilňovni
 * groups … partie na filtrovanie; zobrazuje sa spojené lomkou
 * tier   … S / A / B / C / D — hodnotenie VNÚTRI partie, nie naprieč telom
 * gear   … náradie, na filtrovanie v indexe cvikov
 * state  … 'keep' = máš v pláne · 'new' = odporúčaný doplnok · 'cut' = navrhujem vypustiť
 * why    … prečo práve tento tier  (POZOR: môže obsahovať <em>, neescapovať)
 * care   … na čo si dať pozor       (POZOR: môže obsahovať <em>, neescapovať)
 *
 * Tier vychádza z ôsmich kritérií vypísaných v sekcii 06. Je to odborný
 * úsudok podľa nich, nie meranie — pozri „Slovník a miera istoty".
 */

/** Všetky hodnoty, ktoré sa smú objaviť v `gear`. Poradie určuje poradie filtrov. */
export const GEAR = ['Veľká činka', 'EZ tyč', 'Jednoručky', 'Kábel', 'Stroj', 'Smith', 'Vlastná váha', 'Hrazda'];

export const STATE_LABEL = {
  keep: 'Máš v pláne',
  new: 'Odporúčané doplniť',
  cut: 'Navrhujem vypustiť'
};

export const EXERCISES = [
  {
    name: 'DB incline bench press', groups: ['Prsia'], tier: 'S', gear: ['Jednoručky'], state: 'keep',
    why: 'Ťažký tlak s plným natiahnutím prsného svalu v spodnej polohe, veľký rozsah, jednoduchá progresia, jednoručky umožnia prirodzenú dráhu lakťov. Najlepší cvik v tvojom pláne.',
    care: 'Lavička 30°, nie 45° — nad 30° sa cvik mení na tlak na ramená. Lakte ~45° od tela, nie roztiahnuté do strán.'
  },
  {
    name: 'Machine chest press / flat DB press', groups: ['Prsia'], tier: 'A', gear: ['Stroj', 'Jednoručky'], state: 'new',
    why: 'Ťažký horizontálny tlak s veľmi jednoduchou progresiou a nízkymi nárokmi na stabilitu — vieš ísť blízko zlyhania bezpečne. Doplní stredné a dolné prsia, ktoré incline nepokryje.',
    care: 'Na stroji nastav sedadlo tak, aby madlá boli vo výške stredu hrudníka, nie pri kľúčnych kostiach.'
  },
  {
    name: 'Machine fly (pec deck)', groups: ['Prsia'], tier: 'A', gear: ['Stroj'], state: 'keep',
    why: 'Čistá addukcia bez tricepsu, dobrý rozsah, nulové nároky na stabilitu. Zrážka len za to, že u väčšiny strojov je vrchol odporu v strede dráhy, nie v natiahnutí.',
    care: 'Lakte mierne pokrčené a zafixované. Nestláčaj madlá rukami — pohyb ide z ramena, ruky sú len háky.'
  },
  {
    name: 'Low cable crossover', groups: ['Prsia'], tier: 'C', gear: ['Kábel'], state: 'cut',
    why: 'Funguje, ale duplikuje horné prsia, ktoré už máš z incline pressu. Odpor je najväčší v skrátenej polohe a najmenší v natiahnutí — teda presne naopak, než by mal byť. Progresívne preťaženie je na kábloch s malými skokmi ťažké.',
    care: 'Ak si ho chceš nechať, rob ho ako posledný cvik na 15–20 opakovaní, nie ako tretí ťažký.'
  },
  {
    name: 'Overhead cable triceps extension', groups: ['Triceps'], tier: 'S', gear: ['Kábel'], state: 'new',
    why: 'Jediný bežný cvik, ktorý zaťaží dlhú hlavu tricepsu v maximálnom natiahnutí — a kábel na rozdiel od činky drží napätie práve v tejto pozícii. Dlhá hlava je najväčšia z troch a v tvojom pláne nedostáva nič.',
    care: 'Lakte drž pri hlave, nerozťahuj ich do strán. Trup mierne predklonený, aby bola dráha čistá.'
  },
  {
    name: 'EZ bar skullcrusher (za hlavu)', groups: ['Triceps'], tier: 'A', gear: ['EZ tyč'], state: 'new',
    why: 'To isté natiahnutie dlhej hlavy s voľnou váhou. Zrážka: v hornej časti pohybu napätie mizne a u časti ľudí dráždi lakte.',
    care: 'Spúšťaj za hlavu, nie na čelo — na čelo znamená menšie natiahnutie dlhej hlavy. Lakte drž stabilné.'
  },
  {
    name: 'Cable triceps pushdown', groups: ['Triceps'], tier: 'B', gear: ['Kábel'], state: 'keep',
    why: 'Bezpečný, ľahko sa naučí, dobrá kontrola. Ale lakeť pri tele = dlhá hlava skrátená, teda žiadna práca v natiahnutí. Ako <em>doplnok</em> po overhead cviku výborný, ako hlavný tricepsový cvik nedostatočný.',
    care: 'Lakte pri tele a nehýbu sa. Ak sa ti pri poslednom opakovaní dvíhajú, váha je príliš vysoká.'
  },
  {
    name: 'EZ bar pushdown', groups: ['Triceps'], tier: 'C', gear: ['Kábel', 'EZ tyč'], state: 'cut',
    why: 'Ten istý pohyb ako cable pushdown, na tom istom stroji, s iným madlom. Rozdiel v aktivácii je zanedbateľný — sú to fakticky dva cviky za cenu jedného stimulu.',
    care: 'Nahraď ho overhead extenziou. Ak chceš striedať madlá, striedaj ich medzi týždňami, nie v rámci jedného tréningu.'
  },
  {
    name: 'Dips', groups: ['Triceps', 'Prsia'], tier: 'B', gear: ['Vlastná váha'], state: 'new',
    why: 'Ťažký tlak, ktorý sa dobre preťažuje pridávaním váhy. Zrážka: dlhá hlava opäť pri tele a v hlbokej pozícii vysoká záťaž na predné rameno.',
    care: 'Nechoď hlbšie, než po vodorovné rameno. Mierny predklon = viac prsia, vzpriamený trup = viac triceps.'
  },
  {
    name: 'Barbell bent-over row', groups: ['Chrbát'], tier: 'A', gear: ['Veľká činka'], state: 'keep',
    why: 'Najlepší cvik na hrúbku chrbta, umožní ťažké váhy a jasnú progresiu. Zrážka za dve veci: vysoká záťaž drieku (systémová únava) a vysoká náročnosť techniky práve u samouka.',
    care: 'Nikdy bližšie než RIR 2. Sériu ukonči, keď sa zmení uhol trupu, nie keď nedáš opakovanie. Krk v predĺžení chrbtice, nepozeraj hore.'
  },
  {
    name: 'Chest-supported row', groups: ['Chrbát'], tier: 'A', gear: ['Stroj', 'Jednoručky'], state: 'new',
    why: 'Rovnaký stimul na medzilopatkové svaly bez záťaže drieku a bez možnosti podvádzať trupom. Lepší pomer stimul/únava než barbell row, horší prenos do celkovej sily.',
    care: 'Ak máš pri barbell rowe pochybnosti o technike, prejdi na tento a nič nestratíš.'
  },
  {
    name: 'Single-arm seated cable row', groups: ['Chrbát'], tier: 'S', gear: ['Kábel'], state: 'keep',
    why: 'Veľký rozsah vrátane protrakcie a retrakcie lopatky, jednostranná práca odstráni silovú asymetriu, kábel drží napätie po celej dráhe, driek je odľahčený.',
    care: 'Nechaj lopatku ísť dopredu v natiahnutí — to je práve tá časť rozsahu, ktorú väčšina ľudí vynechá. Nerotuj trupom.'
  },
  {
    name: 'Pull-up / chin-up', groups: ['Chrbát'], tier: 'A', gear: ['Hrazda', 'Vlastná váha'], state: 'new',
    why: 'Voľná dráha umožní plný pohyb lopatky, plus vedľajší efekt na úchop a trup. Zrážka za obmedzenú progresiu pri vlastnej váhe — pri 85 kg to nemusí ísť hneď.',
    care: 'Ak nedáš 6, používaj gravitron alebo gumu. Nehádž sa nohami.'
  },
  {
    name: 'Fixed lat pulldown', groups: ['Chrbát'], tier: 'B', gear: ['Stroj'], state: 'keep',
    why: 'Solídny vertikálny ťah, ľahká progresia, bezpečný. Zrážka: fixná dráha obmedzuje pohyb lopatky a hornú časť rozsahu, kde sa lat naťahuje najviac.',
    care: 'Nechaj ramená ísť úplne hore v natiahnutí. Neťahaj bradou k madlu — pohyb končí, keď sú lakte pri tele.'
  },
  {
    name: 'Vertical row (stroj)', groups: ['Chrbát'], tier: 'B', gear: ['Stroj'], state: 'cut',
    why: 'Použiteľný, ale robí to isté, čo lat pulldown. V pláne, kde chýbajú celé partie, je duplicita drahá.',
    care: 'Vypustiť. Ak sa ti páči viac než pulldown, nechaj ten a vypusti pulldown — ale nie oba.'
  },
  {
    name: "Farmer's carry", groups: ['Chrbát', 'Úchop'], tier: 'S', gear: ['Jednoručky'], state: 'new',
    why: 'Úchop, horný trapéz, trup, vzpriamovače, axiálne zaťaženie kostí a trochu kardia — za tri minúty. Najlepší pomer prínos/čas v celom pláne.',
    care: 'Ramená dolu a dozadu, rebrá zaklopené, kráčaj normálne. Nie shrug počas chôdze.'
  },
  {
    name: 'DB shrug', groups: ['Trapéz'], tier: 'B', gear: ['Jednoručky'], state: 'new',
    why: 'Priama práca na horný trapéz, ktorý ti chýba. Zrážka za malý rozsah pohybu a za to, že carry dá podobný efekt plus päť ďalších vecí.',
    care: 'Pohyb ide priamo hore, nie dozadu ani do kruhu. Pauza hore 1 sekundu.'
  },
  {
    name: 'Dead hang', groups: ['Úchop'], tier: 'A', gear: ['Hrazda', 'Vlastná váha'], state: 'new',
    why: 'Úchop, dekompresia chrbtice a mobilita ramena naraz, za nula nákladov. Zrážka len za to, že sa ťažko progresívne preťažuje.',
    care: 'Ramená nenechaj úplne „vypadnúť" — drž mierne aktívnu lopatku.'
  },
  {
    name: 'Hammer curl', groups: ['Biceps'], tier: 'A', gear: ['Jednoručky'], state: 'keep',
    why: 'Neutrálny úchop zaťaží brachialis a brachioradialis, ktoré rozšíria rameno viac než samotný biceps. Šetrný k lakťom, dobre sa preťažuje.',
    care: 'Nešvihaj trupom. Lakte pri tele.'
  },
  {
    name: 'Preacher curl machine', groups: ['Biceps'], tier: 'A', gear: ['Stroj'], state: 'keep',
    why: 'Odpor je najvyšší v spodnej, natiahnutej polohe — to je pri bicepse to hlavné. Stroj eliminuje švih úplne.',
    care: 'V spodnej polohe nespúšťaj do voľného pádu, posledných 15° kontroluj. Rameno pred telom znamená skrátenú dlhú hlavu — preto sa oplatí doplniť incline curl.'
  },
  {
    name: 'Incline DB curl', groups: ['Biceps'], tier: 'S', gear: ['Jednoručky'], state: 'new',
    why: 'Rameno za telom = dlhá hlava bicepsu maximálne natiahnutá pod záťažou. Jediný bežný cvik s touto vlastnosťou a preto najlepší doplnok k preacheru.',
    care: 'Lavička ~45–60°. Nechaj ruku úplne visieť dole, aj keď to na začiatku „ťahá".'
  },
  {
    name: 'DB alternating biceps curl', groups: ['Biceps'], tier: 'C', gear: ['Jednoručky'], state: 'cut',
    why: 'Nie je zlý, len redundantný — hammer curl robí to isté lepšie a striedanie rúk zdvojnásobuje čas série pri rovnakom stimule.',
    care: 'Vypustiť. Biceps má v tvojom pláne najviac objemu zo všetkých partií.'
  },
  {
    name: 'DB lateral raise', groups: ['Ramená'], tier: 'S', gear: ['Jednoručky'], state: 'keep',
    why: 'Najpriamejší cvik na bočný deltoid, ktorý určuje šírku ramien z čelného pohľadu. Ľahko sa naučí, dá sa robiť veľa.',
    care: 'Ramená drž dolu, nekrč sa. Ak sa pri poslednom opakovaní dvíhaš celým telom, uber váhu — 12–20 opakovaní, nie 8.'
  },
  {
    name: 'Cable lateral raise', groups: ['Ramená'], tier: 'S', gear: ['Kábel'], state: 'new',
    why: 'Kábel dáva odpor od prvého centimetra, kde jednoručka nedáva takmer nič (gravitácia ťahá rovnobežne s ramenom). Iná krivka odporu = nie duplicita, ale doplnok.',
    care: 'Stoj tak, aby kábel viedol spoza tela. Ruka ide do strany, nie dopredu.'
  },
  {
    name: 'DB seated shoulder press', groups: ['Ramená'], tier: 'A', gear: ['Jednoručky'], state: 'keep',
    why: 'Solídny vertikálny tlak, prirodzená dráha, dobrá progresia. Zrážka: predný deltoid už dostáva prácu z incline pressu, takže marginálny prínos je menší.',
    care: 'Opierka ~80°, nie 90° — mierny sklon je šetrnejší k ramenu. Nezaklápaj driek do preklenutia.'
  },
  {
    name: 'Reverse pec deck', groups: ['Ramená'], tier: 'S', gear: ['Stroj'], state: 'new',
    why: 'Konštantný odpor po celej dráhe, nulové nároky na stabilitu, nedá sa pokaziť švihom — pre zadný deltoid, ktorý zvládne veľmi málo váhy, ideálne.',
    care: 'Lakte mierne pokrčené a vyššie než zápästia. Nesťahuj lopatky k sebe — to prevezme pohyb za zadný deltoid.'
  },
  {
    name: 'Face pull', groups: ['Ramená'], tier: 'A', gear: ['Kábel'], state: 'new',
    why: 'Zadný deltoid, dolný trapéz a externá rotácia v jednom pohybe. Ak by si mal robiť jediný cvik pre zdravie ramena, je to tento.',
    care: 'Kábel nastav nad úroveň hlavy. Ťahaj k čelu a rotuj predlaktia dozadu — pointa je práve tá rotácia, nie samotný ťah.'
  },
  {
    name: 'Hack squat', groups: ['Nohy'], tier: 'S', gear: ['Stroj'], state: 'new',
    why: 'Kvadriceps v maximálnom natiahnutí pri hlbokej flexii kolena, fixná dráha ti dovolí ísť blízko zlyhania bez rizika, naučí sa za jeden tréning. Pre samouka lepší štart než veľká činka.',
    care: 'Nohy nižšie na plošine = viac kvadriceps. Choď do hĺbky, kde sa stehná dostanú pod vodorovnú — polovičný drep je polovičný cvik.'
  },
  {
    name: 'Smith machine squat', groups: ['Nohy'], tier: 'A', gear: ['Smith'], state: 'new',
    why: 'Ak hack squat nemáte. Zvislá dráha tu neprekáža, drep je prevažne zvislý pohyb. Zrážka za menší nárok na stabilizátory a trup.',
    care: 'Nohy o niečo pred telom. Sleduj, aby si nemal váhu celú na špičkách.'
  },
  {
    name: 'Barbell back squat', groups: ['Nohy'], tier: 'S', gear: ['Veľká činka'], state: 'new',
    why: 'Najkomplexnejší cvik na dolné telo a jediný v pláne s priamou axiálnou kompresiou chrbtice — teda jediný, ktorý reálne pôsobí na hustotu kostí drieku a krčka stehennej kosti. Zrážka za náročnosť naučenia.',
    care: 'Nauč sa ho postupne, s prázdnou tyčou v rozcvičke, kým hlavnú prácu robíš na hack squate. Natoč sa zboku. Toto je cieľ na 3–6 mesiacov, nie na budúci týždeň.'
  },
  {
    name: 'Romanian deadlift (voľná činka)', groups: ['Nohy'], tier: 'S', gear: ['Veľká činka', 'Jednoručky'], state: 'new',
    why: 'Hamstringy a gluteus v maximálnom natiahnutí, veľká záťaž, výborný prenos do všetkého ostatného. Voľná tyč umožní prirodzený oblúk pohybu, ktorý Smith znemožňuje.',
    care: 'Tyč sa šúcha po stehnách. Bedrá idú dozadu, nie kolená dopredu. Chrbát rovný — pri prvom zaguľatení sériu končíš.'
  },
  {
    name: 'Smith Romanian deadlift', groups: ['Nohy'], tier: 'C', gear: ['Smith'], state: 'cut',
    why: 'Vzor je správny, prevedenie nie. Zvislá dráha Smithu je v konflikte s oblúkom hip hinge — buď brzdíš tyč o stehná, alebo posúvaš trup dopredu a vzniká strihové zaťaženie drieku.',
    care: 'Nahradiť voľnou činkou. Počítaj s tým, že váha pôjde dole zhruba o 40 % — je to iný cvik.'
  },
  {
    name: 'Seated leg curl', groups: ['Nohy'], tier: 'S', gear: ['Stroj'], state: 'new',
    why: 'V sede je bedro ohnuté, takže hamstringy sú predĺžené a odpor ich zasiahne v najväčšom natiahnutí. Pri priamom porovnaní dáva väčší prírastok než ležiaci variant. Rieši najväčšiu dieru tvojho plánu.',
    care: 'Panvu drž pritlačenú k operadlu — ak sa ti dvíha, hamstringy sa skracujú a cvik stráca zmysel. Spúšťaj pomaly, 2–3 sekundy.'
  },
  {
    name: 'Lying leg curl', groups: ['Nohy'], tier: 'A', gear: ['Stroj'], state: 'new',
    why: 'To isté, ale s vystretým bedrom sú hamstringy skrátené, teda menej záťaže v natiahnutí. Stále veľmi dobrý cvik.',
    care: 'Nedvíhaj boky z podložky. To je jediná chyba, ktorá na tomto stroji stojí za reč.'
  },
  {
    name: 'Nordic curl / GHR', groups: ['Nohy'], tier: 'B', gear: ['Vlastná váha'], state: 'new',
    why: 'Excentrická práca s vysokou preventívnou hodnotou proti natrhnutiu zadného stehna. Zrážka za to, že sa veľmi ťažko dávkuje a progresívne preťažuje.',
    care: 'Buď kontroluješ celý zostup, alebo cvik nerobíš — padnúť dole nie je opakovanie.'
  },
  {
    name: 'Bulgarian split squat', groups: ['Nohy'], tier: 'A', gear: ['Jednoručky', 'Vlastná váha'], state: 'new',
    why: 'Kvadriceps, gluteus, gluteus medius a rovnováha naraz — presne to, čo jednonožný leg press nedáva. Vysoký stimul pri malej záťaži, teda šetrný k chrbtici.',
    care: 'Predná noha dosť ďaleko, aby sa koleno nedostávalo ďaleko pred špičku. Váha na celom chodidle, nie na špičke. Mierny predklon = viac gluteus.'
  },
  {
    name: 'Machine leg press (jednonožne)', groups: ['Nohy'], tier: 'B', gear: ['Stroj'], state: 'cut',
    why: 'Bezpečný a umožní veľkú záťaž na kvadriceps a gluteus bez zaťaženia chrbtice. Ale: sedíš, panva je opretá, takže žiadna rovnováha, žiadny gluteus medius, žiadne axiálne zaťaženie pre kosti. A jednonožné prevedenie zdvojnásobuje čas.',
    care: 'Nahradiť Bulgarian split squatom. Ak si ho necháš, rob ho obojnožne a ťažko — jednonožne stráca hlavnú výhodu, ktorou je záťaž.'
  },
  {
    name: 'Machine leg extension', groups: ['Nohy'], tier: 'A', gear: ['Stroj'], state: 'keep',
    why: 'Jediný cvik, ktorý izoluje kvadriceps a najmä rectus femoris. Bezpečný, ľahko sa preťažuje, výborný ako izolácia na záver.',
    care: 'Rozsah 12–20 opakovaní — ťažké trojky zbytočne zaťažujú patelofemorálny kĺb. Patrí <em>za</em> viackĺbové cviky, nie pred ne.'
  },
  {
    name: '45° back extension', groups: ['Nohy', 'Driek'], tier: 'A', gear: ['Stroj', 'Vlastná váha'], state: 'new',
    why: 'Gluteus, hamstringy a vzpriamovače v jednom, s veľmi nízkou systémovou únavou. Trénuje driek cielene namiesto toho, aby ho iba unavoval.',
    care: 'Pohyb z bedra, nie z chrbtice. V hornej polohe stlač zadok a zastav — nechoď do preklenutia drieku.'
  },
  {
    name: 'Standing calf raise', groups: ['Lýtka'], tier: 'S', gear: ['Stroj', 'Smith'], state: 'new',
    why: 'Gastrocnemius prechádza cez koleno — v stoji je natiahnutý a pracuje naplno. Bez tohto cviku trénuješ presne polovicu lýtka.',
    care: 'Plný rozsah: päta úplne dole, pauza 1 s v natiahnutí, potom hore. Väčšina ľudí robí pol centimetra a veľa váhy.'
  },
  {
    name: 'Machine seated calf raise', groups: ['Lýtka'], tier: 'B', gear: ['Stroj'], state: 'keep',
    why: 'Správna voľba na soleus, ktorý má vysoký podiel pomalých vlákien a znesie veľa opakovaní. Zrážka len za to, že gastrocnemius pri ňom takmer nepracuje — takže sám o sebe nestačí.',
    care: '12–20 opakovaní, pauza v natiahnutí. Dobrý kandidát na pauzy medzi sériami v deň ramien.'
  },
  {
    name: 'Ab wheel rollout', groups: ['Core'], tier: 'S', gear: ['Vlastná váha'], state: 'new',
    why: 'Anti-extension so záťažou v maximálnom natiahnutí, plynulá progresia od kolien po stoj. Najlepší brušný cvik, aký sa dá robiť bez stroja.',
    care: 'Rebrá zaklopené, driek nesmie preklenúť. Choď len tak ďaleko, ako udržíš rovný driek — a tú vzdialenosť postupne zväčšuj.'
  },
  {
    name: 'Hanging leg raise', groups: ['Core'], tier: 'A', gear: ['Hrazda', 'Vlastná váha'], state: 'new',
    why: 'Brucho, úchop a dekompresia chrbtice v jednom. Zrážka za to, že bez kontroly panvy sa z toho stane cvik na flexory bedra.',
    care: 'Zaklop panvu dozadu skôr, než začneš dvíhať nohy. Ak sa hojdáš, cvik nerobíš.'
  },
  {
    name: 'Cable crunch', groups: ['Core'], tier: 'A', gear: ['Kábel'], state: 'new',
    why: 'Jediný brušný cvik, kde vieš týždeň po týždni pridávať kilá — teda jediný skutočne progresívne preťažiteľný.',
    care: 'Pohyb je zaguľatenie chrbtice, nie ohyb v bedrách. Boky sa nehýbu.'
  },
  {
    name: 'Pallof press', groups: ['Core'], tier: 'A', gear: ['Kábel'], state: 'new',
    why: 'Jediný rozumne dávkovateľný anti-rotačný cvik. Šikmé svaly a quadratus lumborum nedostanú z tvojho plánu inak nič.',
    care: 'Nejde o to zatlačiť ďaleko, ale o to nedovoliť trupu rotovať. Ak sa hýbeš, uber váhu.'
  }
];

/** Zoznam partií v poradí, v akom sa majú zobraziť filtre. */
export const GROUPS = [...new Set(EXERCISES.flatMap((e) => e.groups))];

/** Názov cviku so všetkými partiami: „Dips" → „Triceps / prsia". */
export const groupLabel = (ex) => ex.groups.join(' / ');
