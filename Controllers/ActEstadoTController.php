<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["id_usuario"])) {
  echo json_encode(["success" => false, "message" => "Sesión no iniciada"]);
  exit;
}

$conn = new mysqli("localhost", "root", "", "Wime");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Error de conexión"]);
  exit;
}

$id = $_POST["id"] ?? null;
$estado = $_POST["estado"] ?? '';

if (!$id || empty($estado)) {
  echo json_encode(["success" => false, "message" => "Datos inválidos"]);
  exit;
}

$sql = "UPDATE tareas SET estado = ? WHERE IDtarea = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $estado, $id);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "message" => "Error al actualizar"]);
}

$stmt->close();
$conn->close();
