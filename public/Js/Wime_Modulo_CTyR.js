


// Visualizacion de tareas y rutinas en el tablero //


document.addEventListener("DOMContentLoaded", () => {
  showContent("tareas"); // Mostrar sección de tareas al inicio
  cargarTareas();
  cargarRutinas();
});

// ------------------------
// FUNCIONES DE CARGA
// ------------------------

function cargarTareas() {
  fetch("/Wime/Controllers/TTableroController.php")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        console.log("✅ Tareas recibidas:", data);
        mostrarTareas(data);
      } else {
        console.warn("⚠️ Formato de respuesta inesperado (tareas):", data);
        mostrarError("tareas", "No se pudieron cargar las tareas.");
      }
    })
    .catch(err => {
      console.error("❌ Error cargando tareas:", err);
      mostrarError("tareas", "Error al cargar tareas.");
    });
}

function cargarRutinas() {
  fetch("/Wime/Controllers/RTableroController.php")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        console.log("✅ Rutinas recibidas:", data);
        mostrarRutinas(data);
      } else {
        console.warn("⚠️ Formato de respuesta inesperado (rutinas):", data);
        mostrarError("rutinas", "No se pudieron cargar las rutinas.");
      }
    })
    .catch(err => {
      console.error("❌ Error cargando rutinas:", err);
      mostrarError("rutinas", "Error al cargar rutinas.");
    });
}

// ------------------------
// FUNCIONES DE VISUALIZACIÓN
// ------------------------

function mostrarTareas(tareas) {
  const contenedor = document.getElementById("contenedor-tareas");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (tareas.length === 0) {
    contenedor.innerHTML = `<p class="text-center w-100">No hay tareas disponibles.</p>`;
    return;
  }

function getColorPorEstado(estado) {
  switch (estado.toLowerCase()) {
    case "pendiente":
      return "secondary";
    case "en progreso":
      return "warning";
    case "completada":
      return "success";
    default:
      return "secondary";
  }
}


  function getColorPorPrioridad(prioridad) {
  if (!prioridad) return "secondary";

  switch (prioridad.toLowerCase()) {
    case "alta": return "danger";
    case "media": return "warning";
    case "baja": return "success";
    default: return "secondary";
  }
}


  tareas.forEach(tarea => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "col";

tarjeta.innerHTML = `
  <div class="card shadow-sm h-100">
    <div class="card-body">
      <h5 class="card-title titulo-tarea text-white bg-${getColorPorPrioridad(tarea.prioridad)}">${tarea.titulo}</h5>
      <p class="card-text"><strong>Prioridad:</strong> ${tarea.prioridad}</p>
      <p class="card-text"><strong>Fecha límite:</strong> ${tarea.fecha_limite}</p>
      <p class="card-text">${tarea.descripcion || "Sin descripción."}</p>
      <span class="badge bg-${getColorPorPrioridad(tarea.prioridad)}">${tarea.estado || "Pendiente"}</span>


      <!-- Botón para desplegar -->
      <button class="btn btn-sm btn-outline-dark w-100 mt-2" data-bs-toggle="collapse" data-bs-target="#opciones-${tarea.IDtarea}">
        ▼ Ver opciones
      </button>

      <!-- Contenido colapsable -->


      <div class="collapse mt-2 bg-${getColorPorPrioridad(tarea.prioridad)} px-2 pb-2 rounded" id="opciones-${tarea.IDtarea}">
        <label class="pb-2"><strong>Estado:</strong></label>
        <div class="dropdown mb-2x pb-2">
          <button class="btn btn-sm dropdown-toggle text-white bg-${getColorPorEstado(tarea.estado)}" type="button" data-bs-toggle="dropdown">
            ${tarea.estado || "Pendiente"}
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick="cambiarEstadoTarea(${tarea.IDtarea}, 'pendiente')">Pendiente</a></li>
            <li><a class="dropdown-item" href="#" onclick="cambiarEstadoTarea(${tarea.IDtarea}, 'en progreso')">En progreso</a></li>
            <li><a class="dropdown-item" href="#" onclick="cambiarEstadoTarea(${tarea.IDtarea}, 'completada')">Completada</a></li>
          </ul>
        </div>

        <div class="d-flex justify-content-between">
          <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.IDtarea})">Eliminar</button>
          <a href="/Wime/private/PhP/Wime_interfaz_Modulo_ETareas.php?id=${tarea.IDtarea}" class="btn btn-sm btn-outline-secondary bg-primary text-light">Editar</a>
        </div>
      </div>
    </div>
  </div>
`;


    contenedor.appendChild(tarjeta);
  });
}

//Rutinas//

