<?php

	// include_once('module/home/model/model/home_model.class.singleton.php');
	// include_once('module/home/model/DAO/home_dao.class.singleton.php');

	

	class cart_bll {
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

	}
?>