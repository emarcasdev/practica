<?php
include 'conexion.php';  // Conexión a la base de datos

$id = $_GET['id'];

$sql = "SELECT * FROM clientes WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode([]);
}

$conn->close();
?>