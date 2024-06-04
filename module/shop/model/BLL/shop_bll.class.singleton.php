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



        public function get_likes_BLL($args) {


			$username = middleware::decode_username($args[0]);


			$result = $this-> dao -> likes($this->db, $username, $args[1]);

		
			echo json_encode(["result" => $result]);


			exit;

		}

        public function get_carrito_BLL($args) {
			$username = middleware::decode_username($args[0]);

			

			$result = $this-> dao -> carrito($this->db, $username, $args[1]);

	
			echo json_encode(["result" => $result]);


			exit;

		}
        public function get_mis_likes_BLL($args) {

			$username = middleware::decode_username($args);
    
			$result = $this-> dao -> mis_likes($this->db, $username);

		
		
			if (!empty($result)) {
				echo json_encode($result);
				exit; 
			} else {
				echo json_encode(["message" => "Este usuario no tiene likes"]); 
				exit;
			}

		}
		
		
       
			
			
		public function get_details_vivienda_BLL($id_vivienda) {
			
			$details_vivienda = $this-> dao -> select_details_vivienda($this->db, $id_vivienda);
			
			
			$details_img = $this-> dao -> select_details_img($this->db, $id_vivienda);
			
			
			$details = array(
				'vivienda' => $details_vivienda,
				'imagenes' => $details_img
			);
			//$details = array($details_vivienda,$details_img);
			
			
			//$details = array_merge($details_vivienda, $details_img)
			return $details;
		}
		
		public function get_viviendas_related_BLL($args) {
			
			return $this -> dao -> select_viviendas_related($this->db , $args[0], $args[1], $args[2]);
		}
		
		public function get_count_viviendas_related_BLL($args) {
			
			return $this -> dao -> select_count_viviendas_related($this->db , $args[0]);
		}
		
		public function get_redirect_home_BLL($args) {
			//return $args[0];
			return $this -> dao -> select_redirect_home($this->db , $args[0], $args[1], $args[2]);
		}
		public function get_filter_shop_BLL($args) {
			//return $args[0];
			return $this -> dao -> select_filter_shop($this->db , $args[0], $args[1], $args[2]);
		}
		public function get_filter_search_BLL($args) {
			//return $args[0];
			return $this -> dao -> select_filter_search($this->db , $args[0], $args[1], $args[2]);
		}



		public function get_all_viviendas_BLL($args) {
			
			return $this -> dao -> select_all_viviendas($this->db , $args[0], $args[1]);
		}

		public function get_count_home_BLL($args) {
			
			return $this -> dao -> select_count_home($this->db, $args[0]);
		}

		public function get_count_shop_BLL($args) {
			
			return $this -> dao -> select_count_shop($this->db, $args[0]);
		}

		public function get_count_search_BLL($args) {
			
			return $this -> dao -> select_count_search($this->db, $args[0]);
		}

		public function get_count_all_BLL() {
			
			return $this -> dao -> select_count_all($this->db);
		}


	}
?>