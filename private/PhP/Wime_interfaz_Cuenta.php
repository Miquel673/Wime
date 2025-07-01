<?php
session_start();
if (!isset($_SESSION["usuario"])) {
  header("Location: /Wime/public/HTML/Wime_interfaz_Inicio-Sesion.html");
  exit;
}
?>



<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>WIME | Mi Perfil</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Bootstrap -->
<link rel="stylesheet" href="/Wime/public/bootstrap-5.3.7-dist/css/bootstrap.min.css">

  <!-- Ícono -->
  <link rel="icon" type="image/png" href="/IMG/Logo_Wime.png">

  <!-- Estilos propios -->
  <link rel="stylesheet" href="/Css/Wime_SideBar.css">
  <link rel="stylesheet" href="/Css/wime_interfaz_cuenta.css">

  <!-- Íconos Bootstrap -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
</head>

<body>
  <!-- Botón hamburguesa (solo móviles) -->
  <button class="toggle-sidebar d-md-none" onclick="toggleSidebar()">
    <i class="bi bi-list"></i>
  </button>

  <!-- Contenedor para la barra lateral -->
  <div id="sidebar-container"></div>

  <script>
  function toggleSidebar() {
    document.body.classList.toggle('sidebar-visible');
  }

  // Cargar la barra lateral dinámicamente
  fetch('/Wime/public/HTML/Wime_SideBar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('sidebar-container').innerHTML = html;

    // Esperar a que el DOM esté cargado y llamar el calendario
    if (typeof inicializarCalendario === "function") {
      inicializarCalendario();
    }
  });

</script>

  <!-- Contenido principal -->
  <main class="main-content">
    <div class="d-flex justify-content-between mb-3">
      <span></span>
      <div>📅 27/10/2024</div>
    </div>

    <div class="d-flex align-items-center gap-3 mb-4">
      <img src="/IMG/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpeg" alt="Avatar" class="rounded-circle bg-secondary" style="width: 60px; height: 60px;">
      <h1 class="fs-4 text-primary-emphasis">
        <?php echo "Bienvenido, " .htmlspecialchars($_SESSION["usuario"]); ?>
      </h1>

    </div>

    <div class="d-flex flex-wrap gap-3">
      <div class="bg-white border p-3 rounded shadow-sm" style="width: 250px;">
        <h5 class="mb-3">Tableros</h5>
        <button class="btn btn-outline-primary w-100 mb-2"><a href="/Wime/private/PhP/Wime_interfaz_Tablero.php">Mi tablero</a></button>
        <button class="btn btn-primary w-100 my-2" data-bs-toggle="modal" data-bs-target="#modalNuevo">
          ➕
        </button>
      </div>

      <div class="flex-grow-1 bg-white border p-3 rounded shadow-sm">
        <h5 class="mb-3">Productividad:</h5>
        <ul class="list-unstyled mb-3">
          <li>➤ Tareas Realizadas: <strong>2</strong></li>
          <li>➤ Rutinas Finalizadas: <strong>3</strong></li>
          <li>➤ En proceso: <strong>0</strong></li>
        </ul>
        <div>
          <button class="btn btn-success me-2">📈 Progreso</button>
          <button class="btn btn-secondary">📋</button>
        </div>
      </div>
    </div>
  </main>

  <!-- Modal para crear nueva tarea o rutina -->
<div class="modal fade" id="modalNuevo" tabindex="-1" aria-labelledby="modalNuevoLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalNuevoLabel">¿Qué deseas crear?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body d-flex flex-column gap-2">

        <!-- dentro del modal -->
        <a href="/Wime/public/HTML/Wime_interfaz_Modulo_CTareas.html" class="btn btn-primary">Crear Tarea</a>
        <a href="/Wime/public/HTML/Wime_interfaz_Modulo_CRutinas.html" class="btn btn-success">Crear Rutina</a>

      </div>
    </div>
  </div>
</div>


  <!-- Scripts -->
<!-- Calendario -->



<script src="/Wime/public/JS/Script.js"></script>

<!-- Bootstrap JS -->
<script src="/Wime/public/bootstrap-5.3.7-dist/js/bootstrap.bundle.min.js"></script>
</body>

</body>
</html>
