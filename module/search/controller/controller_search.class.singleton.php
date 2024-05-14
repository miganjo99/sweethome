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
        function search_innovacion_null() {
            echo json_encode(common::load_model('search_model', 'get_search_innovacion_null'));
        }
        function search_innovacion() {
            echo json_encode(common::load_model('search_model', 'get_search_innovacion',$_POST['operacion']));
        }

        function autocomplete() {
            echo json_encode(common::load_model('search_model', 'get_autocomplete',[$_POST['complete'], $_POST['operacion'], $_POST['innovacion']]));
        }

        
    }
?>