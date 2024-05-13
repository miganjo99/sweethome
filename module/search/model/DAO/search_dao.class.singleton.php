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
        
        function select_car_type($db){

			$sql = "SELECT DISTINCT type_name FROM type";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

       
        
    }

?>