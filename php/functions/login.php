<?php
$username_log = $_POST["username"];
$pass_log = $_POST["password"];

// Credenciales
$username_ok = 'admin';
$pass_ok = 'Abc123.';

// Verificar credenciales
if ($username_log === $username_ok && $pass_log === $pass_ok) {
    // Redirigir al usuario si las credenciales son correctas
    header("Location: ../../assets/pages/app.html");
    exit(); 
} else {
    // Mostrar Error
    echo "<p style='color: red;'>Credenciales incorrectas</p>";
}
?>
