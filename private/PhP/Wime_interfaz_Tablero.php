<?php
session_start();
if (!isset($_SESSION["id_usuario"])) {
  header("Location: /Wime/public/HTML/Wime_interfaz_Inicio-Sesion.html");
  exit;
}
?>




<!DOCTYPE html>

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link type="text/Css" rel="stylesheet" href="/Wime/public/Css/Wime_interfaz_Tablero.css">
    <link type="text/Css" rel="stylesheet" href="/Wime/public/Css/Wime_SideBar.Css">
    <link rel="icon" type="image/png" href="/Wime/public/IMG/Logo_Wime.png">
    <link rel="stylesheet" href="/Wime/public/bootstrap-5.3.7-dist/css/bootstrap.min.css">

    <title>Wime</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">


</head>

<header>
    <!-- Botón hamburguesa (solo móviles) -->
  <button class="toggle-sidebar d-md-none" onclick="toggleSidebar()">
    <i class="bi bi-list"></i>
  </button>

  <div id="sidebar-container"></div>


  <script>
  fetch('/Wime/public/HTML/Wime_SideBar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById("sidebar-container").innerHTML = html;
    if (typeof window.inicializarCalendario === "function") {
      window.inicializarCalendario();
    }
  });

  </script>


  <!-- Modal para crear nueva tarea o rutina -->
<div class="modal fade" id="modalNuevo" tabindex="-1" aria-labelledby="modalNuevoLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalNuevoLabel">¿Qué deseas crear?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body d-flex flex-column gap-2">
        <a href="/Wime/public/HTML/Wime_interfaz_Modulo_CTareas.html" class="btn btn-primary">Crear Tarea</a>
        <a href="/Wime/public/HTML/Wime_interfaz_Modulo_CRutinas.html" class="btn btn-success">Crear Rutina</a>
      </div>
    </div>
  </div>
</div>

  </header>
<body>
  <div class="main">
    <h1 class="titulo">Tablero</h1>
    <div class="tabs">
  <div class="tab active" data-tipo="tareas">Tareas</div>
<div class="tab" data-tipo="rutinas">Rutinas</div>

</div>
    <div class="top-bar">
      <input type="text" placeholder="🔍 search" class="search">
      <div class="filter">
        <label for="filter">Filtrar por:</label>
        <select id="filter" onchange="filtrarPorPrioridad()">
          <option value="">Todos</option>
          <option value="alta">Alta prioridad</option>
          <option value="media">Media prioridad</option>
          <option value="baja">Baja prioridad</option>
        </select>
      </div>
        <button><a href="#" id="nuevoBtn" data-bs-toggle="modal" data-bs-target="#modalNuevo">Nuevo</a></button>
    </div>

    

    <div id="contenido">
  <div id="contenedor-tareas" class="row row-cols-1 row-cols-md-2 g-4 mt-3"></div>
  <div id="contenedor-rutinas" class="row row-cols-1 row-cols-md-2 g-4 mt-3" style="display: none;"></div>
</div>



  </div>

  <script src="/Wime/public/bootstrap-5.3.7-dist/js/bootstrap.bundle.min.js"></script>
  <script src="/Wime/public/Js/Wime_Modulo_CTyR.js"></script>
  <script src="/Wime/public/Js/Wime_Editar.js"></script>

</body>


</html>
