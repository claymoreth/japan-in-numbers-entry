// JAPAN IN NUMBERS — the single source of every figure on this site.
//
// Every number below is copied from a named public source, with the year it
// describes. Nothing here is estimated or interpolated by us. Two sources
// can disagree by a little because they are different vintages of the same
// underlying statistics; each figure therefore carries its own source and
// year, and the Archive page repeats that attribution for every row.
//
// Sources used:
//   WB  — World Bank, World Development Indicators (WDI)
//   IMF — IMF World Economic Outlook, as tabulated in Wikipedia,
//         "Economy of Japan" (main indicators table, 1980–2025), read 26 Nov 2026
//   UNDP — United Nations Development Programme, Human Development Report
//   MHLW — Japan Ministry of Health, Labour and Welfare
//   ILO — International Labour Organization, modelled estimates (via WDI)
//   UN  — United Nations, World Population Prospects 2024
//   MIC — Japan Ministry of Internal Affairs and Communications (Statistics Bureau)

export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

// Annual series, 2020–2025. GDP, growth, inflation, unemployment and debt
// come from the IMF table in Wikipedia "Economy of Japan"; population comes
// from the World Bank WDI (indicator SP.POP.TOTL).
export const SERIES = {
  2020: { gdpNominal: 5189.2, gdpPpp: 5499.9, gdpPcNominal: 41233.6, gdpPcPpp: 43702.7, growth: -4.3, inflation: -0.0, unemployment: 2.8, debt: 228.8, population: 126.3 },
  2021: { gdpNominal: 5227.0, gdpPpp: 5813.0, gdpPcNominal: 41652.2, gdpPcPpp: 46321.7, growth: 3.6, inflation: -0.2, unemployment: 2.8, debt: 222.6, population: 125.7 },
  2022: { gdpNominal: 4444.9, gdpPpp: 6305.4, gdpPcNominal: 35541.7, gdpPcPpp: 50418.1, growth: 1.2, inflation: 2.5, unemployment: 2.6, debt: 228.0, population: 125.1 },
  2023: { gdpNominal: 4389.3, gdpPpp: 6600.4, gdpPcNominal: 35260.5, gdpPcPpp: 53023.0, growth: 0.9, inflation: 3.3, unemployment: 2.6, debt: 220.1, population: 124.5 },
  2024: { gdpNominal: 4207.6, gdpPpp: 6774.0, gdpPcNominal: 33962.5, gdpPcPpp: 54677.0, growth: 0.1, inflation: 2.7, unemployment: 2.5, debt: 213.6, population: 124.0 },
  2025: { gdpNominal: 4453.1, gdpPpp: 7032.9, gdpPcNominal: 36118.6, gdpPcPpp: 57043.1, growth: 1.2, inflation: 3.2, unemployment: 2.5, debt: 204.8, population: 123.4 },
};

// Headline indicators for the selected year (Home page). Values are the
// latest published figures; the 2025 row is the default.
export const HEADLINE = {
  population: { label: 'Population', value: '123.4 million', note: 'Rank #12 in the world', year: 2025, source: 'World Bank WDI' },
  gdp: { label: 'GDP (nominal)', value: '$4.44 trillion', note: 'Rank #4 in the world', year: 2025, source: 'World Bank WDI' },
  gdpPc: { label: 'GDP per capita (nominal)', value: '$35,951', note: 'Rank 44th in the world', year: 2025, source: 'World Bank WDI' },
  gdpPcPpp: { label: 'GDP per capita (PPP)', value: '$56,854', note: 'Purchasing power parity', year: 2025, source: 'IMF WEO' },
  growth: { label: 'Real GDP growth', value: '1.2%', note: 'Recovered from −4.3% in 2020', year: 2025, source: 'IMF WEO / World Bank' },
  inflation: { label: 'Inflation (CPI)', value: '3.2%', note: 'Annual average', year: 2025, source: 'IMF / World Bank WDI' },
  unemployment: { label: 'Unemployment rate', value: '2.5%', note: 'ILO modelled estimate', year: 2025, source: 'World Bank WDI' },
  debt: { label: 'Government gross debt', value: '206.5% of GDP', note: 'General government, IMF definition', year: 2025, source: 'IMF WEO' },
  lifeExpectancy: { label: 'Life expectancy at birth', value: '84.0 years', note: 'Women 87.1 · Men 81.1', year: 2024, source: 'World Bank WDI' },
  fertility: { label: 'Fertility rate', value: '1.14', note: 'Births per woman — record low', year: 2025, source: 'MHLW' },
  hdi: { label: 'Human Development Index', value: '0.925', note: 'Rank 23rd in the world', year: 2023, source: 'UNDP' },
  elderly: { label: 'Population aged 65+', value: '30.0%', note: 'Aged 0–14: 11.2%', year: 2025, source: 'World Bank WDI' },
};

