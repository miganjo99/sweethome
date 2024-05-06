function loadViviendas() {
    
    var verificate_filters_home = localStorage.getItem('filters_home') || null;//de false a null
    var verificate_filters_shop = localStorage.getItem('filters_shop') || null;//de false a null
    var verificate_filters_search = localStorage.getItem('filters_search') || null;//de false a null



    pagination();




    
    if (verificate_filters_home !=  null) {//un unico filters
        

        var filters_home=JSON.parse(verificate_filters_home);

        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=redirect_home", 'POST', 'JSON', {'filters_home' : filters_home });

        
    
    }else if(verificate_filters_shop !=  null){
        

        var filters_shop=JSON.parse(verificate_filters_shop);
       

        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filter", 'POST', 'JSON', { 'filters_shop': filters_shop  });
       
        
        setTimeout(() => {
            highlightFilters();
            
          }, "1000");
          
    }else if(verificate_filters_search !=  null){
        
        var filters_search=JSON.parse(verificate_filters_search);
      
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=search", 'POST', 'JSON', { 'filters_search': filters_search });

        setTimeout(() => {
            highlightFilters();
            
          }, "1000");
          
    }
    else {
       
        ajaxForSearch('module/shop/ctrl/ctrl_shop.php?op=all_viviendas','GET', 'JSON');
    }
}

function print_filters() {
    
    
    
    var filters_container = $('<div class="filters_container"></div>');
    

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_operacion', 'POST', 'JSON')
    .then(function(data) {
        var selectElement = $('<select class="filter_operacion" id="filter_operacion"></select>'); 
        selectElement.append($('<option class="filter_operacion" id="filter_operacion" value="0">Operacion</option>'));
        for (var row in data) {
            selectElement.append($('<option></option>').attr('value', data[row].id_operacion).text(data[row].name_operacion));
        }
        filters_container.append(selectElement); 
    });

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_ciudad', 'POST', 'JSON')
    .then(function(data) {
        var selectElement = $('<select class="filter_ciudad" id="filter_ciudad"></select>'); 
        selectElement.append($('<option class="filter_ciudad" id="filter_ciudad" value="0">Ciudad</option>'));

        for (var row in data) {
            selectElement.append($('<option></option>').attr('value', data[row].id_ciudad).text(data[row].name_ciudad));
        }
        filters_container.append(selectElement); 
    });

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_tipo', 'POST', 'JSON')
    .then(function(data) {
        var selectElement = $('<select class="filter_tipo" id="filter_tipo"></select>'); 
        selectElement.append($('<option class="filter_tipo" id="filter_tipo" value="0">Tipo</option>'));

        for (var row in data) {
            selectElement.append($('<option></option>').attr('value', data[row].id_tipo).text(data[row].name_tipo));
        }
        filters_container.append(selectElement); 
    });
    
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_categoria', 'POST', 'JSON')
    .then(function(data) {
        var selectElement = $('<select class="filter_categoria" id="filter_categoria"></select>'); 
        selectElement.append($('<option class="filter_categoria" id="filter_categoria" value="0">Categoria</option>'));

        for (var row in data) {
            selectElement.append($('<option></option>').attr('value', data[row].id_categoria).text(data[row].name_categoria));
        }
        filters_container.append(selectElement); 
    });
    
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filtro_orientacion', 'POST', 'JSON')
    .then(function(data) {
        var radio = $('<div class="radio_container"></div>'); 

        for (var row in data) {
            var eleccion_orientacion = $('<label></label>').text(data[row].name_orientacion);
            eleccion_orientacion.prepend('<input type="radio" name="orientacion" class="filter_orientacion" value="' + data[row].id_orientacion + '"> ');
            radio.append(eleccion_orientacion);
        }

        filters_container.append(radio); 
    });

    
        

    var botones = '<button class="filter_button button_spinner" id="filter_button">Filter</button>' +
                '<button class="filter_remove" id="Remove_filter">Remove</button>' +
                '<button class="ultima_busqueda" id="ultima_busqueda">ultima busqueda</button>';
    filters_container.append(botones);

            
    $('.filters_shop').html(filters_container);
                      
    
    $(document).on('click', '.filter_remove', function() {
        remove_filters();
    });

    $(document).on('click', '.ultima_busqueda', function() {
        ultima_busqueda();
    });
        //localStorage.removeItem('filters_shop');//se borran aqui los filtros?        
}

