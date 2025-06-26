<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: /WIME/HTML/Wime_Interfaz_InicioSesion.html"); // Si no hay sesión, redirige al login
    exit();
}

session_start();
session_destroy();
header("Location: /WIME/HTML/Wime_interfaz_C-Tareas-Rutinas.html"); // Redirige al inicio
exit();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h1>Bienvenido, <?php echo $_SESSION['usuario']; ?> 👋</h1>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>

