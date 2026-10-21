/* ========================================
   NAV: Module Pattern + IIFE
======================================== */

(function () {
  'use strict';

  const Nav = (function () {
    const script = document.currentScript;

    if (!script || !script.src) {
      console.error('NAV: No se pudo detectar la ruta de nav.js.');
      return {};
    }

    const scriptURL = new URL(script.src);
    const componentURL = new URL('./', scriptURL);

    const htmlURL = new URL('nav.html', componentURL);
    const cssURL = new URL('nav.css', componentURL);

    const container = document.getElementById('nav-container');

    // Detectar automáticamente la raíz del proyecto.
    function getBasePath() {
      const path = componentURL.pathname;
      const marker = '/components/nav/';
      const index = path.lastIndexOf(marker);

      if (index === -1) {
        console.error('NAV: No se pudo detectar la raíz del proyecto.');
        return '/';
      }

      return path.slice(0, index + 1);
    }

    // Cargar los estilos de navegación.
    function loadCSS() {
      const existingLink = document.querySelector(
        'link[data-nav-css]'
      );

      if (existingLink) {
        return Promise.resolve();
      }

      return new Promise(function (resolve, reject) {
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.href = cssURL.href;
        link.dataset.navCss = 'true';

        link.onload = resolve;

        link.onerror = function () {
          link.remove();
          reject(new Error('No se pudo cargar nav.css.'));
        };

        document.head.appendChild(link);
      });
    }

    // Cargar el HTML e insertar la navegación.
    async function loadHTML() {
      if (!container) {
        throw new Error('No se encontró el elemento #nav-container.');
      }

      const response = await fetch(htmlURL);

      if (!response.ok) {
        throw new Error(
          `No se pudo cargar nav.html: HTTP ${response.status}`
        );
      }

      const html = await response.text();
      const basePath = getBasePath();

      container.innerHTML = html.replace(
        /\{\{BASE_PATH\}\}/g,
        basePath
      );

    }

    async function init() {
      try {
        await loadCSS();
      } catch (error) {
        console.error('NAV CSS:', error);
      }

      try {
        await loadHTML();
      } catch (error) {
        console.error('NAV HTML:', error);
      }
    }

    // API pública del módulo.
    return {
      init: init
    };
  })();

  Nav.init();
})();
