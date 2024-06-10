<?php
require_once('vendor/autoload.php');
require_once __DIR__ . '/vendor/autoload.php';


if (isset($_POST['pdf'])) {
    $data = json_decode($_POST['pdf'], true); 

    

    // Crea una nueva instancia de TCPDF
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // Establece la información del documento
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Autor');
    $pdf->SetTitle('Factura');
    $pdf->SetSubject('Factura del Pedido');
    $pdf->SetKeywords('TCPDF, PDF, factura, pedido');

    // Establece el encabezado y el pie de página
    $pdf->setHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, 'Factura', "Pedido ID: {$data[0]['id_pedido']}");
    $pdf->setFooterData(array(0,64,0), array(0,64,128));

    // Establece el tamaño de la fuente
    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    $pdf->SetFontSize(10);

    // Establece los márgenes
    $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // Establece el espacio entre líneas
    $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

    // Establece el modo de subconjunto de la fuente
    $pdf->setFontSubsetting(true);

    // Agrega una página
    $pdf->AddPage();

    // Contenido del PDF
    foreach ($data as $row) {
        $pdf->Write(5, "ID Pedido: {$row['id_pedido']}\n");
        $pdf->Write(5, "Cantidad: {$row['cantidad']}\n");
        $pdf->Write(5, "Descripción: {$row['descripcion']}\n");
        $pdf->Write(5, "Fecha de Publicación: {$row['fecha_publicacion']}\n");
        $pdf->Write(5, "Precio Unitario: {$row['precio']}\n");
        $pdf->Write(5, "Precio Total: " . $row['cantidad'] * $row['precio'] . "\n");
        $pdf->Ln(); 
    }

    // Define la ruta donde se guardará el PDF
    $filePath = $_SERVER['DOCUMENT_ROOT'] . 'sweethome/view/uploads/pdf/factura_' . $data[0]['id_pedido'] . '.pdf';

    // Guarda el PDF en el archivo especificado
    $pdf->Output($filePath, 'F');

    // Envía la ruta del archivo de vuelta al cliente
    echo json_encode(['filePath' => $filePath]);
} else {
    die("No se ha proporcionado ningún dato para generar el PDF.");
}




?>
