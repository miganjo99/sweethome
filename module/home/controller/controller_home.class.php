<?php
    require_once('utils/common.inc.php');
    //require_once('paths.php');
    //include("paths.php");
    
    class controller_home {
        function view() {
            //echo 'hola view';
            //common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');

            common::load_view('view\inc\top_page_home.html', 'module/home/view/' . 'home.html');
            
        }
        

        // function carrusel() {
        //     echo json_encode(common::load_model('home_model', 'get_carrusel'));
        // }

        // function category() {
        //     echo json_encode(common::load_model('home_model', 'get_category'));
        // }
        
        // function type() {
        //     // echo json_encode('Hola');
        //     echo json_encode(common::load_model('home_model', 'get_type'));
        // }
    }
?>