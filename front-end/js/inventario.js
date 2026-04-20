document.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos() {
  const tbody = document.getElementById("tabla-productos");

  try {
    const response = await fetch("http://127.0.0.1:8000/productos");
    const productos = await response.json();

    if (productos.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5'>No hay productos</td></tr>";
      return;
    }

    tbody.innerHTML = productos.map(p => `
      <tr>
        <td>${p.id || "-"}</td>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>${p.stock}</td>
        <td><button onclick="editarProducto(${p.id})">Editar</button></td>
      </tr>
    `).join("");

  } catch (error) {
    console.error(error);
    tbody.innerHTML = "<tr><td colspan='5'>Error al cargar productos</td></tr>";
  }
}

async function crearProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const stock = parseInt(document.getElementById("stock").value);

  if (!nombre || isNaN(precio) || isNaN(stock)) {
    alert("Por favor completa todos los campos correctamente");
    return;
  }

  try {
    await fetch("http://127.0.0.1:8000/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, precio, stock })
    });

    cargarProductos(); // 🔥 mejor que reload
  } catch (error) {
    console.error("Error al crear producto", error);
  }
}