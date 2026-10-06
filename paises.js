(() => {
  'use strict';
  const app = window.NorthStars;
  const list = document.getElementById('country-list');
  const search = document.getElementById('country-search');
  let filter = 'all';
  const normalized = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const render = () => {
    const countries = app.data.countries.filter((country) => normalized(country.name).includes(normalized(search.value)) && (filter === 'all' || filter === 'study' || (filter === 'work' && country.tag.includes('Trabalho')) || (filter === 'favorites' && app.state.favorites.includes(country.id))));
    document.getElementById('country-results').textContent = `${countries.length} ${countries.length === 1 ? 'destino encontrado' : 'destinos encontrados'}`;
    list.innerHTML = countries.map((country) => `<article class="country-card"><div class="country-card-head"><span class="flag" role="img" aria-label="Bandeira de ${app.escape(country.name)}">${country.flag}</span><div><h2>${app.escape(country.name)}</h2><p class="region">${app.escape(country.region)}</p></div></div><button class="icon-button favorite-button" type="button" data-favorite="${country.id}" aria-label="${app.state.favorites.includes(country.id) ? 'Remover' : 'Adicionar'} ${app.escape(country.name)} ${app.state.favorites.includes(country.id) ? 'dos' : 'aos'} favoritos" aria-pressed="${app.state.favorites.includes(country.id)}">${app.icon('heart')}</button><p>${app.escape(country.description)}</p><div class="country-card-footer"><span>${app.escape(country.tag)}</span><button class="country-detail-button" type="button" data-country="${country.id}">Conhecer ${app.icon('arrow')}</button></div></article>`).join('') || `<div class="empty-state">${app.icon('globe')}<p>Nenhum destino encontrado.</p></div>`;
  };
  const toggleFavorite = (id) => {
    const exists = app.state.favorites.includes(id);
    app.state.favorites = exists ? app.state.favorites.filter((value) => value !== id) : [...app.state.favorites, id];
    if (app.save()) { render(); app.toast(exists ? 'Destino removido dos favoritos.' : 'Destino salvo nos favoritos.'); }
  };
  const detail = (id) => {
    const country = app.data.countries.find((item) => item.id === id);
    document.getElementById('country-dialog-title').textContent = country.name;
    document.getElementById('country-detail').innerHTML = `<div class="country-detail-title"><span class="flag" role="img" aria-label="Bandeira de ${app.escape(country.name)}">${country.flag}</span><div><h3>${app.escape(country.name)}</h3><p class="muted">${app.escape(country.region)} · ${app.escape(country.tag)}</p></div></div><p>${app.escape(country.description)}</p><p class="muted">Confira os requisitos do seu programa e as condições aplicáveis diretamente na fonte oficial.</p><a class="button" href="${app.escape(country.official)}" target="_blank" rel="noopener noreferrer">Informações oficiais ${app.icon('arrow')}</a><a class="button button-outline" href="cronograma.html">Planejar intercâmbio</a>`;
    app.open('country-dialog');
  };
  list.addEventListener('click', (event) => {
    const favorite = event.target.closest('[data-favorite]');
    const country = event.target.closest('[data-country]');
    if (favorite) { const id = favorite.dataset.favorite; toggleFavorite(id); list.querySelector(`[data-favorite="${id}"]`)?.focus(); }
    if (country) detail(country.dataset.country);
  });
  search.addEventListener('input', render);
  document.getElementById('country-search-form').addEventListener('submit', (event) => { event.preventDefault(); render(); });
  document.querySelectorAll('[data-country-filter]').forEach((button) => button.addEventListener('click', () => { filter = button.dataset.countryFilter; app.activate('[data-country-filter]', button); render(); }));
  render();
})();