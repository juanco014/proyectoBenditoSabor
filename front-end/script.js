// Generar gráfico decorativo con canvas sin librerías externas
const canvas = document.getElementById("salesChart");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = 200;

// Datos simulados
const points = [50, 90, 70, 120, 150, 130, 180];
const gradient = ctx.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "rgba(99, 179, 237, 0.6)");
gradient.addColorStop(1, "rgba(99, 179, 237, 0)");

// Dibujar fondo del gráfico
ctx.beginPath();
ctx.moveTo(0, 200 - points[0]);
for (let i = 1; i < points.length; i++) {
  ctx.lineTo(i * 80, 200 - points[i]);
}
ctx.lineTo(480, 200);
ctx.lineTo(0, 200);
ctx.fillStyle = gradient;
ctx.fill();

// Dibujar línea
ctx.beginPath();
ctx.moveTo(0, 200 - points[0]);
for (let i = 1; i < points.length; i++) {
  ctx.lineTo(i * 80, 200 - points[i]);
}
ctx.strokeStyle = "#4b6cb7";
ctx.lineWidth = 3;
ctx.stroke();

// Simulación de gráfico de ventas por mes
const canvas = document.getElementById('ventasChart');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const datos = [3500, 4200, 3900, 4600, 5200, 6100, 7000];
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
  const maxValor = Math.max(...datos);
  const anchoBarra = 60;
  const espacio = 30;

  ctx.font = "14px Arial";
  ctx.fillStyle = "#444";
  ctx.fillText("Ventas por Mes (en $)", 180, 20);

  datos.forEach((valor, i) => {
    const x = 80 + i * (anchoBarra + espacio);
    const altura = (valor / maxValor) * 200;
    const y = 250 - altura;

    // Barra
    const color = `hsl(${240 - i * 15}, 70%, 60%)`;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, anchoBarra, altura);

    // Texto valor
    ctx.fillStyle = "#222";
    ctx.fillText(`$${valor}`, x, y - 10);
    // Etiqueta mes
    ctx.fillStyle = "#555";
    ctx.fillText(meses[i], x + 15, 270);
  });
}

// Menú contraíble
const toggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("collapsed");
});
