// js/main.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("productos-container");
  const loader = document.getElementById("loader");

  try {
    loader.style.display = "flex";
    const response = await fetch("http://127.0.0.1:8000/productos");
    if (!response.ok) throw new Error("Error al obtener productos");

    const productos = await response.json();
    loader.style.display = "none";

    container.innerHTML = productos.map(p => `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p><strong>Categoría:</strong> ${p.categoria}</p>
        <p><strong>Stock:</strong> ${p.stock}</p>
        <p><strong>Precio:</strong> $${p.precio.toFixed(2)}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Error al cargar productos.</p>";
    loader.style.display = "none";
  }
});
