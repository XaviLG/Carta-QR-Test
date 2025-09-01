// Seleccionamos los chips (botones de categorías) y el contenedor donde van los platos
const chips = document.querySelectorAll(".chip");
const itemsContainer = document.getElementById("items");
let platos = [];

// Cargar platos desde JSON
async function cargarPlatos() {
  try {
    // Usamos ruta relativa para GitHub Pages
    const res = await fetch("assets/data/menu.json");

    // Si hay error 404 o JSON vacío
    if (!res.ok) {
      throw new Error(`No se pudo cargar el archivo JSON: ${res.status}`);
    }

    platos = await res.json();
    mostrarPlatos(platos);
  } catch (error) {
    console.error("Error cargando platos:", error);
    itemsContainer.innerHTML = `<p style="color:red;">Error al cargar la carta.</p>`;
  }
}

// Mostrar los platos en el HTML
function mostrarPlatos(lista) {
  itemsContainer.innerHTML = "";

  if (lista.length === 0) {
    itemsContainer.innerHTML = `<p style="color:gray;">No hay platos en esta categoría.</p>`;
    return;
  }

  lista.forEach(plato => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-cats", plato.categoria);

    card.innerHTML = `
      <h3>${plato.nombre}</h3>
      <p>${plato.descripcion}</p>
      <span class="price">${plato.precio} €</span>
    `;

    itemsContainer.appendChild(card);
  });
}

// Filtrar por categoría
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.setAttribute("aria-pressed", "false"));
    chip.setAttribute("aria-pressed", "true");

    const f = chip.dataset.filter;
    const filtrados = f === "all" ? platos : platos.filter(p => p.categoria === f);

    mostrarPlatos(filtrados);
  });
});

// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Enlace dinámico a Google Maps
const mapsLink = document.getElementById("mapsLink");
const dir = "Calle Ejemplo 123, Ciudad"; // cámbialo cuando actualices la dirección
mapsLink.href = "https://www.google.com/maps/search/" + encodeURIComponent(dir);

// Iniciar carga de platos al abrir la página
cargarPlatos();
