<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/crud/crud_MVC/';
	include($path . "model/connect.php");
    
	


	class DAOHome {
		function select_tipo() {
			$sql= "SELECT * FROM `tipo` ORDER BY name_tipo ASC LIMIT 30;";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_innovacion() {
			$sql= "SELECT * FROM `innovacion` ORDER BY name_innovacion ASC LIMIT 30;";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_categorias() {
			$sql= "SELECT *FROM categoria";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_operacion() {
			$sql= "SELECT *FROM operacion ORDER BY id_operacion DESC";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_ciudad() {
			$sql= "SELECT * FROM ciudad ORDER BY id_ciudad DESC";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_vivienda() {
			$sql= "SELECT * FROM vivienda ORDER BY id_vivienda DESC";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}
		function select_recomendacion() {
			$sql= "SELECT * 
			FROM vivienda 
			ORDER BY id_vivienda DESC
			LIMIT 5";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}
		function select_mas_visitadas() {
			$sql= "SELECT * 
			FROM vivienda v, visitas vi
			WHERE v.id_vivienda=vi.id_vivienda 
			ORDER BY vi.num_visitas DESC LIMIT 5";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}
		// function select_recomendacion(){
		// 	$sql = "SELECT *
		// 	FROM vivienda v, ciudad c, categoria ca, tipo t, operacion o
		// 	WHERE v.id_ciudad = c.id_ciudad 
		// 	AND v.id_categoria = ca.id_categoria
		// 	AND v.id_tipo = t.id_tipo
		// 	AND v.id_operacion = o.id_operacion";
	
		// 	$conexion = connect::con();
		// 	$res = mysqli_query($conexion, $sql)->fetch_object();
		// 	connect::close($conexion);
	
		// 	return $res;
		// }
	
		
	}