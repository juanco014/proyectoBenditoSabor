fetch("componentes/sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar-container").innerHTML = data;

    // 🔥 Ahora sí existe el sidebar
    const btn = document.querySelector(".toggle-btn");
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");

    btn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("expanded");
    });
});
const links = document.querySelectorAll(".menu a");
const current = window.location.pathname.split("/").pop();

links.forEach(link => {
    if (link.getAttribute("href") === current) {
        link.classList.add("active");
    }
});

btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    sidebar.classList.toggle("active");
    main.classList.toggle("expanded");
});