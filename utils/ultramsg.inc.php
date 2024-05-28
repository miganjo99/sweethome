
<?php

require_once ('vendor/autoload.php'); 
require_once __DIR__ . '/vendor/autoload.php';
	
    class ultramsg {
      
        public static function send_whatsapp(){


            $ultramsg = parse_ini_file(UTILS . "ultramsg.ini");

            // $ultramsg['ultramsg_token'];
            // $ultramsg['instance_id'];

            $ultramsg_token = $ultramsg['ultramsg_token'];
            $instance_id= $ultramsg['instance_id'];
            $client = new UltraMsg\WhatsAppApi($ultramsg_token,$instance_id);

            $to= $ultramsg['to'];
            $body="Hemos desactivado tu cuenta en sweethome, cambia la contraseña"; 
            $api=$client->sendChatMessage($to,$body);
            print_r($api);
            
            

        }
    }