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

$sql = "SELECT * FROM rutinas WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$resultado = $stmt->get_result();

$rutinas = [];
while ($fila = $resultado->fetch_assoc()) {
  $rutinas[] = $fila;
}

echo json_encode($rutinas);

$stmt->close();
$conn->close();
