<?php
class login_model {
    private $bll;
    static $_instance;
    
    function __construct() {
        $this -> bll = login_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_register($args) {
        $res = $this -> bll -> get_register_BLL($args);
    }


    public function get_verify_email($args) {
        return $this -> bll -> get_verify_email_BLL($args);
    }

    public function get_recover_email($args) {
        return $this -> bll -> get_recover_email_BBL($args);
    }

    public function get_verify_token($args) {
        return $this -> bll -> get_verify_token_BLL($args);
    }

    public function get_new_password($args) {
        return $this -> bll -> get_new_password_BLL($args);
    }


}