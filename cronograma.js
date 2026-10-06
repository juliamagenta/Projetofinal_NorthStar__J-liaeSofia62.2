(() => {
  'use strict';
  const app = window.NorthStars;
  const list = document.getElementById('timeline');
  const form = document.getElementById('plan-form');
  const addMonths = (value, amount) => {
    const date = app.dateFromISO(value);
    const day = date.getDate();
    date.setDate(1); date.setMonth(date.getMonth() + amount);
    date.setDate(Math.min(day, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()));
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const render = () => {
    const plan = app.state.plan;
    const country = app.data.countries.find((item) => item.id === plan.country);
    document.getElementById('plan-destination').textContent = country.name;
    const flag = document.getElementById('plan-flag'); flag.textContent = country.flag; flag.setAttribute('aria-label', `Bandeira de ${country.name}`);
    document.getElementById('plan-summary').textContent = `${plan.type} · ${plan.duration} ${plan.duration === 1 ? 'mês' : 'meses'}`;
    const steps = [['Planejamento', 'Documentos, visto e inscrição', addMonths(plan.start, -5)], ['Preparação', 'Idioma e organização', addMonths(plan.start, -3)], ['Chegada', 'Chegada e acomodação', plan.start], ['Intercâmbio', 'Estudos e novas experiências', addMonths(plan.start, 1)], ['Retorno', 'Avaliação e próximos passos', addMonths(plan.start, plan.duration)]];
    document.getElementById('plan-progress').textContent = `${plan.completed.length} de 5 etapas concluídas`;
    list.innerHTML = steps.map(([title, description, date], index) => `<li class="timeline-step ${plan.completed.includes(index) ? 'completed' : ''}"><button class="timeline-toggle" type="button" data-plan-step="${index}" aria-label="${plan.completed.includes(index) ? 'Reabrir' : 'Concluir'} etapa ${title}" aria-pressed="${plan.completed.includes(index)}">${plan.completed.includes(index) ? app.icon('check') : ''}</button><div><h3>${title}</h3><p>${description}</p></div><time datetime="${date}">${app.escape(app.formatDate(date, { month: 'short', year: 'numeric' }))}</time></li>`).join('');
  };
  app.opening.set('plan-dialog', () => { document.getElementById('plan-country').value = app.state.plan.country; document.getElementById('plan-type').value = app.state.plan.type; document.getElementById('plan-start').value = app.state.plan.start; document.getElementById('plan-duration').value = app.state.plan.duration; });
  form.addEventListener('submit', (event) => { event.preventDefault(); if (!form.reportValidity()) return; app.state.plan = { ...app.state.plan, country: document.getElementById('plan-country').value, type: document.getElementById('plan-type').value, start: document.getElementById('plan-start').value, duration: Number(document.getElementById('plan-duration').value), saved: true }; if (app.save()) { document.getElementById('plan-dialog').close(); render(); app.toast('Seu plano foi salvo.'); } });
  list.addEventListener('click', (event) => { const button = event.target.closest('[data-plan-step]'); if (!button) return; const index = Number(button.dataset.planStep); app.state.plan.completed = app.state.plan.completed.includes(index) ? app.state.plan.completed.filter((value) => value !== index) : [...app.state.plan.completed, index]; if (app.save()) { render(); app.toast('Etapa atualizada.'); list.querySelector(`[data-plan-step="${index}"]`)?.focus(); } });
  render();
})();