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

        public function get_viviendas_related($args) {

            return $this -> bll -> get_viviendas_related_BLL($args);
        }
        public function get_likes($args) {

            return $this -> bll -> get_likes_BLL($args);
        }
        public function get_count_viviendas_related($args) {

            return $this -> bll -> get_count_viviendas_related_BLL($args);
        }
        public function get_redirect_home($args) {
            //return $args;
            return $this -> bll -> get_redirect_home_BLL($args);
        }

        public function get_filter_shop($args) {
            //return $args;
            return $this -> bll -> get_filter_shop_BLL($args);
        }
        public function get_filter_search($args) {
            //return $args;
            return $this -> bll -> get_filter_search_BLL($args);
        }
 
        public function get_all_viviendas($args) {
            
            return $this -> bll -> get_all_viviendas_BLL($args);

        }
        public function get_count_home($args) {

            return $this -> bll -> get_count_home_BLL($args);
        }
        public function get_count_shop($args) {

            return $this -> bll -> get_count_shop_BLL($args);
        }
        public function get_count_search($args) {

            return $this -> bll -> get_count_search_BLL($args);
        }
        public function get_count_all() {

            return $this -> bll -> get_count_all_BLL();
        }
        
    }
?>
