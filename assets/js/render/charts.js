/**
 * charts.js — všetkých päť grafov je ručne kreslené inline SVG.
 *
 * Žiadna grafová knižnica: vyšlo to menšie, funguje bez siete, tlačí sa
 * bez artefaktov a nepotrebuje wrapper. Každý graf má pevný viewBox a škáluje
 * sa cez šírku 100 %, takže na mobile aj na monitore vyzerá rovnako.
 */

import { C, esc, fx, svg, $ } from '../util.js';
import { VOLUME } from '../data/volume.js';
import { RADAR, PATTERNS, RATIOS } from '../data/coverage.js';
import { COLUMNS, HEATMAP } from '../data/heatmap.js';

/**
 * Graf 1 a 6 — objem po partiách, séria = jeden blok.
 * @param {boolean} showAfter true = porovnanie pôvodný vs optimalizovaný plán
 */
export function volumeChart(el, showAfter) {
  if (!el) return;
  const W = 400, rowH = showAfter ? 26 : 23, padT = 22, padL = 112, padR = 10, maxSets = 22;
  const H = padT + VOLUME.length * rowH + 8;
  const plotW = W - padL - padR, u = plotW / maxSets;
  let s = '';

  for (let i = 0; i <= maxSets; i += 5) {
    const x = (padL + i * u).toFixed(1);
    s += `<line x1="${x}" y1="${padT - 8}" x2="${x}" y2="${H - 6}" stroke="${C.line}" stroke-width=".5"/>`;
    s += `<text x="${x}" y="${padT - 12}" font-size="8" fill="${C.ink3}" text-anchor="middle" font-family="monospace">${i}</text>`;
  }

  VOLUME.forEach((r, i) => {
    const y = padT + i * rowH;
    // odporúčané pásmo v pozadí
    s += `<rect x="${(padL + r.min * u).toFixed(1)}" y="${y + 1}" width="${((r.max - r.min) * u).toFixed(1)}" height="${rowH - 4}" fill="${C.band}" opacity=".75"/>`;
    s += `<text x="${padL - 6}" y="${y + rowH / 2 + 1}" font-size="8.5" fill="${C.ink}" text-anchor="end" font-weight="600">${esc(r.group)}</text>`;

    // pôvodný plán má jeden stĺpec, porovnanie po zmene dva nad sebou
    const bars = showAfter
      ? [[r.total4, C.old, y + 1, 7], [r.after, C.p25, y + 10, 7]]
      : [[r.total4, C.p20, y + 4, 10]];

    bars.forEach(([value, color, barY, barH]) => {
      const n = Math.round(value * 2) / 2;
      const full = Math.floor(n), half = n - full >= 0.5;
      for (let k = 0; k < full; k++) {
        s += `<rect x="${(padL + k * u + 0.6).toFixed(1)}" y="${barY}" width="${(u - 1.2).toFixed(1)}" height="${barH}" fill="${color}" rx="1"/>`;
      }
      if (half) {
        s += `<rect x="${(padL + full * u + 0.6).toFixed(1)}" y="${barY}" width="${(u / 2 - 1).toFixed(1)}" height="${barH}" fill="${color}" rx="1" opacity=".65"/>`;
      }
      s += `<text x="${(padL + Math.max(n, 0.4) * u + 3).toFixed(1)}" y="${barY + barH - 0.5}" font-size="7.5" font-family="monospace" fill="${C.ink2}">${fx(value)}</text>`;
    });
  });

  el.innerHTML = svg(W, H, s);
}

/** Graf 2 — radar pokrytia partií, teraz vs optimalizovaný plán. */
export function radarChart(el) {
  if (!el) return;
  const W = 400, H = 360, cx = 200, cy = 178, R = 118, n = RADAR.axes.length;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n, r = R * v / 10;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  let s = '';

  for (let g = 2; g <= 10; g += 2) {
    let d = '';
    for (let i = 0; i < n; i++) { const p = pt(i, g); d += (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); }
    s += `<path d="${d}Z" fill="none" stroke="${C.line}" stroke-width=".7"/>`;
  }
  for (let i = 0; i < n; i++) {
    const p = pt(i, 10);
    s += `<line x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="${C.line}" stroke-width=".7"/>`;
  }

  const poly = (vals, col, fill, sw) => {
    let d = '';
    vals.forEach((v, i) => { const p = pt(i, v); d += (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); });
    return `<path d="${d}Z" fill="${col}" fill-opacity="${fill}" stroke="${col}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  };
  s += poly(RADAR.now, C.p05, .28, 1.6) + poly(RADAR.opt, C.p25, .16, 2);
  RADAR.opt.forEach((v, i) => {
    const p = pt(i, v);
    s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.4" fill="${C.p25}"/>`;
  });

  RADAR.axes.forEach((lab, i) => {
    const p = pt(i, 11.45);
    let anchor = 'middle';
    if (p[0] > cx + 8) anchor = 'start'; else if (p[0] < cx - 8) anchor = 'end';
    const words = lab.split(' – ');
    const x = p[0].toFixed(1);
    const body = words.length > 1
      ? `<tspan x="${x}" dy="-4">${esc(words[0])}</tspan><tspan x="${x}" dy="10">${esc(words[1])}</tspan>`
      : esc(lab);
    s += `<text x="${x}" y="${(p[1] + 3).toFixed(1)}" font-size="8.5" font-weight="700" fill="${C.ink}" text-anchor="${anchor}">${body}</text>`;
  });

  el.innerHTML = svg(W, H, s);
}