function ultima_busqueda() {
    
    var ultima_busqueda = localStorage.getItem('id');
    console.log("ultima_busqueda",ultima_busqueda);
    //var filter_ult=JSON.parse(ultima_busqueda);
       // ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filter_ult", 'POST', 'JSON', ultima_busqueda);

        ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filter_ult&ultima_busqueda=' + ultima_busqueda, 'GET', 'JSON')
        .then(function(data) {
            console.log(data);
           // alert("load details");

            $('#content_shop_viviendas').empty();
            $('.date_img_dentro').empty();
            $('.date_vivienda_dentro').empty();
    
            for (row in data[1][0]) {
                $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'date_img_dentro' }).appendTo('.date_img')
                    .html(
                        "<div class='content-img-details'>" +
                        "<img src= '" + data[1][0][row].img_vivienda + "'" + "</img>" +
                        "</div>"
                    )
            }
    
            $('<div></div>').attr({ 'id': data[0].id_vivienda, class: 'date_vivienda_dentro' }).appendTo('.date_vivienda')
                .html(
                    
                    "<div class='list_product_details'>" +
                    "<div class='product-info_details'>" +
                    "<div class='product-content_details'>" +
                    "<h1><b>" + data[0].precio +" "+ "<i class='fa-solid fa-euro-sign'></i>"+"</b></h1>" +
                    "<hr class=hr-shop>" +
                    "<table id='table-shop'> <tr>" +
                    "<td> <i id='col-ico' class='fa-regular fa-calendar fa-2xl'></i> &nbsp;" + data[0].antiguedad + " años" + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0].num_habs + " habitaciones" + "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0].fecha_publicacion + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-bath fa-2xl'></i> &nbsp;" + data[0].aseos + " aseos"+ "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-house fa-2xl'></i> &nbsp;" + data[0].name_tipo + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-key fa-2xl'></i> &nbsp;" + data[0].name_operacion + "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-city fa-2xl'></i> &nbsp;" + data[0].name_ciudad + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-trowel fa-2xl'></i> &nbsp;" + data[0].name_categoria + "</td>" +
                    "</table>" +
                    "<hr class=hr-shop>" +
                    "<h3><b>" + "Descripción:" + "</b></h3>" +
                    "<p>" + data[0].descripcion + "</p>" +
                    "<div class='buttons_details'>" +
                    "<a class='button add' href='#'>Contactar</a>" +
                    "<a class='button buy' href='#'>Guardar</a>" +
                    "<span class='button' id='price_details'>" + data[0].precio +" "+ "<i class='fa-solid fa-euro-sign'></i> </span>" +
                    "<a class='details__heart' id='" + data[0].id_vivienda + "'><i id=" + data[0].id_vivienda + " class='fa-solid fa-heart fa-lg'></i></a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                )
    
    
            $('.date_img').slick({
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 2600
            });
        }).catch(function() {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
        });    
   
}

