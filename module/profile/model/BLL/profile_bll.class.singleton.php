<?php

	// include_once('module/home/model/model/home_model.class.singleton.php');
	// include_once('module/home/model/DAO/home_dao.class.singleton.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/sweethome/utils/tcpdf.inc.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/sweethome/utils/qrgenerator.inc.php');

	

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
		
		public function get_update_user_BLL($args) {
					
			$username = middleware::decode_username($args[0]);						
			if ($username) {
				return $this->dao->update_avatar_usuario($this->db, $username, $args[1]);

				
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}
		public function get_generar_pdf_BLL($args) {
					
			// tcpdf_inc::create_pdf($args);
			// return true;

			return tcpdf_inc::create_pdf(json_encode($args));


			 
		}

		public function get_generar_qr_BLL($args) {
			// $filePath = QRCodeGenerator::create_qr(json_encode($args));
			//return QRCodeGenerator::create_qr(json_encode($args));

			if (!empty($args)) {
				// Acceder al valor si está definido y no es vacío
				$filePath = QRCodeGenerator::create_qr(json_encode($args));
				return ['filePath' => $filePath];
			} else {
				// Manejar el caso en el que no se ha proporcionado ningún dato válido
				return ['error' => 'No se ha proporcionado ningún dato válido para generar el QR code.'];
			}
			
			// if (isset($filePath['filePath'])) {
			// 	return ['filePath' => $filePath['filePath']];
			// } else {				
			// 	echo "La clave 'filePath' no está definida en el array devuelto por QRCodeGenerator::create_qr.";
			// 	return ['error' => "La clave 'filePath' no está definida en el array devuelto por QRCodeGenerator::create_qr."];
			// }
		}
		


		public function get_pdf_factura_BLL($args) {
					
			$username = middleware::decode_username($args[0]);						
			if ($username) {
				return $this->dao->select_pdf_usuario($this->db, $username, $args[1]);

				
			} else {
				error_log("Error al decodificar el token");
				return null;
			}
		}
		

	}
?>