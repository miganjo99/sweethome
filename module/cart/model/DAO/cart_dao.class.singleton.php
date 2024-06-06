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

            $sql = "SELECT * 
            FROM cart c, vivienda v 
            WHERE c.username='$username'
            AND c.estado='Carrito'
            AND c.id_vivienda=v.id_vivienda";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
        
        public function add_vivienda($db,$username, $id_vivienda) {

            $sql = "CALL add_vivienda_carrito('$username', '$id_vivienda', @result)";

            
            $db->ejecutar($sql);
            
            $result = $db->ejecutar("SELECT @result AS result");
            $row = $result->fetch_assoc();
            return $row['result'];            
            //return $db -> listar($row['result']);            
            
        }
        public function quitar_vivienda($db,$username, $id_vivienda) {

            $sql = "CALL quitar_vivienda_carrito('$username', '$id_vivienda', @result)";

            
            $db->ejecutar($sql);
            
            $result = $db->ejecutar("SELECT @result AS result");
            $row = $result->fetch_assoc();
            return $row['result'];            
            //return $db -> listar($row['result']);            
            
        }
        public function borrar_linea($db,$username, $id_vivienda) {

            $sql = "CALL borrar_linea_carrito('$username', '$id_vivienda', @result)";

            
            $db->ejecutar($sql);
            
            $result = $db->ejecutar("SELECT @result AS result");
            $row = $result->fetch_assoc();
            return $row['result'];            
            //return $db -> listar($row['result']);            
            
        }
        public function comprar_carrito($db,$username) {

            $sql = "CALL comprar_carrito('$username', @result)";

            
            $db->ejecutar($sql);
            
            $result = $db->ejecutar("SELECT @result AS result");
            $row = $result->fetch_assoc();
            return $row['result'];            
            //return $db -> listar($row['result']);            
            
        }

    }
?>