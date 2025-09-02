// Seleccionamos los chips (botones de categorías)
const chips = document.querySelectorAll(".chip");
const platosContainer = document.getElementById("platos-container");
let platos = [];
let swiper;

// Cargar platos desde JSON
async function cargarPlatos() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/XaviLG/Carta-QR-Test/refs/heads/main/data/menu.json"
    );

    if (!res.ok) {
      throw new Error(`No se pudo cargar el archivo JSON: ${res.status}`);
    }

    platos = await res.json();
    mostrarPlatos("all"); // Mostrar todos los platos al inicio
  } catch (error) {
    console.error("Error cargando platos:", error);
    platosContainer.innerHTML = `<p style="color:red;">Error al cargar la carta.</p>`;
  }
}

// Mostrar los platos en el HTML
function mostrarPlatos(categoria) {
  platosContainer.innerHTML = "";

  // Filtrar por categoría
  const platosFiltrados =
    categoria === "all"
      ? platos
      : platos.filter((plato) => plato.categoria === categoria);

  // Si no hay platos, mostramos mensaje
  if (platosFiltrados.length === 0) {
    platosContainer.innerHTML = `<p style="color:gray;">No hay platos en esta categoría.</p>`;
    inicializarCarrusel();
    return;
  }

  // Crear tarjetas dinámicas
  platosFiltrados.forEach((plato) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `
      <div class="card">
        <h3>${plato.nombre}</h3>
        <p>${plato.descripcion}</p>
        <span class="price">${plato.precio} €</span>
      </div>
    `;
    platosContainer.appendChild(slide);
  });

  // Reinicializar carrusel
  inicializarCarrusel();
}

// Inicializar / reiniciar carrusel
function inicializarCarrusel() {
  if (swiper) swiper.destroy(true, true);

  swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1 },  // Móvil
      768: { slidesPerView: 2 },  // Tablet
      1024: { slidesPerView: 6 }, // Escritorio
    },
  });
}

// Activar filtros por categoría
function activarFiltros() {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      // Desactivar todos los chips
      chips.forEach((c) => c.setAttribute("aria-pressed", "false"));

      // Activar el chip actual
      chip.setAttribute("aria-pressed", "true");

      // Mostrar platos filtrados
      mostrarPlatos(chip.dataset.filter);
    });
  });
}

// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Enlace dinámico a Google Maps
const mapsLink = document.getElementById("mapsLink");
const dir = "Calle Ejemplo 123, Ciudad";
mapsLink.href = "https://www.google.com/maps/search/" + encodeURIComponent(dir);

// Iniciar carga de platos y activar filtros
cargarPlatos();
activarFiltros();
