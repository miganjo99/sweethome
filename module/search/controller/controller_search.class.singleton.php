<?php
    class controller_search {

        static $_instance;

        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }


        function search_operacion() {
            echo json_encode(common::load_model('search_model', 'get_search_operacion'));
        }

        
    }
?>