<?php
require_once('utils/common.inc.php');
require_once('paths.php');

    class controller_login {
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
            //echo "hola view login";
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'login.html');
        }

        function register() {
            echo json_encode(common::load_model('login_model', 'get_register', [$_POST['username_reg'], $_POST['pass_reg'], $_POST['email_reg']]));
        }

        
        function verify_email() {
            $verify = json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));
            echo json_encode($verify);
        }
    
    }
    
?>