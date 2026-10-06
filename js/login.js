(() => {
  'use strict';
  const app = window.NorthStars;
  const form = document.getElementById('auth-form');
  const error = document.getElementById('auth-error');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const email = document.getElementById('email').value.trim();
    error.hidden = true;
    if (app.state.profile.email !== email) {
      app.state.profile.email = email;
      app.state.profile.name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\p{L}/gu, (letter) => letter.toUpperCase()).slice(0, 80);
    }
    if (app.save()) window.location.assign('inicio.html');
  });
})();