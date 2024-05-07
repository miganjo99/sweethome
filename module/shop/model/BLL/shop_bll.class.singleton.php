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

       
	}
?>