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

		
	}
?>