function mostrarRutinas(rutinas) {
  const contenedor = document.getElementById("contenedor-rutinas");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  if (!Array.isArray(rutinas) || rutinas.length === 0) {
    contenedor.innerHTML = `<p class="text-center w-100">No hay rutinas disponibles.</p>`;
    return;
  }

  rutinas.forEach(rutina => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "col";

    tarjeta.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title titulo-tarea bg-${getColorPorEstado(rutina.Estado)} text-white">${rutina.NombreRutina}</h5>
          <p class="card-text"><strong>Prioridad:</strong> ${rutina.Prioridad}</p>
          <p class="card-text"><strong>Frecuencia:</strong> ${rutina.Frecuencia}</p>
          <p class="card-text"><strong>Fecha de Asignacion:</strong> ${rutina.FechaAsignacion}</p>
          <p class="card-text"><strong>Fecha Fin:</strong> ${rutina.FechaFin}</p>
          <p class="card-text">${rutina.Descripcion || "Sin descripción."}</p>

          <button class="btn btn-sm btn-outline-primary w-100 mt-2" data-bs-toggle="collapse" data-bs-target="#opciones-rutina-${rutina.IDRutina}">▼ Ver opciones</button>
          
          <div class="collapse mt-2" id="opciones-rutina-${rutina.IDRutina}">
            <label><strong>Estado:</strong></label>
            <div class="dropdown mb-2">
              <button class="btn btn-sm dropdown-toggle text-white bg-${getColorPorEstado(rutina.Estado)}" type="button" data-bs-toggle="dropdown">
                ${rutina.Estado || "Pendiente"}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick="cambiarEstadoRutina(${rutina.IDRutina}, 'pendiente')">Pendiente</a></li>
                <li><a class="dropdown-item" href="#" onclick="cambiarEstadoRutina(${rutina.IDRutina}, 'en progreso')">En progreso</a></li>
                <li><a class="dropdown-item" href="#" onclick="cambiarEstadoRutina(${rutina.IDRutina}, 'completada')">Completada</a></li>
              </ul>
            </div>

            <button class="btn btn-danger btn-sm" onclick="eliminarRutina(${rutina.IDRutina})">Eliminar</button>

            <div class="d-flex justify-content-end mt-3">
              <a href="/Wime/private/PhP/Wime_interfaz_Modulo_ERutinas.php?id=${rutina.IDRutina}" class="btn btn-sm btn-outline-secondary">
                Editar
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}

// ------------------------
// FUNCIONES AUXILIARES
// ------------------------

function getColorPorPrioridad(prioridad) {
  if (!prioridad) return "secondary";

  switch (prioridad.toLowerCase()) {
    case "alta": return "danger";
    case "media": return "warning";
    case "baja": return "success";
    default: return "secondary";
  }
}

function mostrarError(tipo, mensaje) {
  const contenedor = document.getElementById(`contenedor-${tipo}`);
  if (contenedor) {
    contenedor.innerHTML = `<p class="text-center text-danger w-100">${mensaje}</p>`;
  }
}

function getColorPorEstado(estado) {
  switch (estado?.toLowerCase()) {
    case "pendiente": return "secondary";
    case "en progreso": return "warning";
    case "completada": return "success";
    default: return "dark";
  }
}




//Funcion para eliminar//

function eliminarTarea(id) {
  if (!confirm("¿Estás seguro de eliminar esta tarea?")) return;

  fetch(`/Wime/Controllers/ETController.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `id_tarea=${id}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Tarea eliminada");
        cargarTareas(); // Recargar la lista
      } else {
        alert("❌ Error al eliminar: " + data.message);
      }
    })
    .catch(err => console.error("❌ Error:", err));
}

function eliminarRutina(idRutina) {
  if (!confirm("¿Estás seguro de que deseas eliminar esta rutina?")) return;

  fetch("/Wime/Controllers/ERController.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `id=${idRutina}`
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("✅ Rutina eliminada");
      cargarRutinas();
    } else {
      alert("⚠️ No se pudo eliminar la rutina.");
    }
  })
  .catch(err => {
    console.error("❌ Error eliminando rutina:", err);
  });
}


//Actualizar estado//

function cambiarEstadoTarea(idTarea, nuevoEstado) {
  fetch("/Wime/Controllers/ActEstadoTController.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `id=${encodeURIComponent(idTarea)}&estado=${encodeURIComponent(nuevoEstado)}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        location.reload(); // ✅ Actualiza tras el éxito
      } else {
        alert(data.message || "❌ Error al cambiar el estado.");
      }
    })

}


function cambiarEstadoRutina(idRutina, nuevoEstado) {
  fetch("/Wime/Controllers/ActEstadoRController.php", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `id=${idRutina}&estado=${encodeURIComponent(nuevoEstado)}`
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      location.reload();
    } else {
      alert("⚠️ No se pudo cambiar el estado.");
    }
  })
  .catch(err => {
    console.error("❌ Error cambiando estado:", err);
  });
}


//Filtro TyR Tablero//

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contenedorTareas = document.getElementById("contenedor-tareas");
  const contenedorRutinas = document.getElementById("contenedor-rutinas");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Quitar clase activa de todos los tabs
      tabs.forEach(t => t.classList.remove("active"));

      // Activar el tab actual
      tab.classList.add("active");

      // Mostrar el contenedor correspondiente
      const tipo = tab.dataset.tipo;
      if (tipo === "tareas") {
        contenedorTareas.style.display = "flex";
        contenedorRutinas.style.display = "none";
      } else if (tipo === "rutinas") {
        contenedorTareas.style.display = "none";
        contenedorRutinas.style.display = "flex";
      }
    });
  });
});

function showContent(tipo) {
  const tareas = document.getElementById("contenedor-tareas");
  const rutinas = document.getElementById("contenedor-rutinas");

  if (!tareas || !rutinas) return;

  if (tipo === "tareas") {
    tareas.style.display = "flex";
    rutinas.style.display = "none";
  } else {
    tareas.style.display = "none";
    rutinas.style.display = "flex";
  }

  // Tabs visuales
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  const activeTab = document.querySelector(`.tab[data-tipo="${tipo}"]`);
  if (activeTab) activeTab.classList.add("active");
}

