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

		public function get_carrito_usuario_BLL($args) {
					
			$username = middleware::decode_username($args);						
			if ($username) {
				return $this->dao->select_carrito_usuario($this->db, $username);

				
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}
		public function get_add_vivienda_BLL($args) {
					
			$username = middleware::decode_username($args[0]);	
			
			// echo json_encode($username);
			// exit;
			if ($username) {
				$result =  $this->dao->add_vivienda($this->db, $username, $args[1]);
				

				echo json_encode(["result" => $result]);
				exit;
						
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}
		public function get_quitar_vivienda_BLL($args) {
					
			$username = middleware::decode_username($args[0]);	
			
			// echo json_encode($username);
			// exit;
			if ($username) {
				$result =  $this->dao->quitar_vivienda($this->db, $username, $args[1]);
				

				echo json_encode(["result" => $result]);
				exit;
						
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}


		public function get_borrar_linea_BLL($args) {
				
			// echo json_encode($args);
			// exit;

			$username = middleware::decode_username($args[0]);	
			
			// echo json_encode($username);
			// exit;
			if ($username) {
				$result =  $this->dao->borrar_linea($this->db, $username, $args[1]);
				

				echo json_encode(["result" => $result]);
				exit;
						
			} else {
				error_log("Error al decodificar el token");
				return null;
			}


			
		}

	}
?>