<?php
include 'conexion.php';  // Conexión a la base de datos

$id = $_POST['id'];

$sql = "DELETE FROM clientes WHERE id = $id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar cliente']);
}

$conn->close();
?>
