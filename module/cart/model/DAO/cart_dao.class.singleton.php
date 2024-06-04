<?php


    // include_once('module/home/model/BLL/home_bll.class.singleton.php');
    // include_once('model/db.class.singleton.php');

    

    class cart_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_carrito_usuario($db, $username) {

            $sql = "SELECT * FROM `cart` WHERE username='$username'  ORDER BY precio";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>