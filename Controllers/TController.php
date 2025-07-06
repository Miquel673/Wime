<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["id_usuario"])) {
  echo json_encode(["success" => false, "message" => "❌ Sesión no iniciada"]);
  exit;
}

$conn = new mysqli("localhost", "root", "", "Wime");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "❌ Error de conexión"]);
  exit;
}

$id_usuario = $_SESSION["id_usuario"];
$titulo = trim($_POST["titulo"] ?? '');
$prioridad = $_POST["prioridad"] ?? '';
$fecha_limite = $_POST["fecha_limite"] ?? null;
$descripcion = trim($_POST["descripcion"] ?? '');
$estado = "pendiente";

if (empty($titulo) || empty($prioridad) || empty($fecha_limite)) {
  echo json_encode(["success" => false, "message" => "⚠️ Faltan campos obligatorios"]);
  exit;
}

$sql = "INSERT INTO tareas (id_usuario, titulo, prioridad, fecha_limite, descripcion, estado)
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isssss", $id_usuario, $titulo, $prioridad, $fecha_limite, $descripcion, $estado);

echo $stmt->execute()
  ? json_encode(["success" => true, "message" => "✅ Tarea creada"])
  : json_encode(["success" => false, "message" => "❌ Error al guardar"]);


$stmt->close();
$conn->close();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  echo json_encode(["debug_post" => $_POST]);
  exit;
}
