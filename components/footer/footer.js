/* ========================================
   FOOTER: Module Pattern + IIFE
======================================== */

(function () {
  'use strict';

  const Footer = (function () {
    const script = document.currentScript;

    if (!script || !script.src) {
      console.error('FOOTER: No se pudo detectar la ruta de footer.js.');
      return {};
    }

    const scriptURL = new URL(script.src);
    const componentURL = new URL('./', scriptURL);

    const htmlURL = new URL('footer.html', componentURL);
    const cssURL = new URL('footer.css', componentURL);

    const container = document.getElementById('footer-container');

    function getBasePath() {
      const path = componentURL.pathname;
      const marker = '/components/footer/';
      const index = path.lastIndexOf(marker);

      if (index === -1) {
        console.error('FOOTER: No se pudo detectar la raíz del proyecto.');
        return '/';
      }

      return path.slice(0, index + 1);
    }

    function loadCSS() {
      const existingLink = document.querySelector(
        'link[data-footer-css]'
      );

      if (existingLink) {
        return Promise.resolve();
      }

      return new Promise(function (resolve, reject) {
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.href = cssURL.href;
        link.dataset.footerCss = 'true';

        link.onload = resolve;

        link.onerror = function () {
          link.remove();
          reject(new Error('No se pudo cargar footer.css.'));
        };

        document.head.appendChild(link);
      });
    }

    async function loadHTML() {
      if (!container) {
        throw new Error(
          'No se encontró el elemento #footer-container.'
        );
      }

      const response = await fetch(htmlURL);

      if (!response.ok) {
        throw new Error(
          `No se pudo cargar footer.html: HTTP ${response.status}`
        );
      }

      const html = await response.text();
      const basePath = getBasePath();

      container.innerHTML = html.replace(
        /\{\{BASE_PATH\}\}/g,
        basePath
      );

      bindAuditForm();
    }

    function bindAuditForm() {
      const form = container.querySelector('.footer-audit-form');
      if (!form) return;

      form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = form.querySelector('#footer-audit-name');
        const urlInput = form.querySelector('#footer-audit-url');
        const urlValue = (urlInput.value || '').trim();
        const nameValue = (nameInput.value || '').trim();

        if (!urlValue) {
          urlInput.focus();
          return;
        }

        const normalizedUrl =
          urlValue.startsWith('http://') || urlValue.startsWith('https://')
            ? urlValue
            : 'https://' + urlValue;

        const message = `Hola, quiero solicitar una auditoría SEO gratuita.${nameValue ? ` Mi nombre es ${nameValue}.` : ''} Mi sitio web es: ${normalizedUrl}`;

        window.open(
          `https://wa.me/5493743615520?text=${encodeURIComponent(message)}`,
          '_blank',
          'noopener,noreferrer'
        );
      });
    }

    async function init() {
      try {
        await loadCSS();
      } catch (error) {
        console.error('FOOTER CSS:', error);
      }

      try {
        await loadHTML();
      } catch (error) {
        console.error('FOOTER HTML:', error);
      }
    }

    return {
      init: init
    };
  })();

  Footer.init();
})();
