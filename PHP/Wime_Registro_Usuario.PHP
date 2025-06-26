<?php
// 🔍 Mostrar errores (quitar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 📦 Datos de conexión
$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDatos = "wime";

$conn = new mysqli("localhost", "root", "", "wime");

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


// 🔌 Conexión a la base de datos
$conexion = mysqli_connect($servidor, $usuario, $clave, $baseDatos);
if (!$conexion) {
    die("❌ Error de conexión: " . mysqli_connect_error());
}

// ✅ Verificar si se envió el formulario por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 📥 Recolección de datos del formulario
    $EmailUsuario = isset($_POST["EmailUsuario"]) ? trim($_POST["EmailUsuario"]) : "";
    $NombreUsuario    = trim($_POST["NombreUsuario"]    ?? '');
    $Contrasena       = trim($_POST["ContrasenaUsuario"]?? '');
    $Confirmar        = trim($_POST["confirm_password"] ?? '');
    $Edad             = trim($_POST["Birth_Day"]        ?? '');
    $fechaRegistro    = date('Y-m-d H:i:s');


    // ⚠️ Validaciones
    if (empty($EmailUsuario) || empty($NombreUsuario) || empty($Contrasena) || empty($Confirmar) || empty($Edad)) {
        die("❌ Error: Todos los campos son obligatorios.");
    }

    if ($Contrasena !== $Confirmar) {
        die("❌ Error: Las contraseñas no coinciden.");
    }

    // 🔐 Encriptar contraseña
    $ContrasenaEncriptada = password_hash($Contrasena, PASSWORD_DEFAULT);



    $email = trim($_POST["EmailUsuario"]);
    $query = "SELECT * FROM usuario WHERE EmailUsuario = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $EmailUsuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Ya existe el correo
        echo "<div class='alert alert-warning'>Este correo ya está registrado, ¿desea <a href='login.php'>iniciar sesión</a>?</div>";
        exit(); // Detiene el script para que no siga intentando registrar
    }




    // 🧾 Preparar consulta segura
    $stmt = $conexion->prepare("INSERT INTO usuario (EmailUsuario, NombreUsuario, ContraseñaUsiario, Edad, FechaRegistro) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $EmailUsuario, $NombreUsuario, $ContrasenaEncriptada, $Edad, $fechaRegistro);
    

    // ✅ Ejecutar consulta
    if ($stmt->execute()) {
        echo "✅ Registro exitoso.";
    } else {
        echo "❌ Error en el registro: " . $stmt->error;
    }

    // 🧹 Cierre
    $stmt->close();
    $conexion->close();

} else {
    die("❌ Error: Acceso no permitido.");
}




?>
