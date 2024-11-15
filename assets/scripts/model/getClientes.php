<?php
include 'conexion.php';  
header('Content-Type: application/json');

// Realizar la consulta
$sql = "SELECT * FROM clientes";
$result = mysqli_query($conn, $sql);

// Verificar si hay resultados
if (mysqli_num_rows($result) > 0) {
    $clientes = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $clientes[] = $row;  // Almacenar los resultados
    }
    echo json_encode($clientes);  // Enviar los resultados como JSON
} else {
    echo json_encode(array('success' => false, 'message' => 'No se encontraron clientes.'));
}

// Cerrar la conexión
mysqli_close($conn);
?>


