
<?php

require_once ('vendor/autoload.php'); 
require_once __DIR__ . '/vendor/autoload.php';
	
    class ultramsg {
      
        public static function send_whatsapp($token_wha) {
            $ultramsg = parse_ini_file(UTILS . "ultramsg.ini");
            $ultramsg_token = $ultramsg['ultramsg_token'];
            $instance_id = $ultramsg['instance_id'];
            $client = new UltraMsg\WhatsAppApi($ultramsg_token, $instance_id);
            $to = $ultramsg['to'];
            $body = "Hemos desactivado tu cuenta en sweethome, cambia la contraseña. Tu código OTP es: " . $token_wha;
            $api = $client->sendChatMessage($to, $body);
            return true;
        }
        
    }