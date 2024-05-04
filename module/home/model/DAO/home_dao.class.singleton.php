<?php


    include_once('module/home/model/BLL/home_bll.class.singleton.php');
    include_once('model/db.class.singleton.php');

    

    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_carousel_innovacion($db) {

            //recibe $db?

           // return "hola select_data_carousel_innovacion DAOOOOOOOOOOOO";
            
            $sql = "SELECT * FROM `innovacion` ORDER BY name_innovacion ASC LIMIT 30;";

            //return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_carousel_tipo($db) {

            $sql = "SELECT * FROM `tipo` ORDER BY name_tipo ASC LIMIT 30;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_loadCategorias($db) {

            $sql = "SELECT *FROM categoria;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_loadOperacion($db) {

            $sql = "SELECT *FROM operacion ORDER BY id_operacion DESC;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>