<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Editar Tarea</title>
  <link rel="stylesheet" href="/Wime/public/bootstrap-5.3.7-dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/Wime/public/Css/Wime_interfaz_Modulo_C-Tareas-Rutinas.Css" />
</head>
<body>
  <div class="container py-5">
    <h2 class="mb-4">Editar Tarea</h2>
    <form id="form-editar-tarea" class="bg-white p-4 rounded shadow-sm">
      <input type="hidden" id="id_tarea" name="id_tarea" />

      <div class="mb-3">
        <label class="form-label">Título</label>
        <input type="text" class="form-control" id="titulo" name="titulo" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Prioridad</label><br />
        <label><input type="radio" name="prioridad" value="alta" required /> Alta</label>
        <label class="ms-3"><input type="radio" name="prioridad" value="media" /> Media</label>
        <label class="ms-3"><input type="radio" name="prioridad" value="baja" /> Baja</label>
      </div>

      <div class="mb-3">
        <label class="form-label">Fecha Límite</label>
        <input type="date" class="form-control" id="fecha_limite" name="fecha_limite" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" id="descripcion" name="descripcion" rows="4"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Guardar cambios</button>
      <a href="/Wime/private/PhP/Wime_interfaz_Tablero.php" class="btn btn-secondary">Cancelar</a>
    </form>
  </div>

  <script src="/Wime/public/Js/Wime_Modulo_CTyR.js"></script>
</body>
</html>
