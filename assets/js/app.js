// Filtro por categoría
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

// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Enlace a Maps si hay dirección
const mapsLink = document.getElementById("mapsLink");
const dir = "Calle Ejemplo 123, Ciudad"; // cambia este texto al actualizar la dirección
mapsLink.href = "https://www.google.com/maps/search/" + encodeURIComponent(dir);
