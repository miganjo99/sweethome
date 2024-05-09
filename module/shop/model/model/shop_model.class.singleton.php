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

        public function get_filtro_operacion() {        

            return $this -> bll -> get_filtro_operacion_BLL();
        }
        public function get_filtro_ciudad() {

            return $this -> bll -> get_filtro_ciudad_BLL();
        }
        public function get_filtro_tipo() {

            return $this -> bll -> get_filtro_tipo_BLL();
        }
        public function get_filtro_categoria() {

            return $this -> bll -> get_filtro_categoria_BLL();
        }
        public function get_filtro_orientacion() {

            return $this -> bll -> get_filtro_orientacion_BLL();
        }
        public function get_details_vivienda($id_vivienda) {

            return $this -> bll -> get_details_vivienda_BLL($id_vivienda);
        }

        
    }
?>
