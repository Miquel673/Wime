import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



//----------------------Barra Lateral---------------------//

// Cargar HTML de la barra lateral
fetch('/Wime/public/HTML/sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar-container').innerHTML = html;

    // Agregar clase al body para mostrar la barra lateral si ya estaba abierta
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && document.body.classList.contains('sidebar-visible')) {
      sidebar.classList.add('sidebar-visible');
    }
  });

// Función para mostrar u ocultar la barra lateral
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('sidebar-visible');
  document.body.classList.toggle('sidebar-visible');
}


//-----------------Calendario-----------------//




//--------------Calcular edad _ Registro de Usuario---------------------------//

function calcularEdad() {
    let birthDate = document.getElementById("Birth_Day").value;
    let edadInput = document.getElementById("Edad");

    if (birthDate) {
        let today = new Date();
        let birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        let monthDiff = today.getMonth() - birth.getMonth();

        // Ajustar la edad si aún no ha cumplido años este año
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        edadInput.value = age;
    } else {
        edadInput.value = "";
    }
}



// Evitar múltiples asignaciones si lo cargas en varias páginas
if (!window.sidebarYaCargado) {
  window.sidebarYaCargado = true;

  function mostrarNotificacion() {
    if (!("Notification" in window)) {
      alert("Tu navegador no soporta notificaciones.");
    } else if (Notification.permission === "granted") {
      new Notification("WIME", {
        body: "Tienes una nueva notificación pendiente.",
        icon: "/IMG/Logo_Wime.png"
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification("WIME", {
            body: "Tienes una nueva notificación pendiente.",
            icon: "/IMG/Logo_Wime.png"
          });
        }
      });
    }
  }

  function conectarBandeja() {
    const boton = document.getElementById("bandejaEntrada");
    if (boton) {
      boton.addEventListener("click", function (e) {
        e.preventDefault();
        mostrarNotificacion();
      });
    } else {
      // Volver a intentar en un rato si el botón no ha sido insertado aún
      setTimeout(conectarBandeja, 200);
    }
  }

  // Ejecutar después de que cargue el HTML principal
  document.addEventListener("DOMContentLoaded", conectarBandeja);
}


//---------Tema Claro/Oscuro------------//

document.addEventListener('DOMContentLoaded', () => {
  const lightThemeBtn = document.querySelector('.theme.light');
  const darkThemeBtn = document.querySelector('.theme.dark');
  const body = document.body;
  const settings = document.querySelector('.settings');
  const sidebar = document.querySelector('.sidebar');
  
  lightThemeBtn.addEventListener('click', () => {
  body.style.backgroundColor = '#f4f4f4';
  settings.style.backgroundColor = 'white';
  sidebar.style.backgroundColor = '#e0e0e0';
  body.style.color = 'black';
  });

  darkThemeBtn.addEventListener('click', () => {
  body.style.backgroundColor = '#1e1e1e';
  settings.style.backgroundColor = '#2e2e2e';
  sidebar.style.backgroundColor = '#333333';
  body.style.color = 'white';
    });
});


//----Interfaz principal----//

