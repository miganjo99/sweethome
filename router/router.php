<?php

    require 'autoload.php';
    
    //   $path = $_SERVER['DOCUMENT_ROOT'] . '/sweethome/';
    //   include($path . "utils/common.inc.php");
    //   include($path . "module/home/resources/function.xml");
    //   include($path . "paths.php");

    ob_start();
    session_start();

    class router {
        private $uriModule;
        private $uriFunction;
        private $nameModule;
        static $_instance;
        
        public static function getInstance() {  /// Crea el constructor si no existe
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }

            return self::$_instance;
        }
    
        function __construct() {   
            if(isset($_GET['module'])){
                $this -> uriModule = $_GET['module'];
            }else{
                $this -> uriModule = 'home';
            }
            if(isset($_GET['op'])){
            
                if($_GET['op']==='verify'){

                    $this -> uriFunction = 'view';
                }
                else if($_GET['op']==='recover'){

                    $this -> uriFunction = 'recover_view';
                }else {

                    $this -> uriFunction = ($_GET['op'] === "") ? 'view' : $_GET['op'];
                }
                

            }else{
                $this -> uriFunction = 'view';
            }
        }
    
        function routingStart() {
            try {
                call_user_func(array($this -> loadModule(), $this -> loadFunction()));
                
            }catch(Exception $e) {
                common::load_error();
            }
        }
        
        private function loadModule() {
            if (file_exists('resources/modules.xml')) {
                $modules = simplexml_load_file('resources/modules.xml');
                foreach ($modules as $row) {
                    if (in_array($this -> uriModule, (Array) $row -> uri)) {
                        $path = MODULES_PATH . $row -> name . '/controller/controller_' . (String) $row -> name . '.class.singleton.php';
                        
                        if (file_exists($path)) {
                            require_once($path);
                            $controllerName = 'controller_' . (String) $row -> name;
                            $this -> nameModule = (String) $row -> name;
                            //return new $controllerName;
                            
                            return $controllerName::getInstance();
                        }
                    }
                }
            }
            throw new Exception('Not Module found.');

            // $path = 'module/home/controller/controller_home.class.php';
            // require_once($path);

            // $controllerName = 'controller_home';
            // return new $controllerName;

        }
        
        private function loadFunction() {
            $path = MODULES_PATH . $this -> nameModule . '/resources/function.xml'; 
            
            if (file_exists($path)) {
                $functions = simplexml_load_file($path);
                
                foreach ($functions as $row) {
                    if (in_array($this -> uriFunction, (Array) $row -> uri)) {   
                        return (String) $row -> name;
                    }
                }
            }
            throw new Exception('Not Function found.');

            //return (String) 'view';
            //return (String) 'loadViviendas';

        }
    }
    

    router::getInstance() -> routingStart();