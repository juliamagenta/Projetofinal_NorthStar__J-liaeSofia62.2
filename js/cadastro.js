(() => {
  'use strict';
  const app = window.NorthStars;
  const form = document.getElementById('auth-form');
  const confirmation = document.getElementById('confirmar');
  const error = document.getElementById('auth-error');
  confirmation.addEventListener('input', () => { confirmation.setCustomValidity(''); error.hidden = true; });
  document.getElementById('senha').addEventListener('input', () => { confirmation.setCustomValidity(''); error.hidden = true; });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    confirmation.setCustomValidity('');
    if (!form.reportValidity()) return;
    const password = document.getElementById('senha').value;
    if (password !== confirmation.value) {
      error.textContent = 'As senhas precisam ser iguais.';
      error.hidden = false;
      confirmation.setCustomValidity('As senhas precisam ser iguais.');
      confirmation.reportValidity();
      return;
    }
    const name = document.getElementById('nome').value.trim();
    if (!name) { error.textContent = 'Informe seu nome.'; error.hidden = false; return; }
    app.state.profile = { name, email: document.getElementById('email').value.trim(), phone: '', photo: '' };
    if (app.save()) window.location.assign('inicio.html');
  });
})();