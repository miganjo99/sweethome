<?php
require_once('vendor/autoload.php');

class tcpdf_inc {

    public static function create_pdf($pdf) {

        // Verifica si se ha proporcionado algún dato
        if ($pdf) {

                $data = json_decode($pdf, true);

                if (!is_array($data) || empty($data)) {
                    return ['error' => 'No se ha proporcionado ningún dato válido para generar el PDF.'];
                }

                $tcpdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

                $tcpdf->SetCreator(PDF_CREATOR);
                $tcpdf->SetAuthor('Autor');
                $tcpdf->SetTitle('Factura');
                $tcpdf->SetSubject('Factura del Pedido');
                $tcpdf->SetKeywords('TCPDF, PDF, factura, pedido');

                $tcpdf->setHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, 'Factura', "Pedido ID: {$data[0]['id_pedido']}");
                $tcpdf->setFooterData(array(0,64,0), array(0,64,128));

                $tcpdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
                $tcpdf->SetFontSize(10);

                $tcpdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
                $tcpdf->SetHeaderMargin(PDF_MARGIN_HEADER);
                $tcpdf->SetFooterMargin(PDF_MARGIN_FOOTER);

                $tcpdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

                $tcpdf->setFontSubsetting(true);

                $tcpdf->AddPage();

                foreach ($data as $row) {
                    $tcpdf->Write(5, "ID Pedido: {$row['id_pedido']}\n");
                    $tcpdf->Write(5, "Cantidad: {$row['cantidad']}\n");
                    $tcpdf->Write(5, "Descripción: {$row['descripcion']}\n");
                    $tcpdf->Write(5, "Fecha de Publicación: {$row['fecha_publicacion']}\n");
                    $tcpdf->Write(5, "Precio Unitario: {$row['precio']}\n");
                    $tcpdf->Write(5, "Precio Total: " . $row['cantidad'] * $row['precio'] . "\n");
                    $tcpdf->Ln(); 
                }

                $relativa = '/sweethome/view/uploads/pdf/factura_' . $data[0]['id_pedido'] . '.pdf';
                $filePath = $_SERVER['DOCUMENT_ROOT'] . $relativa;


                $tcpdf->Output($filePath, 'F');

                return ['filePath' => $relativa];

            } else {
                return ['error' => 'No se ha proporcionado ningún dato para generar el PDF.'];
            }
        }
    }

?>
