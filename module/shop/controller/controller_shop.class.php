<?php

    require_once('utils/common.inc.php');
    require_once('paths.php');

    class controller_shop {

        function view() {

            //echo "hola petit riuseñor.................."; 
            common::load_view('view\inc\top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        

    }
?>
