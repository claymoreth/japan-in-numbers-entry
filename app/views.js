// HTML for each page, built from the data in data.js. Every value shown
// comes from data.js and is escaped before it goes into the page.

import { AGE_STRUCTURE, ARCHIVE, EXPORT_GOODS, EXPORT_PARTNERS, GDP_BY_SECTOR, HEADLINE, LABOUR_BY_OCCUPATION, PYRAMID, SERIES, YEARS } from './data.js';
import { barChart, donutChart, hbarList, lineChart, pyramidChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function fmtNum(n, decimals = 1) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function yearSelect(year) {
  const opts = YEARS.map((y) => `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`).join('');
  return `<label class="year-picker">Year <select id="year-select" aria-label="Select year">${opts}</select></label>`;
}

function sourceLine(source, year) {
  return `<p class="source">Source: ${esc(source)}, ${year}</p>`;
}

function statCard(label, value, note, source, year) {
  return `<article class="stat-card"><h3>${esc(label)}</h3><p class="stat-value">${esc(value)}</p><p class="stat-note">${esc(note)}</p><p class="stat-source">Source: ${esc(source)}, ${year}</p></article>`;
}

function seriesValues(key, unit) {
  return YEARS.map((y) => ({ label: String(y), value: SERIES[y][key] }));
}

export function home(state) {
  const y = state.year;
  const s = SERIES[y];
  // For 2025 the cards show the latest published headline figures (World
  // Bank WDI / IMF WEO); for earlier years they show the IMF table series.
  const isLatest = y === 2025;
  const cards = [
    statCard('Population', `${fmtNum(s.population)} million`, y === 2025 ? 'Rank #12 in the world' : 'World Bank WDI', 'World Bank WDI', y),
    statCard('GDP (nominal)', isLatest ? '$4.44 trillion' : `$${fmtNum(s.gdpNominal / 1000, 2)} trillion`, y === 2025 ? 'Rank #4 in the world' : 'IMF table', isLatest ? 'World Bank WDI' : 'IMF, via Wikipedia "Economy of Japan"', y),
    statCard('Real GDP growth', `${s.growth > 0 ? '+' : ''}${fmtNum(s.growth)}%`, y === 2025 ? 'Recovered from −4.3% in 2020' : 'Year on year, real terms', 'IMF WEO / World Bank', y),
    statCard('Inflation (CPI)', `${fmtNum(s.inflation)}%`, 'Annual average', 'IMF / World Bank WDI', y),
    statCard('Unemployment rate', `${fmtNum(s.unemployment)}%`, 'ILO modelled estimate', 'World Bank WDI', y),
    statCard('GDP per capita (PPP)', isLatest ? '$56,854' : `$${Math.round(s.gdpPcPpp).toLocaleString('en-US')}`, 'Purchasing power parity', isLatest ? 'IMF WEO' : 'IMF, via Wikipedia "Economy of Japan"', y),
    statCard('Government gross debt', isLatest ? '206.5% of GDP' : `${fmtNum(s.debt)}% of GDP`, isLatest ? 'IMF table: 204.8% of GDP' : 'IMF table, via Wikipedia', 'IMF WEO', y),
    statCard('Life expectancy at birth', '84.0 years', 'Women 87.1 · Men 81.1', 'World Bank WDI', 2024),
  ].join('');
  return `
<section class="hero">
  <p class="eyebrow">Japan · National Statistics · 2020–2025</p>
  <h1>Japan in Numbers</h1>
  <p class="lede">The economy, the people and the labour market of Japan — every figure sourced, every chart drawn from the data, nothing estimated.</p>
  <div class="hero-controls">${yearSelect(y)}<span class="hero-hint">Change the year to redraw every figure and chart on this page.</span></div>
</section>
<section>
  <h2>Headline indicators · ${y}</h2>
  <div class="stat-grid">${cards}</div>
</section>
<section class="chart-grid">
  <div class="chart-card">
    <h2>Real GDP growth, 2020–2025</h2>
    ${lineChart(seriesValues('growth'), { unit: '%' })}
    ${sourceLine('IMF, via Wikipedia "Economy of Japan"', '2020–2025')}
  </div>
  <div class="chart-card">
    <h2>Population, 2020–2025</h2>
    ${lineChart(seriesValues('population'), { unit: 'm' })}
    ${sourceLine('World Bank WDI (SP.POP.TOTL)', '2020–2025')}
  </div>
</section>
<section>
  <h2>At a glance</h2>
  <div class="stat-grid">
    ${statCard(HEADLINE.hdi.label, HEADLINE.hdi.value, HEADLINE.hdi.note, HEADLINE.hdi.source, HEADLINE.hdi.year)}
    ${statCard(HEADLINE.fertility.label, HEADLINE.fertility.value, HEADLINE.fertility.note, HEADLINE.fertility.source, HEADLINE.fertility.year)}
    ${statCard(HEADLINE.elderly.label, HEADLINE.elderly.value, HEADLINE.elderly.note, HEADLINE.elderly.source, HEADLINE.elderly.year)}
    ${statCard('Land area', '364,569 sq km', 'The 62nd-largest country by area', 'World Bank WDI', 2025)}
  </div>
  <p class="more-link"><a href="#/people">See the demographic shift &rarr;</a> <a href="#/archive">Browse every figure &rarr;</a></p>
</section>`;
}

export function economy(state) {
  const y = state.year;
  return `
<section class="page-head">
  <h1>Economy</h1>
  <p class="lede">The fourth-largest economy in the world by nominal GDP — and the most indebted government among advanced economies.</p>
  <div class="hero-controls">${yearSelect(y)}</div>
</section>
<section class="chart-grid">
  <div class="chart-card">
    <h2>GDP (nominal), 2020–2025</h2>
    ${barChart(YEARS.map((yr) => ({ label: String(yr), value: Math.round(SERIES[yr].gdpNominal) })), { unit: '' })}
    <p class="source">Source: IMF, via Wikipedia "Economy of Japan", 2020–2025. Values in US$ billion.</p>
  </div>
  <div class="chart-card">
    <h2>Government gross debt, 2020–2025</h2>
    ${lineChart(seriesValues('debt'), { unit: '%' })}
    <p class="source">Source: IMF, via Wikipedia "Economy of Japan", 2020–2025. The IMF WEO headline for 2025 is 206.5% of GDP.</p>
  </div>
</section>
<section class="chart-grid">
  <div class="chart-card">
    <h2>GDP by sector</h2>
    ${donutChart(GDP_BY_SECTOR)}
    ${sourceLine('Wikipedia "Economy of Japan"', 2022)}
  </div>
  <div class="chart-card">
    <h2>Exports by goods</h2>
    ${donutChart(EXPORT_GOODS)}
    ${sourceLine('Wikipedia "Economy of Japan"', 2025)}
  </div>
</section>
<section>
  <h2>Where Japan sells</h2>
  <p>Share of exports by partner, 2025. China takes almost a quarter of Japanese exports; the United States is second.</p>
  ${hbarList(EXPORT_PARTNERS)}
  ${sourceLine('Wikipedia "Economy of Japan"', 2025)}
</section>
<section>
  <h2>Public finances · ${y}</h2>
  <div class="stat-grid">
    ${statCard('Government revenue', '37.2% of GDP', 'Share of GDP', 'IMF, via Wikipedia "Economy of Japan"', 2025)}
    ${statCard('Government spending', '38.6% of GDP', 'Share of GDP', 'IMF, via Wikipedia "Economy of Japan"', 2025)}
    ${statCard('Budget balance', '−1.37% of GDP', 'Deficit', 'IMF, via Wikipedia "Economy of Japan"', 2025)}
    ${statCard('Foreign exchange reserves', '$1.255 trillion', 'Second-largest in the world', 'Wikipedia "Economy of Japan"', 2024)}
  </div>
</section>`;
}

export function people(state) {
  const y = state.year;
  return `
<section class="page-head">
  <h1>People</h1>
  <p class="lede">Japan is shrinking and ageing faster than any other large country: fewer children every year, and three in ten people already over 65.</p>
  <div class="hero-controls">${yearSelect(y)}</div>
</section>
<section id="demographic-shift">
  <h2>Demographic Shift</h2>
  <p>Japan's population peaked near 128 million around 2009 and has fallen every year since — from ${fmtNum(SERIES[2020].population)} million in 2020 to ${fmtNum(SERIES[2025].population)} million in 2025. The fertility rate hit a record low of 1.14 births per woman in 2025, far below the 2.1 needed to replace the population. At the same time, people live longer than almost anywhere else: 84.0 years at birth. The result is a society where the old outnumber the young by nearly three to one.</p>
  <div class="stat-grid">
    ${statCard(HEADLINE.elderly.label, HEADLINE.elderly.value, HEADLINE.elderly.note, HEADLINE.elderly.source, HEADLINE.elderly.year)}
    ${statCard(HEADLINE.fertility.label, HEADLINE.fertility.value, HEADLINE.fertility.note, HEADLINE.fertility.source, HEADLINE.fertility.year)}
    ${statCard('Median age', `${PYRAMID.medianAge} years`, '2nd-highest of 194 countries', 'UN World Population Prospects 2024 (projection)', PYRAMID.year)}
    ${statCard(HEADLINE.lifeExpectancy.label, HEADLINE.lifeExpectancy.value, HEADLINE.lifeExpectancy.note, HEADLINE.lifeExpectancy.source, HEADLINE.lifeExpectancy.year)}
  </div>
</section>
<section class="chart-card pyramid-card">
  <h2>Population pyramid · ${PYRAMID.year}</h2>
  <p>People by five-year age band. The narrow base is the story: the 0–4 band (3.8 million) is less than half the size of the 50–54 band (9.8 million). Women outnumber men by 3.1 million, and the gap widens sharply above age 75.</p>
  ${pyramidChart(PYRAMID.bands)}
  <p class="source">Source: ${esc(PYRAMID.source)}, ${PYRAMID.year}. Total population ${PYRAMID.total.toLocaleString('en-US')}; 95.1 men per 100 women. The 90+ band merges ages 90–94, 95–99 and 100+.</p>
</section>
<section class="chart-grid">
  <div class="chart-card">
    <h2>Age structure · 2025</h2>
    ${donutChart(AGE_STRUCTURE)}
    ${sourceLine('World Bank WDI', 2025)}
  </div>
  <div class="chart-card">
    <h2>Population, 2020–2025</h2>
    ${lineChart(seriesValues('population'), { unit: 'm' })}
    ${sourceLine('World Bank WDI (SP.POP.TOTL)', '2020–2025')}
  </div>
</section>
<section>
  <h2>How long, how healthy</h2>
  <div class="stat-grid">
    ${statCard(HEADLINE.hdi.label, HEADLINE.hdi.value, HEADLINE.hdi.note, HEADLINE.hdi.source, HEADLINE.hdi.year)}
    ${statCard('Life expectancy, women', '87.1 years', 'Among the highest in the world', 'World Bank WDI', 2024)}
    ${statCard('Life expectancy, men', '81.1 years', 'Six years less than women', 'World Bank WDI', 2024)}
    ${statCard('Fertility rate, 2024', '1.15', 'Births per woman', 'World Bank WDI', 2024)}
  </div>
</section>`;
}

export function labour(state) {
  const y = state.year;
  return `
<section class="page-head">
  <h1>Labour</h1>
  <p class="lede">A tight labour market: unemployment has stayed near 2.5% for years, while an ageing workforce leaves employers short of hands.</p>
  <div class="hero-controls">${yearSelect(y)}</div>
</section>
<section class="chart-grid">
  <div class="chart-card">
    <h2>Unemployment rate, 2020–2025</h2>
    ${lineChart(seriesValues('unemployment'), { unit: '%' })}
    ${sourceLine('IMF, via Wikipedia "Economy of Japan"', '2020–2025')}
  </div>
  <div class="chart-card">
    <h2>Employment by sector</h2>
    ${donutChart(LABOUR_BY_OCCUPATION)}
    ${sourceLine('Wikipedia "Economy of Japan"', 2023)}
  </div>
</section>
<section>
  <h2>Labour market · key figures</h2>
  <div class="stat-grid">
    ${statCard('Labour force', '69.35 million', '61.2% employment rate', 'Wikipedia "Economy of Japan"', 2023)}
    ${statCard('Unemployment rate', `${fmtNum(SERIES[y].unemployment)}%`, 'ILO modelled estimate', 'World Bank WDI', y)}
    ${statCard('Youth unemployment (15–24)', '3.7%', 'Ages 15 to 24', 'Wikipedia "Economy of Japan"', 2023)}
    ${statCard('Average gross salary', '¥452,247 per month', 'About US$3,106', 'Wikipedia "Economy of Japan"', 2024)}
  </div>
</section>
<section>
  <h2>Inflation and pay</h2>
  <p>After decades of near-zero prices, inflation returned: 2.5% in 2022, 3.3% in 2023 and 3.2% in 2025. The Bank of Japan ended its zero interest-rate policy in 2024, but the yen stayed weak — hitting a 37-year low of 161 yen per US dollar in July 2024.</p>
  <div class="chart-card">
    <h2>Inflation (CPI), 2020–2025</h2>
    ${barChart(seriesValues('inflation'), { unit: '%' })}
    ${sourceLine('IMF, via Wikipedia "Economy of Japan"', '2020–2025')}
  </div>
</section>`;
}

export function archive(state) {
  const q = (state.query || '').trim().toLowerCase();
  const rows = ARCHIVE.filter((r) => !q || `${r.group} ${r.indicator} ${r.value} ${r.year} ${r.source}`.toLowerCase().includes(q));
  const body = rows
    .map(
      (r) => `<tr><td>${esc(r.group)}</td><td>${esc(r.indicator)}</td><td class="num">${esc(r.value)}</td><td class="num">${r.year}</td><td>${esc(r.source)}</td></tr>`,
    )
    .join('');
  return `
<section class="page-head">
  <h1>Archive</h1>
  <p class="lede">Every figure on this site, with its source and year. Search to filter the table live.</p>
</section>
<section>
  <label class="search-box">Search the archive <input id="archive-search" type="search" placeholder="Try “debt”, “fertility” or “2024”…" value="${esc(state.query || '')}" aria-label="Search the archive"></label>
  <p class="result-count">${rows.length} of ${ARCHIVE.length} figures shown.</p>
  <div class="table-wrap">
  <table class="archive-table">
    <thead><tr><th>Group</th><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>
    <tbody>${body || '<tr><td colspan="5">No figures match your search.</td></tr>'}</tbody>
  </table>
  </div>
  <p class="source-note">A note on vintages: the same indicator can differ slightly between sources because each publisher revises its figures on its own schedule. Each row cites the source and year of the exact figure shown — for example, government debt is 206.5% of GDP in the IMF World Economic Outlook headline and 204.8% in the IMF table reproduced by Wikipedia. Neither figure is an estimate by this site.</p>
</section>`;
}

export function missing() {
  return `<section class="page-head"><h1>Not found</h1><p class="lede">There is no page at this address. <a href="#/">Back to Home</a>.</p></section>`;
}
