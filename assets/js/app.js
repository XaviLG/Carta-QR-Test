// ============================
// 1) CARGAR Y RENDERIZAR CARTA
// ============================
fetch("data/menu.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("items");
    
    // Generar el HTML dinámicamente
    container.innerHTML = data
      .map((plato) => `
        <article class="card" data-cats="${plato.cats.join(",")}">
          <div style="display:flex;gap:8px;align-items:baseline">
            <h3>${plato.title}</h3>
            <span class="price">${plato.price} €</span>
          </div>
          <p class="desc">${plato.desc}</p>
          <div class="badges">
            ${plato.badges.map((b) => `<span class="badge">${b}</span>`).join("")}
          </div>
        </article>
      `)
      .join("");

    // IMPORTANTE: Reaplicar los filtros después de renderizar
    activarFiltros();
  })
  .catch((err) => console.error("Error cargando menu.json:", err));


// ============================
// 2) FUNCIÓN PARA ACTIVAR FILTROS
// ============================
function activarFiltros() {
  const chips = document.querySelectorAll(".chip");
  const items = document.querySelectorAll(".card");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");

      const f = chip.dataset.filter;
      items.forEach((it) => {
        const show = f === "all" || it.dataset.cats.split(",").includes(f);
        it.style.display = show ? "flex" : "none";
      });
    });
  });
}


// ============================
// 3) AÑO AUTOMÁTICO FOOTER
// ============================
document.getElementById("year").textContent = new Date().getFullYear();


// ============================
// 4) ENLACE A GOOGLE MAPS
// ============================
const mapsLink = document.getElementById("mapsLink");
const dir = "Calle Ejemplo 123, Ciudad"; // cambia este texto al actualizar la dirección
mapsLink.href = "https://www.google.com/maps/search/" + encodeURIComponent(dir);

