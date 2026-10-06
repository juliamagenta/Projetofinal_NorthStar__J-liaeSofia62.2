(() => {
  'use strict';
  const app = window.NorthStars;
  const countries = app.data.countries;
  let selected = Math.max(0, countries.findIndex((country) => country.id === app.state.selectedCountry));
  const costs = [['Curso e acomodação', 'briefcase', 3000, 12000], ['Passagem aérea', 'plane', 800, 2500], ['Seguro viagem', 'heart', 300, 600], ['Gastos pessoais', 'leaf', 150, 1000]];
  const render = () => {
    const country = countries[selected];
    document.getElementById('selected-country').innerHTML = `<span class="flag" role="img" aria-label="Bandeira de ${app.escape(country.name)}">${country.flag}</span>${app.escape(country.name)}`;
    document.getElementById('cost-list').innerHTML = costs.map(([label, icon, min, max]) => `<article class="cost-card">${app.icon(icon)}<div><h3>${label}</h3><p>${app.currency(min * country.cost)} – ${app.currency(max * country.cost)}</p></div></article>`).join('');
    document.getElementById('budget').value = app.state.budget || '';
    document.getElementById('budget-result').textContent = app.state.budget ? `Seu orçamento salvo: ${app.currency(app.state.budget)}.` : '';
  };
  const change = (direction) => { selected = (selected + direction + countries.length) % countries.length; app.state.selectedCountry = countries[selected].id; app.save(); render(); };
  document.getElementById('previous-country').addEventListener('click', () => change(-1));
  document.getElementById('next-country').addEventListener('click', () => change(1));
  document.querySelectorAll('[data-cost-tab]').forEach((button) => button.addEventListener('click', () => { app.activate('[data-cost-tab]', button); const costs = button.dataset.costTab === 'costs'; document.getElementById('costs-panel').hidden = !costs; document.getElementById('enrollment-panel').hidden = costs; }));
  document.getElementById('budget-form').addEventListener('submit', (event) => { event.preventDefault(); if (!event.target.reportValidity()) return; app.state.budget = Number(document.getElementById('budget').value); if (app.save()) { render(); app.toast('Orçamento salvo.'); } });
  render();
})();