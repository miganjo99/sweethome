<?php
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
                // case 'contact';
                //     $email['toEmail'] = '13salmu@gmail.com';
                //     $email['fromEmail'] = 'secondchanceonti@gmail.com';
                //     $email['inputEmail'] = 'secondchanceonti@gmail.com';
                //     $email['inputMatter'] = 'Email verification';
                //     $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/index.php?module=contact&op=view'>Click here for verify your email.</a>";
                //     break;
                case 'validate';
                    $email['fromEmail'] = 'secondchanceonti@gmail.com';
                    $email['inputEmail'] = 'secondchanceonti@gmail.com';
                    $email['inputMatter'] = 'Email verification';

                    //echo $email;

                    $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/sweethome/module/login/verify/$email[token]'>Click here for verify your email.</a>";
                    break;
                // case 'recover';
                //     $email['fromEmail'] = 'secondchanceonti@gmail.com';
                //     $email['inputEmail'] = 'secondchanceonti@gmail.com';
                //     $email['inputMatter'] = 'Recover password';
                //     $email['inputMessage'] = "<a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/module/login/recover/$email[token]'>Click here for recover your password.</a>";
                //     break;
            }
            return self::send_resend($email);
        }

        public static function send_resend($values){
            // $resend = parse_ini_file(UTILS . "resend.ini");

            // $api_key = $resend['api_key'];

            // $config = array();

            // $config['api_key'] = $api_key; 

            
            // $message = array();

            // $message['from'] = $values['fromEmail'];
            // $message['to'] = 'miguelgandiajorda@gmail.com';
            // $message['h:Reply-To'] = $values['inputEmail'];
            // $message['subject'] = $values['inputMatter'];
            // $message['html'] = $values['inputMessage'];
            


            
            $resend = Resend::client('re_UcXnvbA4_PLrcKr5hoyqmRpmSHqCHMLQr');

            try {
                $result = $resend->emails->send([
                    'from' => 'Acme <onboarding@resend.dev>',
                    'to' => ['miguelgandiajorda@gmail.com'],
                    'subject' => 'Hello world',
                    'html' => '<strong>It works!</strong>',
                ]);
            } catch (\Exception $e) {
                exit('Error: ' . $e->getMessage());
            }

            // Show the response of the sent email to be saved in a log...
            //echo $result->toJson();
            return $result->toJson();

            //return $result;
        }
    }