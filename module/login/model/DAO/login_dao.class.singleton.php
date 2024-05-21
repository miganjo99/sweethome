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

        public function insert_user($db, $id, $username_reg, $hashed_pass, $email_reg, $avatar, $token_email) {

            $sql = "INSERT INTO users (id_user, username, password, email, type_user, avatar, token_email, is_active)
            VALUES ('$id', '$username_reg', '$hashed_pass', '$email_reg', 'client', '$avatar', '$token_email', 0)";

            return $stmt = $db->ejecutar($sql);
        }
       
        public function select_user($db, $username_reg, $email_reg){

			$sql = "SELECT id_user, username, password, email, type_user, avatar, token_email, is_active 
                    FROM users 
                    WHERE username = '$username_reg' OR email = '$email_reg'";


            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_verify_email($db, $token_email){

			$sql = "SELECT token_email FROM users WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token_email){

            $sql = "UPDATE users SET is_active = 1, token_email= '' WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_recover_password($db, $email_forg){
			$sql = "SELECT `email` FROM `users` WHERE email = '$email_forg' AND password NOT LIKE ('')";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_recover_password($db, $email, $token_email){
			$sql = "UPDATE `users` SET `token_email`= '$token_email' WHERE `email` = '$email'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }

    }


?>