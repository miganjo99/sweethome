<?php
    class shop_model {
        private $bll;
        static $_instance;

        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_loadViviendas($args) {

            // return $args;
            // return "shopmodelclass";

            return $this -> bll -> get_loadViviendas_BLL($args);
        }

        
    }
?>
