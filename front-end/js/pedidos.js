document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("tbody");
  const loader = document.getElementById("loader");

  try {
    loader.style.display = "flex";
    const response = await fetch("http://127.0.0.1:8000/pedidos");
    if (!response.ok) throw new Error("Error al obtener pedidos");

    const pedidos = await response.json();
    loader.style.display = "none";

    if (pedidos.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5'>No hay pedidos registrados.</td></tr>";
      return;
    }

    tbody.innerHTML = pedidos.map(p => `
      <tr>
        <td>${p.id}</td>
        <td>${p.usuario}</td>
        <td>${p.fecha_pedido}</td>
        <td>${p.estado}</td>
        <td>
          ${p.detalles.map(d => `
            <div>${d.producto} (${d.cantidad}u) - $${d.subtotal}</div>
          `).join("")}
        </td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Error al cargar pedidos:", error);
    loader.style.display = "none";
    tbody.innerHTML = "<tr><td colspan='5'>Error al cargar los pedidos.</td></tr>";
  }
});
