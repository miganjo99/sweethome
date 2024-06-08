<?php


    // include_once('module/home/model/BLL/home_bll.class.singleton.php');
    // include_once('model/db.class.singleton.php');

    

    class profile_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_facturas_usuario($db, $username) {

            $sql = "SELECT *
            FROM cart c
            JOIN vivienda v ON c.id_vivienda = v.id_vivienda
            WHERE c.username = '$username'
            AND c.estado = 'Comprado'
            GROUP BY c.id_vivienda, c.id_pedido, c.username, c.precio, c.estado";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
        public function select_likes_usuario($db, $username) {

            $sql = "SELECT * 
                    FROM likes l, vivienda v, users u
                    WHERE u.username='$username'
                    AND u.id_user=l.id_user
                    AND v.id_vivienda=l.id_vivienda";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
        public function select_datos_usuario($db, $username) {

            $sql = "SELECT * 
                    FROM users
                    WHERE username='$username'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
       

    }
?>