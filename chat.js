(() => {
  'use strict';
  const app = window.NorthStars;
  const list = document.getElementById('chat-messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('message');
  const itemHTML = (message) => `<li class="message-row ${message.own ? 'own' : ''}"><span class="message-avatar" aria-hidden="true">${app.escape(message.author.slice(0, 1))}</span><div class="message-bubble"><div class="message-meta"><strong>${app.escape(message.author)}</strong><span>${app.escape(message.time)}</span></div><p>${app.escape(message.text)}</p></div></li>`;
  list.innerHTML = app.state.messages.map(itemHTML).join('');
  input.addEventListener('input', () => input.setCustomValidity(''));
  form.addEventListener('submit', (event) => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const text = input.value.trim();
    if (!text) { input.setCustomValidity('Escreva uma mensagem.'); input.reportValidity(); return; }
    const message = { id: app.uid(), author: app.state.profile.name.split(' ')[0], text, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), own: true };
    app.state.messages.push(message);
    if (app.save()) { list.insertAdjacentHTML('beforeend', itemHTML(message)); input.value = ''; list.scrollTop = list.scrollHeight; input.focus(); }
  });
})();