<?php

	// include_once('module/home/model/model/home_model.class.singleton.php');
	// include_once('module/home/model/DAO/home_dao.class.singleton.php');

	

	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_carrito_usuario_BLL($args) {
			
				


			$username = middleware::decode_username($args);

		
						
			if ($username) {
				return $this->dao->select_carrito_usuario($this->db, $username);

				
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}

	}
?>