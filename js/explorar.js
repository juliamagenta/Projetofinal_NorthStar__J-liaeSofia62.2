(() => {
  'use strict';
  const app = window.NorthStars;
  const input = document.getElementById('explore-search');
  const pages = [['Países e trabalho', 'Conheça os destinos e salve seus favoritos.', 'globe', 'paises.html', 'green', 'canada estados unidos australia irlanda reino unido alemanha destinos populares'], ['Documentos necessários', 'Acompanhe os documentos da sua viagem.', 'book', 'documentos.html', 'blue', 'passaporte visto checklist requisitos'], ['Passo a passo', 'Planeje custos e organize as inscrições.', 'wallet', 'custos.html', 'red', 'custos orçamento inscricao'], ['Tipos de intercâmbio', 'Descubra o programa que combina com você.', 'graduation', 'tipos.html', 'green', 'estudo trabalho au pair voluntariado ferias'], ['Agenda', 'Organize suas tarefas importantes.', 'calendar', 'agenda.html', 'blue', 'tarefas prazos datas'], ['Orientações', 'Prepare-se para a vida no exterior.', 'compass', 'orientacoes.html', 'red', 'regras moradia transporte saude seguranca'], ['Dicas', 'Pequenos conselhos para a sua jornada.', 'leaf', 'dicas.html', 'green', 'cultura viagem cidades economia'], ['Chat', 'Compartilhe perguntas e experiências.', 'chat', 'chat.html', 'blue', 'mensagens grupo conversa'], ['Cronograma', 'Monte seu plano de intercâmbio.', 'clock', 'cronograma.html', 'green', 'planejamento preparacao retorno'], ['Perfil', 'Atualize seus dados e preferências.', 'user', 'perfil.html', 'green', 'nome email telefone foto'], ['Suporte', 'Encontre respostas e registre uma dúvida.', 'headphones', 'suporte.html', 'blue', 'ajuda perguntas']];
  const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const render = () => {
    const query = normalize(input.value.trim());
    const results = pages.filter((item) => normalize(item.join(' ')).includes(query));
    document.getElementById('explore-results-title').textContent = query ? 'Resultados da busca' : 'Explore o North Stars';
    document.getElementById('explore-count').textContent = `${results.length} opções`;
    document.getElementById('explore-results').innerHTML = results.map(([title, description, icon, url, tone]) => `<a class="link-card" href="${url}"><span class="icon-box ${tone}">${app.icon(icon)}</span><span><strong>${app.escape(title)}</strong><small>${app.escape(description)}</small></span>${app.icon('arrow')}</a>`).join('') || `<div class="empty-state">${app.icon('search')}<p>Nenhum resultado. Tente outra palavra.</p></div>`;
  };
  const recent = () => { document.getElementById('recent-search-list').innerHTML = app.state.searches.length ? app.state.searches.map((query, index) => `<li><button type="button" data-recent-search="${index}">${app.icon('clock')}${app.escape(query)}</button></li>`).join('') : app.empty('Suas próximas buscas aparecerão aqui.', 'clock'); };
  document.getElementById('explore-form').addEventListener('submit', (event) => { event.preventDefault(); const query = input.value.trim(); if (query) { app.state.searches = [query, ...app.state.searches.filter((item) => item !== query)].slice(0, 5); app.save(); recent(); } render(); });
  input.addEventListener('input', render);
  document.getElementById('recent-search-list').addEventListener('click', (event) => { const button = event.target.closest('[data-recent-search]'); if (button) { input.value = app.state.searches[Number(button.dataset.recentSearch)]; render(); input.focus(); } });
  document.getElementById('clear-searches').addEventListener('click', () => { app.state.searches = []; if (app.save()) { recent(); app.toast('Buscas recentes removidas.'); } });
  render(); recent();
})();