function filter_button() {

    

    $(document).on('change', '.filter_ordenar', function() {
        console.log("Hola");
        console.log(this.value);
        localStorage.setItem('filter_ordenar', this.value);
    });
    if (localStorage.getItem('filter_ordenar')) {
        $('.filter_ordenar').val(localStorage.getItem('filter_ordenar'));
    }



    $(document).on('change', '.filter_operacion', function() {
        console.log("Hola");
        console.log(this.value);
        localStorage.setItem('filter_operacion', this.value);
    });
    if (localStorage.getItem('filter_operacion')) {
        $('.filter_operacion').val(localStorage.getItem('filter_operacion'));
    }


    

    $(document).on('change', '.filter_ciudad', function() {
        console.log("Hola");
        console.log(this.value);
        localStorage.setItem('filter_ciudad', this.value);
    });   
    if (localStorage.getItem('filter_ciudad')) {
        $('.filter_ciudad').val(localStorage.getItem('filter_ciudad'));
    }


    $(document).on('change', '.filter_tipo', function() {
        console.log("Hola");
        console.log(this.value);
        localStorage.setItem('filter_tipo', this.value);
    });
    if (localStorage.getItem('filter_tipo')) {
        $('.filter_tipo').val(localStorage.getItem('filter_tipo'));
    }


    $(document).on('change', '.filter_categoria', function() {
        console.log("Hola");
        console.log(this.value);
        localStorage.setItem('filter_categoria', this.value);
    });
    if (localStorage.getItem('filter_categoria')) {
        $('.filter_categoria').val(localStorage.getItem('filter_categoria'));
    }

    $(document).on('change', '.filter_orientacion', function() {
        console.log("Hola");
        console.log(this.value);
        localStorage.setItem('filter_orientacion', this.value);
    });
    if (localStorage.getItem('filter_orientacion')) {
        $('.filter_orientacion').val(localStorage.getItem('filter_orientacion'));
    }


    






    $(document).on('click', '.filter_button', function () {
        var filters_shop = [];

        if (localStorage.getItem('filter_ordenar')) {
            filters_shop.push(['precio', localStorage.getItem('filter_ordenar')])
        }
        
        if (localStorage.getItem('filter_operacion')) {
            filters_shop.push(['id_operacion', localStorage.getItem('filter_operacion')])
        }
        if (localStorage.getItem('filter_ciudad')) {
            filters_shop.push(['id_ciudad', localStorage.getItem('filter_ciudad')])
        }
        if (localStorage.getItem('filter_tipo')) {
            filters_shop.push(['id_tipo', localStorage.getItem('filter_tipo')])
        }
        if (localStorage.getItem('filter_categoria')) {
            filters_shop.push(['id_categoria', localStorage.getItem('filter_categoria')])
        }
        if (localStorage.getItem('filter_orientacion')) {
            filters_shop.push(['id_orientacion', localStorage.getItem('filter_orientacion')])
        }
       
    
        localStorage.removeItem('filters_shop'); 

        localStorage.setItem('filters_shop', JSON.stringify(filters_shop));   
        

        //localStorage.setItem('filters_shop', JSON.stringify(filters_ultimos));   

        location.reload();
        

        
    
    });
    
}

function highlightFilters() {
    
    
    var all_filters = JSON.parse(localStorage.getItem('filters_shop'));
    
    console.log("all_filters", all_filters);

    
    for (var i = 0; i < all_filters.length; i++) {
        var filter = all_filters[i];
        console.log("FILTER", filter);
    
        var nombre = filter[0];
        var valor = filter[1];
    
        if (nombre === 'id_operacion') {
            console.log('id_operacion', valor);
            $('#filter_operacion').val(valor);
        }
        if (nombre === 'id_ciudad') {
            console.log('id_ciudad', valor);
            $('#filter_ciudad').val(valor);
        }
        if (nombre === 'id_tipo') {
            console.log('id_tipo', valor);
            $('#filter_tipo').val(valor);
        }
        if (nombre === 'id_categoria') {
            console.log('id_categoria', valor);
            $('#filter_categoria').val(valor);
        }
        if (nombre === 'id_innovacion') {
            console.log('id_innovacion', valor);
            $('#filter_innovacion').val(valor);
        }
        if (nombre === 'id_orientacion') {
            $('input[name="orientacion"][value="' + valor + '"]').prop('checked', true);
        }
    }


}
    

function remove_filters() {
    

    localStorage.removeItem('filters_shop');
    localStorage.removeItem('filters_search');
    localStorage.removeItem('filters_home');

    localStorage.removeItem('filter_operacion');
    localStorage.removeItem('filter_ciudad');
    localStorage.removeItem('filter_tipo');
    localStorage.removeItem('filter_categoria');
    localStorage.removeItem('filter_orientacion');
    localStorage.removeItem('filter_ordenar');
    // localStorage.removeItem('filter_habitaciones');
    
    location.reload();
}

