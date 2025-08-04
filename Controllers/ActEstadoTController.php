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

$mensaje = "Se ha cambiado el estado de una tarea.";
$sqlNotif = "INSERT INTO notificaciones (id_usuario, tipo, mensaje) VALUES (?, 'tarea', ?)";
$stmtNotif = $conn->prepare($sqlNotif);
$stmtNotif->bind_param("is", $id_usuario, $mensaje);
$stmtNotif->execute();


$stmt->close();
$conn->close();
