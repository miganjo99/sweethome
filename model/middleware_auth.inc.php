<?php
class middleware {
    public static function decode_username($get_token){



		$jwt = parse_ini_file(UTILS . "jwt.ini");
		$secret = $jwt['secret'];
		$token = $get_token;

        // echo json_encode($token);
        // exit;

		$JWT = new jwt;
		$json = $JWT -> decode($token, $secret);
		$json = json_decode($json, TRUE);

        $decode_user = $json['username'];
        return $decode_user;
    }

 
	public static function decode_exp($get_token){
		$jwt = parse_ini_file(UTILS . "jwt.ini");
		$secret = $jwt['secret'];
		$token = $get_token;

		$JWT = new jwt;
		$json = $JWT -> decode($token, $secret);
		$json = json_decode($json, TRUE);

        $decode_exp = $json['exp'];
        return $decode_exp;
    }

	public static function create_token($username) {
        $jwt = parse_ini_file(UTILS . "jwt.ini");

        $header = $jwt['header'];
        $secret = $jwt['secret'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60), 'username' => $username]);

       

        $JWT = new jwt();
        return $JWT -> encode($header, $payload, $secret);
    }
}