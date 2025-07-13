function inicializarCalendario() {
  const diasContainer = document.getElementById("dias");
  const mesAnio = document.getElementById("mes-anio");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");

  let fechaActual = new Date();

  function renderizarCalendario() {
    diasContainer.innerHTML = "";

    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth();
    const primerDia = new Date(year, month, 1).getDay();
    const ultimoDia = new Date(year, month + 1, 0).getDate();

    mesAnio.textContent = fechaActual.toLocaleDateString("es-ES", {
      month: "long",
      year: "numeric"
    });

    // Días vacíos
    for (let i = 0; i < primerDia; i++) {
      const vacio = document.createElement("div");
      vacio.classList.add("dia", "vacio");
      diasContainer.appendChild(vacio);
    }

    // Días del mes
    for (let d = 1; d <= ultimoDia; d++) {
      const dia = document.createElement("div");
      dia.classList.add("dia");
      dia.textContent = d;

      const hoy = new Date();
      if (
        d === hoy.getDate() &&
        month === hoy.getMonth() &&
        year === hoy.getFullYear()
      ) {
        dia.classList.add("hoy");
      }

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

// Exportar globalmente si la sidebar se carga por fetch
window.inicializarCalendario = inicializarCalendario;
