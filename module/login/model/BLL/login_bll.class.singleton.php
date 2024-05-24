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
			$time_token_email= time();
			
			// $token_email = middleware::create_token($args[2]);
			// //echo json_encode($token_email);
			// return $token_email;
			

			if (!empty($this -> dao -> select_user($this->db, $args[0], $args[2]))) {
				
				 
				echo json_encode("error");
				exit;
				//return "error";

            } else {
				$this -> dao -> insert_user($this->db, $id, $args[0], $hashed_pass, $args[2], $avatar, $token_email, $time_token_email);
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

			$time_token_email = $this->dao->select_time_token_email($this->db, $args);//el time es VARCHAR en bd
			$time_token_email = isset($time_token_email[0]['time_token_email']) ? intval($time_token_email[0]['time_token_email']) : null;
			//acceder al array que nos devuelve para la posicion 0 poder restar con un entero
			$time = time();
			
			if ($time_token_email !== null) {

				$verify_time = $time - $time_token_email;

				 //return $verify_time;


				//if ($verify_time > 1300) { 
				if ($verify_time > 130) { 

					//return 'token_time_expired';
					echo json_encode("token_time_expired");
					exit;
				} else {
					if($this -> dao -> select_verify_email($this->db, $args)){
						$this -> dao -> update_verify_email($this->db, $args);
						//return 'verify';
						echo json_encode("verify");
						exit;
					} else {
						echo json_encode("fail");
						exit;
					}
				}
			} else {
				//return 'fail';
				echo json_encode("fail");
				exit;
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
                //return 'error';
				echo json_encode("error");
				exit;
            }
		}


		public function get_verify_token_BLL($args) {
			if($this -> dao -> select_verify_email($this->db, $args)){
				return 'verify';
			}
			return 'fail';
		}

		public function get_new_password_BLL($args) {
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_password($this->db, $args[0], $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}

	}