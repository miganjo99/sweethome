<?php
    class shop_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        public function select_all_viviendas($db, $offset, $num_pages) {

            $sql = "SELECT * 
            FROM vivienda v  
            ORDER BY v.id_vivienda ASC
            LIMIT  $offset, $num_pages;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_operacion($db) {

            $sql = "SELECT *FROM operacion ORDER BY id_operacion ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_ciudad($db) {

            $sql = "SELECT * FROM ciudad ORDER BY id_ciudad ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_tipo($db) {

            $sql = "SELECT * FROM tipo ORDER BY id_tipo ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_categoria($db) {

            $sql = "SELECT *FROM categoria ORDER BY id_categoria ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_orientacion($db) {

            $sql = "SELECT *FROM orientacion ORDER BY id_orientacion ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_details_vivienda($db, $id_vivienda) {


            //return $id_vivienda;

            $sql = "SELECT *
            FROM vivienda v, ciudad c, categoria ca, tipo t, operacion o
            WHERE v.id_vivienda = '$id_vivienda'
            AND  v.id_ciudad = c.id_ciudad 
            AND v.id_categoria = ca.id_categoria
            AND v.id_tipo = t.id_tipo
            AND v.id_operacion = o.id_operacion;";
            
            return $sql;

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        
    }

?>

