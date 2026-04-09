// Cargar productos
document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("tabla-productos");

  try {
    const response = await fetch("http://127.0.0.1:8000/productos");
    const productos = await response.json();

    tbody.innerHTML = productos.map(p => `
      <tr>
        <td>${p.id || "-"}</td>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>${p.stock}</td>
        <td><button>Editar</button></td>
      </tr>
    `).join("");

  } catch (error) {
    console.error(error);
    tbody.innerHTML = "<tr><td colspan='5'>Error al cargar productos</td></tr>";
  }
});


// Mostrar formulario
function mostrarFormulario() {
  const form = document.getElementById("formulario");
  form.classList.toggle("oculto");
}


// Crear producto (base)
async function crearProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;

  try {
    await fetch("http://127.0.0.1:8000/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, precio, stock })
    });

    location.reload(); // recargar tabla
  } catch (error) {
    console.error("Error al crear producto", error);
  }
}