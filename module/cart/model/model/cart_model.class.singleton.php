<?php


    //require_once('module/home/model/BLL/home_bll.class.singleton.php');


    class cart_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = cart_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_carrito_usuario($args) {
            return $this -> bll -> get_carrito_usuario_BLL($args);
        }

    }
?>