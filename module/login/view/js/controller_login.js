
function load_content() {
    let path = window.location.pathname.split('/');
    
    if(path[3] === 'recover'){
        //window.location.href = friendlyURL("?module=login&op=recover_view");
        console.log("Hola recover load content");
        localStorage.setItem("token_email", path[4]);

        load_form_new_password();


    }else if (path[3] === 'verify') {
        
        //ajaxPromise("index.php?module=login&op=verify_email", 'POST', 'JSON', {token_email: path[4]})
        ajaxPromise(friendlyURL('index.php?module=login&op=verify_email'), 'POST', 'JSON', {token_email: path[4]})
        .then(function(data) {

            console.log(data);
            console.log(" data load content ");

            if(data == "token_time_expired"){
                toastr.options.timeOut = 3000;
                toastr.error('el token ha expirado, vuelve a registrarte');

            }else if(data == "fail"){
                
                toastr.error('algo no ha ido bien, vuelve a registrarte');

            }else if(data == "verify") {
                toastr.success('Email verificado con éxito');
            }
            
        })
        .catch(function() {
          console.log('Error: verify email error');
        });
    }
    
    // else if (path[3] === 'view') {
        
    //     $(".login-wrap").show();
    //     $(".forget_html").hide();
        
    // }else if (path[3] === 'recover_view') {
    //     load_form_new_password();
    // }
}

function click_register(){
	$("#register_form").keypress(function(e) {
        

        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13){
        	e.preventDefault();
            register();
        }
    });

	$('#button_register').on('click', function(e) {
        

        toastr.success("Verifica el email en tu correo");

        e.preventDefault();
        register();
    }); 
}


function validate_register(){

    console.log("validate_register");

    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

	if(document.getElementById('username_reg').value.length === 0){
		document.getElementById('error_username_reg').innerHTML = "You have to write an username";
		error = true;
	}else{
        if(document.getElementById('username_reg').value.length > 15 || document.getElementById('username_reg').value.length < 5){
            document.getElementById('error_username_reg').innerHTML = "The username must be between 5 and 15 characters";
            error = true;
        }else{
            document.getElementById('error_username_reg').innerHTML = "";
        }
    }

    if(document.getElementById('pass_reg').value.length === 0){
		document.getElementById('error_password_reg').innerHTML = "You have to write a password";
		error = true;
	}else{
        if(document.getElementById('pass_reg').value.length < 8){
            document.getElementById('error_password_reg').innerHTML = "The password must be longer than 8 characters";
            error = true;
        }else{
            document.getElementById('error_password_reg').innerHTML = "";
        }
    }

    if(document.getElementById('pass_reg_2').value != document.getElementById('pass_reg').value){
		document.getElementById('error_password_reg_2').innerHTML = "Passwords don't match";
		error = true;
	}else{
        document.getElementById('error_password_reg_2').innerHTML = "";
    }

    if(document.getElementById('email_reg').value.length === 0){
		document.getElementById('error_email_reg').innerHTML = "You have to write an email";
		error = true;
	}else{
        if(!mail_exp.test(document.getElementById('email_reg').value)){
            document.getElementById('error_email_reg').innerHTML = "The email format is invalid"; 
            error = true;
        }else{
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }
	
    if(error == true){
        return 0;
    }
}

function register(){
    if(validate_register() != 0){
         var data=[];
        // data.ps2
        console.log("PUSH");
        data.push({ name: 'username_reg', value: document.getElementById('username_reg').value });
        data.push({ name: 'pass_reg', value: document.getElementById('pass_reg').value });
        data.push({ name: 'email_reg', value: document.getElementById('email_reg').value });


        console.log(data);
        $.ajax({
            url: friendlyURL("?module=login&op=register"),
            //url:"index.php?module=login&op=register",
            type: "POST",
            dataType: "JSON",
            data: data,
        }).done(function(result) { 

            console.log(result);
            console.log("result_register");
            
            if(result == "error"){	
                toastr.error("Email already in use");
	
                $("#error_email_reg").html('The email is already in use');
                $("#error_username_reg").html('The username is already in use');
            }else{
                toastr.options.timeOut = 2000;
                toastr.success("Email sended");

                //setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);

                 //setTimeout('window.location.href = "index.php?module=login&op=view"', 1000);

            }	
        }).fail(function() {
            console.log('Error: Register error');
        }); 
    }
}
//_____________________LOGIN_________________________________


function click_login(){
    $("#login_form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13){
            e.preventDefault();
            login();
        }
    });
    
    $('#button_login').on('click', function(e) {
        e.preventDefault();
        login();
    }); 

    $('#forget_pass').on('click', function(e) {
        e.preventDefault();
        
        console.log("click forget_pass");

        
        load_form_recover_password();
    }); 

    $('#google').on('click', function(e) {
        social_login('google');
    }); 

    $('#github').on('click', function(e) {
        social_login('github');
    }); 
}

