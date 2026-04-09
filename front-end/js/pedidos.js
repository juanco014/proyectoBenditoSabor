let productos = [];
let clientes = [];

// Cargar datos
document.addEventListener("DOMContentLoaded", async () => {
  await cargarClientes();
  await cargarProductos();
  await cargarPedidos();
});

// Cargar clientes
async function cargarClientes() {
  const res = await fetch("http://127.0.0.1:8000/clientes");
  clientes = await res.json();

  const select = document.getElementById("cliente");
  select.innerHTML = clientes.map(c =>
    `<option value="${c.id}">${c.nombre}</option>`
  ).join("");
}

// Cargar productos
async function cargarProductos() {
  const res = await fetch("http://127.0.0.1:8000/productos");
  productos = await res.json();

  const select = document.getElementById("producto");
  select.innerHTML = productos.map(p =>
    `<option value="${p.id}">${p.nombre}</option>`
  ).join("");
}

// Registrar venta
async function registrarVenta() {
  const cliente_id = document.getElementById("cliente").value;
  const producto_id = document.getElementById("producto").value;
  const cantidad = document.getElementById("cantidad").value;

  const producto = productos.find(p => p.id == producto_id);
  const total = producto.precio * cantidad;

  await fetch("http://127.0.0.1:8000/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cliente_id,
      producto_id,
      cantidad,
      total
    })
  });

  location.reload();
}

// Cargar pedidos
async function cargarPedidos() {
  const res = await fetch("http://127.0.0.1:8000/pedidos");
  const pedidos = await res.json();

  const tbody = document.getElementById("tabla-pedidos");

  tbody.innerHTML = pedidos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.cliente_nombre}</td>
      <td>${p.producto_nombre}</td>
      <td>${p.cantidad}</td>
      <td>$${p.total}</td>
    </tr>
  `).join("");
}
