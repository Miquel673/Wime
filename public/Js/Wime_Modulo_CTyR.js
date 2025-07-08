document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-tarea");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = new FormData(form);

    fetch("/Wime/Controllers/EDTController.php", {
      method: "POST",
      body: datos
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Tarea creada correctamente");
        form.reset();
      } else {
        alert("❌ Error: " + data.message);
      }
    })
    .catch(err => {
      alert("❌ Error de conexión");
      console.error(err);
    });
  });
});

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
      <h5 class="card-title titulo-tarea" style="background-color: blue;">${tarea.titulo}</h5>
      <p class="card-text"><strong>Prioridad:</strong> ${tarea.prioridad}</p>
      <p class="card-text"><strong>Fecha límite:</strong> ${tarea.fecha_limite}</p>
      <p class="card-text">${tarea.descripcion || "Sin descripción."}</p>
      <span class="badge bg-${getColorPorPrioridad(tarea.prioridad)}">${tarea.estado || "Pendiente"}</span>


      <!-- Botón para desplegar -->
      <button class="btn btn-sm btn-outline-primary w-100 mt-2" data-bs-toggle="collapse" data-bs-target="#opciones-${tarea.IDtarea}">
        ▼ Ver opciones
      </button>

      <!-- Contenido colapsable -->


      <div class="collapse mt-2" id="opciones-${tarea.IDtarea}">
        <label><strong>Estado:</strong></label>
        <div class="dropdown mb-2">
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
          <a href="/Wime/private/PhP/Wime_interfaz_Modulo_ETareas.php?id=${tarea.IDtarea}" class="btn btn-sm btn-outline-secondary">Editar</a>
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

  if (rutinas.length === 0) {
    contenedor.innerHTML = `<p class="text-center w-100">No hay rutinas disponibles.</p>`;
    return;
  }

  rutinas.forEach(rutina => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "col";

    tarjeta.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${rutina.titulo}</h5>
          <p class="card-text"><strong>Repeticiones:</strong> ${rutina.repeticiones}</p>
          <p class="card-text"><strong>Inicio:</strong> ${rutina.fecha_inicio}</p>
          <p class="card-text"><strong>Fin:</strong> ${rutina.fecha_fin}</p>
          <p class="card-text">${rutina.descripcion || "Sin descripción."}</p>
          <span class="badge bg-${getColorPorPrioridad(rutina.prioridad)}">${rutina.estado || "Activa"}</span>
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

  // Activar pestaña correspondiente
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  const activeTab = document.querySelector(`.tab[onclick="showContent('${tipo}')"]`);
  if (activeTab) activeTab.classList.add("active");
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

//Actualizar estado//

function cambiarEstadoTarea(id, nuevoEstado) {
  fetch("/Wime/Controllers/ActEstadoTController.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `id=${id}&estado=${encodeURIComponent(nuevoEstado)}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        location.reload(); // 🔄 Recarga la página tras éxito
      } else {
        alert("❌ Error al cambiar el estado.");
      }
    })
    .catch(err => {
      console.error("❌ Error al cambiar el estado:", err);
    });
}