function validate_login() {
    var error = false;

    if (document.getElementById('username').value.length === 0) {
        document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username').value.length < 5) {
            document.getElementById('error_username').innerHTML = "El usuario tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username').innerHTML = "";
        }
    }

    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_passwd').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_passwd').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

function login(){
    if(validate_login() != 0){
        // var data = $('#login_form').serialize();

        // console.log(data);
        // console.log("data login_form");

        var data=[];
        // data.ps2
        
        data.push({ name: 'username', value: document.getElementById('username').value });
        data.push({ name: 'password', value: document.getElementById('password').value });
        
        $.ajax({
            //url: "index.php?module=login&op=login",
            url: friendlyURL("?module=login&op=login"),
            dataType: "JSON",
            type: "POST",
            data: data,
        }).done(function(result) {

            console.log(result);
            console.log("result login");

            if(result == "user error"){		
                $("#error_username").html("The email or username does't exist");
            } else if (result == "error"){
                $("#error_passwd").html('Wrong password');
            } else if (result == "activate error"){
                toastr.options.timeOut = 3000;
                toastr.error("Verify the email");

            } else if (result == "attempts_error"){
                toastr.options.timeOut = 3000;
                toastr.error("Tu cuenta se ha bloqueado, revisa el whatsapp");            
            } else {

                localStorage.setItem("token", result);
                toastr.options.timeOut = 3000;
                toastr.success("Inicio de sesión realizado");
                // if(localStorage.getItem('likes') == null) {
                //     setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
                // } else {
                //     console.log(localStorage.getItem('product'));
                //     setTimeout('window.location.href = friendlyURL("?module=shop&op=view")', 1000);
                // }



                setTimeout('window.location.href = friendlyURL("?module=shop&op=view")', 1000);
            }	
        }).fail(function() {
            console.log('Error: Login error');
        });     
    }
}

function social_login(param){
    authService = firebase_config();
    authService.signInWithPopup(provider_config(param))
    .then(function(result) {
        console.log('Hemos autenticado al usuario ', result.user);
        email_name = result.user.email;
        let username = email_name.split('@');
        // let provider = 
        console.log(username[0]);

        //splitear el provider y enviarlo   a la consulta


        social_user = {id: result.user.uid, username: username[0], email: result.user.email, avatar: result.user.photoURL};

        // if (result) {
        //     ajaxPromise(friendlyURL("?module=login&op=social_login"), 'POST', 'JSON', social_user)
        //     .then(function(data) {
        //         localStorage.setItem("token", data);
        //         toastr.options.timeOut = 3000;
        //         toastr.success("Inicio de sesión realizado");
        //         if(localStorage.getItem('likes') == null) {
        //             setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
        //         } else {
        //             setTimeout('window.location.href = friendlyURL("?module=shop&op=view")', 1000);
        //         }
        //     })
        //     .catch(function() {
        //         console.log('Error: Social login error');
        //     });
        // }
    })
    .catch(function(error) {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        var email = error.email;
        console.log(email);
        var credential = error.credential;
        console.log(credential);
    });
}

function firebase_config(){

    if(!firebase.apps.length){//añadir libreria
        firebase.initializeApp(config);
    }else{
        firebase.app();
    }
    return authService = firebase.auth();
}

function provider_config(param){
    if(param === 'google'){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        return provider;
    }else if(param === 'github'){
        return provider = new firebase.auth.GithubAuthProvider();
    }
}


//______________________RECOVER_______________________________


function load_form_recover_password(){
    $(".login-wrap").hide();
    $(".forget_html").show();
    $('html, body').animate({scrollTop: $(".forget_html")});
    click_recover_password();
}

