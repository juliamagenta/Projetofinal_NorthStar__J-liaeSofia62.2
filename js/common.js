(() => {
  'use strict';
  const KEY = 'north-star.v1';
  // Lê a chave anterior para manter os dados após a correção do nome.
  const LEGACY_KEY = 'north-stars.v1';
  const data = {
    "countries": [
      {
        "id": "canada",
        "name": "Canadá",
        "flag": "🇨🇦",
        "tag": "Estudo + Trabalho",
        "region": "América do Norte",
        "description": "Cidades multiculturais e oportunidades para praticar inglês ou francês.",
        "official": "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
        "cost": 1
      },
      {
        "id": "eua",
        "name": "Estados Unidos",
        "flag": "🇺🇸",
        "tag": "Estudo",
        "region": "América do Norte",
        "description": "Uma grande variedade de cursos, universidades e experiências culturais.",
        "official": "https://travel.state.gov/content/travel/en/us-visas/study.html",
        "cost": 1.3
      },
      {
        "id": "australia",
        "name": "Austrália",
        "flag": "🇦🇺",
        "tag": "Estudo + Trabalho",
        "region": "Oceania",
        "description": "Inglês, natureza e cidades com comunidades de estudantes internacionais.",
        "official": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder/study",
        "cost": 1.15
      },
      {
        "id": "irlanda",
        "name": "Irlanda",
        "flag": "🇮🇪",
        "tag": "Estudo + Trabalho",
        "region": "Europa",
        "description": "Pratique inglês e conheça a cultura irlandesa em uma experiência na Europa.",
        "official": "https://www.irishimmigration.ie/coming-to-study-in-ireland/",
        "cost": 0.9
      },
      {
        "id": "reino-unido",
        "name": "Reino Unido",
        "flag": "🇬🇧",
        "tag": "Estudo",
        "region": "Europa",
        "description": "Explore cursos de idiomas e instituições em cidades cheias de história.",
        "official": "https://www.gov.uk/student-visa",
        "cost": 1.2
      },
      {
        "id": "alemanha",
        "name": "Alemanha",
        "flag": "🇩🇪",
        "tag": "Estudo + Trabalho",
        "region": "Europa",
        "description": "Conheça opções de formação e pratique alemão em um novo contexto cultural.",
        "official": "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany",
        "cost": 0.95
      }
    ],
    "types": [
      [
        "Estudos no Exterior",
        "Cursos de idiomas, graduações, pós-graduação e muito mais.",
        "graduation",
        "green",
        "study",
        "Estude em outro país e conheça novas formas de aprender. Defina o idioma, a duração e o curso antes de comparar instituições."
      ],
      [
        "Trabalho + Estudo",
        "Ganhe experiência e estude no mesmo destino.",
        "briefcase",
        "blue",
        "work",
        "Combine sua formação com experiência profissional. Consulte as condições do programa e as regras oficiais de trabalho do destino."
      ],
      [
        "Au Pair",
        "Cuide de crianças e viva uma nova cultura.",
        "heart",
        "red",
        "aupair",
        "Viva com uma família anfitriã em um programa de cuidado infantil. Compare responsabilidades, rotina, contrato e suporte."
      ],
      [
        "Voluntariado",
        "Faça a diferença enquanto conhece o mundo.",
        "leaf",
        "green",
        "volunteer",
        "Participe de uma iniciativa social ou ambiental. Conheça a organização, os custos e o impacto do projeto antes de escolher."
      ],
      [
        "Programa de férias",
        "Uma nova cultura em uma experiência mais curta.",
        "plane",
        "blue",
        "holiday",
        "Aproveite um período de férias para praticar um idioma e conhecer outro lugar. Confira faixa etária, atividades e acompanhamento."
      ]
    ],
    "documents": [
      [
        "Passaporte válido",
        "Confira a validade para todo o período da viagem.",
        "book",
        "blue"
      ],
      [
        "Comprovante de matrícula ou carta",
        "Reúna a confirmação da instituição ou do programa escolhido.",
        "graduation",
        "green"
      ],
      [
        "Comprovação financeira",
        "Organize os comprovantes solicitados pelo programa.",
        "wallet",
        "red"
      ],
      [
        "Seguro viagem",
        "Verifique a cobertura e o período necessário.",
        "shield",
        "green"
      ],
      [
        "Visto",
        "Consulte a fonte oficial do país para o seu tipo de viagem.",
        "book",
        "blue"
      ]
    ],
    "tips": [
      {
        "id": "cultura",
        "title": "5 dicas para se adaptar à cultura canadense",
        "category": "culture",
        "image": "mountains.svg",
        "text": "1. Pratique o idioma em situações do dia a dia.\n2. Observe e respeite costumes locais.\n3. Participe de atividades da sua instituição.\n4. Converse com pessoas de diferentes origens.\n5. Dê tempo a si mesmo para se adaptar."
      },
      {
        "id": "economizar",
        "title": "Como organizar os gastos da sua viagem",
        "category": "travel",
        "image": "plane.png",
        "text": "Compare o que está incluído em cada opção. Planeje moradia, alimentação, transporte e uma reserva para imprevistos. Acompanhe os gastos e revise seu orçamento com frequência."
      },
      {
        "id": "erros",
        "title": "Erros comuns que você deve evitar",
        "category": "travel",
        "image": "compass.png",
        "text": "Evite deixar documentos para a última hora, ignorar prazos ou contar com informações sem conferir a origem. Guarde cópias, anote datas importantes e confirme cada etapa diretamente com o responsável."
      },
      {
        "id": "cidades",
        "title": "Como escolher uma cidade para trabalhar e estudar",
        "category": "culture",
        "image": "london.svg",
        "text": "Compare o curso, o idioma, a rotina, o custo de vida e a rede de apoio. Consulte as regras oficiais do destino para entender as condições de estudo e trabalho aplicáveis ao seu programa."
      }
    ]
  };
  const today = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const dateFromISO = (value) => new Date(`${value}T12:00:00`);
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const icon = (name) => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#north-star-${escape(name)}"></use></svg>`;
  const uid = () => globalThis.crypto?.randomUUID?.() || `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const defaults = {
    version: 1,
    profile: { name: 'Maria Gomes Neto', email: 'maria@example.com', phone: '', photo: '' },
    preferences: { notifications: true },
    favorites: [],
    completedDocuments: [],
    documents: [],
    tasks: [
      { id: 'task-example-1', title: 'Renovar documentos para viagem', date: today(), time: '09:00', notes: '', done: true },
      { id: 'task-example-2', title: 'Pesquisar passagens de embarque', date: today(), time: '13:00', notes: '', done: false },
      { id: 'task-example-3', title: 'Checar seguro viagem', date: today(), time: '19:00', notes: '', done: false }
    ],
    notifications: [
      { id: 'flight', title: 'Voo confirmado!', message: 'Seu voo para Toronto está marcado.', icon: 'plane', tone: 'blue', time: 'Há 5 horas', read: false },
      { id: 'update', title: 'Atualização do app', message: 'Confira as novidades para organizar sua viagem.', icon: 'shield', tone: 'green', time: 'Há 5 dias', read: true },
      { id: 'reserve', title: 'Nova reserva de voo', message: 'Confira sua próxima etapa de planejamento.', icon: 'calendar', tone: 'blue', time: 'Há 1 semana', read: false },
      { id: 'checkin', title: 'Lembrete de check-in', message: 'Revise seus documentos!', icon: 'book', tone: 'red', time: 'Há 1 semana', read: true },
      { id: 'departure', title: 'Seu embarque foi marcado', message: 'Acompanhe as datas no seu cronograma.', icon: 'clock', tone: 'green', time: 'Há 1 semana', read: true }
    ],
    searches: [],
    messages: [
      { id: 'msg-example-1', author: 'Mariana', text: 'Alguém já chegou em Toronto? Como foi o processo de chegada?', time: '14:32', own: false },
      { id: 'msg-example-2', author: 'Luís', text: 'O curso começa na segunda! Alguém mais?', time: '12:18', own: false },
      { id: 'msg-example-3', author: 'Alicia', text: 'Estou organizando os documentos. Essa etapa exige atenção aos prazos!', time: '09:40', own: false },
      { id: 'msg-example-4', author: 'Rafael', text: 'Tem alguém indo para o Canadá em setembro?', time: 'Ontem', own: false }
    ],
    plan: { country: 'canada', type: 'Estudo + trabalho', start: '2027-01-12', duration: 12, completed: [], saved: false },
    budget: null,
    selectedCountry: 'canada',
    support: []
  };
  const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem(KEY)); } catch { stored = null; }
  if (!object(stored)) {
    try { stored = JSON.parse(localStorage.getItem(LEGACY_KEY)); } catch { stored = null; }
  }
  const state = { ...defaults };
  if (object(stored)) {
    for (const key of ['profile', 'preferences', 'plan']) {
      if (object(stored[key])) state[key] = { ...defaults[key], ...stored[key] };
    }
    for (const key of ['favorites', 'completedDocuments', 'documents', 'tasks', 'notifications', 'searches', 'messages', 'support']) {
      if (Array.isArray(stored[key])) state[key] = stored[key];
    }
    if (typeof stored.budget === 'number' && stored.budget >= 0 && Number.isFinite(stored.budget)) state.budget = stored.budget;
    if (data.countries.some((country) => country.id === stored.selectedCountry)) state.selectedCountry = stored.selectedCountry;
  }
  state.profile.name = typeof state.profile.name === 'string' && state.profile.name.trim() ? state.profile.name.slice(0, 80) : defaults.profile.name;
  state.profile.email = typeof state.profile.email === 'string' ? state.profile.email.slice(0, 160) : defaults.profile.email;
  state.profile.phone = typeof state.profile.phone === 'string' ? state.profile.phone.slice(0, 25) : '';
  state.profile.photo = typeof state.profile.photo === 'string' && /^data:image\/(png|jpeg|webp);base64,/.test(state.profile.photo) ? state.profile.photo : '';
  const validDate = (value) => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = dateFromISO(value);
    return !Number.isNaN(date.getTime()) && date.getFullYear() === Number(value.slice(0, 4)) && date.getMonth() + 1 === Number(value.slice(5, 7)) && date.getDate() === Number(value.slice(8, 10));
  };
  state.tasks = state.tasks.filter((item) => object(item) && typeof item.id === 'string' && typeof item.title === 'string' && validDate(item.date));
  state.documents = state.documents.filter((item) => object(item) && typeof item.id === 'string' && typeof item.title === 'string');
  // O histórico antigo permanece intacto; o chat usa armazenamento próprio por conta.
  state.notifications = state.notifications.filter((item) => object(item) && typeof item.id === 'string' && typeof item.title === 'string');
  state.support = state.support.filter((item) => object(item) && typeof item.id === 'string' && typeof item.subject === 'string' && typeof item.message === 'string');
  state.searches = state.searches.filter((item) => typeof item === 'string').slice(0, 5);
  state.favorites = state.favorites.filter((id) => data.countries.some((country) => country.id === id));
  state.completedDocuments = [...new Set(state.completedDocuments.filter((index) => Number.isInteger(index) && index >= 0 && index < data.documents.length))];
  state.plan.completed = Array.isArray(state.plan.completed) ? [...new Set(state.plan.completed.filter((id) => Number.isInteger(id) && id >= 0 && id < 5))] : [];
  if (!validDate(state.plan.start)) state.plan.start = defaults.plan.start;
  if (!data.countries.some((country) => country.id === state.plan.country)) state.plan.country = defaults.plan.country;
  if (!Number.isInteger(state.plan.duration) || state.plan.duration < 1 || state.plan.duration > 60) state.plan.duration = defaults.plan.duration;
  if (!['Estudo + trabalho', 'Estudos no exterior', 'Au Pair', 'Voluntariado', 'Programa de férias'].includes(state.plan.type)) state.plan.type = defaults.plan.type;
  if (typeof state.preferences.notifications !== 'boolean') state.preferences.notifications = defaults.preferences.notifications;
  state.plan.saved = state.plan.saved === true;
  let savedState = JSON.stringify(state);
  let toastTimer;
  const toast = (message) => {
    const element = document.getElementById('toast');
    if (!element) return;
    clearTimeout(toastTimer);
    element.textContent = message;
    element.hidden = false;
    toastTimer = setTimeout(() => { element.hidden = true; }, 3800);
  };
  const save = () => {
    try {
      const snapshot = JSON.stringify(state);
      localStorage.setItem(KEY, snapshot);
      savedState = snapshot;
      return true;
    } catch {
      Object.assign(state, JSON.parse(savedState));
      toast('Não foi possível salvar. Verifique o espaço ou as permissões deste navegador.');
      return false;
    }
  };
  const normalizeEmail = (value) => String(value ?? '').trim().toLowerCase();
  const chatKey = (email) => `north-star.chat.v1:${encodeURIComponent(normalizeEmail(email))}`;
  const readChatMessages = (email) => {
    const raw = localStorage.getItem(chatKey(email));
    if (raw === null) return [];
    const messages = JSON.parse(raw);
    if (!Array.isArray(messages) || !messages.every((item) => object(item) &&
      ['id', 'author', 'text', 'time'].every((key) => typeof item[key] === 'string'))) {
      throw new Error('Não foi possível ler o histórico desta conta.');
    }
    return messages.map((message) => ({ ...message, own: true }));
  };
  const chat = {
    key: chatKey,
    account() {
      // Consulta o perfil salvo para não enviar pela conta antiga de outra aba.
      const current = JSON.parse(localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY));
      if (!object(current?.profile) || !normalizeEmail(current.profile.email)) {
        throw new Error('Entre em um perfil para usar o chat.');
      }
      return { id: normalizeEmail(current.profile.email), name: String(current.profile.name || 'Você') };
    },
    history(email) {
      return [...defaults.messages.map((message) => ({ ...message })), ...readChatMessages(email)];
    },
    send(email, text) {
      const account = chat.account();
      if (account.id !== normalizeEmail(email)) throw new Error('A conta do chat mudou.');
      const messages = readChatMessages(account.id);
      const message = {
        id: uid(), author: account.name.trim().split(/\s+/)[0], text,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), own: true
      };
      // Não altera o estado nem a tela antes de a gravação terminar com sucesso.
      localStorage.setItem(chatKey(account.id), JSON.stringify([...messages, message]));
      return [...defaults.messages.map((item) => ({ ...item })), ...messages, message];
    }
  };
  const updateProfile = () => {
    document.querySelectorAll('[data-profile-name]').forEach((element) => { element.textContent = state.profile.name.split(' ')[0]; });
    document.querySelectorAll('[data-profile-fullname]').forEach((element) => { element.textContent = state.profile.name; });
    document.querySelectorAll('[data-profile-email]').forEach((element) => { element.textContent = state.profile.email; });
    document.querySelectorAll('[data-avatar]').forEach((element) => {
      element.replaceChildren();
      if (state.profile.photo) {
        const image = document.createElement('img');
        image.src = state.profile.photo;
        image.alt = '';
        element.append(image);
      } else { element.textContent = state.profile.name.slice(0, 1).toUpperCase(); }
    });
  };
  const updateNotifications = () => {
    const unread = state.notifications.some((notification) => !notification.read);
    document.querySelectorAll('.notification-dot').forEach((element) => { element.hidden = !unread || !state.preferences.notifications; });
  };
  const empty = (message, name = 'compass') => `<li class="empty-state">${icon(name)}<p>${escape(message)}</p></li>`;
  const currency = (value, fractionDigits = 0) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(value);
  const formatDate = (value, options = { day: 'numeric', month: 'long' }) => dateFromISO(value).toLocaleDateString('pt-BR', options);
  const activate = (selector, selected) => {
    document.querySelectorAll(selector).forEach((button) => {
      const active = button === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };
  const opening = new Map();
  const open = (id) => {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    opening.get(id)?.();
    if (!dialog.open) dialog.showModal();
  };
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open-dialog]');
    if (opener) open(opener.dataset.openDialog);
    const closer = event.target.closest('[data-close-dialog]');
    if (closer) closer.closest('dialog')?.close();
  });
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  });
  updateProfile();
  updateNotifications();
  save();
  window.NorthStar = { state, data, save, chat, toast, escape, icon, uid, today, dateFromISO, formatDate, currency, activate, open, opening, empty, updateProfile, updateNotifications };
})();
