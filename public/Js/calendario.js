document.addEventListener("DOMContentLoaded", function () {
  function inicializarCalendario() {
    let fechaActual = new Date();

    const diasContainer = document.getElementById("dias");
    const mesAnio = document.getElementById("mes-anio");
    const btnPrev = document.getElementById("prev");
    const btnNext = document.getElementById("next");

    if (!diasContainer || !mesAnio || !btnPrev || !btnNext) return;

    function renderizarCalendario() {
      diasContainer.innerHTML = "";

      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth();
      const primerDia = new Date(year, month, 1).getDay();
      const ultimoDia = new Date(year, month + 1, 0).getDate();

      mesAnio.textContent = fechaActual.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      });

      // Días vacíos antes del día 1
      for (let i = 0; i < primerDia; i++) {
        const vacio = document.createElement("div");
        vacio.classList.add("calendar-day", "empty");
        diasContainer.appendChild(vacio);
      }

      // Días del mes
      for (let d = 1; d <= ultimoDia; d++) {
        const dia = document.createElement("div");
        dia.classList.add("calendar-day");

        const hoy = new Date();
        if (
          d === hoy.getDate() &&
          month === hoy.getMonth() &&
          year === hoy.getFullYear()
        ) {
          dia.classList.add("today");
        }

        dia.textContent = d;
        diasContainer.appendChild(dia);
      }
    }

    btnPrev.addEventListener("click", () => {
      fechaActual.setMonth(fechaActual.getMonth() - 1);
      renderizarCalendario();
    });

    btnNext.addEventListener("click", () => {
      fechaActual.setMonth(fechaActual.getMonth() + 1);
      renderizarCalendario();
    });

    renderizarCalendario();
  }

  // Exportar al scope global para que otros scripts puedan usarlo
  window.inicializarCalendario = inicializarCalendario;
});