// Age structure, 2025, share of total population (World Bank WDI).
// The working-age share is 100 − 11.2 − 30.0 = 58.8.
export const AGE_STRUCTURE = [
  { label: 'Aged 0–14', share: 11.2, year: 2025, source: 'World Bank WDI' },
  { label: 'Aged 15–64', share: 58.8, year: 2025, source: 'World Bank WDI' },
  { label: 'Aged 65+', share: 30.0, year: 2025, source: 'World Bank WDI' },
];

// Population pyramid: five-year age bands, men (left) and women (right),
// counts of people. UN World Population Prospects 2024, medium-variant
// projection for 1 July 2026. The three oldest bands are merged into 90+.
// Total 122,427,731; median age 50.2 years; 95.1 men per 100 women.
export const PYRAMID = {
  year: 2026,
  source: 'UN World Population Prospects 2024 (projection)',
  total: 122427731,
  medianAge: 50.2,
  bands: [
    { band: '0–4', male: 1968258, female: 1879422 },
    { band: '5–9', male: 2301492, female: 2191856 },
    { band: '10–14', male: 2662610, female: 2521038 },
    { band: '15–19', male: 2897192, female: 2745886 },
    { band: '20–24', male: 3147954, female: 3003501 },
    { band: '25–29', male: 3133636, female: 3011362 },
    { band: '30–34', male: 3062044, female: 2942385 },
    { band: '35–39', male: 3217041, female: 3100776 },
    { band: '40–44', male: 3604791, female: 3523816 },
    { band: '45–49', male: 4098257, female: 4031182 },
    { band: '50–54', male: 4934052, female: 4866304 },
    { band: '55–59', male: 4495243, female: 4412053 },
    { band: '60–64', male: 3877719, female: 3828838 },
    { band: '65–69', male: 3575322, female: 3647469 },
    { band: '70–74', male: 3605000, female: 3892897 },
    { band: '75–79', male: 4024903, female: 4785560 },
    { band: '80–84', male: 2574414, female: 3459285 },
    { band: '85–89', male: 1627376, female: 2678118 },
    { band: '90+', male: 854519, female: 2244158 },
  ],
};

// GDP by sector, share of GDP (2022 estimate, Wikipedia "Economy of Japan").
export const GDP_BY_SECTOR = [
  { label: 'Services', share: 71.4 },
  { label: 'Industry', share: 26.9 },
  { label: 'Agriculture', share: 1.0 },
];

// Exports of goods, share of total exports (2025, Wikipedia "Economy of Japan").
export const EXPORT_GOODS = [
  { label: 'Transport equipment', share: 21.0 },
  { label: 'Machinery', share: 19.9 },
  { label: 'Electrical machinery', share: 18.7 },
  { label: 'Chemicals', share: 12.4 },
  { label: 'Manufactured goods', share: 10.4 },
  { label: 'Other goods', share: 13.8 },
];

// Main export partners, share of exports (2025, Wikipedia "Economy of Japan").
export const EXPORT_PARTNERS = [
  { label: 'China', share: 22.8 },
  { label: 'United States', share: 18.5 },
  { label: 'ASEAN', share: 14.5 },
  { label: 'European Union', share: 9.1 },
  { label: 'Taiwan', share: 7.2 },
  { label: 'South Korea', share: 6.3 },
  { label: 'Hong Kong', share: 5.8 },
  { label: 'Other partners', share: 15.8 },
];

// Labour force by occupation, share of employment (2023, Wikipedia "Economy of Japan").
export const LABOUR_BY_OCCUPATION = [
  { label: 'Services', share: 73 },
  { label: 'Industry', share: 24 },
  { label: 'Agriculture', share: 3 },
];

