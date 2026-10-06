(() => {
  'use strict';
  const app = window.NorthStars;
  const form = document.getElementById('support-form');
  const list = document.getElementById('support-list');
  const render = () => { list.innerHTML = app.state.support.map((item) => `<li class="record-card"><span class="icon-box green">${app.icon('headphones')}</span><div class="record-copy"><strong>${app.escape(item.subject)}</strong><small>${app.escape(item.message)}</small></div><button class="icon-button danger" type="button" data-delete-support="${app.escape(item.id)}" aria-label="Excluir dúvida ${app.escape(item.subject)}">${app.icon('trash')}</button></li>`).join(''); };
  form.addEventListener('submit', (event) => { event.preventDefault(); if (!form.reportValidity()) return; const subject = document.getElementById('support-subject').value.trim(); const message = document.getElementById('support-message').value.trim(); if (!subject || !message) { document.getElementById('support-status').textContent = 'Preencha o assunto e a dúvida.'; return; } app.state.support.push({ id: app.uid(), subject, message }); if (app.save()) { form.reset(); render(); document.getElementById('support-status').textContent = 'Dúvida salva para você acompanhar. Este registro não envia uma mensagem.'; app.toast('Sua dúvida foi salva.'); } });
  list.addEventListener('click', (event) => { const button = event.target.closest('[data-delete-support]'); if (button) { app.state.support = app.state.support.filter((item) => item.id !== button.dataset.deleteSupport); if (app.save()) { render(); app.toast('Registro excluído.'); } } });
  render();
})();