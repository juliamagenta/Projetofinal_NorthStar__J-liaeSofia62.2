(() => {
  'use strict';
  const app = window.NorthStars;
  const list = document.getElementById('tip-list');
  let filter = 'all';
  const render = () => {
    list.innerHTML = app.data.tips.filter((tip) => filter === 'all' || tip.category === filter).map((tip) => `<article class="tip-card">${NorthStarsVisuals.image(tip.image, "", 400)}<div><span class="tip-category">${tip.category === 'culture' ? 'Cultura' : 'Viagem'}</span><h2>${app.escape(tip.title)}</h2><button type="button" data-tip="${app.escape(tip.id)}" aria-label="Ler ${app.escape(tip.title)}">Ler mais ${app.icon('arrow')}</button></div></article>`).join('');
  };
  document.querySelectorAll('[data-tip-filter]').forEach((button) => button.addEventListener('click', () => { filter = button.dataset.tipFilter; app.activate('[data-tip-filter]', button); render(); }));
  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-tip]'); if (!button) return;
    const tip = app.data.tips.find((item) => item.id === button.dataset.tip);
    document.getElementById('tip-dialog-title').textContent = tip.title;
    document.getElementById('tip-content').innerHTML = `${NorthStarsVisuals.image(tip.image, "article-image", 500)}<p class="article-body">${app.escape(tip.text)}</p><a class="text-link" href="agenda.html">Anotar na minha agenda ${app.icon('arrow')}</a>`;
    app.open('tip-dialog');
  });
  render();
})();