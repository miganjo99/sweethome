<?php


    //require_once('module/home/model/BLL/home_bll.class.singleton.php');


    class profile_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = profile_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_facturas($args) {
            return $this -> bll -> get_facturas_BLL($args);
        }
        public function get_user_likes($args) {
            return $this -> bll -> get_user_likes_BLL($args);
        }
        public function get_datos_user($args) {
            return $this -> bll -> get_datos_user_BLL($args);
        }
        public function get_update_user($args) {
            return $this -> bll -> get_update_user_BLL($args);
        }
        public function get_pdf_factura($args) {
            return $this -> bll -> get_pdf_factura_BLL($args);
        }

    }
?>