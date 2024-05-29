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

		public function get_login_BLL($args) {



			if (!empty($this -> dao -> select_user_login($this->db, $args[0]))) {
				
				// echo json_encode("antes del update");
				// exit;

				$attempts = $this -> dao -> update_attempts_login($this->db, $args[0]);
				

				$user = $this -> dao -> select_user_login($this->db, $args[0]);


				//echo json_encode("hola");
				//  echo json_encode($user[0]['attempts_login']);
				//  exit;

				if($user[0]['attempts_login'] < 3){

					if (password_verify($args[1], $user[0]['password']) && $user[0]['is_active'] == 1) {//comprobar ambos hashes sean iguales y que este active

						//echo json_encode("passw correct");
						// echo json_encode($user[0]['username']);
						// exit;

						//updatear el attempts_login a 0!!!!!!!!!!
						$recover = $this -> dao -> recover_attempts_login($this->db, $args[0]);

						//$jwt = middleware::create_token($user[0]['username']);
						$jwt = middleware::create_token($user[0]['username']);

						// echo json_encode($jwt);
						// exit; 

						$_SESSION['username'] = $user[0]['username'];
						$_SESSION['tiempo'] = time();
						session_regenerate_id();

						//return json_encode($jwt);
						echo json_encode($jwt);
						exit;
						

					} else if (password_verify($args[1], $user[0]['password']) && $user[0]['is_active'] == 0) {
						return 'activate error';
					} else {
						return 'error';
					}
				}else{
					//enviar whatsap
					$inactive = $this -> dao -> inactive_user($this->db, $args[0]);

					//require_once(SITE_ROOT . 'utils/ultramsg.inc.php');
					// ultramsg::send_whatsapp();
					 
					// echo json_encode('attempts_error');
					// exit;
					
					$wha = json_decode(ultramsg::send_whatsapp(), true);

					if (!empty($wha)) {
						return 'attempts_error';
					} 


				}





            } else {
				return 'user error';
			}
		}

		public function get_actividad_BLL() {
            if (!isset($_SESSION["tiempo"])) {  
				return "inactivo";
			} else {  
				if((time() - $_SESSION["tiempo"]) >= 1800) {  
						return "inactivo";
				}else{
					return (time() - $_SESSION["tiempo"]);
				}
			}
		}

		public function get_controluser_BLL($args) {
			$token = explode('"', $args);
			$void_email = "";
			$decode = middleware::decode_username($token[1]);
			$user = $this -> dao -> select_user($this->db, $decode, $void_email);

			if (!isset ($_SESSION['username']) != $user){
				if(isset ($_SESSION['username']) != $user) {
					return 'Wrong_User';
				}
				return 'Correct_User';
			}
		}

		public function get_data_user_BLL($args) {
			$token = explode('"', $args);
			
			//$decode = middleware::decode_username($token[1]);

			// echo json_encode($token[1]);
			// exit;
			//decode token????

			$decode = middleware::decode_username($token[1]);
			if ($decode) {
				return $this->dao->select_data_user($this->db, $decode);
			} else {
				error_log("Error al decodificar el token");
				return null;
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