// js/inventario.js
document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("tbody");
  const loader = document.getElementById("loader");

  try {
    loader.style.display = "flex";
    const response = await fetch("http://127.0.0.1:8000/inventario");
    if (!response.ok) throw new Error("Error al obtener inventario");

    const inventario = await response.json();
    loader.style.display = "none";

    tbody.innerHTML = inventario.map(item => `
      <tr>
        <td>${item.id || "-"}</td>
        <td>${item.nombre}</td>
        <td>${item.stock}</td>
        <td>$${item.precio ? item.precio.toFixed(2) : "-"}</td>
        <td><button class="btn-edit">Editar</button></td>
      </tr>
    `).join("");
  } catch (error) {
    console.error(error);
    tbody.innerHTML = "<tr><td colspan='5'>Error al cargar inventario.</td></tr>";
    loader.style.display = "none";
  }
});
