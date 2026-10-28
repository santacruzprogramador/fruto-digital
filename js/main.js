/* ********** Solicitud de auditoría SEO por WhatsApp **********
   Arma un mensaje con el nombre opcional y el sitio, y abre WhatsApp al enviar.
*/
(() => {
  const form = document.querySelector('.auditoria-solicitud-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('auditoria-nombre').value.trim();
    const sitio = document.getElementById('auditoria-url').value.trim();

    if (!sitio) {
      document.getElementById('auditoria-url').focus();
      return;
    }

    const sitioNormalizado =
      sitio.startsWith('http://') || sitio.startsWith('https://')
        ? sitio
        : 'https://' + sitio;

    const mensaje = [
      nombre ? `Hola, soy ${nombre}.` : 'Hola, quiero solicitar una auditoría SEO gratuita.',
      `Mi sitio web es: ${sitioNormalizado}`
    ].join(' ');

    window.open(
      `https://wa.me/5493743615520?text=${encodeURIComponent(mensaje)}`,
      '_blank',
      'noopener,noreferrer'
    );
  });
})();
