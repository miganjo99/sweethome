<?php
    class shop_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        

        public function select_filtro_operacion($db) {

            $sql = "SELECT * FROM operacion ORDER BY id_operacion ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_ciudad($db) {

            $sql = "SELECT * FROM ciudad ORDER BY id_ciudad ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_tipo($db) {

            $sql = "SELECT * FROM tipo ORDER BY id_tipo ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_categoria($db) {

            $sql = "SELECT *FROM categoria ORDER BY id_categoria ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filtro_orientacion($db) {

            $sql = "SELECT *FROM orientacion ORDER BY id_orientacion ASC;";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        
        public function select_details_vivienda($db, $id_vivienda) {
            $sql = "SELECT *
                    FROM vivienda v, ciudad c, categoria ca, tipo t, operacion o
                    WHERE v.id_vivienda = '$id_vivienda'
                    AND v.id_ciudad = c.id_ciudad 
                    AND v.id_categoria = ca.id_categoria
                    AND v.id_tipo = t.id_tipo
                    AND v.id_operacion = o.id_operacion;";
    
            $stmt = $db->ejecutar($sql);
    
            
            return $db->listar($stmt);

        }


        public function select_details_img($db, $id_vivienda) {
            $sql = "SELECT *
            FROM img_vivienda i
            WHERE i.id_vivienda = '$id_vivienda'";
    
            $stmt = $db->ejecutar($sql);
    
            
            return $db->listar($stmt);

        }
        
        public function likes($db, $username, $id_vivienda){
            
            
            $sql = "CALL procedure_like('$username', $id_vivienda)";
            
            $stmt = $db->ejecutar($sql);
            
            return $db->listar($stmt);            
        }

        
        public function mis_likes($db, $username) {
            $sql = "SELECT id_vivienda
            FROM likes l
            JOIN users u ON l.id_user = u.id_user
            WHERE u.username = '$username'";
    
            $stmt = $db->ejecutar($sql);
    
            
            return $db->listar($stmt);

        }



        public function select_viviendas_related($db , $type, $loaded, $items) {
            $sql = "SELECT * 
            FROM vivienda v, ciudad c
            WHERE v.id_ciudad = c.id_ciudad 
            AND v.id_ciudad = '$type'
            LIMIT $loaded, $items;";
    
            $stmt = $db->ejecutar($sql);
    
            
            return $db->listar($stmt);

        }

        public function select_count_viviendas_related($db , $related) {
            $sql = "SELECT COUNT(*) AS n_prod
            FROM vivienda v 
            WHERE v.id_ciudad = '$related';";
    
            $stmt = $db->ejecutar($sql);
    
            
            return $db->listar($stmt);

        }

        public function select_redirect_home($db ,$filters_home, $offset, $num_pages) {
            $sql = "SELECT * FROM vivienda v WHERE";
            
            foreach ($filters_home as &$value) {
                
                foreach ($value as $value_parsed) {

                    //return $value_parsed['categoria'][0];

                    if (isset($value_parsed['categoria'])) {
                        $prueba = $value_parsed['categoria'][0];
                        $sql .= " v.id_categoria = '$prueba'";
                    } elseif (isset($value_parsed['tipo'])) {
                        $prueba = $value_parsed['tipo'][0];
                        $sql .= " v.id_tipo = '$prueba'";
                    } elseif (isset($value_parsed['operacion'])) {
                        $prueba = $value_parsed['operacion'][0];
                        $sql .= " v.id_operacion = '$prueba'";
                    } elseif (isset($value_parsed['ciudad'])) {
                        $prueba = $value_parsed['ciudad'][0];
                        $sql .= " v.id_ciudad = '$prueba'";
                    }
                }
            
            }	
		    $sql .= " LIMIT $offset, $num_pages";
    
            //return $sql;

            $stmt = $db->ejecutar($sql);
    
            return $db->listar($stmt);

        }


        public function select_all_viviendas($db , $offset, $num_pages) {
            $sql = "SELECT * 
            FROM vivienda v  
            ORDER BY v.id_vivienda ASC
            LIMIT  $offset, $num_pages;";
    
          

            $stmt = $db->ejecutar($sql);
           
            return $db->listar($stmt);

        }

        public function select_filter_shop($db , $filters_shop, $offset, $num_pages) {
            $sql = "SELECT DISTINCT v.* FROM vivienda v, ciudad c, categoria ca, tipo t, operacion o, img_vivienda i";
		        //return $sql;
		
		        $index = 0;
                foreach ($filters_shop as &$value) {
                    foreach($value as &$value_parsed){

                        if ($index == 0 ) {
                            $sql .= " WHERE v." . $value_parsed[0] . "=" . $value_parsed[1]; 
                        } else {
                            $sql .= " AND v." . $value_parsed[0] . "=" . $value_parsed[1];
                        }
                        
                        $index++;
                    }
                }


	

		        $sql.= " LIMIT  $offset, $num_pages ";
    
                //return $sql;

            $stmt = $db->ejecutar($sql);
           
            return $db->listar($stmt);

        }
        public function select_filter_search($db , $filters_search, $offset, $num_pages) {

            $sql = "SELECT v.*
                    FROM vivienda v, ciudad c, innovacion i
                    WHERE v.id_innovacion = i.id_innovacion
                    AND v.id_ciudad = c.id_ciudad ";
                
            foreach ($filters_search as &$value) {
                foreach ($value as $value_parsed) {
                    //return $value_parsed['id_operacion'][0];
                    if (!empty($value_parsed['id_operacion'][0])) {
                        $sql .= " AND v.id_operacion = " . ($value_parsed['id_operacion'][0]);
                    }
                    elseif (!empty($value_parsed['id_innovacion'][0])) {
                        $sql .= " AND v.id_innovacion = " . ($value_parsed['id_innovacion'][0]);
                    }
                    elseif (!empty($value_parsed['ciudad'][0])) {
                        $sql .= " AND c.name_ciudad = '" . $value_parsed['ciudad'][0] . "'";
                    }
                }
            }

            $sql.= " LIMIT $offset, $num_pages";
    
                //return $sql;

            $stmt = $db->ejecutar($sql);
           
            return $db->listar($stmt);

        }

        public function select_count_home($db, $filters_home) {

            $sql = "SELECT DISTINCT COUNT(v.id_vivienda) contador
            FROM vivienda v
            WHERE";
    
            
            if (isset($filters_home[0]['tipo'])){
                $prueba = $filters_home[0]['tipo'][0];
                $sql.= " v.id_tipo = '$prueba'";
            }
            else if (isset($filters_home[0]['categoria'])) {
                $prueba = $filters_home[0]['categoria'][0];
                $sql.= " v.id_categoria = '$prueba'";
            }
            else if (isset($filters_home[0]['operacion'])) {
                $prueba = $filters_home[0]['operacion'][0];
                $sql.= " v.id_operacion = '$prueba'";
            }
            else if (isset($filters_home[0]['ciudad'])) {
                $prueba = $filters_home[0]['ciudad'][0];
                $sql.= " v.id_ciudad = '$prueba'";
            }
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
        public function select_count_shop($db, $filters_shop) {



            //return $filters_shop;

            $sql = "SELECT DISTINCT COUNT(v.id_vivienda) contador
            FROM vivienda v, ciudad c, categoria ca, tipo t, operacion o 
            WHERE v.id_ciudad=c.id_ciudad
            AND v.id_categoria=ca.id_categoria
            AND v.id_tipo=t.id_tipo
            AND v.id_operacion=o.id_operacion";

            for ($i = 0; $i < count($filters_shop); $i++) {
                if ($i == 0 ) {
                    $sql .= " AND v." . $filters_shop[$i][0] . "=" . $filters_shop[$i][1]; 
                } else {
                    $sql .= " AND v." . $filters_shop[$i][0] . "=" . $filters_shop[$i][1];
                }
                
            }  
            //return $sql;

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
        public function select_count_search($db, $filters_search) {

            $sql = "SELECT DISTINCT COUNT(v.id_vivienda) contador
            FROM vivienda v, ciudad c, innovacion i
            WHERE v.id_innovacion = i.id_innovacion
            AND v.id_ciudad = c.id_ciudad ";
            
            
            for ($i = 0; $i < count($filters_search); $i++) {
                if (!empty($filters_search[$i]['id_operacion'][0])) {
                    $sql .= " AND v.id_operacion = " . ($filters_search[$i]['id_operacion'][0]);
                }
                elseif (!empty($filters_search[$i]['id_innovacion'][0])) {
                    $sql .= " AND v.id_innovacion = " . ($filters_search[$i]['id_innovacion'][0]);
                }
                elseif (!empty($filters_search[$i]['ciudad'][0])) {
                    $sql .= " AND c.name_ciudad = '" . $filters_search[$i]['ciudad'][0] . "'";
                }
            } 
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_count_all($db) {

            $sql = "SELECT DISTINCT COUNT(v.id_vivienda) contador
            FROM vivienda v, ciudad c, categoria ca, tipo t, operacion o 
            WHERE v.id_ciudad=c.id_ciudad
            AND v.id_categoria=ca.id_categoria
            AND v.id_tipo=t.id_tipo
            AND v.id_operacion=o.id_operacion";
            

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        

        
    }

?>

