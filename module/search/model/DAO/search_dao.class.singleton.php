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


        function select_operacion_autocomplete($db, $operacion){

			$sql = "SELECT DISTINCT c.name_ciudad
                 FROM vivienda v, operacion o, innovacion i, ciudad c
                 WHERE v.id_operacion = o.id_operacion
                 AND v.id_innovacion = i.id_innovacion
                 AND v.id_ciudad = c.id_ciudad AND v.id_operacion = $operacion ;";

            //return $sql;

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_innovacion_autocomplete($db, $innovacion){

			$sql = "SELECT DISTINCT c.name_ciudad
                 FROM vivienda v, operacion o, innovacion i, ciudad c
                 WHERE v.id_operacion = o.id_operacion
                 AND v.id_innovacion = i.id_innovacion
                 AND v.id_ciudad = c.id_ciudad AND v.id_innovacion = $innovacion ;";

            //return $sql;

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_operacion_innovacion_autocomplete($db, $operacion, $innovacion){

			$sql = "SELECT DISTINCT c.name_ciudad
                 FROM vivienda v, operacion o, innovacion i, ciudad c
                 WHERE v.id_operacion = o.id_operacion
                 AND v.id_innovacion = i.id_innovacion
                 AND v.id_ciudad = c.id_ciudad AND v.id_operacion = $operacion AND v.id_innovacion = $innovacion ;";

            //return $sql;

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_innovacion_ciudad_autocomplete($db, $complete, $innovacion){

			$sql = "SELECT DISTINCT c.name_ciudad
                 FROM vivienda v, operacion o, innovacion i, ciudad c
                 WHERE v.id_operacion = o.id_operacion
                 AND v.id_innovacion = i.id_innovacion
                 AND v.id_ciudad = c.id_ciudad AND v.id_innovacion= $innovacion AND c.name_ciudad LIKE '$complete%' ;";

            //return $sql;

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }


        function select_operacion_ciudad_autocomplete($db, $complete, $operacion){

			$sql = "SELECT DISTINCT c.name_ciudad
                 FROM vivienda v, operacion o, innovacion i, ciudad c
                 WHERE v.id_operacion = o.id_operacion
                 AND v.id_innovacion = i.id_innovacion
                 AND v.id_ciudad = c.id_ciudad AND v.id_operacion = $operacion AND c.name_ciudad LIKE '$complete%' ;";

            //return $sql;

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_ciudad_autocomplete($db, $complete){

			$sql = "SELECT DISTINCT c.name_ciudad
                 FROM vivienda v, operacion o, innovacion i, ciudad c
                 WHERE v.id_operacion = o.id_operacion
                 AND v.id_innovacion = i.id_innovacion
                 AND v.id_ciudad = c.id_ciudad AND c.name_ciudad LIKE '$complete%' ;";

            //return $sql;

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

       
        
    }

?>