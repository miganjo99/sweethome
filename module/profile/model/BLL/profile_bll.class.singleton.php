<?php

	// include_once('module/home/model/model/home_model.class.singleton.php');
	// include_once('module/home/model/DAO/home_dao.class.singleton.php');

	

	class profile_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = profile_dao::getInstance();
			
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_facturas_BLL($args) {
					
			$username = middleware::decode_username($args);						
			if ($username) {
				return $this->dao->select_facturas_usuario($this->db, $username);

				
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}
		public function get_user_likes_BLL($args) {
					
			$username = middleware::decode_username($args);						
			if ($username) {
				return $this->dao->select_likes_usuario($this->db, $username);

				
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}
		public function get_datos_user_BLL($args) {
					
			$username = middleware::decode_username($args);						
			if ($username) {
				return $this->dao->select_datos_usuario($this->db, $username);

				
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}
		

	}
?>