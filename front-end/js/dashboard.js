document.addEventListener("DOMContentLoaded", async () => {
  const [pedidosRes, clientesRes, productosRes] = await Promise.all([
    fetch("http://127.0.0.1:8000/pedidos"),
    fetch("http://127.0.0.1:8000/clientes"),
    fetch("http://127.0.0.1:8000/productos")
  ]);

  const pedidos = await pedidosRes.json();
  const clientes = await clientesRes.json();
  const productos = await productosRes.json();

  const totalVentas = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);

  document.getElementById("ventas").innerText = "$" + totalVentas;
  document.getElementById("clientes").innerText = clientes.length;
  document.getElementById("productos").innerText = productos.length;
  document.getElementById("pedidos").innerText = pedidos.length;
});