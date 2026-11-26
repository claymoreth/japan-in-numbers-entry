[![Bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/claymoreth/japan-in-numbers-entry/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/claymoreth/japan-in-numbers-entry/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# Japan in Numbers

A national statistics site for Japan — the economy, the people and the labour market, 2020–2025. Every figure cites its source and year; nothing is estimated.

## What is inside

- **Home** — 8 headline indicators for the selected year (2020–2025), plus real GDP growth and population charts.
- **Economy** — GDP and government debt series, GDP by sector, exports by goods and by partner, public finances.
- **People** — a “Demographic Shift” section with a full population pyramid (five-year age bands, men vs women), age structure, life expectancy and HDI.
- **Labour** — unemployment series, employment by sector, salary and youth unemployment.
- **Archive** — every figure on the site in one searchable table, each with source and year.

## Design

Vermilion red `#C1272D` and dark indigo `#1B2A4A` on a light grey ground. All charts are hand-drawn SVG (bar, line, donut, pyramid) with a `viewBox`, so they scale on desktop and phone. The site is fully static: no network requests, no external images, no tracking.

## Figures

Sources: World Bank World Development Indicators, IMF World Economic Outlook, UNDP Human Development Report, Japan Ministry of Health, Labour and Welfare (MHLW), UN World Population Prospects 2024, Japan Ministry of Internal Affairs and Communications. All figures were verified live on 26 November 2026; the full list with sources and years is on the Archive page.

## Run it

```sh
node serve.ts   # serves app/ on http://localhost:8080
```

## Build the submission

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
