<?php


    require_once('module/home/model/BLL/home_bll.class.singleton.php');


    class home_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = home_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_carousel_innovacion() {
            //return "holaaaa get carusel innovacion singleton";
            return $this -> bll -> get_carousel_innovacion_BLL();
        }

        public function get_carousel_tipo() {
            return $this -> bll -> get_carousel_tipo_BLL();
        }

        public function get_loadCategorias() {
            return $this -> bll -> get_loadCategorias_BLL();
        }

        public function get_loadOperacion() {
            return $this -> bll -> get_loadOperacion_BLL();
        }
        public function get_loadCiudad() {
            return $this -> bll -> get_loadCiudad_BLL();
        }

        // public function get_type() {
        //     // return 'hola car type';
        //     return $this -> bll -> get_type_BLL();
        // }

    }
?>