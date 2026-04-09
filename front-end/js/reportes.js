document.addEventListener("DOMContentLoaded", async () => {
  await cargarReportes();
});

async function cargarReportes() {
  try {
    const [pedidosRes, clientesRes, productosRes] = await Promise.all([
      fetch("http://127.0.0.1:8000/pedidos"),
      fetch("http://127.0.0.1:8000/clientes"),
      fetch("http://127.0.0.1:8000/productos")
    ]);

    const pedidos = await pedidosRes.json();
    const clientes = await clientesRes.json();
    const productos = await productosRes.json();

    const totalVentas = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);

    document.getElementById("total-ventas").innerText = "$" + totalVentas;
    document.getElementById("total-clientes").innerText = clientes.length;
    document.getElementById("total-productos").innerText = productos.length;

  } catch (error) {
    console.error("Error en reportes", error);
  }
}