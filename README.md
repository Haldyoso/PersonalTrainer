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

Jednorazovo treba v repozitári zapnúť **Settings → Pages → Source: GitHub Actions**.

## Tlač

Stránka je navrhnutá aj na tlač (Ctrl/Cmd + P). Pred tlačou sa automaticky otvoria všetky
akordeóny, navigácia a filtre sa skryjú a ťaháky s denníkom začínajú na novej strane.

---

Vzdelávací materiál, nie zdravotné ani diagnostické odporúčanie. Miera istoty jednotlivých
tvrdení je rozpísaná priamo v dokumente v sekcii 18.
