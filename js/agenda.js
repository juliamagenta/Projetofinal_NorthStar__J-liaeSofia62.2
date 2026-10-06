(() => {
  'use strict';
  const app = window.NorthStars;
  let selected = app.today();
  let visible = app.dateFromISO(selected);
  visible.setDate(1);
  const calendar = document.getElementById('calendar-days');
  const list = document.getElementById('task-list');
  const form = document.getElementById('task-form');
  const dialog = document.getElementById('task-dialog');
  const id = document.getElementById('task-id');
  const title = document.getElementById('task-title');
  const taskDate = document.getElementById('task-date');
  const time = document.getElementById('task-time');
  const notes = document.getElementById('task-notes');
  const renderCalendar = () => {
    const year = visible.getFullYear();
    const month = visible.getMonth();
    const first = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    document.getElementById('calendar-month').textContent = visible.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    const buttons = Array.from({ length: count }, (_, index) => {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`;
      const hasTasks = app.state.tasks.some((task) => task.date === date);
      return `<button class="calendar-day ${date === app.today() ? 'today' : ''} ${date === selected ? 'selected' : ''} ${hasTasks ? 'has-task' : ''}" type="button" data-date="${date}" aria-label="${app.escape(app.formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' }))}${hasTasks ? ', com tarefas' : ''}" aria-pressed="${date === selected}" ${date === app.today() ? 'aria-current="date"' : ''}>${index + 1}</button>`;
    }).join('');
    calendar.innerHTML = '<span aria-hidden="true"></span>'.repeat(first) + buttons;
  };
  const renderTasks = () => {
    const tasks = app.state.tasks.filter((task) => task.date === selected).sort((a, b) => String(a.time || '').localeCompare(String(b.time || '')));
    document.getElementById('task-list-title').textContent = `${selected === app.today() ? 'Hoje, ' : ''}${app.formatDate(selected)}`;
    document.getElementById('task-count').textContent = `${tasks.filter((task) => task.done).length} de ${tasks.length} concluídas`;
    list.innerHTML = tasks.map((task) => `<li class="task-card ${task.done ? 'completed' : ''}"><button class="task-check" type="button" data-complete-task="${app.escape(task.id)}" aria-label="${task.done ? 'Reabrir' : 'Concluir'} ${app.escape(task.title)}" aria-pressed="${!!task.done}">${task.done ? app.icon('check') : ''}</button><div><h3>${app.escape(task.title)}</h3>${task.notes ? `<p class="task-note">${app.escape(task.notes)}</p>` : ''}${task.time ? `<time datetime="${app.escape(task.date + 'T' + task.time)}">${app.escape(task.time)}</time>` : ''}</div><div class="record-actions"><button class="icon-button" type="button" data-edit-task="${app.escape(task.id)}" aria-label="Editar ${app.escape(task.title)}">${app.icon('edit')}</button><button class="icon-button danger" type="button" data-delete-task="${app.escape(task.id)}" aria-label="Excluir ${app.escape(task.title)}">${app.icon('trash')}</button></div></li>`).join('') || app.empty('Nenhuma tarefa para esta data. Que tal adicionar uma?', 'calendar');
  };
  const render = () => { renderCalendar(); renderTasks(); };
  app.opening.set('task-dialog', () => {
    if (!id.value) { form.reset(); taskDate.value = selected; document.getElementById('task-dialog-title').textContent = 'Nova tarefa'; }
  });
  dialog.addEventListener('close', () => { form.reset(); id.value = ''; title.setCustomValidity(''); });
  const changeMonth = (direction) => { visible = new Date(visible.getFullYear(), visible.getMonth() + direction, 1, 12); renderCalendar(); };
  document.getElementById('previous-month').addEventListener('click', () => changeMonth(-1));
  document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
  document.getElementById('calendar-today').addEventListener('click', () => { selected = app.today(); visible = app.dateFromISO(selected); visible.setDate(1); render(); });
  calendar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-date]');
    if (!button) return;
    selected = button.dataset.date; render(); calendar.querySelector(`[data-date="${selected}"]`)?.focus();
  });
  title.addEventListener('input', () => title.setCustomValidity(''));
  form.addEventListener('submit', (event) => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const value = title.value.trim();
    if (!value) { title.setCustomValidity('Informe o nome da tarefa.'); title.reportValidity(); return; }
    const index = app.state.tasks.findIndex((task) => task.id === id.value);
    const task = { id: id.value || app.uid(), title: value, date: taskDate.value, time: time.value, notes: notes.value.trim(), done: index >= 0 ? app.state.tasks[index].done : false };
    if (index >= 0) app.state.tasks[index] = task; else app.state.tasks.push(task);
    if (app.save()) { selected = task.date; visible = app.dateFromISO(selected); visible.setDate(1); dialog.close(); render(); app.toast('Tarefa salva.'); }
  });
  list.addEventListener('click', (event) => {
    const complete = event.target.closest('[data-complete-task]');
    const edit = event.target.closest('[data-edit-task]');
    const remove = event.target.closest('[data-delete-task]');
    if (complete) { const task = app.state.tasks.find((item) => item.id === complete.dataset.completeTask); task.done = !task.done; if (app.save()) { render(); app.toast(task.done ? 'Tarefa concluída!' : 'Tarefa reaberta.'); list.querySelector(`[data-complete-task="${task.id}"]`)?.focus(); } }
    if (edit) { const task = app.state.tasks.find((item) => item.id === edit.dataset.editTask); id.value = task.id; title.value = task.title; taskDate.value = task.date; time.value = task.time || ''; notes.value = task.notes || ''; document.getElementById('task-dialog-title').textContent = 'Editar tarefa'; app.open('task-dialog'); }
    if (remove) { app.state.tasks = app.state.tasks.filter((task) => task.id !== remove.dataset.deleteTask); if (app.save()) { render(); app.toast('Tarefa excluída.'); } }
  });
  render();
})();