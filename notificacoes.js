(() => {
  'use strict';
  const app = window.NorthStars;
  const list = document.getElementById('notification-list');
  let filter = 'all';
  const render = () => {
    const notifications = app.state.notifications.filter((item) => filter === 'all' || !item.read);
    document.getElementById('unread-count').textContent = `(${app.state.notifications.filter((item) => !item.read).length})`;
    list.innerHTML = notifications.map((item) => `<li><article class="notification-card ${item.read ? '' : 'unread'}"><span class="icon-box ${app.escape(item.tone)}">${app.icon(item.icon)}</span><div><h2><button class="notification-title" type="button" data-notification="${app.escape(item.id)}" aria-label="${app.escape(item.title)}, ${item.read ? 'lida' : 'marcar como lida'}">${app.escape(item.title)}</button></h2><p>${app.escape(item.message)}</p></div><span class="notification-time">${app.escape(item.time)}</span></article></li>`).join('') || app.empty('Você está em dia! Nenhuma notificação não lida.', 'bell');
    app.updateNotifications();
  };
  list.addEventListener('click', (event) => { const button = event.target.closest('[data-notification]'); if (!button) return; const item = app.state.notifications.find((item) => item.id === button.dataset.notification); if (item.read) return; item.read = true; if (app.save()) { render(); app.toast('Notificação marcada como lida.'); } });
  document.querySelectorAll('[data-notification-filter]').forEach((button) => button.addEventListener('click', () => { filter = button.dataset.notificationFilter; app.activate('[data-notification-filter]', button); render(); }));
  document.getElementById('mark-all-read').addEventListener('click', () => { app.state.notifications.forEach((item) => { item.read = true; }); if (app.save()) { render(); app.toast('Todas as notificações foram marcadas como lidas.'); } });
  render();
})();