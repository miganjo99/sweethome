<?php
    require_once('utils/common.inc.php');
    require_once('paths.php');
    // include("paths.php");
    
    class controller_profile {
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
            common::load_view('top_page_profile.html', VIEW_PATH_PROFILE . 'profile.html');       
        }

        function facturas() {            
            echo json_encode(common::load_model('profile_model', 'get_facturas', $_POST['token']));
        }
        function user_likes() {            
            echo json_encode(common::load_model('profile_model', 'get_user_likes', $_POST['token']));
        }
        function datos_user() {            
            echo json_encode(common::load_model('profile_model', 'get_datos_user', $_POST['token']));
        }
        function update_avatar() {            
            echo json_encode(common::load_model('profile_model', 'get_update_user', [$_POST['token'],$_POST['avatar']]));
        }
        function generar_pdf() { 
            
            $args = json_decode($_POST['pdf'], true);
            $result = common::load_model('profile_model', 'get_generar_pdf', $args);
            echo json_encode($result);
                
            //echo json_encode(common::load_model('profile_model', 'get_generar_pdf', $_POST['pdf']));
        }

        public function generar_qr() {
            $args = json_decode($_POST['data'], true);
            $result = common::load_model('profile_model', 'get_generar_qr', $args);
            echo json_encode($result);
        }
        
        function pdf_factura() {            
            echo json_encode(common::load_model('profile_model', 'get_pdf_factura', [$_POST['token'],$_POST['id_pedido']]));
        }

       function upload(){
            echo json_encode(common::load_model('profile_model', 'get_upload_avatar', $_FILES['file']));
        }
        
    }
?>