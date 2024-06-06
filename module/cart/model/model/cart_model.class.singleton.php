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
        public function get_add_vivienda($args) {
            return $this -> bll -> get_add_vivienda_BLL($args);
        }
        public function get_quitar_vivienda($args) {
            return $this -> bll -> get_quitar_vivienda_BLL($args);
        }
        public function get_borrar_linea($args) {
            return $this -> bll -> get_borrar_linea_BLL($args);
        }
        public function get_comprar($args) {
            return $this -> bll -> get_comprar_BLL($args);
        }

    }
?>