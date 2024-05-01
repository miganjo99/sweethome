function protecturl() {
    var token_acc = localStorage.getItem('acces_token');
    var token_ref = localStorage.getItem('refresh_token');
    //  console.log(token_acc);
    //  console.log(token_ref);
    //  console.log("token_protecturl");

    ajaxPromise('module/login/ctrl/ctrl_login.php?op=controluser', 'POST', 'JSON', { 'acces_token': token_acc, 'refresh_token': token_ref })
        .then(function(data) {
            console.log(data);
            console.log("*********************************************************");
            if (data == "Correct_User") {
                console.log("CORRECTO-->El usario coincide con la session");
                console.log(data);
                console.log("data refresh token controluser");


            } else if (data == "Wrong_User") {
                console.log("INCORRCTO--> Estan intentando acceder a una cuenta");
                //logout_auto();
                logout();
            } else if (data.length > 20){
                console.log(data);
                console.log("data.length");
                localStorage.setItem("acces_token", data);

            }
        })
        .catch(function() { console.log("ANONYMOUS_user") });
}

function control_activity() {
    //var token = localStorage.getItem('token');
    var token = localStorage.getItem('acces_token');
    // console.log(token);
    // console.log("token_control_activity");
    if (token) {
        ajaxPromise('module/login/ctrl/ctrl_login.php?op=actividad', 'POST', 'JSON')
            .then(function(response) {
                // console.log(response);
                // console.log("response");

                if (response == "inactivo") {
                    toastr.warning("Caducó la sesión");
                    console.log("usuario INACTIVO");
                    //logout();
                    setTimeout('logout(); ', 1500);
                } else {
                    console.log("usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usuario logeado");
    }
}

// function refresh_token() {
//     var token = localStorage.getItem('refresh_token');
//     //var token = localStorage.getItem('refresh_token');
//     if (token) {
//         ajaxPromise('module/login/ctrl/ctrl_login.php?op=refresh_token', 'POST', 'JSON', { 'refresh_token': token })
//             .then(function(data_token) {
//                 console.log("Refresh token correctly");
//                 localStorage.setItem("refresh_token", data_token);
//                 load_menu();
//             });
//     }
// }

function refresh_cookie() {
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=refresh_cookie', 'POST', 'JSON')
        .then(function(response) {
            //console.log(response);
            console.log("Refresh cookie correctly");
        });
}

// function logout_auto() {
//     localStorage.removeItem('token');
//     toastr.warning("Se ha cerrado la cuenta por seguridad!!");
//     setTimeout('window.location.href = "index.php?module=ctrl_login&op=login-register_view";', 2000);
// }

$(document).ready(function() {
    
    setInterval(function() { control_activity() }, 30000); //30seg= 30000
    //setInterval(function() { control_activity() }, 1000); //30seg= 30000
    protecturl();

    //setInterval(function() { refresh_token() }, 15000);


    //setInterval(function() { refresh_cookie() }, 10000);
    setInterval(function() { refresh_cookie() }, 600000);
});