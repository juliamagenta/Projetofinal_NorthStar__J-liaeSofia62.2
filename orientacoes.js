(() => {
  'use strict';
  document.querySelectorAll('.orientation-card').forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      document.querySelectorAll('.orientation-card').forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });
})();