function ajaxForSearch(url, type, JSON, data=undefined, num_pages = 3 , offset = 0) {
    
   
    //ajaxPromise(url, type, JSON, data)
    //ajaxPromise(url, type, JSON, data, num_pages, offset)
    //ajaxPromise(url, 'POST', 'JSON', { 'filters_shop': filters_shop, 'filters_search': filters_search, 'filters_home': filters_home , 'num_pages': num_pages, 'offset': offset })

    

    //'filters_search': data ?????????
    //, 'filters_home' : data ??????
    ajaxPromise(url, type, JSON, {'filters_shop': data , 'filters_home' : data , 'filters_search' : data, 'num_pages': num_pages, 'offset': offset})
        .then(function(data) {

            console.log("RETURN CONSULTA");
            console.log(data);
           //alert("ajaxPromise shop dentro");
            $('#content_shop_viviendas').empty();
            $('.date_vivienda' && '.date_img').empty();
            //  $('.date_img_array').empty();
            //mis_likes();
            var verificate_acces_token = localStorage.getItem('acces_token') || null;

            if (verificate_acces_token !=  null) {
                mis_likes();     
            }

            //Mejora para que cuando no hayan resultados en los filtros aplicados
            
            if (data == "error") {
                $('<div></div>').appendTo('#content_shop_viviendas')
                    .html(
                        '<h3>¡No se encuentarn resultados con los filtros aplicados!</h3>'
                    )
            } else {
                
                for (row in data) {
                    
                    
                    $('<div></div>').attr({ 'id': data[row].id_vivienda, 'class': 'list_content_shop' }).appendTo('#content_shop_viviendas')
                        .html(
                            "<div class='list_product'>" +
                            "<div class='img-container'>" +
                            "<img src= '" + data[row].img_vivienda + "'" + "</img>" +
                            "</div>" +
                            "<div class='product-info'>" +
                            "<div class='product-content'>" +
                            "<h1><b>" + data[row].precio + "\u20AC " + "</b></h1>" +
                            "<p>Up-to-date maintenance and revisions</p>" +
                            "<ul>" +
                            "<li> <i id='col-ico' class='fa-solid fa-bath'></i>&nbsp;" + data[row].aseos + " aseos" + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-trowel'></i>&nbsp;" + data[row].estado + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-bed'></i>&nbsp;" + data[row].num_habs + " habitaciones" + "</li>" +
                            "</ul>" +
                            "<div class='buttons'>" +
                            "<button id='" + data[row].id_vivienda + "' class='more_info_list button add' >More Info</button>" +
                            // "<span class='button' id='price'>" + data[row].precio + '€' + "</span>" +


                            "<a id='" + data[row].id_vivienda + "'><i id=" + data[row].id_vivienda + " class='fa-regular fa-heart fa-lg details__heart'></i></a>" +
                            //"<a class='details__heart' id='" + data[row].id_vivienda + "'><i id=" + data[row].id_vivienda + " class='fa-regular fa-heart fa-lg'></i></a>" +
                            //"<a class='fa-regular fa-heart fa-lg' id='" + data[row].id_vivienda + "'></a>" +

                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        )
                       
                }
                mapBox_all(data);
            }
        }).catch(function() {
            console.log("entro al CATCH");

           // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
            // $('#content_shop_viviendas').empty();
            //     $('<div></div>').appendTo('#content_shop_viviendas')
            //     .html('<h1>No hay viviendas con estos filtros</h1>');
        });
        
}



function clicks() {
    
    $(document).on("click", ".more_info_list", function() {
        
        
        var id_vivienda = this.getAttribute('id');      
        localStorage.setItem('id', id_vivienda);
        loadDetails(id_vivienda);
    });
    
    
    $(document).on("click", ".details__heart", function() {
        //alert("click like");


        var id_vivienda = this.getAttribute('id');

        localStorage.setItem("like",id_vivienda);

        likes(id_vivienda);
    });
}