/** Graf 4 — vodorovné stĺpce pokrytia pohybových vzorov. */
export function patternChart(el) {
  if (!el) return;
  const W = 400, rowH = 26, padL = 124, padR = 32, padT = 6;
  const H = padT + PATTERNS.length * rowH + 6, plotW = W - padL - padR;
  let s = '';

  PATTERNS.forEach((r, i) => {
    const y = padT + i * rowH;
    s += `<text x="${padL - 6}" y="${y + 13}" font-size="8.5" font-weight="600" fill="${C.ink}" text-anchor="end">${esc(r.name)}</text>`;
    s += `<rect x="${padL}" y="${y + 2}" width="${plotW}" height="18" fill="#eef0f2" rx="2"/>`;
    s += `<rect x="${padL}" y="${y + 2}" width="${(plotW * r.opt / 100).toFixed(1)}" height="18" fill="${C.p25}" rx="2" opacity=".9"/>`;
    s += `<rect x="${padL}" y="${y + 2}" width="${(plotW * r.now / 100).toFixed(1)}" height="18" fill="${C.p05}" rx="2"/>`;
    const inside = r.now >= 12;
    s += `<text x="${(padL + plotW * r.now / 100 + (inside ? -4 : 4)).toFixed(1)}" y="${y + 15}" font-size="8" font-family="monospace" font-weight="700" fill="${inside ? '#fff' : C.ink2}" text-anchor="${inside ? 'end' : 'start'}">${r.now}%</text>`;
    s += `<text x="${W - padR + 4}" y="${y + 15}" font-size="8" font-family="monospace" fill="${C.p25}" font-weight="700">${r.opt}%</text>`;
  });

  el.innerHTML = svg(W, H, s);
}

/** Graf 3 — heatmapa cvik × partia. Nie SVG, ale tabuľka: ostane čitateľná pri zväčšení. */
export function heatmapChart(el) {
  if (!el) return;
  let h = '<table class="hm"><thead><tr><th class="rowh">Cvik</th>';
  COLUMNS.forEach((c) => { h += `<th>${esc(c)}</th>`; });
  h += '</tr></thead><tbody>';
  HEATMAP.forEach((r) => {
    h += `<tr><td class="rowh">${esc(r.ex)}</td>`;
    r.cells.forEach((v) => {
      const cls = v === 2 ? 'h2c' : v === 1 ? 'h1c' : 'h0c';
      const glyph = v === 2 ? '■' : v === 1 ? '▪' : '';
      const title = v === 2 ? 'primárne' : v === 1 ? 'sekundárne' : 'nulové';
      h += `<td><i class="${cls}" title="${title}">${glyph}</i></td>`;
    });
    h += '</tr>';
  });
  el.innerHTML = h + '</tbody></table>';
}

/** Graf 5 — kľúčové pomery: teraz, po zmene a ideálna čiara. */
export function ratioChart(el) {
  if (!el) return;
  const W = 400, blockH = 74, H = RATIOS.length * blockH + 6, padL = 8, padR = 8;
  const plotW = W - padL - padR;
  let s = '';

  RATIOS.forEach((r, i) => {
    const y0 = i * blockH + 16;
    s += `<text x="${padL}" y="${y0 - 4}" font-size="10" font-weight="700" fill="${C.ink}">${esc(r.title)}</text>`;
    [['teraz', r.now, y0 + 2, C.p05], ['po zmene', r.opt, y0 + 28, C.p25]].forEach(([label, value, y, color]) => {
      const wA = plotW * value / 100;
      s += `<rect x="${padL}" y="${y}" width="${wA.toFixed(1)}" height="18" fill="${color}" rx="2"/>`;
      s += `<rect x="${(padL + wA).toFixed(1)}" y="${y}" width="${(plotW - wA).toFixed(1)}" height="18" fill="#d9dee3" rx="2"/>`;
      s += `<text x="${padL + 4}" y="${y + 13}" font-size="8" font-family="monospace" font-weight="700" fill="#fff">${esc(r.a)} ${Math.round(value)}%</text>`;
      s += `<text x="${W - padR - 4}" y="${y + 13}" font-size="8" font-family="monospace" font-weight="700" fill="${C.ink}" text-anchor="end">${esc(r.b)} ${Math.round(100 - value)}%</text>`;
      s += `<text x="${padL - 6}" y="${y + 13}" font-size="7" fill="${C.ink3}" text-anchor="end">${label}</text>`;
    });
    const xi = padL + plotW * r.ideal / 100;
    s += `<line x1="${xi.toFixed(1)}" y1="${y0 - 1}" x2="${xi.toFixed(1)}" y2="${y0 + 49}" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="3 2"/>`;
    s += `<text x="${xi.toFixed(1)}" y="${y0 + 58}" font-size="7" font-family="monospace" fill="${C.ink}" text-anchor="middle">ideál ${r.ideal}/${100 - r.ideal}</text>`;
  });

  el.innerHTML = svg(W, H, s);
}

/** Vykreslí všetky grafy naraz. Chýbajúci cieľ sa ticho preskočí. */
export function renderCharts() {
  volumeChart($('#chart-volume'), false);
  volumeChart($('#chart-after'), true);
  radarChart($('#chart-radar'));
  patternChart($('#chart-patterns'));
  heatmapChart($('#chart-heat'));
  ratioChart($('#chart-ratios'));
}
