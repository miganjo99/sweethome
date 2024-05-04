<?php
    require_once('utils/common.inc.php');
    require_once('paths.php');
    // include("paths.php");
    
    class controller_home {
        function view() {
            //echo 'hola view';
            //common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');

            common::load_view('view\inc\top_page_home.html', VIEW_PATH_HOME . 'home.html');
            
        }
        

        function carousel_innovacion() {
            //echo "hola carousel innovacion php ***********************";
            // echo "*****************************************************************************";
            echo json_encode(common::load_model('home_model', 'get_carousel_innovacion'));
        }

        function carousel_tipo() {

            //echo "*************carousel_tipo*********************";

            echo json_encode(common::load_model('home_model', 'get_carousel_tipo'));
        }
        
        function loadCategorias() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_loadCategorias'));
        }

        function loadOperacion() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_loadOperacion'));
        }
        function loadCiudad() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_loadCiudad'));
        }
        function loadRecomendaciones() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_loadRecomendaciones'));
        }
        function loadMasVisitadas() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_loadMasVisitadas'));
        }
    }
?>