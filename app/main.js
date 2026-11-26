// Japan in Numbers: hash router and the single global state object.
// Pages: #/ (Home), #/economy, #/people, #/labour, #/archive.
// The year picker redraws every figure and chart on the page; the archive
// search filters the table live. window.__shotReady is false while a page
// renders and true once it is on screen, so a screenshot script knows when
// to capture.

import { ARCHIVE } from './data.js';
import { archive, economy, home, labour, missing, people } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('site-nav');
const menuButton = document.getElementById('menu-button');

// One global state object for the whole site.
const state = { year: 2025, query: '' };

const PAGES = {
  '': home,
  '/': home,
  '/economy': economy,
  '/people': people,
  '/labour': labour,
  '/archive': archive,
};

function render() {
  window.__shotReady = false;
  const hash = location.hash.replace(/^#/, '') || '/';
  const view = PAGES[hash] || missing;
  document.title = `${view === home ? 'Japan in Numbers' : view === economy ? 'Economy' : view === people ? 'People' : view === labour ? 'Labour' : view === archive ? 'Archive' : 'Not found'} | Japan in Numbers`;
  app.innerHTML = view(state);
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

// Archive search: filter the table in place so the input keeps focus.
function filterArchive(input) {
  state.query = input.value;
  const q = state.query.trim().toLowerCase();
  const rows = ARCHIVE.filter((r) => !q || `${r.group} ${r.indicator} ${r.value} ${r.year} ${r.source}`.toLowerCase().includes(q));
  const tbody = document.querySelector('.archive-table tbody');
  const count = document.querySelector('.result-count');
  if (tbody) {
    tbody.innerHTML = rows
      .map((r) => `<tr><td>${esc(r.group)}</td><td>${esc(r.indicator)}</td><td class="num">${esc(r.value)}</td><td class="num">${r.year}</td><td>${esc(r.source)}</td></tr>`)
      .join('') || '<tr><td colspan="5">No figures match your search.</td></tr>';
  }
  if (count) count.textContent = `${rows.length} of ${ARCHIVE.length} figures shown.`;
}

document.addEventListener('change', (event) => {
  if (event.target && event.target.id === 'year-select') {
    state.year = Number(event.target.value);
    render();
  }
});

document.addEventListener('input', (event) => {
  if (event.target && event.target.id === 'archive-search') filterArchive(event.target);
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', render);
render();
