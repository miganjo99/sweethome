

function click_register(){
	$("#register_form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13){
        	e.preventDefault();
            register();
        }
    });

	$('#button_register').on('click', function(e) {
        e.preventDefault();
        register();
    }); 
}



function validate_register(){
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
        var data = $('#register_form').serialize();
        $.ajax({
            //url: friendlyURL("?module=login&op=register"),
            url:"index.php?module=login&op=register",
            type: "POST",
            dataType: "JSON",
            data: data,
        }).done(function(result) { 
            
            console.log(result);
            console.log("result_register");
            
            if(result == "error"){		
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


$(document).ready(function(){
    //load_content();
    click_register();

});