function loadDetails(id_vivienda) {
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=details_vivienda&id=' + id_vivienda, 'GET', 'JSON')
    .then(function(data) {
        //console.log(data);
        //alert("load details");
        //$('#map').empty();
        $('#content_shop_viviendas').empty();
        $('.date_img_dentro').empty();
        $('.date_vivienda_dentro').empty();
        $('.pagination-container').empty();

        var verificate_acces_token = localStorage.getItem('acces_token') || null;

            if (verificate_acces_token !=  null) {//un unico filters
                mis_likes_details(id_vivienda);     
            }

        for (row in data[1][0]) {
            $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'date_img_dentro' }).appendTo('.date_img')
                .html(
                    "<div class='content-img-details'>" +
                    "<img src= '" + data[1][0][row].img_vivienda + "'" + "</img>" +
                    "</div>"
                )
        }

        $('<div></div>').attr({ 'id': data[0].id_vivienda, class: 'date_vivienda_dentro' }).appendTo('.date_vivienda')
            .html(
                
                "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                "<div class='product-content_details'>" +
                "<h1><b>" + data[0].precio +" "+ "<i class='fa-solid fa-euro-sign'></i>"+"</b></h1>" +
                "<hr class=hr-shop>" +
                "<table id='table-shop'> <tr>" +
                "<td> <i id='col-ico' class='fa-regular fa-calendar fa-2xl'></i> &nbsp;" + data[0].antiguedad + " años" + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0].num_habs + " habitaciones" + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0].fecha_publicacion + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-bath fa-2xl'></i> &nbsp;" + data[0].aseos + " aseos"+ "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-house fa-2xl'></i> &nbsp;" + data[0].name_tipo + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-key fa-2xl'></i> &nbsp;" + data[0].name_operacion + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-city fa-2xl'></i> &nbsp;" + data[0].name_ciudad + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-trowel fa-2xl'></i> &nbsp;" + data[0].name_categoria + "</td>" +
                "</table>" +
                "<hr class=hr-shop>" +
                "<h3><b>" + "Descripción:" + "</b></h3>" +
                "<p>" + data[0].descripcion + "</p>" +
                "<div class='buttons_details'>" +
                "<a class='button add' href='#'>Contactar</a>" +
                "<a class='button buy' href='#'>Guardar</a>" +
                "<span class='button' id='price_details'>" + data[0].precio +" "+ "<i class='fa-solid fa-euro-sign'></i> </span>" +
                "<a id='" + data[0].id_vivienda + "'><i id=" + data[0].id_vivienda + " class='fa-regular fa-heart fa-lg details__heart'></i></a>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            )


        $('.date_img').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 2600
        });
        
        more_viviendas_related(data[0].id_ciudad);//fsts. el que vullgam que estiga relacionat
        mapBox(data);

    }).catch(function() {
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
    });
}


function likes(id_vivienda) {
    let acces_token = localStorage.getItem("acces_token");

    if (acces_token) {
        ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=likes', 'POST', 'JSON', {"acces_token": acces_token,"id_vivienda": id_vivienda})
        .then(function(data) {
            
            console.log(data);
            console.log("***************likes**************");


            if (data.result == 'add') {

                $('#' + id_vivienda + ' .details__heart').addClass('fa-solid');
                $('#' + id_vivienda + ' .details__heart').removeClass('fa-regular');
                
            } else if (data.result == 'borrar') {
                
                $('#' + id_vivienda + ' .details__heart').removeClass('fa-solid');
                $('#' + id_vivienda + ' .details__heart').addClass('fa-regular');

            }
        })
        .catch(function(error) {
            console.error("Error en el like", error);
        });
    } else {
        toastr.warning("Inicia sesión para poder dar like");
        setTimeout(function() {
            window.location.href = "index.php?page=ctrl_login&op=login-register_view";
        }, 2000);
    }
}


