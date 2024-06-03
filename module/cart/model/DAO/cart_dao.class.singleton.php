<?php


    // include_once('module/home/model/BLL/home_bll.class.singleton.php');
    // include_once('model/db.class.singleton.php');

    

    class cart_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

    }
?>