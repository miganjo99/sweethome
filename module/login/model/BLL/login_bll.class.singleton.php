<?php
	class login_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = login_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {

			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT);
			$hashavatar = md5(strtolower(trim($args[2]))); 
			$avatar = "https://robohash.org/$hashavatar";

			$token_email = common::generate_Token_secure(20);

			if (!empty($this -> dao -> select_user($this->db, $args[0], $args[2]))) {
				
				 
				echo json_encode("error");
				exit;
				//return "error";

            } else {
				$this -> dao -> insert_user($this->db, $id, $args[0], $hashed_pass, $args[2], $avatar, $token_email);
				$message = [ 'type' => 'validate', //envia la opcion email al mail::sendemail
							 'token' => $token_email, 
							 'toEmail' =>  $args[2]];

				$email = json_decode(mail::send_email($message), true);

				if (!empty($email)) {
					return '';
				} 
			}
		}

		public function get_verify_email_BLL($args) {
			if($this -> dao -> select_verify_email($this->db, $args)){
				$this -> dao -> update_verify_email($this->db, $args);
				return 'verify';
			} else {
				return 'fail';
			}
		}

		public function get_recover_email_BBL($args) {
			$user = $this -> dao -> select_recover_password($this->db, $args);
			$token = common::generate_Token_secure(20);

			if (!empty($user)) {
				$this -> dao -> update_recover_password($this->db, $args, $token);
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return;  
				}   
            }else{
                return 'error';
            }
		}


	}