<?php
require_once('utils/common.inc.php');
require_once('paths.php');

    class controller_login {

        function view() {
            common::load_view('top_page_shop.html', VIEW_PATH_LOGIN . 'login.html');
        }

        function register() {
            echo json_encode(common::load_model('login_model', 'get_register', [$_POST['username_reg'], $_POST['pass_reg'], $_POST['email_reg']]));
        }
        
    
    }
    
?>