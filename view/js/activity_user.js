function protecturl() {
    // var token_acc = localStorage.getItem('acces_token');
    // var token_ref = localStorage.getItem('refresh_token');
    var token = localStorage.getItem('token');
    
    try {
        var parsear_token = JSON.parse(token);
        token = parsear_token;
    } catch (e) {
        //console.log("No se ha podido parsear el token");
    }
    //ajaxPromise('module/login/ctrl/ctrl_login.php?op=controluser', 'POST', 'JSON', { 'acces_token': token_acc, 'refresh_token': token_ref })
    
    ajaxPromise(friendlyURL("?module=login&op=controluser"), 'POST', 'JSON', {token : token})
        .then(function(data) {
            // console.log(data);
            // console.log("*********************************************************");
            if (data == "Correct_User") {
                console.log("CORRECTO-->El usario coincide con la session");
                // console.log(data);
                // console.log("data refresh token controluser");


            } else if (data == "Wrong_User") {
                console.log("INCORRCTO--> Estan intentando acceder a una cuenta");
                //logout_auto();
                logout();
            } else if (data.length > 20){
                // console.log(data);
                // console.log("data.length");
                //localStorage.setItem("acces_token", data);
                localStorage.setItem("token", data);

            }
        })
        .catch(function() { console.log("ANONYMOUS_user") });
}

function control_activity() {
    //var token = localStorage.getItem('token');
    var token = localStorage.getItem('token');

    try {
        var parsear_token = JSON.parse(token);
        token = parsear_token;
    } catch (e) {
        console.log("No se ha podido parsear el token");
    }
    
    if (token) {
        //ajaxPromise('module/login/ctrl/ctrl_login.php?op=actividad', 'POST', 'JSON')
        ajaxPromise(friendlyURL("?module=login&op=actividad"), 'POST', 'JSON')
            .then(function(response) {
                

                if (response == "inactivo") {
                    toastr.warning("Caducó la sesión");
                    console.log("usuario INACTIVO");
                    setTimeout('logout(); ', 1500);
                } else {
                    console.log("usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usuario logeado");
    }
}



function refresh_cookie() {
    //ajaxPromise('module/login/ctrl/ctrl_login.php?op=refresh_cookie', 'POST', 'JSON')
    ajaxPromise(friendlyURL("?module=login&op=refresh_cookie"), 'POST', 'JSON')
        .then(function(response) {
            //console.log(response);
            console.log("Refresh cookie correctly");
        });
}



$(document).ready(function() {
    
    setInterval(function() { control_activity() }, 30000); //30seg= 30000
    //setInterval(function() { control_activity() }, 1000); //30seg= 30000
    protecturl();

    //setInterval(function() { refresh_token() }, 15000);


    //setInterval(function() { refresh_cookie() }, 10000);
    setInterval(function() { refresh_cookie() }, 600000);
});