<?php
//require 'vendor/autoload.php';


if (!empty($_FILES)) {

    // echo json_encode($_FILES);
    // exit;


    //$targetDir = "view/uploads/avatar";

    //$targetDir = $_SERVER['DOCUMENT_ROOT'] . "/view/uploads/avatar/";
    //$targetDir = "xampp\htdocs\sweethome\view\uploads\avatar";
    //$targetDir = "\xampp\htdocs\sweethome\view\uploads\avatar";
    //$targetDir = "http://localhost/sweethome/view/uploads/avatar/";
    
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/sweethome/view/uploads/avatar/";
    //$targetDir = "SITE_PATH . /sweethome/view/uploads/avatar/";
    
    //$targetDir = SITE_ROOT . "view/uploads/avatar/";
    //$targetDir = SITE_PATH . "view/uploads/avatar/";


    // C:\xampp\htdocs\sweethome\view\uploads\avatar

    // if (!file_exists($targetDir)) {
    //     if (!mkdir($targetDir, 0777, true)) {
    //         echo json_encode(["status" => "error", "message" => "Error al crear el directorio."]);
    //         exit;
    //     }
    // }
    // if (!file_exists($targetDir)) {
    //     mkdir($targetDir, 0777, true);
    // }



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