// Every figure on the site, for the Archive page. value is display text.
export const ARCHIVE = [
  { group: 'People', indicator: 'Population', value: '123.4 million', year: 2025, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Population rank in the world', value: '#12', year: 2025, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Population aged 0–14', value: '11.2%', year: 2025, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Population aged 15–64', value: '58.8%', year: 2025, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Population aged 65+', value: '30.0%', year: 2025, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Median age', value: '50.2 years', year: 2026, source: 'UN World Population Prospects 2024 (projection)' },
  { group: 'People', indicator: 'Life expectancy at birth', value: '84.0 years', year: 2024, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Life expectancy, women', value: '87.1 years', year: 2024, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Life expectancy, men', value: '81.1 years', year: 2024, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Fertility rate', value: '1.14 births per woman', year: 2025, source: 'MHLW' },
  { group: 'People', indicator: 'Fertility rate', value: '1.15 births per woman', year: 2024, source: 'World Bank WDI' },
  { group: 'People', indicator: 'Human Development Index', value: '0.925 (rank 23rd)', year: 2023, source: 'UNDP' },
  { group: 'People', indicator: 'Land area', value: '364,569 sq km', year: 2025, source: 'World Bank WDI' },
  { group: 'Economy', indicator: 'GDP (nominal)', value: '$4.44 trillion', year: 2025, source: 'World Bank WDI' },
  { group: 'Economy', indicator: 'GDP (nominal)', value: '$4,453.1 billion', year: 2025, source: 'IMF, via Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'GDP rank (nominal)', value: '#4', year: 2025, source: 'World Bank WDI' },
  { group: 'Economy', indicator: 'GDP (PPP)', value: '$7,032.9 billion', year: 2025, source: 'IMF, via Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'GDP per capita (nominal)', value: '$35,951', year: 2025, source: 'World Bank WDI' },
  { group: 'Economy', indicator: 'GDP per capita (PPP)', value: '$56,854', year: 2025, source: 'IMF WEO' },
  { group: 'Economy', indicator: 'Real GDP growth', value: '1.2%', year: 2025, source: 'IMF WEO / World Bank' },
  { group: 'Economy', indicator: 'Inflation (CPI, annual average)', value: '3.2%', year: 2025, source: 'IMF / World Bank WDI' },
  { group: 'Economy', indicator: 'General government gross debt', value: '206.5% of GDP', year: 2025, source: 'IMF WEO' },
  { group: 'Economy', indicator: 'General government gross debt (IMF table)', value: '204.8% of GDP', year: 2025, source: 'IMF, via Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Exports of goods and services', value: '$738 billion', year: 2025, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Imports of goods and services', value: '$755.7 billion', year: 2025, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Current account balance', value: '4.9% of GDP', year: 2025, source: 'World Bank WDI' },
  { group: 'Economy', indicator: 'Current account balance', value: '$166.9 billion', year: 2025, source: 'IMF, via Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Government revenue', value: '37.2% of GDP', year: 2025, source: 'IMF, via Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Government spending', value: '38.6% of GDP', year: 2025, source: 'IMF, via Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Budget balance', value: '−1.37% of GDP', year: 2025, source: 'IMF, via Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Foreign exchange reserves', value: '$1.255 trillion', year: 2024, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Research and development spending', value: '3.7% of GDP', year: 2022, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'Gini coefficient', value: '33.8', year: 2021, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'GDP share, services', value: '71.4%', year: 2022, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'GDP share, industry', value: '26.9%', year: 2022, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Economy', indicator: 'GDP share, agriculture', value: '1.0%', year: 2022, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Labour', indicator: 'Labour force', value: '69.35 million', year: 2023, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Labour', indicator: 'Unemployment rate', value: '2.5%', year: 2025, source: 'World Bank WDI (ILO modelled)' },
  { group: 'Labour', indicator: 'Youth unemployment (ages 15–24)', value: '3.7%', year: 2023, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Labour', indicator: 'Employment rate', value: '61.2%', year: 2023, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Labour', indicator: 'Average gross salary', value: '¥452,247 per month', year: 2024, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Labour', indicator: 'Employment share, services', value: '73%', year: 2023, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Labour', indicator: 'Employment share, industry', value: '24%', year: 2023, source: 'Wikipedia "Economy of Japan"' },
  { group: 'Labour', indicator: 'Employment share, agriculture', value: '3%', year: 2023, source: 'Wikipedia "Economy of Japan"' },
];
