<?php
require 'vendor/autoload.php';
//require_once ('vendor/autoload.php'); 
require_once __DIR__ . '/vendor/autoload.php';

class FileUploader {

    public static function uploadFile($file) {

        // echo json_encode($file);
        // exit;


        if ($file['error'] === UPLOAD_ERR_OK) {
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/sweethome/view/uploads/avatar/'; 
            $uploadFile = $uploadDir . basename($file['name']);
            
            if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
                return json_encode([
                    "status" => "success",
                    "avatarUrl" => '/sweethome/view/uploads/avatar/' . basename($file['name']),
                    "message" => "El archivo es válido y se cargó correctamente."
                ]);
            } else {
                return json_encode([
                    "status" => "error",
                    "message" => "Error al cargar el archivo."
                ]);
            }
        } else {
            return "Error de carga: " . $file['error'];
        }
    }
}







// if (!empty($_FILES)) {

   
    
//     $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/sweethome/view/uploads/avatar/";
   


//     $targetFile = $targetDir . basename($_FILES["file"]["name"]);


    
//     if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
//         echo json_encode(["status" => "success", "file" => $targetFile]);
//     } else {
//         echo json_encode(["status" => "error", "message" => "Error al subir el archivo."]);
//     }
// } else {
//     echo json_encode(["status" => "error", "message" => "No se ha subido ningún archivo."]);
// }
?>