function mis_likes() {
    var acces_token = localStorage.getItem('acces_token');

    console.log("Token de acceso:", acces_token);

    if (acces_token != null) {
        ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=mis_likes', 'POST', 'JSON', {'acces_token': acces_token})
            .then(function(data) {
                console.log("Datos recibidos:", data);

                
                data.forEach(function(item) {
                    $('#' + item.id_vivienda + ' .details__heart').removeClass('fa-regular');
                    $('#' + item.id_vivienda + ' .details__heart').addClass('fa-solid');
                });
                
            })
            .catch(function(error) {
                console.error(error);

                toastr.error("Ocurrió un error al obtener tus likes.");
            });
    } else {
        toastr.warning("Debes iniciar sesión para ver tus likes.");
        setTimeout(function() {
            window.location.href = "index.php?page=ctrl_login&op=login-register_view";
        }, 2000);
    }
}
function mis_likes_details(id_vivienda) {
    var acces_token = localStorage.getItem('acces_token');

    console.log("Token de acceso:", acces_token);

    if (acces_token != null) {
        ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=mis_likes', 'POST', 'JSON', {'acces_token': acces_token})
            .then(function(data) {
                console.log(data);
                console.log("*************DETAILS********************");

                
                // data.forEach(function(item) {
                //     console.log(item.id_vivienda);
                //     $('#' + item.id_vivienda + ' .details__heart').removeClass('fa-regular');
                //     $('#' + item.id_vivienda + ' .details__heart').addClass('fa-solid');
                // });
                if(data.id_vivienda == id_vivienda){
                    $('#' + item.id_vivienda + ' .details__heart').removeClass('fa-regular');
                    $('#' + item.id_vivienda + ' .details__heart').addClass('fa-solid');
                }else{
                    $('#' + item.id_vivienda + ' .details__heart').removeClass('fa-solid');
                    $('#' + item.id_vivienda + ' .details__heart').addClass('fa-regular');
                }
                
            })
            .catch(function(error) {
                console.error(error);

            });
    } else {
        toastr.warning("Debes iniciar sesión para ver tus likes.");
        setTimeout(function() {
            window.location.href = "index.php?page=ctrl_login&op=login-register_view";
        }, 2000);
    }
}



function mapBox_all(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.61667, 38.83966492354664], // starting position [lng, lat]
        zoom: 6.5 // starting zoom
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('<h3 style="text-align:center;">' + data[row].precio + '€</h3>' +
        '<p style="text-align:center;">Estado: <b>' + data[row].estado + '</b></p>' +
        '<p style="text-align:center;">Descripcion: <b>' + data[row].descripcion + '</b></p>' +
        '<img src="' + data[row].img_vivienda + '"/>' +
        '<a class="button button-primary-outline button-ujarak button-size-1 wow fadeInLeftSmall more_info_list" ' +
        'data-wow-delay=".4s" id="' + data[row].id_vivienda + '">Read More</a>')
        marker.setPopup(minPopup)
            .setLngLat([data[row].long, data[row].lat])
            .addTo(map);
    }
}


function mapBox(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [data[0].long, data[0].lat], 
        zoom: 10
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('<h4>' + data[row].estado + '</h4><p>Categoria: ' + data[row].name_categoria + '</p>' +
            '<p>Precio: ' + data[row].precio + '€</p>' +
            '<img src=" ' + data[row].img_vivienda + '"/>')
        marker.setPopup(minPopup)
            .setLngLat([data[row].long, data[row].lat])
            .addTo(map);
    }
}

