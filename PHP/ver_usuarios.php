<?php
include "Wime_Registro_Usuario.php"; // Asegúrate de que tiene la conexión

$sql = "SELECT * FROM registro";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo "ID: " . $fila["ID"] . " - Nombre: " . $fila["NombreUsuario"] . " - Email: " . $fila["EmailUsuario"] . "<br>";
    }
} else {
    echo "No hay usuarios registrados.";
}

$conn->close();
?>
