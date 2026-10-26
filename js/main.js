/* ********** Menu **********
   Esta función autoejecutable (IIFE) escucha los clics en los enlaces del menú.
   Cuando el usuario hace clic en un <a>, se desmarca el checkbox (#menu-toggle),
   lo que provoca que el menú hamburguesa se cierre automáticamente.
*/
((d) => {
  const menuLinks = d.querySelectorAll('.menu a');
  const menuToggle = d.getElementById('menu-toggle');

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.checked = false; // desmarca el checkbox → cierra menú
    });
  });
})(document);



(function() {
  const section = document.querySelector("#portafolio .portfolio-container");

  // La página principal no siempre tiene portafolio; salir si falta la sección.
  if (!section) return;

  const cards = section.querySelectorAll(".portfolio-card");
  if (cards.length <= 3) return;

  const showMoreBtn = document.createElement("button");
  showMoreBtn.textContent = "Ver más";
  showMoreBtn.classList.add("btn");

  let visibleCount = 3;

  // Ocultar todas excepto las 3 primeras
  cards.forEach((card, index) => {
    if (index >= visibleCount) {
      card.style.display = "none";
    }
  });

  // Insertar el botón centrado después del contenedor
  section.insertAdjacentElement("afterend", showMoreBtn);
  showMoreBtn.style.display = "block";
  showMoreBtn.style.margin = "2rem auto";
  
  // Evento para mostrar más
  showMoreBtn.addEventListener("click", () => {
    visibleCount += 3; // mostrar de a 3
    cards.forEach((card, index) => {
      if (index < visibleCount) {
        card.style.display = "flex";
      }
    });

    // Si ya se muestran todas, ocultar el botón
    if (visibleCount >= cards.length) {
      showMoreBtn.style.display = "none";
    }
  });
})();

/* ********** Solicitud de auditoría SEO por WhatsApp **********
   Este bloque prepara un único mensaje con el nombre opcional y el sitio web,
   codifica el texto para la URL de WhatsApp y abre la conversación al enviar.
*/
(() => {
  const form = document.querySelector('.auditoria-solicitud-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('auditoria-nombre').value.trim();
    const sitio = document.getElementById('auditoria-url').value.trim();
    const mensaje = [
      nombre ? `Hola, soy ${nombre}.` : '',
      `Quiero solicitar una auditoría SEO para este sitio: ${sitio}`
    ].filter(Boolean).join('\n');
    const whatsappUrl = `https://wa.me/5493743615520?text=${encodeURIComponent(mensaje)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
})();
