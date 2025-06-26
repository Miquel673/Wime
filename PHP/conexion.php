<?php 
    /* Se realiza la conexión a la base de datos
    $username = "root"; 
    $password = ""; 
    $database = "Wime"; 
    $conn = new mysqli("localhost", "usuario", "contraseña", "base_de_datos");*/
    
    set_exception_handler(function($e) {
        header("Location: /error500.php");
        exit;
        });


?>