// js/menu.js
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleMenu");
  const loader = document.getElementById("loader");

  // Ocultar loader después de un segundo
  if (loader) {
    loader.style.display = "flex";
    setTimeout(() => {
      loader.style.opacity = 0;
      setTimeout(() => loader.remove(), 500);
    }, 800);
  }

  // Botón para colapsar menú
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }
});
