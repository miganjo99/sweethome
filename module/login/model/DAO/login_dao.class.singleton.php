<?php
    class login_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function insert_user($db, $id, $username_reg, $hashed_pass, $email_reg, $avatar, $token_email, $time_token_email) {

            $sql = "INSERT INTO users (id_user, username, password, email, type_user, avatar, token_email, is_active, time_token_email)
            VALUES ('$id', '$username_reg', '$hashed_pass', '$email_reg', 'client', '$avatar', '$token_email', 0,'$time_token_email')";

            return $stmt = $db->ejecutar($sql);
        }
       
        public function select_user($db, $username_reg, $email_reg){

			$sql = "SELECT id_user, username, password, email, type_user, avatar, token_email, is_active 
                    FROM users 
                    WHERE username = '$username_reg' OR email = '$email_reg'";


            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_user_login($db, $username){

			$sql = "SELECT id_user, username, password, email, type_user, avatar, token_email, is_active, attempts_login 
                    FROM users 
                    WHERE username = '$username' OR email = '$username'";


            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
        public function update_attempts_login($db, $username){

			$sql = "UPDATE users SET attempts_login = attempts_login +1 
                    WHERE username = '$username' OR email = '$username'";


            return $stmt = $db->ejecutar($sql);

        }
        public function recover_attempts_login($db, $username){

			$sql = "UPDATE users SET attempts_login = 0
                    WHERE username = '$username' OR email = '$username'";


            return $stmt = $db->ejecutar($sql);

        }
        public function inactive_user($db, $username){

			$sql = "UPDATE `users` SET is_active = 0 
                    WHERE username = '$username' OR email = '$username'";


            return $stmt = $db->ejecutar($sql);

        }

        public function select_data_user($db, $username){

			$sql = "SELECT * FROM users WHERE username = '$username'";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_verify_email($db, $token_email){

			$sql = "SELECT token_email FROM users WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 
        
        public function select_time_token_email($db, $token_email){

			$sql = "SELECT time_token_email FROM users WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token_email){

            $sql = "UPDATE users SET is_active = 1, token_email= '' WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_recover_password($db, $email_forg){
			$sql = "SELECT email FROM users WHERE email = '$email_forg' AND password NOT LIKE ('')";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_recover_password($db, $email_forg, $token){
			$sql = "UPDATE users SET token_email= '$token' WHERE email = '$email_forg'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function update_new_password($db, $token_email, $password){
            $sql = "UPDATE users SET password= '$password', token_email= '' WHERE token_email = '$token_email'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }


    }


?>