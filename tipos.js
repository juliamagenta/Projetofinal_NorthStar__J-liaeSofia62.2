(() => {
  'use strict';
  const app = window.NorthStars;
  document.querySelectorAll('[data-type]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = app.data.types.find((type) => type[4] === button.dataset.type);
      document.getElementById('type-dialog-title').textContent = item[0];
      document.getElementById('type-content').innerHTML = `<span class="icon-box ${app.escape(item[3])}">${app.icon(item[2])}</span><p class="article-body">${app.escape(item[5])}</p>`;
      app.open('type-dialog');
    });
  });
})();