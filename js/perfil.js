(() => {
  'use strict';
  const app = window.NorthStar;
  const form = document.getElementById('profile-form');
  const error = document.getElementById('profile-error');
  const photoInput = document.getElementById('profile-photo');
  const photoPreview = document.getElementById('profile-photo-preview');
  const removePhoto = document.getElementById('remove-profile-photo');
  const submit = form.querySelector('[type="submit"]');
  let draftPhoto = '';
  let photoVersion = 0;
  const render = () => { app.updateProfile(); document.getElementById('profile-plans').textContent = app.state.plan.saved ? '1' : '0'; document.getElementById('profile-favorites').textContent = app.state.favorites.length; document.getElementById('profile-documents').textContent = app.state.documents.length; };
  const previewPhoto = () => {
    photoPreview.replaceChildren();
    if (draftPhoto) {
      const image = document.createElement('img');
      image.src = draftPhoto;
      image.alt = '';
      photoPreview.append(image);
    } else {
      photoPreview.textContent = document.getElementById('profile-name').value.trim().slice(0, 1).toUpperCase();
    }
    removePhoto.hidden = !draftPhoto;
  };
  app.opening.set('profile-dialog', () => {
    document.getElementById('profile-name').value = app.state.profile.name;
    document.getElementById('profile-email').value = app.state.profile.email;
    document.getElementById('profile-phone').value = app.state.profile.phone;
    photoInput.value = '';
    photoVersion++;
    draftPhoto = app.state.profile.photo;
    submit.disabled = false;
    error.hidden = true;
    previewPhoto();
  });
  app.opening.set('preferences-dialog', () => { document.getElementById('enable-notifications').checked = app.state.preferences.notifications; });
  const readPhoto = (file) => new Promise((resolve, reject) => { const reader = new FileReader(); reader.addEventListener('load', () => resolve(reader.result)); reader.addEventListener('error', () => reject(new Error('Não foi possível abrir a foto.'))); reader.readAsDataURL(file); });
  photoInput.addEventListener('change', async () => {
    const file = photoInput.files[0];
    if (!file) return;
    const version = ++photoVersion;
    error.hidden = true;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 500 * 1024) {
      photoInput.value = '';
      submit.disabled = false;
      error.textContent = 'Use uma imagem PNG, JPG ou WebP de até 500 KB.';
      error.hidden = false;
      return;
    }
    submit.disabled = true;
    try {
      const photo = await readPhoto(file);
      const image = new Image();
      image.src = photo;
      await image.decode();
      if (version !== photoVersion) return;
      draftPhoto = photo;
      previewPhoto();
    } catch {
      if (version === photoVersion) {
        photoInput.value = '';
        error.textContent = 'Não foi possível abrir a foto. Tente outra imagem.';
        error.hidden = false;
      }
    } finally {
      if (version === photoVersion) {
        submit.disabled = false;
      }
    }
  });
  removePhoto.addEventListener('click', () => {
    photoVersion++;
    draftPhoto = '';
    photoInput.value = '';
    submit.disabled = false;
    error.hidden = true;
    previewPhoto();
  });
  document.getElementById('profile-name').addEventListener('input', previewPhoto);
  document.getElementById('profile-dialog').addEventListener('close', () => { photoVersion++; submit.disabled = false; });
  form.addEventListener('submit', (event) => {
    event.preventDefault(); if (!form.reportValidity()) return;
    if (submit.disabled) return;
    const name = document.getElementById('profile-name').value.trim();
    if (!name) { error.textContent = 'Informe seu nome.'; error.hidden = false; return; }
    app.state.profile = { name, email: document.getElementById('profile-email').value.trim(), phone: document.getElementById('profile-phone').value.trim(), photo: draftPhoto };
    if (app.save()) { document.getElementById('profile-dialog').close(); render(); app.toast('Perfil atualizado.'); }
    else { error.textContent = 'Não foi possível salvar. Sua edição foi mantida; tente novamente.'; error.hidden = false; }
  });
  document.getElementById('preferences-form').addEventListener('submit', (event) => { event.preventDefault(); app.state.preferences.notifications = document.getElementById('enable-notifications').checked; if (app.save()) { app.updateNotifications(); document.getElementById('preferences-dialog').close(); app.toast('Preferências salvas.'); } });
  document.getElementById('logout-button').addEventListener('click', () => window.location.assign('index.html'));
  render();
})();
