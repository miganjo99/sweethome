// ================AJAX-PROMISE================
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData,
            beforeSend: function() {
                $("#overlay").fadeIn(300);
            }
        }).done((data) => {
            setTimeout(function() {
                $("#overlay").fadeOut(300);
            }, 500);
            resolve(data)

        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
}

/* FRIENDLY URL */
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link += "/" + aux[1] + "/";	
        }else{
        	link += "/" + aux[1];
        }
    }
    return "http://localhost/sweethome" + link;
}



//================LOAD-HEADER================
function load_menu() {

    $(".forget_html").hide();//aqui está correcto?

    //$('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + ("index.php?module=home&op=view") + '" class="nav_link">Home</a>').appendTo('.nav');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=home") + '" class="nav_link">Home</a>').appendTo('.nav');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=shop") + '" class="nav_link">Shop</a>').appendTo('.nav');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=cart") + '" class="nav_link"><i class="fa-solid fa-cart-shopping"></i> Cart</a>').appendTo('.nav');
    
    var token = localStorage.getItem('token');
    
    if (!token) {
        $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=login") + '" class="nav_link">Login</a>').appendTo('.nav');

    }
       


    try {
        var parsear_token = JSON.parse(token);
        token = parsear_token;
    } catch (e) {
        console.log("No se ha podido parsear el token");
    }
    console.log(token);
    console.log("token");
    
    
    //token = JSON.parse(token);
    
    
    if (token) {

        $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=profile") + '" class="nav_link">Porfile</a>').appendTo('.nav');


        //ajaxPromise(friendlyURL('?module=login&op=data_user'), 'POST', 'JSON', {token: localStorage.getItem('token')})
        ajaxPromise(friendlyURL("?module=login&op=data_user"), 'POST', 'JSON', {token : token}  )
        .then(function(data) {
                // console.log(data);
                // console.log("data data_user");

                // console.log(data[0].type_user);
                // console.log("data menu logeado ");               


                $('.log-icon').empty();
                $('#user_info').empty();
                $('#login-register_view').empty();
                $('<img src="' + data[0].avatar + '"alt="Robot">').appendTo('.log-icon');
                $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#des_inf_user')
                    .html(
                        //'<a id="logout"><i id="icon-logout" class="fa-solid fa-right-from-bracket"></i></a>' +
                        '<a>' + data[0].username + '<a/>'

                    )

            }).catch(function() {
                console.log("Error al cargar los datos del user");
            });
    } else {
        console.log("No hay token disponible");
        $('.opc_CRUD').empty();
        $('.opc_exceptions').empty();
        $('#user_info').hide();
        $('.log-icon').empty();
        $('#log-icon').empty();
        $('#logout').hide();
        //$('<a href="index.php?module=ctrl_login&op=login-register_view"><i id="col-ico" class="fa-solid fa-user fa-2xl"></i></a>').appendTo('.log-icon');
    }
}


//================CLICK-LOGIUT================
function click_logout() {
    $(document).on('click', '#logout', function() {
        localStorage.removeItem('total_prod');
        toastr.success("Logout succesfully");
        setTimeout('logout(); ', 1000);
    });
}

//================LOG-OUT================
function logout() {
    //friendlyURL("?module=login&op=logout") 
    ajaxPromise(friendlyURL("?module=login&op=logout"), 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('token');
            
            window.location.href = friendlyURL("?module=home&op=view");
        }).catch(function() {
            console.log('Something has occured');
        });
}

// Remove localstorage('page') with click in shop
function click_shop() {
    $(document).on('click', '#opc_shop', function() {
        localStorage.removeItem('page');
        localStorage.removeItem('total_prod');
    });
}

$(document).ready(function() {
    load_menu();
    click_logout();
    click_shop();
    //load_content();
});