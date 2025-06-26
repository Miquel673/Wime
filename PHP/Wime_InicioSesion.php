<?php
session_start();
include "conexion.php"; // Archivo donde configuras la conexión a la BD

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Conectar a la base de datos
    $conn = new mysqli($host, $usuario, $clave, $bd);

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Consulta para obtener los datos del usuario
    $sql = "SELECT IDusuario, NombreUsuario, ContrasenaUsuario FROM usuario WHERE EmailUsuario = ? OR NombreUsuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 1) {
        $fila = $resultado->fetch_assoc();
        $hash = $fila["ContrasenaUsuario"];

        // Verificar la contraseña (debe estar encriptada con password_hash)
        if (password_verify($password, $hash)) {
            $_SESSION["usuario"] = $fila["NombreUsuario"];
            header("Location: dashboard.php"); // Redirigir si el login es exitoso
            exit();
        } else {
            echo "❌ Contraseña incorrecta.";
        }
    } else {
        echo "❌ No se encontró el usuario.";
    }

    $stmt->close();
    $conn->close();
}
?>
