<?php
    class search_dao{
        static $_instance;

        private function __construct() {
        }
    
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function select_search_operacion($db){

			$sql = "SELECT * FROM operacion;";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_search_innovacion_null($db){

			$sql = "SELECT DISTINCT * FROM innovacion;";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        function select_search_innovacion($db, $operacion){

			$sql = "SELECT DISTINCT i.*
            FROM vivienda v, innovacion i
            WHERE i.id_innovacion = v.id_innovacion AND v.id_operacion = '$operacion';";

            //return $sql;

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

       
        
    }

?>