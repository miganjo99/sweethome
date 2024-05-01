<?php
	if(isset($_GET['page'])){
		switch($_GET['page']){

			// case "shop";
			// 	include("module/shop/view/".$_GET['page'].".html");
			// break;
			// case "homepage";
			// 	include("module/homepage/view/".$_GET['page'].".html");
			// break;

			case "ctrl_home";
				include("module/homepage/ctrl/".$_GET['page'].".php");
			break;
			case "ctrl_shop";
				include("module/shop/ctrl/".$_GET['page'].".php");
			break;
			case "ctrl_login";
				include("module/login/ctrl/".$_GET['page'].".php");
			break;


			case "services";
				include("module/services/".$_GET['page'].".php");
				break;
			case "aboutus";
				include("module/aboutus/".$_GET['page'].".php");
				break;
			case "contactus";
				include("module/contact/".$_GET['page'].".php");
				break;
			case "404";
				include("view/inc/error".$_GET['page'].".php");
				break;
			case "503";
				include("view/inc/error".$_GET['page'].".php");
				break;
			default;
				include("module/inicio/view/inicio.php");
				break;
		}
	} else{
		include("module/homepage/view/homepage.html");
	}	
?>