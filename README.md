# Analýza tréningového plánu

Statická stránka s auditom tréningového plánu — objem po partiách, podregióny, tier list
cvikov, optimalizovaný 4-dňový plán, 12-týždňový cyklus, technika, longevity, sedavá práca
a ťaháky do posilky.

**Online:** https://haldyoso.github.io/PersonalTrainer/

Bez buildu, bez závislostí, bez siete za behu. Čistý HTML + CSS + ES moduly.
Grafy sú ručne kreslené inline SVG, nie knižnica.

---

## Štruktúra

```
index.html                  celý dokument, 19 sekcií, len značkovanie a mount pointy
assets/
  css/
    base.css                farebné tokeny, reset, typografia
    layout.css              hlavička, navigácia, sekcie, karty, pätka
    components.css          akordeón, tabuľky, tier list, heatmapa, index, slovník
    print.css               tlač a export do PDF
  js/
    main.js                 jediný vstupný bod — importuje všetko ostatné
    util.js                 $, esc, fold, fx, svg, mount
    data/                   ČISTÉ DÁTA, bez DOM
      volume.js             objem a frekvencia po partiách
      coverage.js           radar, pohybové vzory, kľúčové pomery
      heatmap.js            cvik × partia
      exercises.js          45 cvikov: tier, náradie, prečo, pozor
      days.js               4-dňová rotácia + 3-dňová verzia
      substitutions.js      náhradné cviky
      technique.js          technika po dňoch
      longevity.js          longevity dashboard
      mesocycle.js          12-týždňový cyklus a kontrolné body
      desk.js               sedavá práca
      glossary.js           slovník pojmov + priznaná miera istoty
    render/                 VYKRESĽOVANIE, bez dát
      charts.js             päť SVG grafov
      tables.js             objem, frekvencia, tier list, náhrady
      plan.js               dni, technika, longevity, cyklus, ťaháky, denník
      exercise-index.js     filtrovateľný index cvikov
      reference.js          sedavá práca, slovník, miera istoty
      search.js             vyhľadávanie naprieč sekciami, cvikmi a pojmami
      nav.js                aktívna sekcia, odhaľovanie, tlač
```

Hlavné pravidlo: **`data/` nikdy nesiahne na DOM a `render/` nikdy neobsahuje obsah.**
Keď treba opraviť číslo alebo vetu, mení sa súbor v `data/`. Keď treba zmeniť vzhľad,
mení sa `render/` alebo CSS. Vďaka tomu sa dá text upravovať bez rizika, že sa rozbije
vykresľovanie.

## Zamknutá sekcia (jedálniček)

Sekcia 18 je v repozitári uložená **zašifrovaná**. Nie je to skrytý `div` — bez kódu
je v súbore len nečitateľný blok znakov, ktorý sa nedá obísť pozretím zdroja stránky.

```
strava.source.json              čitateľný zdroj — v .gitignore, NIKDY sa necommituje
assets/js/data/strava.enc.js    zašifrovaný výstup — verejný, to je v poriadku
tools/encrypt.mjs               prevod jedného na druhé
assets/js/render/locked.js      odšifrovanie v prehliadači cez WebCrypto
```

**Zmena obsahu alebo kódu:**

```bash
# uprav strava.source.json, potom:
node tools/encrypt.mjs strava.source.json assets/js/data/strava.enc.js STRAVA_ENC
# kód sa pýta interaktívne, aby sa nedostal do histórie shellu
git add assets/js/data/strava.enc.js && git commit && git push
```

Po zmene obsahu prestane platiť kód uložený v prehliadači a zámok sa vráti — to je
správne správanie, nie chyba.

Šifrovanie: PBKDF2-SHA-256, 600 000 iterácií, náhodná soľ → AES-256-GCM.

**Čo to nechráni:** kód sa nedá odvolať (kto ho dostane, obsah si môže uložiť navždy);
zašifrovaný súbor je verejný, takže kód sa dá skúšať mimo stránky bez limitu pokusov.
Nie je to prihlásenie. Ak treba prístup odoberať, GitHub Pages na to nestačí.

**Dĺžka kódu rozhoduje o všetkom ostatnom.** Nástroj odmietne kód kratší než 12 znakov
a vypíše odhad, za ako dlho sa dá prelomiť na jednej grafickej karte. Prejsť sa dá
prepínačom `--allow-weak`, ale potom to musí byť vedomé rozhodnutie:

| dĺžka a druh | priestor | odhad |
|---|---|---|
| 6 číslic | 10⁶ | ~50 sekúnd |
| 6 číslic + jedno slovo | ~10¹⁷ | prakticky nikdy |
| päť náhodných slov | ~10⁴⁴ | prakticky nikdy |

Krátky kód zastaví náhodného návštevníka. Nezastaví nikoho, kto obsah naozaj chce.

> Do tohto súboru ani nikam inam v repozitári **nepíš skutočný kód** — ani ako príklad.
> README je verejné rovnako ako všetko ostatné.

> **Zálohuj si `strava.source.json` mimo repozitára.** Je v `.gitignore`, takže pri
> novom klone tam nebude a bez neho sa obsah nedá upraviť — len prečítať cez stránku.

## Lokálny beh

ES moduly nefungujú cez `file://` — treba jednoduchý server:

```bash
npx serve .          # alebo
python -m http.server 8000
```

Potom otvor `http://localhost:8000`.

## Nasadenie

Push do `main` spustí [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
ktorý poskladá `_site` a nasadí ho na GitHub Pages.

**Jednorazovo treba zapnúť Pages ručne:** Settings → Pages → Source: **GitHub Actions**.
Kým sa to nespraví, workflow padá hneď na kroku `configure-pages`. Zapnúť Pages priamo
z workflowu cez `enablement: true` nejde — `GITHUB_TOKEN` na to nemá právo a krok skončí
na 403. Po zapnutí stačí v Actions dať **Re-run jobs** na poslednom behu.

Alternatíva bez Actions: Settings → Pages → Source: **Deploy from a branch → `main` / `(root)`**.
V koreni je `index.html`, `assets/` aj `.nojekyll`, takže to funguje rovnako.

## Tlač

Stránka je navrhnutá aj na tlač (Ctrl/Cmd + P). Pred tlačou sa automaticky otvoria všetky
akordeóny, navigácia a filtre sa skryjú a ťaháky s denníkom začínajú na novej strane.

---

Vzdelávací materiál, nie zdravotné ani diagnostické odporúčanie. Miera istoty jednotlivých
tvrdení je rozpísaná priamo v dokumente v sekcii 18.
