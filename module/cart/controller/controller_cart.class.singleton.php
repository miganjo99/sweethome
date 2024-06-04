<?php
    require_once('utils/common.inc.php');
    require_once('paths.php');
    // include("paths.php");
    
    class controller_cart {
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
            common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
            
        }
        function carrito_usuario() {
            

            echo json_encode(common::load_model('cart_model', 'get_carrito_usuario', $_POST['token']));
        }
        
    }
?>