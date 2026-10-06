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
  const cards = section.querySelectorAll(".portfolio-card");
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