let tipoActual = 'tareas';

    const tareas = [
      { nombre: "Sena - Tarea de emprendimiento", fecha: "2024-10-12", prioridad: "alta", estado: "no completada", descripcion: "" },
      { nombre: "Sena - Tarea de TICs", fecha: "2024-10-24", prioridad: "media", estado: "no completada", descripcion: "" },
    
    ];

    const rutinas = [
      { nombre: "Rutina de estudio", desde: "2025-12-12", hasta: "2025-12-20", prioridad: "alta", estado: "no completada", descripcion: "" },
      { nombre: "Rutina de ejercicio", desde: "2025-01-01", hasta: "2025-01-15", prioridad: "media", estado: "completada", descripcion: "" }
    ];

    function showContent(tipo) {
      tipoActual = tipo;
      const contenido = document.getElementById("contenido");
      const tabs = document.querySelectorAll(".tab");
      tabs.forEach(tab => tab.classList.remove("active"));

      if (tipo === 'tareas') {
        tabs[0].classList.add("active");
      } else {
        tabs[1].classList.add("active");zz
      }
      renderizarContenido();
    }

    function filtrarPorPrioridad() {
      renderizarContenido();
    }

    function crearElemento() {
      if (tipoActual === 'tareas') {
        tareas.push({ nombre: "Nueva tarea", fecha: "", prioridad: "media", estado: "no completada", descripcion: "" });
      } else {
        rutinas.push({ nombre: "Nueva rutina", desde: "", hasta: "", prioridad: "media", estado: "no completada", descripcion: "" });
      }
      renderizarContenido();
    }

    function renderizarContenido() {
      const filtro = document.getElementById("filter").value;
      const contenido = document.getElementById("contenido");

      if (tipoActual === 'tareas') {
        let filtradas = filtro ? tareas.filter(t => t.prioridad === filtro) : tareas;
        contenido.innerHTML = filtradas.map((t, i) => `
          <div class="task-item">
            <div class="task-header">
              <input type="text" value="${t.nombre}" onchange="tareas[${i}].nombre = this.value">
              <span>📅</span>
            </div>
            <div class="task-details">
              <span>Termina en:</span>
              <input type="date" value="${t.fecha}" onchange="tareas[${i}].fecha = this.value">
            </div>
            <div class="task-fields">
              <label>Prioridad:</label>
              <select onchange="tareas[${i}].prioridad = this.value">
                <option value="alta" ${t.prioridad === 'alta' ? 'selected' : ''}>Alta</option>
                <option value="media" ${t.prioridad === 'media' ? 'selected' : ''}>Media</option>
                <option value="baja" ${t.prioridad === 'baja' ? 'selected' : ''}>Baja</option>
              </select>
              <label>Estado:</label>
              <select onchange="tareas[${i}].estado = this.value">
                <option value="completada" ${t.estado === 'completada' ? 'selected' : ''}>Completada</option>
                <option value="no completada" ${t.estado === 'no completada' ? 'selected' : ''}>No completada</option>
              </select>
              <label>Descripción:</label>
              <textarea onchange="tareas[${i}].descripcion = this.value">${t.descripcion}</textarea>
            </div>
          </div>
        `).join("");
      } else {
        let filtradas = filtro ? rutinas.filter(r => r.prioridad === filtro) : rutinas;
        contenido.innerHTML = filtradas.map((r, i) => `
          <div class="task-item">
            <div class="task-header">
              <input type="text" value="${r.nombre}" onchange="rutinas[${i}].nombre = this.value">
              <span>📅</span>
            </div>
            <div class="task-details">
              <span>Desde:</span>
              <input type="date" value="${r.desde}" onchange="rutinas[${i}].desde = this.value">
              <span>Hasta:</span>
              <input type="date" value="${r.hasta}" onchange="rutinas[${i}].hasta = this.value">
            </div>
            <div class="task-fields">
              <label>Prioridad:</label>
              <select onchange="rutinas[${i}].prioridad = this.value">
                <option value="alta" ${r.prioridad === 'alta' ? 'selected' : ''}>Alta</option>
                <option value="media" ${r.prioridad === 'media' ? 'selected' : ''}>Media</option>
                <option value="baja" ${r.prioridad === 'baja' ? 'selected' : ''}>Baja</option>
              </select>
              <label>Estado:</label>
              <select onchange="rutinas[${i}].estado = this.value">
                <option value="completada" ${r.estado === 'completada' ? 'selected' : ''}>Completada</option>
                <option value="no completada" ${r.estado === 'no completada' ? 'selected' : ''}>No completada</option>
              </select>
              <label>Descripción:</label>
              <textarea onchange="rutinas[${i}].descripcion = this.value">${r.descripcion}</textarea>
            </div>
          </div>
        `).join("");
      }
    }

    showContent('tareas');
z