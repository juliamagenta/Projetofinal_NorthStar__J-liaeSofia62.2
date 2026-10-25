(() => {
  'use strict';
  const app = window.NorthStar;
  const list = document.getElementById('chat-messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('message');
  let account = null;
  const itemHTML = (message) => `<li class="message-row ${message.own ? 'own' : ''}"><span class="message-avatar" aria-hidden="true">${app.escape(message.author.slice(0, 1))}</span><div class="message-bubble"><div class="message-meta"><strong>${app.escape(message.author)}</strong><span>${app.escape(message.time)}</span></div><p>${app.escape(message.text)}</p></div></li>`;
  const render = (messages) => { list.innerHTML = messages.map(itemHTML).join(''); };
  const syncAccount = () => {
    const current = app.chat.account();
    const changed = account?.id !== current.id;
    if (changed) {
      input.value = '';
      input.setCustomValidity('');
      list.replaceChildren();
    }
    account = current;
    app.state.profile.email = current.id;
    app.state.profile.name = current.name;
    app.updateProfile();
    return changed;
  };
  const refresh = () => {
    try {
      syncAccount();
      render(app.chat.history(account.id));
    } catch {
      // Não deixa na tela mensagens de uma conta cuja identidade não foi confirmada.
      account = null;
      list.replaceChildren();
      app.toast('Não foi possível carregar o chat. Verifique o perfil e o armazenamento do navegador.');
    }
  };
  window.addEventListener('storage', (event) => {
    if (event.key === null || event.key === 'north-star.v1' || event.key === 'north-stars.v1' ||
      (account && event.key === app.chat.key(account.id))) refresh();
  });
  window.addEventListener('pageshow', refresh);
  window.addEventListener('focus', refresh);
  input.addEventListener('input', () => input.setCustomValidity(''));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      if (syncAccount()) {
        render(app.chat.history(account.id));
        app.toast('A conta mudou. Escreva sua mensagem novamente.');
        return;
      }
      if (!form.reportValidity()) return;
      const text = input.value.trim();
      if (!text) { input.setCustomValidity('Escreva uma mensagem.'); input.reportValidity(); return; }
      render(app.chat.send(account.id, text));
      input.value = '';
      list.scrollTop = list.scrollHeight;
      input.focus();
    } catch {
      app.toast('Não foi possível enviar. Sua mensagem foi mantida no campo; verifique o armazenamento do navegador.');
    }
  });
  refresh();
})();
