Desarrolla la página con enfoque modular, reutilizable y Mobile First.

* HTML:
  * `index.html`, separado por secciones con comentarios claros (ej: `<!-- Alcance -->`).
* CSS:
  * Un mismo archivo CSS organizado por secciones.
  * Solo un `:root` principal al inicio (no crear variables ni `:root` locales en las secciones).
  * Maquetación y estructura con Flexbox.
  * Reutilizar las clases utilitarias globales ya existentes (`.container`, `.heading-1/2/3`, `.min-height-screen`, etc.) en vez de duplicar estilos o inventar clases redundantes.
  * Formato de comentarios por bloques dentro de cada región, **coincidiendo exactamente con el nombre de las secciones del HTML** (ej: `<!-- Alcance -->` en HTML ↔ `/* === ALCANCE === */` en CSS) para mantener correspondencia 1 a 1 y no perderse:
    `/* ========================================`
    `   1. NOMBRE SECCION`
    `======================================== */`
  * Media Queries agrupadas al final de la región (un único bloque para `min-width: 768px` y uno para `min-width: 1024px`). La única excepción es la sección HERO, que lleva su propia media query dentro de su bloque.
* JS:
  * Un mismo archivo JS IIFE, separado por funcionalidades.
  * Usar JS solo cuando sea estrictamente necesario: priorizar siempre resolver interactividad, estados y animaciones con HTML y CSS nativo; recurrir a JS únicamente cuando con CSS sea imposible.
* Reutilizar componentes repetidos y evitar código duplicado.
* Sin alto acoplamiento (componentes independientes de su contenedor).
* Responsive con `@media (min-width)`:
  * Base: móvil (Mobile First)
  * `min-width: 768px`
  * `min-width: 1024px`
* No crear archivos innecesarios.
* Mantener el código limpio, ordenado y fácil de modificar.
* No romper ni modificar innecesariamente el código existente.
