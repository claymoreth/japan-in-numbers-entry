// Hand-drawn SVG charts. No libraries, no network: every chart is built
// from the numbers in data.js and rendered as inline SVG with a viewBox,
// so it scales cleanly on desktop and on a phone.

const RED = '#C1272D';
const INDIGO = '#1B2A4A';
const INDIGO_LIGHT = '#3D5A80';
const GREY = '#8A8F98';
const LIGHT_GREY = '#E8E6E1';
const GOLD = '#D9A441';
const TEAL = '#2E7D6B';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.floor(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + 1e-9; v += s) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// Vertical bar chart. values: [{label, value}], unit is appended to tick labels.
export function barChart(values, { height = 260, unit = '', color = RED, zeroLine = true } = {}) {
  const W = 640;
  const H = height;
  const padL = 56;
  const padR = 12;
  const padT = 14;
  const padB = 34;
  const all = values.map((v) => v.value);
  const lo = Math.min(0, ...all);
  const hi = Math.max(0, ...all);
  const ticks = niceTicks(lo, hi, 4);
  const tMin = Math.min(lo, ticks[0]);
  const tMax = Math.max(hi, ticks[ticks.length - 1]);
  const y = (v) => padT + ((tMax - v) / (tMax - tMin)) * (H - padT - padB);
  const slot = (W - padL - padR) / values.length;
  const barW = Math.min(52, slot * 0.55);
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart" preserveAspectRatio="xMidYMid meet">`;
  for (const t of ticks) {
    svg += `<line x1="${padL}" y1="${y(t)}" x2="${W - padR}" y2="${y(t)}" stroke="${LIGHT_GREY}" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${GREY}">${t}${unit}</text>`;
  }
  if (zeroLine && tMin < 0 && tMax > 0) {
    svg += `<line x1="${padL}" y1="${y(0)}" x2="${W - padR}" y2="${y(0)}" stroke="${INDIGO}" stroke-width="1.5"/>`;
  }
  values.forEach((v, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const top = y(Math.max(0, v.value));
    const bot = y(Math.min(0, v.value));
    const fill = v.value < 0 ? INDIGO_LIGHT : color;
    svg += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(1, bot - top).toFixed(1)}" rx="3" fill="${fill}"/>`;
    const labelY = v.value < 0 ? bot + 16 : top - 6;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INDIGO}">${v.value > 0 ? '+' : ''}${v.value}${unit}</text>`;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="12" fill="${GREY}">${esc(v.label)}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Line chart with dots and value labels. values: [{label, value}].
export function lineChart(values, { height = 260, unit = '', color = RED } = {}) {
  const W = 640;
  const H = height;
  const padL = 56;
  const padR = 16;
  const padT = 22;
  const padB = 34;
  const all = values.map((v) => v.value);
  const lo = Math.min(...all);
  const hi = Math.max(...all);
  const ticks = niceTicks(lo, hi, 4);
  const tMin = Math.min(lo, ticks[0]);
  const tMax = Math.max(hi, ticks[ticks.length - 1]);
  const x = (i) => padL + (i / (values.length - 1)) * (W - padL - padR);
  const y = (v) => padT + ((tMax - v) / (tMax - tMin)) * (H - padT - padB);
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart" preserveAspectRatio="xMidYMid meet">`;
  for (const t of ticks) {
    svg += `<line x1="${padL}" y1="${y(t)}" x2="${W - padR}" y2="${y(t)}" stroke="${LIGHT_GREY}" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${GREY}">${t}${unit}</text>`;
  }
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v.value).toFixed(1)}`).join(' ');
  svg += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  values.forEach((v, i) => {
    svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(v.value).toFixed(1)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${(y(v.value) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INDIGO}">${v.value}${unit}</text>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="12" fill="${GREY}">${esc(v.label)}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Donut chart with a legend. items: [{label, share}] where share is a percent.
export function donutChart(items, { size = 300, colors = [RED, INDIGO, INDIGO_LIGHT, GOLD, TEAL, GREY] } = {}) {
  const W = size;
  const H = size;
  const cx = W / 2;
  const cy = H / 2;
  const r = W / 2 - 14;
  const inner = r * 0.58;
  const total = items.reduce((s, it) => s + it.share, 0);
  let angle = -90;
  let slices = '';
  items.forEach((it, i) => {
    const frac = it.share / total;
    const a0 = (angle * Math.PI) / 180;
    const a1 = ((angle + frac * 360) * Math.PI) / 180;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    slices += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
    angle += frac * 360;
  });
  const legend = items
    .map(
      (it, i) => `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(it.label)} <strong>${it.share}%</strong></li>`,
    )
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Donut chart" preserveAspectRatio="xMidYMid meet">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="${INDIGO}">${total.toFixed(0)}%</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${GREY}">of total</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Population pyramid. bands: [{band, male, female}] (counts). Men left in
// indigo, women right in vermilion. The widest band sets the scale.
export function pyramidChart(bands, { width = 640 } = {}) {
  const rowH = 21;
  const labelW = 52;
  const padT = 30;
  const padB = 8;
  const H = padT + bands.length * rowH + padB;
  const W = width;
  const mid = W / 2;
  const half = mid - labelW - 8;
  const max = Math.max(...bands.flatMap((b) => [b.male, b.female]));
  const barW = (v) => Math.max(2, (v / max) * half);
  const fmt = (n) => (n / 1000000).toFixed(2) + 'm';
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Population pyramid" preserveAspectRatio="xMidYMid meet">`;
  svg += `<text x="${mid - half - 4}" y="16" text-anchor="end" font-size="13" font-weight="700" fill="${INDIGO}">Men</text>`;
  svg += `<text x="${mid + half + 4}" y="16" text-anchor="start" font-size="13" font-weight="700" fill="${RED}">Women</text>`;
  svg += `<text x="${mid}" y="16" text-anchor="middle" font-size="12" fill="${GREY}">Age</text>`;
  bands
    .slice()
    .reverse()
    .forEach((b, ri) => {
      const i = bands.length - 1 - ri;
      const y = padT + i * rowH;
      const mw = barW(b.male);
      const fw = barW(b.female);
      svg += `<rect x="${(mid - mw).toFixed(1)}" y="${y + 2}" width="${mw.toFixed(1)}" height="16" rx="2" fill="${INDIGO}"/>`;
      svg += `<rect x="${mid.toFixed(1)}" y="${y + 2}" width="${fw.toFixed(1)}" height="16" rx="2" fill="${RED}"/>`;
      svg += `<text x="${mid}" y="${y + 15}" text-anchor="middle" font-size="11" fill="#fff" font-weight="600">${esc(b.band)}</text>`;
      svg += `<text x="${(mid - mw - 5).toFixed(1)}" y="${y + 15}" text-anchor="end" font-size="11" fill="${GREY}">${fmt(b.male)}</text>`;
      svg += `<text x="${(mid + fw + 5).toFixed(1)}" y="${y + 15}" text-anchor="start" font-size="11" fill="${GREY}">${fmt(b.female)}</text>`;
    });
  svg += `<line x1="${mid}" y1="${padT - 6}" x2="${mid}" y2="${H - padB}" stroke="${LIGHT_GREY}" stroke-width="1"/>`;
  svg += '</svg>';
  return svg;
}

// Horizontal bar list, used for export partners. items: [{label, share}].
export function hbarList(items, { color = RED } = {}) {
  const max = Math.max(...items.map((it) => it.share));
  const rows = items
    .map(
      (it) => `<li><span class="hbar-label">${esc(it.label)}</span><span class="hbar-track"><span class="hbar-fill" style="width:${((it.share / max) * 100).toFixed(1)}%;background:${color}"></span></span><span class="hbar-value">${it.share}%</span></li>`,
    )
    .join('');
  return `<ul class="hbar">${rows}</ul>`;
}
