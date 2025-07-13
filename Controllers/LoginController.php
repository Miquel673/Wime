<?php
session_start();
header("Content-Type: application/json");

// --- Conexión a base de datos ---
$host = "localhost";
$usuario = "root";
$clave = "";
$bd = "Wime";

$conn = new mysqli($host, $usuario, $clave, $bd);


// Mostrar errores durante desarrollo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Solo iniciar sesión si no está activa
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Encabezado de tipo JSON
header("Content-Type: application/json");

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => '❌ Error de conexión a la base de datos.']);
    exit;
}

// --- Captura de datos POST ---
$email = trim($_POST["email"] ?? '');
$contrasena = $_POST["contrasena"] ?? '';

// --- Validación ---
if (empty($email) || empty($contrasena)) {
    echo json_encode(['success' => false, 'message' => '❌ Todos los campos son obligatorios.']);
    exit;
}

// --- Consulta del usuario ---
$sql = "SELECT IDusuario, NombreUsuario, ContrasenaUsuario, Tipo FROM usuario WHERE EmailUsuario = ?";
$stmt = $conn->prepare($sql);



if (!$stmt) {
    echo json_encode(['success' => false, 'message' => '❌ Error preparando la consulta.']);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 1) {
    $usuario = $resultado->fetch_assoc();

    if (password_verify($contrasena, $usuario["ContrasenaUsuario"])) {
    $_SESSION["usuario"] = $usuario["NombreUsuario"];
    $_SESSION["id_usuario"] = $usuario["IDusuario"];
    $_SESSION["tipo"] = $usuario["Tipo"]; // ✅ Este es el que faltaba

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => '❌ Contraseña incorrecta.']);
}

}

$stmt->close();
$conn->close();
?>
