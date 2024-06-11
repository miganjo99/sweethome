<?php
require_once('vendor/autoload.php');
require_once('phprqcode/qrlib.php');

class QRCodeGenerator {

    public static function create_qr($data) {



        // //$id_pedido = $data[0]['id_pedido'];
        // $id_pedido = $data;

        // // echo json_encode($id_pedido);   
        // // exit;


        // $filePath = $_SERVER['DOCUMENT_ROOT'] . '/sweethome/view/uploads/qr/qrcode_' . $id_pedido . '.png';

        // \QRcode::png($id_pedido, $filePath);

        // return ['filePath' => 'sweethome/view/uploads/qr/qrcode_' . $id_pedido . '.png'];
    


        $url = 'http://localhost/sweethome/view/uploads/qr/qrcode_' . $data . '.png';
        //$url = 'http://localhost/sweethome/view/uploads/pdf/factura_' . $data . '.pdf';

        //$filePath = $_SERVER['DOCUMENT_ROOT'] . '/sweethome/view/uploads/qr/qrcode_' . $data . '.png';
        $filePath = $_SERVER['DOCUMENT_ROOT'] . '/sweethome/view/uploads/pdf/factura_' . $data . '.pdf';
        \QRcode::png($url, $filePath);

        return ['filePath' => $url];
    }
}
?>
