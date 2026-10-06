(() => {
  'use strict';
  const app = window.NorthStars;
  const checklist = document.getElementById('required-documents');
  const list = document.getElementById('personal-documents');
  const form = document.getElementById('document-form');
  const dialog = document.getElementById('document-dialog');
  const title = document.getElementById('document-title');
  const status = document.getElementById('document-status');
  const id = document.getElementById('document-id');
  const render = () => {
    checklist.innerHTML = app.data.documents.map(([label, description, icon, tone], index) => `<li><label class="document-check" for="required-document-${index}"><span class="icon-box ${app.escape(tone)}">${app.icon(icon)}</span><span><strong>${app.escape(label)}</strong><small>${app.escape(description)}</small></span><input id="required-document-${index}" type="checkbox" data-document-index="${index}" ${app.state.completedDocuments.includes(index) ? 'checked' : ''}></label></li>`).join('');
    document.getElementById('document-progress').textContent = `${app.state.completedDocuments.length} de ${app.data.documents.length} prontos`;
    list.innerHTML = app.state.documents.length ? app.state.documents.map((item) => `<li class="record-card"><span class="icon-box ${item.status === 'pronto' ? 'green' : 'blue'}">${app.icon('book')}</span><div class="record-copy"><strong>${app.escape(item.title)}</strong><small>${item.status === 'pronto' ? 'Pronto' : 'Pendente'}</small></div><div class="record-actions"><button class="icon-button" type="button" data-edit-document="${app.escape(item.id)}" aria-label="Editar ${app.escape(item.title)}">${app.icon('edit')}</button><button class="icon-button danger" type="button" data-delete-document="${app.escape(item.id)}" aria-label="Excluir ${app.escape(item.title)}">${app.icon('trash')}</button></div></li>`).join('') : app.empty('Você ainda não adicionou documentos.', 'book');
  };
  app.opening.set('document-dialog', () => { if (!id.value) form.reset(); });
  dialog.addEventListener('close', () => { id.value = ''; form.reset(); title.setCustomValidity(''); });
  checklist.addEventListener('change', (event) => {
    if (!event.target.matches('[data-document-index]')) return;
    const index = Number(event.target.dataset.documentIndex);
    app.state.completedDocuments = event.target.checked ? [...new Set([...app.state.completedDocuments, index])] : app.state.completedDocuments.filter((value) => value !== index);
    if (app.save()) app.toast('Checklist atualizado.');
    render();
    document.getElementById(`required-document-${index}`).focus();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const value = title.value.trim();
    if (!value) { title.setCustomValidity('Informe o nome do documento.'); title.reportValidity(); return; }
    const item = { id: id.value || app.uid(), title: value, status: status.value };
    const index = app.state.documents.findIndex((document) => document.id === item.id);
    if (index < 0) app.state.documents.push(item); else app.state.documents[index] = item;
    if (app.save()) { dialog.close(); render(); app.toast('Documento salvo.'); }
  });
  title.addEventListener('input', () => title.setCustomValidity(''));
  list.addEventListener('click', (event) => {
    const edit = event.target.closest('[data-edit-document]');
    const remove = event.target.closest('[data-delete-document]');
    if (edit) {
      const item = app.state.documents.find((document) => document.id === edit.dataset.editDocument);
      id.value = item.id; title.value = item.title; status.value = item.status; app.open('document-dialog');
    }
    if (remove) {
      app.state.documents = app.state.documents.filter((document) => document.id !== remove.dataset.deleteDocument);
      if (app.save()) { render(); app.toast('Documento excluído.'); }
    }
  });
  document.querySelectorAll('[data-document-tab]').forEach((button) => button.addEventListener('click', () => {
    app.activate('[data-document-tab]', button);
    const documents = button.dataset.documentTab === 'documents';
    document.getElementById('documents-panel').hidden = !documents;
    document.getElementById('requirements-panel').hidden = documents;
  }));
  render();
})();