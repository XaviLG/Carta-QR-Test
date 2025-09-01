// === CARGA DINÁMICA DE PLATOS DESDE JSON ===
const itemsContainer = document.getElementById("items");

// Función para crear el HTML de un plato
function crearPlatoHTML(plato) {
  // Creamos los badges (etiquetas)
  const badgesHTML = plato.badges.map(badge => `<span class="badge">${badge}</span>`).join("");

  return `
    <article class="card" data-cats="${plato.categorias.join(",")}">
      <div style="display:flex;gap:8px;align-items:baseline">
        <h3>${plato.nombre}</h3>
        <span class="price">${plato.precio}</span>
      </div>
      <p class="desc">${plato.descripcion}</p>
      <div class="badges">${badgesHTML}</div>
    </article>
  `;
}

// Cargar los platos desde carta.json
fetch("assets/data/menu.json")
  .then(response => response.json())
  .then(data => {
    // Generamos el HTML de todos los platos
    const platosHTML = data.platos.map(plato => crearPlatoHTML(plato)).join("");
    itemsContainer.innerHTML = platosHTML;

    // Después de cargar, activamos los filtros
    activarFiltros();
  })
  .catch(error => console.error("Error al cargar la carta:", error));

// === FILTRO POR CATEGORÍA ===
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

// === AÑO AUTOMÁTICO EN FOOTER ===
document.getElementById("year").textContent = new Date().getFullYear();

// === ENLACE A GOOGLE MAPS ===
const mapsLink = document.getElementById("mapsLink");
const dir = "Calle Ejemplo 123, Ciudad"; // cambia por tu dirección real
mapsLink.href = "https://www.google.com/maps/search/" + encodeURIComponent(dir);