function click_recover_password(){
    $(".forget_html").keypress(function(e) {
   
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_recover_password();
        }
    });

    $('#button_recover').on('click', function(e) {
        e.preventDefault();
        
        console.log("click_recover_password");

        send_recover_password();
    }); 
}

function validate_recover_password(){
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if(document.getElementById('email_forg').value.length === 0){
		document.getElementById('error_email_forg').innerHTML = "Tienes que escribir un correo";
		error = true;
	}else{
        if(!mail_exp.test(document.getElementById('email_forg').value)){
            document.getElementById('error_email_forg').innerHTML = "El formato del mail es invalido"; 
            error = true;
        }else{
            document.getElementById('error_email_forg').innerHTML = "";
        }
    }
	
    if(error == true){
        return 0;
    }
}

function send_recover_password(){


    if(validate_recover_password() != 0){
        var data = $('#recover_email_form').serialize();

        console.log(data);
        console.log("validate_recover_password");


        $.ajax({
            //url: 'index.php?module=login&op=send_recover_email',
            url: friendlyURL('index.php?module=login&op=send_recover_email'),
            dataType: 'json',
            type: "POST",
            data: data,
        }).done(function(data) {

            console.log(data);
            console.log("send_recover_email");

            if(data == "error"){		
                $("#error_email_forg").html("The email doesn't exist");
            } else{
                toastr.options.timeOut = 3000;
                toastr.success("Email sended");
                //setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
                //setTimeout('window.location.href = "index.php?module=login&op=view"', 1000);
            }
        }).fail(function( textStatus ) {
            console.log('Error: Recover password error');
        });    
    }
}

function load_form_new_password(){
    token_email = localStorage.getItem('token_email');
    localStorage.removeItem('token_email');

    console.log("load form_new password");

    $.ajax({
        //url: 'index.php?module=login&op=verify_token',
        url: friendlyURL('?module=login&op=verify_token'),
        dataType: 'json',
        type: "POST",
        data: {token_email: token_email},
    }).done(function(data) {
        if(data == "verify"){
            click_new_password(token_email); 
        }else {
            console.log("error load_form_new_password");
            //toastr.error("vuelve al formulario de recuperacion");
        }
    }).fail(function( textStatus ) {
        console.log("Error: Verify token error");
    });    
}

function click_new_password(token_email){


    $(".recover_html").keypress(function(e) {   
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            console.log(token_email);
            console.log("token_email");
            send_new_password(token_email);
        }
    });

    $('#button_set_pass').on('click', function(e) {
        e.preventDefault();
        send_new_password(token_email);
    }); 
}

function validate_new_password(){
    var error = false;

    if(document.getElementById('pass_rec').value.length === 0){
		document.getElementById('error_password_rec').innerHTML = "You have to write a password";
		error = true;
	}else{
        if(document.getElementById('pass_rec').value.length < 8){
            document.getElementById('error_password_rec').innerHTML = "The password must be longer than 8 characters";
            error = true;
        }else{
            document.getElementById('error_password_rec').innerHTML = "";
        }
    }

    if(document.getElementById('pass_rec_2').value != document.getElementById('pass_rec').value){
		document.getElementById('error_password_rec_2').innerHTML = "Passwords don't match";
		error = true;
	}else{
        document.getElementById('error_password_rec_2').innerHTML = "";
    }

    if(error == true){
        return 0;
    }
}

function send_new_password(token_email){
    if(validate_new_password() != 0){
        var data = {token_email: token_email, password : $('#pass_rec').val()};
        console.log(data);

        $.ajax({
            //url: "index.php?module=login&op=new_password",
            url: friendlyURL("?module=login&op=new_password"),
            type: "POST",
            dataType: "JSON",
            data: data,
        }).done(function(data) {

            console.log(data);
            console.log("send_new_password");

            if(data == "done"){
                toastr.options.timeOut = 3000;
                toastr.success('New password changed');
                setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
                //setTimeout('window.location.href = "index.php?module=login&op=view"', 1000);
            } else {
                toastr.options.timeOut = 3000;
                toastr.error('Error seting new password');
            }
        }).fail(function(textStatus) {
            console.log("Error: New password error");
        });    
    }
}







$(document).ready(function(){
    load_content();
    click_register();
    click_login();
    //load_form_recover_password();//quitar
});