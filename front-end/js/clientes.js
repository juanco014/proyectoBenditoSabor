document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("tbody");

  try {
    const response = await fetch("http://127.0.0.1:8000/clientes");
    const data = await response.json();

    tbody.innerHTML = "";

    data.forEach(cliente => {
      const row = `
        <tr>
          <td>${cliente.id}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.email}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

  } catch (error) {
    console.error("Error cargando clientes:", error);
  }
});
