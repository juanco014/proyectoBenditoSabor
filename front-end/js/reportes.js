document.addEventListener("DOMContentLoaded", async () => {
  const ctx = document.getElementById("grafico").getContext("2d");
  const loader = document.getElementById("loader");
  
  try {
    loader.style.display = "block"; // Muestra el cargador mientras se obtienen datos

    const response = await fetch("http://127.0.0.1:8000/reportes");
    const data = await response.json();

    loader.style.display = "none"; // Oculta el cargador

    if (!Array.isArray(data) || data.length === 0) {
      ctx.font = "18px Arial";
      ctx.fillText("No hay datos disponibles para mostrar.", 40, 100);
      return;
    }

    // Agrupar ventas por producto (sumando los subtotales)
    const ventasPorProducto = {};
    data.forEach(item => {
      const producto = item.producto;
      ventasPorProducto[producto] = (ventasPorProducto[producto] || 0) + item.subtotal;
    });

    const labels = Object.keys(ventasPorProducto);
    const valores = Object.values(ventasPorProducto);

    // Crear el gráfico
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Ventas por producto (COP)",
          data: valores,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Valor Total de Ventas (COP)"
            }
          },
          x: {
            title: {
              display: true,
              text: "Productos"
            }
          }
        }
      }
    });

  } catch (error) {
    loader.style.display = "none";
    console.error("Error al cargar los datos del reporte:", error);
    ctx.font = "18px Arial";
    ctx.fillText("Error al cargar los datos del reporte.", 40, 100);
  }
});
