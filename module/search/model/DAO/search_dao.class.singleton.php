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

       
        
    }

?>