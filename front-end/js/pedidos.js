document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("tbody");

  const res = await fetch("http://127.0.0.1:8000/pedidos");
  const data = await res.json();

  tbody.innerHTML = "";

  data.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.cliente}</td>
        <td>${p.fecha}</td>
        <td>${p.total}</td>
        <td>${p.estado}</td>
      </tr>
    `;
  });
});