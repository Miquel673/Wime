<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["id_usuario"])) {
  echo json_encode(["success" => false, "message" => "❌ Sesión no iniciada"]);
  exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  echo json_encode(["success" => false, "message" => "❌ Método no permitido"]);
  exit;
}

$id_usuario = $_SESSION["id_usuario"];
$idRutina = $_POST["id"] ?? null;
$nuevoEstado = $_POST["estado"] ?? '';

if (!$idRutina || !$nuevoEstado) {
  echo json_encode(["success" => false, "message" => "⚠️ Faltan datos"]);
  exit;
}

$conn = new mysqli("localhost", "root", "", "Wime");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "❌ Error de conexión"]);
  exit;
}

$sql = "UPDATE rutinas SET Estado = ? WHERE IDRutina = ? AND IDusuarios = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $nuevoEstado, $idRutina, $id_usuario);

if ($stmt->execute()) {
  echo json_encode(["success" => true, "message" => "✅ Estado actualizado"]);
} else {
  echo json_encode(["success" => false, "message" => "❌ Error al actualizar"]);
}

$stmt->close();
$conn->close();
