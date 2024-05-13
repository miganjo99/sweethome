<?php

    require_once('utils/common.inc.php');
    require_once('paths.php');

    class controller_shop {

        static $_instance;

        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        function view() {

            //echo ".....................hola petit riuseñor.................."; 
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        // function loadViviendas() {
        //     //echo json_encode("holayyyyy loadViviendas");  
        //     //echo "*****************************************************************************";
        //     echo json_encode(common::load_model('shop_model', 'get_loadViviendas',[$_POST['offset'], $_POST['num_pages']]));
        // }
        function filtro_operacion() {
            
            echo json_encode(common::load_model('shop_model', 'get_filtro_operacion'));
        }
        function filtro_ciudad() {
            
            echo json_encode(common::load_model('shop_model', 'get_filtro_ciudad'));
        }
        function filtro_tipo() {
            
            echo json_encode(common::load_model('shop_model', 'get_filtro_tipo'));
        }
        function filtro_categoria() {
            
            echo json_encode(common::load_model('shop_model', 'get_filtro_categoria'));
        }
        function filtro_orientacion() {
            
            echo json_encode(common::load_model('shop_model', 'get_filtro_orientacion'));
        }
        function details_vivienda() {
            //echo ($_GET['id_vivienda']);
            echo json_encode(common::load_model('shop_model', 'get_details_vivienda',$_GET['id_vivienda']));
        }

        function viviendas_related() {
            
            echo json_encode(common::load_model('shop_model', 'get_viviendas_related',[$_POST['type'],$_POST['loaded'],$_POST['items']]));
        }
        function count_viviendas_related() {
            
            echo json_encode(common::load_model('shop_model', 'get_count_viviendas_related',$_POST['related']));
        }
        function redirect_home() {
            //echo "olaaaaaaaaaaaaaaaaa",
            echo json_encode(common::load_model('shop_model', 'get_redirect_home',[$_POST['filters_home'], $_POST['offset'], $_POST['num_pages']]));
        }

        // function all_viviendas() {
            
        //     echo json_encode(common::load_model('shop_model', 'get_all_viviendas',[$_GET['offset'], $_GET['num_pages']]));
        // }

    }
?>
