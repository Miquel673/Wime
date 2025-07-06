<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["id_usuario"])) {
  echo json_encode(["success" => false, "message" => "Sesión no iniciada"]);
  exit;
}

$conn = new mysqli("localhost", "root", "", "Wime");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "❌ Error de conexión"]);
  exit;
}

$id_tarea = $_POST["id_tarea"] ?? '';
$titulo = trim($_POST["titulo"] ?? '');
$prioridad = $_POST["prioridad"] ?? '';
$fecha_limite = $_POST["fecha_limite"] ?? '';
$descripcion = trim($_POST["descripcion"] ?? '');

if (!$id_tarea || !$titulo || !$prioridad || !$fecha_limite) {
  echo json_encode(["success" => false, "message" => "⚠️ Faltan campos obligatorios"]);
  exit;
}

$sql = "UPDATE tareas SET titulo = ?, prioridad = ?, fecha_limite = ?, descripcion = ? WHERE IDtarea = ? AND id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssii", $titulo, $prioridad, $fecha_limite, $descripcion, $id_tarea, $_SESSION["id_usuario"]);

echo $stmt->execute()
  ? json_encode(["success" => true])
  : json_encode(["success" => false, "message" => "❌ No se pudo actualizar"]);

$stmt->close();
$conn->close();
