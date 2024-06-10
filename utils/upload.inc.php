<?php
//require 'vendor/autoload.php';


if (!empty($_FILES)) {

   
    
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/sweethome/view/uploads/avatar/";
   


    $targetFile = $targetDir . basename($_FILES["file"]["name"]);


    
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
        echo json_encode(["status" => "success", "file" => $targetFile]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al subir el archivo."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No se ha subido ningún archivo."]);
}
?>
