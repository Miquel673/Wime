<?php
session_start();

// ✅ Validar sesión
if (!isset($_SESSION["id_usuario"]) || !isset($_SESSION["tipo"])) {
    header("Location: /Wime/Interfaces/Admin/HTML/Wime_interfaz_Inicio-Sesion.html");
    exit;
}
// ✅ Validar si es administrador
if ($_SESSION["tipo"] !== "Administrador") {
    echo "<h2 style='color: red; text-align: center;'>❌ Acceso denegado. Solo administradores.</h2>";
    exit;
}

$conn = new mysqli("localhost", "root", "", "Wime");
if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}

$usuarios = $conn->query("SELECT IDusuario, NombreUsuario, EmailUsuario, Edad, FechaRegistro, Tipo, Estado FROM usuario");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Usuarios Registrados</title>
    <link rel="stylesheet" href="/Wime/public/bootstrap-5.3.7-dist/css/bootstrap.min.css">
</head>
<body class="container py-5">

    <h4 class="text-center">Bienvenido, <?php echo htmlspecialchars($_SESSION["usuario"]); ?> 👋</h4>

    <h2 class="mb-4">👥 Usuarios Registrados</h2>

    <?php if ($usuarios->num_rows > 0): ?>
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Fecha de Registro</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($usuario = $usuarios->fetch_assoc()): ?>
            <tr>
                <td><?= $usuario["IDusuario"] ?></td>
                <td><?= $usuario["NombreUsuario"] ?></td>
                <td><?= $usuario["EmailUsuario"] ?></td>
                <td><?= $usuario["Edad"] ?></td>
                <td><?= $usuario["FechaRegistro"] ?></td>
                <td><?= $usuario["Tipo"] ?></td>
                <td><?= $usuario["Estado"] ?></td>

                <td>
                    <form action="/Wime/Controllers/AdminAcces/EUsuariosController.php" method="POST" onsubmit="return confirm('¿Seguro que deseas eliminar este usuario?');">
                        <input type="hidden" name="id_usuario" value="<?= $usuario["IDusuario"] ?>">
                        <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                    </form>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
    <?php else: ?>
        <p class="alert alert-info">No hay usuarios registrados.</p>
    <?php endif; ?>

</body>
</html>
