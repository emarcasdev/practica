<?php
include 'conexion.php';  // Conexión a la base de datos

$id = $_POST['id'];
$name = $_POST['name'];
$dni = $_POST['dni'];
$profesion = $_POST['profesion'];
$dir = $_POST['dir'];
$tlfn = $_POST['tlfn'];

$sql = "UPDATE clientes SET name = '$name', dni = '$dni', profesion = '$profesion', dir = '$dir', tlfn = '$tlfn' WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar cliente']);
}

$conn->close();
?>
