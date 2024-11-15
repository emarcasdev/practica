<?php
include 'conexion.php';  // Conexión a la base de datos

header('Content-Type: application/json');

$name = $_POST['name'];
$dni = $_POST['dni'];
$profesion = $_POST['profesion'];
$dir = $_POST['dir'];
$tlfn = $_POST['tlfn'];
$img = "../images/user.png";

// Insertar el cliente en la base de datos
$sql = "INSERT INTO clientes (name, dni, profesion, dir, tlfn, img) VALUES ('$name', '$dni', '$profesion', '$dir', '$tlfn', '$img')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Cliente agregado correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al agregar cliente']);
}

$conn->close();
?>

