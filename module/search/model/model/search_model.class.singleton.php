<?php
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_search_operacion() {
            return $this -> bll -> get_search_operacion_BLL();
        }

        public function get_search_innovacion_null() {
            return $this -> bll -> get_search_innovacion_null_BLL();
        }

        public function get_search_innovacion($args) {
            return $this -> bll -> get_search_innovacion_BLL($args);
        }

       

    }