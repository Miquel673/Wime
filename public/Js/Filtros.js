document.addEventListener("DOMContentLoaded", () => {
  const busquedaInput = document.getElementById("busqueda");
  const filtroPrioridad = document.getElementById("filter-prioridad");
  const filtroTipo = document.getElementById("filter-tipo");

  if (!busquedaInput || !filtroPrioridad || !filtroTipo) return;

  busquedaInput.addEventListener("input", aplicarFiltros);
  filtroPrioridad.addEventListener("change", aplicarFiltros);
  filtroTipo.addEventListener("change", aplicarFiltros);
});

function aplicarFiltros() {
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const prioridad = document.getElementById("filter-prioridad").value.toLowerCase();
  const tipo = document.getElementById("filter-tipo").value.toLowerCase();

  const tarjetas = document.querySelectorAll(".tarjeta-tarea, .tarjeta-rutina");

  tarjetas.forEach(tarjeta => {
    const titulo = tarjeta.querySelector(".card-title")?.textContent.toLowerCase() || "";
    const prioridadTarjeta = tarjeta.getAttribute("data-prioridad")?.toLowerCase() || "";
    const tipoTarjeta = tarjeta.classList.contains("tarjeta-tarea") ? "tarea" : "rutina";

    const coincideTexto = titulo.includes(texto);
    const coincidePrioridad = !prioridad || prioridad === prioridadTarjeta;
    const coincideTipo = !tipo || tipo === tipoTarjeta;

    tarjeta.style.display = (coincideTexto && coincidePrioridad && coincideTipo) ? "block" : "none";
  });
}
