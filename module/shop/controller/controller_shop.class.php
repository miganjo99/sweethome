<?php

    require_once('utils/common.inc.php');
    require_once('paths.php');

    class controller_shop {

        function view() {

            //echo ".....................hola petit riuseñor.................."; 
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        function loadViviendas() {
            echo "hola loadViviendas";
            echo "*****************************************************************************";
            //echo json_encode(common::load_model('shop_model', 'get_loadViviendas',[$_POST['offset'], $_POST['num_pages']]));
        }

    }
?>
