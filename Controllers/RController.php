<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["id_usuario"])) {
  echo json_encode(["success" => false, "message" => "❌ Sesión no iniciada"]);
  exit;
}

$id_usuario = $_SESSION["id_usuario"];
$conn = new mysqli("localhost", "root", "", "Wime");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "❌ Error de conexión"]);
  exit;
}

$titulo = trim($_POST["titulo"] ?? '');
$prioridad = $_POST["prioridad"] ?? '';
$fecha_limite = $_POST["fecha_limite"] ?? '';
$descripcion = trim($_POST["descripcion"] ?? '');
$compartir_con = $_POST["compartir_con"] ?? '';
$estado = "pendiente";

if (empty($titulo) || empty($prioridad) || empty($fecha_limite)) {
  echo json_encode(["success" => false, "message" => "⚠️ Faltan campos"]);
  exit;
}

$sql = "INSERT INTO rutinas (id_usuario, titulo, prioridad, fecha_limite, compartir_con, descripcion, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issssss", $id_usuario, $titulo, $prioridad, $fecha_limite, $compartir_con, $descripcion, $estado);

if ($stmt->execute()) {
  echo json_encode(["success" => true, "message" => "✅ Rutina creada"]);
} else {
  echo json_encode(["success" => false, "message" => "❌ Error al guardar la rutina"]);
}

$stmt->close();
$conn->close();
