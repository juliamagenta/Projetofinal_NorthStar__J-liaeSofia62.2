(() => {
  'use strict';
  const app = window.NorthStars;
  const form = document.getElementById('profile-form');
  const error = document.getElementById('profile-error');
  const render = () => { app.updateProfile(); document.getElementById('profile-plans').textContent = app.state.plan.saved ? '1' : '0'; document.getElementById('profile-favorites').textContent = app.state.favorites.length; document.getElementById('profile-documents').textContent = app.state.documents.length; };
  app.opening.set('profile-dialog', () => { document.getElementById('profile-name').value = app.state.profile.name; document.getElementById('profile-email').value = app.state.profile.email; document.getElementById('profile-phone').value = app.state.profile.phone; document.getElementById('profile-photo').value = ''; error.hidden = true; });
  app.opening.set('preferences-dialog', () => { document.getElementById('enable-notifications').checked = app.state.preferences.notifications; });
  const readPhoto = (file) => new Promise((resolve, reject) => { const reader = new FileReader(); reader.addEventListener('load', () => resolve(reader.result)); reader.addEventListener('error', () => reject(new Error('Não foi possível abrir a foto.'))); reader.readAsDataURL(file); });
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const name = document.getElementById('profile-name').value.trim();
    if (!name) { error.textContent = 'Informe seu nome.'; error.hidden = false; return; }
    const file = document.getElementById('profile-photo').files[0];
    if (file && (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 500 * 1024)) { error.textContent = 'Use uma imagem PNG, JPG ou WebP de até 500 KB.'; error.hidden = false; return; }
    const submit = form.querySelector('[type="submit"]'); submit.disabled = true;
    try {
      const photo = file ? await readPhoto(file) : app.state.profile.photo;
      app.state.profile = { name, email: document.getElementById('profile-email').value.trim(), phone: document.getElementById('profile-phone').value.trim(), photo };
      if (app.save()) { document.getElementById('profile-dialog').close(); render(); app.toast('Perfil atualizado.'); }
    } catch { error.textContent = 'Não foi possível abrir a foto. Tente outra imagem.'; error.hidden = false; }
    finally { submit.disabled = false; }
  });
  document.getElementById('preferences-form').addEventListener('submit', (event) => { event.preventDefault(); app.state.preferences.notifications = document.getElementById('enable-notifications').checked; if (app.save()) { app.updateNotifications(); document.getElementById('preferences-dialog').close(); app.toast('Preferências salvas.'); } });
  document.getElementById('logout-button').addEventListener('click', () => window.location.assign('index.html'));
  render();
})();