function pagination() {

    var filters_search = JSON.parse(localStorage.getItem('filters_search'));
    var filters_home = JSON.parse(localStorage.getItem('filters_home'));
    var filters_shop = JSON.parse(localStorage.getItem('filters_shop'));

    // var filters = {
    //     ...filters_search,
    //     ...filters_home,
    //     ...filters_shop
    // };

    //console.log(filters_search);
    //console.log("filters search pagination");


    var url;
    if (filters_search) {//Todo ifs
    url = "module/shop/ctrl/ctrl_shop.php?op=count_search";
    }
    if (filters_home) {
    url = "module/shop/ctrl/ctrl_shop.php?op=count_home";
    }
    if (filters_shop) {

    url = "module/shop/ctrl/ctrl_shop.php?op=count_shop";
    }
    if (!filters_search && !filters_home && !filters_shop) {
    url = "module/shop/ctrl/ctrl_shop.php?op=count_all";
    }
    //console.log("consulta", filters_home);
   

    ajaxPromise(url, 'POST', 'JSON', {'filters_search': filters_search, 'filters_home': filters_home, 'filters_shop': filters_shop})
    .then(function(data) {
            //alert("pagination");
            //console.log("hola paginacion",url);
            
            var num_prod = data[0].contador;
            console.log("num_prod",num_prod);
            
            if (num_prod >= 3) {
                num_pages = Math.ceil(num_prod / 3)//.ceil redondea hacia arriba
            } else {
                num_pages = 1;
            }

            $('#pagination').empty();

            for (var i = 1; i <= num_pages; i++) {
                //console.log("HOLA FOR PAGINATION");
                var pageButton = $('<button/>', {
                    text: i,
                    id: 'page_' + i ,
                    click: function() {
                        
                        var pageNum = parseInt($(this).text());
                        var offset = 3 * (pageNum - 1);
                        //console.log("OFFSET",offset);
                        //console.log("aaaaaaaaaaaaaaaaaa filters_shop aaaaaaaaaaaaaa",filters_shop);
                        localStorage.setItem('Pag_actual', pageNum);

                        $('button').removeClass('active');// borrar el ultimo pagina marcada

                        $(this).addClass('active');//marcar la pagina correcta
                        
                        if (filters_shop != null) {
                            console.log("HOLA IF PAGINATION SHOP");
                            console.log(offset);
                            console.log('offset');
                            //ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filter",'POST','JSON',{filters_shop : filters_shop, num_pages : 3, offset:  offset} );
                            ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filter", 'POST', 'JSON', {'filters_shop' : filters_shop }, num_pages = 3 , offset );
                        }
                        if (filters_home != null) {
                            console.log("HOLA IF PAGINATION HOME");
                            console.log(filters_home);
                            console.log('filters_home CHANGE PAG');
                            ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=redirect_home", 'POST', 'JSON', {'filters_home' : filters_home }, num_pages = 3 , offset );

                        } 
                        if (filters_search != null) {
                            console.log("HOLA IF PAGINATION HOME");
                            console.log(filters_search);
                            console.log('filters_shop CHANGE PAG');
                            ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=search", 'POST', 'JSON', {'filters_search' : filters_search }, num_pages = 3 , offset );

                        } else {
                            console.log("HOLA ELSE PAGINATION");
                            ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=all_viviendas", 'GET', 'JSON', undefined, num_pages = 3 , offset);
                        }
                        $('html, body').animate({ scrollTop: $(".wrap") });
                    }
                });
                $('#pagination').append(pageButton);
            }

            var pag_actual = localStorage.getItem('move') ? Math.floor(JSON.parse(localStorage.getItem('move'))[1] / 3) + 1 : 1;
            $('#page_' + pag_actual).addClass('active'); 


        })
}


