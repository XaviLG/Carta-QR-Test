// Seleccionamos los chips (botones de categorías) y el contenedor donde van los platos
const chips = document.querySelectorAll(".chip");
const itemsContainer = document.getElementById("items");
let platos = [];
let swiper;

// Cargar platos desde JSON
async function cargarPlatos() {
  try {
    // Usamos ruta relativa para GitHub Pages
    const res = await fetch("https://raw.githubusercontent.com/XaviLG/Carta-QR-Test/refs/heads/main/data/menu.json");

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
function mostrarPlatos(categoria) {
  const contenedor = document.getElementById("platos-container");
  contenedor.innerHTML = "";

  // Filtramos por categoría
  const platosFiltrados =
    categoria === "all"
      ? platos
      : platos.filter((plato) => plato.categoria === categoria);

  // Crear tarjetas dinámicas
  platosFiltrados.forEach((plato) => {
    const card = document.createElement("div");
    card.classList.add("swiper-slide");
    card.innerHTML = `
      <div class="card">
        <h3>${plato.nombre}</h3>
        <p>${plato.descripcion}</p>
        <span>${plato.precio} €</span>
      </div>
    `;
    contenedor.appendChild(card);
  });

  // Reinicializar el carrusel cada vez que cambiamos los platos
  inicializarCarrusel();
}

function inicializarCarrusel() {
  // Destruir el swiper anterior para evitar bugs
  if (swiper) swiper.destroy(true, true);

  swiper = new Swiper(".swiper", {
    slidesPerView: 3,
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
      320: { slidesPerView: 1 }, // Móvil
      768: { slidesPerView: 2 }, // Tablet
      1024: { slidesPerView: 3 }, // Escritorio
    },
  });
}

// Filtrar por categoría
function activarFiltros() {
  const botones = document.querySelectorAll(".chip");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Quitar clase activa a todos los botones
      botones.forEach((b) => b.setAttribute("aria-pressed", "false"));

      // Activar el botón actual
      boton.setAttribute("aria-pressed", "true");

      // Mostrar platos filtrados
      mostrarPlatos(boton.dataset.filter);
    });
  });
}

// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Enlace dinámico a Google Maps
const mapsLink = document.getElementById("mapsLink");
const dir = "Calle Ejemplo 123, Ciudad"; // cámbialo cuando actualices la dirección
mapsLink.href = "https://www.google.com/maps/search/" + encodeURIComponent(dir);

// Iniciar carga de platos al abrir la página
cargarPlatos();
activarFiltros();
