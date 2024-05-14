<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_search_operacion_BLL() {
			return $this -> dao -> select_search_operacion($this->db);
		}

		public function get_search_innovacion_null_BLL() {
			return $this -> dao -> select_search_innovacion_null($this->db);
		}

		public function get_search_innovacion_BLL($args) {
			
			return $this -> dao -> select_search_innovacion($this->db, $args);
		}


		public function get_autocomplete_BLL($args) {
			
			
			//return $args[0];//complete
			//return $args[1];//operacion
			// return $args[2];//innovacion


			if (empty($args[0]) && !empty($args[1]) && empty($args[2])){
				
				return $this -> dao -> select_operacion_autocomplete($this->db, $args[1]);

				}
			else if (empty($args[0]) && empty($args[1]) && !empty($args[2])){

				return $this -> dao -> select_innovacion_autocomplete($this->db, $args[2]);
			
				}
			else if (empty($args[0]) && !empty($args[1]) && !empty($args[2])){

				return $this -> dao -> select_operacion_innovacion_autocomplete($this->db, $args[1], $args[2]);
	
				}
			else if (!empty($args[0]) && empty($args[1]) && !empty($args[2])){

				return $this -> dao -> select_innovacion_ciudad_autocomplete($this->db, $args[0], $args[2]);
				
				}
			else if (!empty($args[0]) && !empty($args[1]) && empty($args[2])){

				return $this -> dao -> select_operacion_ciudad_autocomplete($this->db, $args[0], $args[1]);
				
				}
			 else if(!empty($args[0]) && empty($args[1]) && empty($args[2])){
				
				//echo"hola asdasdsad";

				return $this -> dao -> select_ciudad_autocomplete($this->db, $args[0]);

				}

		}
		
		


		
	}
?>