function viviendas_related(offset = 0, related, total_items) {
    let items = 3;
    let loaded = offset;
    let type = related;
    let total_item = total_items;

    console.log(type);
    console.log("type");
    console.log(loaded);
    console.log("loaded");

    console.log(items);
    console.log("items");

    ajaxPromise("module/shop/ctrl/ctrl_shop.php?op=viviendas_related", 'POST', 'JSON', { 'type': type, 'loaded': loaded, 'items': items })
        .then(function(data) {
            console.log(data);
            console.log("hola viviendas related");

            if (loaded == 0) {
                $('<div></div>').attr({ 'id': 'title_content', class: 'title_content' }).appendTo('.results')
                    .html(
                        '<h2 class="cat">Viviendas related</h2>'
                    )
                for (row in data) {
                    if (data[row].id_vivienda != undefined) {
                        $('<div></div>').attr({ 'id': data[row].id_vivienda, 'class': 'more_info_list1' }).appendTo('.title_content')
                            .html(
                                "<div class='list_product2'>" +
                            "<div class='img-container'>" +
                            "<img src= '" + data[row].img_vivienda + "'" + "</img>" +
                            "</div>" +
                            "<div class='product-info'>" +
                            "<div class='product-content'>" +
                            "<h1><b>" + data[row].precio + "\u20AC " + "</b></h1>" +
                            "<p>Up-to-date maintenance and revisions</p>" +
                            "<ul>" +
                            "<li> <i id='col-ico' class='fa-solid fa-bath'></i>&nbsp;" + data[row].aseos + " aseos" + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-trowel'></i>&nbsp;" + data[row].estado + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-bed'></i>&nbsp;" + data[row].num_habs + " habitaciones" + "</li>" +
                            "</ul>" +
                            //"<div class='buttons'>" +
                            //"<button id='" + data[row].id_vivienda + "' class='more_info_list1 button add' >More Info</button>" +
                            //"<button class='button buy' >Buy</button>" +
                            //"<span class='button' id='price'>" + data[row].precio + '€' + "</span>" +
                            //"</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                            )
                    }
                }
                $('<div></div>').attr({ 'id': 'more_viviendas_button', 'class': 'more_viviendas_button' }).appendTo('.title_content')
                    .html(
                        '<button class="load_more_button" id="load_more_button">MÁS RELACIONADAS</button>'
                    )
            }
            if (loaded >= 3) {
                for (row in data) {
                    if (data[row].id_vivienda != undefined) {
                        //console.log(data);
                        $('<div></div>').attr({ 'id': data[row].id_vivienda, 'class': 'more_info_list1' }).appendTo('.title_content')
                            .html(
                                "<div class='list_product2'>" +
                                "<div class='img-container'>" +
                                "<img src= '" + data[row].img_vivienda + "'" + "</img>" +
                                "</div>" +
                                "<div class='product-info'>" +
                                "<div class='product-content'>" +
                                "<h1><b>" + data[row].precio + "\u20AC " + "</b></h1>" +
                                "<p>Up-to-date maintenance and revisions</p>" +
                                "<ul>" +
                                "<li> <i id='col-ico' class='fa-solid fa-bath'></i>&nbsp;" + data[row].aseos + " aseos" + "</li>" +
                                "<li> <i id='col-ico' class='fa-solid fa-trowel'></i>&nbsp;" + data[row].estado + "</li>" +
                                "<li> <i id='col-ico' class='fa-solid fa-bed'></i>&nbsp;" + data[row].num_habs + " habitaciones" + "</li>" +
                                "</ul>" +
                                "<div class='buttons'>" +
                                "<button id='" + data[row].id_vivienda + "' class='more_info_list1 button add' >More Info</button>" +
                                "<button class='button buy' >Buy</button>" +
                                "<span class='button' id='price'>" + data[row].precio + '€' + "</span>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>"

                            )
                    }
                }
                var total_viviendas = total_item - 3;
                console.log(total_viviendas);
                console.log("total viviendas:::::::::::::::::");
                console.log(loaded);
                console.log("loaded::::::::::::::::::");

                if (total_viviendas <= loaded) {
                    $('.more_viviendas_button').empty();
                    $('<div></div>').attr({ 'id': 'more_viviendas_button', 'class': 'more_viviendas_button' }).appendTo('.title_content')
                        .html(
                            "</br><button class='btn-notexist' id='btn-notexist'></button>"
                        )
                } else {
                    $('.more_viviendas_button').empty();
                    $('<div></div>').attr({ 'id': 'more_viviendas_button', 'class': 'more_viviendas_button' }).appendTo('.title_content')
                        .html(
                            '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                        )
                }
            }
        }).catch(function() {
            console.log("error viviendas_related");
        });
}

function more_viviendas_related(data) {
    var related = data;
    var offset = 0;
    //console.log(data);
    //console.log("Hola more viviendas");
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=count_viviendas_related', 'POST', 'JSON', { 'related': related })
        .then(function(data) {
            
            var total_items = data[0].n_prod;

            console.log(total_items);
            console.log("COUNT RELATED");
            viviendas_related(0, related, total_items);
            $(document).on("click", '.more_viviendas_button', function() {
                //alert("on click more info");
                offset = offset + 3;
                $('.more_viviendas_button').empty();
                viviendas_related(offset, related, total_items);
            });
        }).catch(function() {
            console.log('error total_items');
        });
}

$(document).ready(function() {
    print_filters();
    loadViviendas();
    filter_button();
    clicks();
    //load_viviendas_filters_home();
    pagination();
}); 
