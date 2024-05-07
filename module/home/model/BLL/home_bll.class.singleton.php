<?php

	// include_once('module/home/model/model/home_model.class.singleton.php');
	// include_once('module/home/model/DAO/home_dao.class.singleton.php');

	

	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = home_dao::getInstance();
			
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_carousel_innovacion_BLL() {
			//return "hola get_carousel_innovacion_BLL";
			return $this -> dao -> select_data_carousel_innovacion($this -> db);
		}

		public function get_carousel_tipo_BLL() {
			return $this -> dao -> select_data_carousel_tipo($this -> db);
		}

		public function get_loadCategorias_BLL() {
			return $this -> dao -> select_data_loadCategorias($this -> db);
		}
		public function get_loadOperacion_BLL() {
			return $this -> dao -> select_data_loadOperacion($this -> db);
		}

		public function get_loadCiudad_BLL() {
			return $this -> dao -> select_data_loadCiudad($this -> db);
		}
		public function get_loadRecomendaciones_BLL() {
			return $this -> dao -> select_data_loadRecomendaciones($this -> db);
		}
		public function get_loadMasVisitadas_BLL() {
			return $this -> dao -> select_data_loadMasVisitadas($this -> db);
		}
	}
?>