// Cargar clientes
document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("tbody");
  const loader = document.getElementById("loader");

  try {
    loader.style.display = "flex";
    const response = await fetch("http://127.0.0.1:8000/clientes");
    if (!response.ok) throw new Error("Error al obtener clientes");

    const clientes = await response.json();
    loader.style.display = "none";

    tbody.innerHTML = clientes.map(c => `
      <tr>
        <td>${c.id || "-"}</td>
        <td>${c.nombre}</td>
        <td>${c.correo}</td>
        <td>${c.telefono}</td>
        <td><button class="btn-edit">Editar</button></td>
      </tr>
    `).join("");
  } catch (error) {
    console.error(error);
    tbody.innerHTML = "<tr><td colspan='5'>Error al cargar clientes.</td></tr>";
    loader.style.display = "none";
  }
});


function mostrarFormulario() {
  const form = document.getElementById("formulario");
  form.style.display = form.style.display === "none" ? "block" : "none";
}