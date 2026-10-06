(() => {
  'use strict';

  // Os ícones ficam no próprio documento, sem depender de um arquivo SVG externo.
  const icons = {
    home: '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
    graduation: '<path d="m2 9 10-5 10 5-10 5Z"/><path d="M6 11v6q6 5 12 0v-6M22 9v8"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    book: '<path d="M4 3h13a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2Zm0 14h15M8 7h7M8 11h5"/>',
    wallet: '<path d="M20 8H5a2 2 0 0 1 0-4h13v4M3 6v13a2 2 0 0 0 2 2h15V8M20 12h-5v5h5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h2M13 14h2M7 18h2"/>',
    leaf: '<path d="M20 3C7 2 2 8 6 16c8 4 14-1 14-13ZM4 21 16 9"/>',
    chat: '<path d="M4 4h16v12H9l-5 4ZM8 8h8M8 12h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    headphones: '<path d="M4 14v-3a8 8 0 0 1 16 0v3M4 13h3v7H4ZM17 13h3v7h-3Z"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
    bell: '<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5ZM10 21h4M12 2v2"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    plus: '<path d="M12 4v16M4 12h16"/>',
    close: '<path d="m5 5 14 14M19 5 5 19"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    edit: '<path d="m14 4 6 6M4 20l4-1L21 6l-3-3L5 16ZM13 20h8"/>',
    trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',
    heart: '<path d="M12 20 4 12C-2 5 7 0 12 6c5-6 14-1 8 6Z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12q9 6 18 0M12 12v4"/>',
    plane: '<path d="m22 3-7 18-3-8-9-3ZM12 13 22 3"/>',
    shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6ZM8 12l3 3 5-6"/>',
    logout: '<path d="M10 3H4v18h6M9 12h12m-5-5 5 5-5 5"/>',
    send: '<path d="m3 3 18 9-18 9 3-9Zm3 9h15"/>',
    settings: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    camera: '<path d="M3 6h5l2-3h4l2 3h5v15H3Z"/><circle cx="12" cy="13" r="4"/>'
  };
  const definitions = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  definitions.classList.add('icon-definitions');
  definitions.setAttribute('aria-hidden', 'true');
  definitions.setAttribute('focusable', 'false');
  definitions.innerHTML = Object.entries(icons).map(([name, paths]) =>
    `<symbol id="north-stars-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</symbol>`
  ).join('');
  document.body.prepend(definitions);

  const illustrations = {
    'mountains.svg': ['globe', 746, 443],
    'london.svg': ['globe', 746, 443],
    'plane.png': ['plane', 820, 355],
    'compass.png': ['compass', 394, 443]
  };

  window.NorthStarsVisuals = {
    image(name, className = '', width = 400) {
      const [type, sourceWidth, sourceHeight] = illustrations[name] || illustrations['london.svg'];
      const height = Math.round(width * sourceHeight / sourceWidth);
      const source = 'data:image/svg+xml,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${sourceWidth}" height="${sourceHeight}"/>`
      );
      return `<img class="${className} artwork artwork-${type}" src="${source}" alt="" width="${width}" height="${height}">`;
    }
  };
})();