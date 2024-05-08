<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        public function get_loadViviendas_BLL($args) {
			//return "hola BLL SHOP";
			//return $args;
			return $this -> dao -> select_all_viviendas($this->db, $args[0], $args[1]);
		}

        public function get_filtro_operacion_BLL() {
			
			return $this -> dao -> select_filtro_operacion($this->db);
		}

        public function get_filtro_ciudad_BLL() {
			
			return $this -> dao -> select_filtro_ciudad($this->db);
		}

        public function get_filtro_tipo_BLL() {
			
			return $this -> dao -> select_filtro_tipo($this->db);
		}

        public function get_filtro_categoria_BLL() {
			
			return $this -> dao -> select_filtro_categoria($this->db);
		}

        public function get_filtro_orientacion_BLL() {
			
			return $this -> dao -> select_filtro_orientacion($this->db);
		}

       
	}
?>