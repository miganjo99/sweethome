

function loadViviendas() {
    

    //ajaxPromise('index.php?module=shop&op=loadViviendas','POST', 'JSON',{'num_pages' : 3 , 'offset' : 0})
    ajaxPromise('index.php?module=shop&op=loadViviendas','POST', 'JSON',{'num_pages' : 3 , 'offset' : 0})
    .then(function(data) {
    
        
            console.log(data);
        
            
            $('#content_shop_viviendas').empty();
            $('.date_vivienda' && '.date_img').empty();
            
    
            // var verificate_acces_token = localStorage.getItem('acces_token') || null;
    
            // if (verificate_acces_token !=  null) {
            //     mis_likes();     
            // }
    
            
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
                            
    
                            "<a id='" + data[row].id_vivienda + "'><i id=" + data[row].id_vivienda + " class='fa-regular fa-heart fa-lg details__heart'></i></a>" +
                            
    
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        )
                }
                }
        
    }).catch(function() {
        console.log("entro al CATCH");
    
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        // $('#content_shop_viviendas').empty();
        //     $('<div></div>').appendTo('#content_shop_viviendas')
        //     .html('<h1>No hay viviendas con estos filtros</h1>');
    });
}

function print_filters() {
    
    
    
    var filters_container = $('<div class="filters_container"></div>');
    

    ajaxPromise('index.php?module=shop&op=filtro_operacion', 'POST', 'JSON')
    .then(function(data) {
        var selectElement = $('<select class="filter_operacion" id="filter_operacion"></select>'); 
        selectElement.append($('<option class="filter_operacion" id="filter_operacion" value="0">Operacion</option>'));
        for (var row in data) {
            selectElement.append($('<option></option>').attr('value', data[row].id_operacion).text(data[row].name_operacion));
        }
        filters_container.append(selectElement); 
    });

    ajaxPromise('index.php?module=shop&op=filtro_ciudad', 'POST', 'JSON')
    .then(function(data) {
        var selectElement = $('<select class="filter_ciudad" id="filter_ciudad"></select>'); 
        selectElement.append($('<option class="filter_ciudad" id="filter_ciudad" value="0">Ciudad</option>'));

        for (var row in data) {
            selectElement.append($('<option></option>').attr('value', data[row].id_ciudad).text(data[row].name_ciudad));
        }
        filters_container.append(selectElement); 
    });

    ajaxPromise('index.php?module=shop&op=filtro_tipo', 'POST', 'JSON')
    .then(function(data) {
        var selectElement = $('<select class="filter_tipo" id="filter_tipo"></select>'); 
        selectElement.append($('<option class="filter_tipo" id="filter_tipo" value="0">Tipo</option>'));

        for (var row in data) {
            selectElement.append($('<option></option>').attr('value', data[row].id_tipo).text(data[row].name_tipo));
        }
        filters_container.append(selectElement); 
    });
    
    ajaxPromise('index.php?module=shop&op=filtro_categoria', 'POST', 'JSON')
    .then(function(data) {
        var selectElement = $('<select class="filter_categoria" id="filter_categoria"></select>'); 
        selectElement.append($('<option class="filter_categoria" id="filter_categoria" value="0">Categoria</option>'));

        for (var row in data) {
            selectElement.append($('<option></option>').attr('value', data[row].id_categoria).text(data[row].name_categoria));
        }
        filters_container.append(selectElement); 
    });
    
    ajaxPromise('index.php?module=shop&op=filtro_orientacion', 'POST', 'JSON')
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
                      
    
    // $(document).on('click', '.filter_remove', function() {
    //     remove_filters();
    // });

    // $(document).on('click', '.ultima_busqueda', function() {
    //     ultima_busqueda();
    // });
    //     localStorage.removeItem('filters_shop');       
}

function clicks() {
    
    $(document).on("click", ".more_info_list", function() {
        
        var id_vivienda = this.getAttribute('id');      
        //console.log(id_vivienda);
        localStorage.setItem('id', id_vivienda);
        loadDetails(id_vivienda);
    });
    
    
    // $(document).on("click", ".details__heart", function() {
    //     //alert("click like");


    //     var id_vivienda = this.getAttribute('id');

    //     localStorage.setItem("like",id_vivienda);

    //     likes(id_vivienda);
    // });
}

function loadDetails(id_vivienda) {
    //ajaxPromise('index.php?module=shop&op=details_vivienda&id=' + id_vivienda, 'GET', 'JSON')
    //console.log(id_vivienda);
    ajaxPromise('index.php?module=shop&op=details_vivienda', 'GET', 'JSON',{id_vivienda: id_vivienda})
    .then(function(data) {
        //console.log(data);
        //alert("load details");
        //$('#map').empty();
        $('#content_shop_viviendas').empty();
        $('.date_img_dentro').empty();
        $('.date_vivienda_dentro').empty();
        $('.pagination-container').empty();
        
        
        // var verificate_acces_token = localStorage.getItem('acces_token') || null;

            // if (verificate_acces_token !=  null) {//un unico filters
            //     mis_likes_details(id_vivienda);     
            // }

        for (row in data[1][0]) {
            $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'date_img_dentro' }).appendTo('.date_img')
                .html(
                    "<div class='content-img-details'>" +
                    "<img src= '" + data[1][0][row].img_vivienda + "'" + "</img>" +
                    "</div>"
                )
        }

        $('<div></div>').attr({ 'id': data[0][0].id_vivienda, class: 'date_vivienda_dentro' }).appendTo('.date_vivienda')
            .html(
                
                "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                "<div class='product-content_details'>" +
                "<h1><b>" + data[0][0].precio +" "+ "<i class='fa-solid fa-euro-sign'></i>"+"</b></h1>" +
                "<hr class=hr-shop>" +
                "<table id='table-shop'> <tr>" +
                "<td> <i id='col-ico' class='fa-regular fa-calendar fa-2xl'></i> &nbsp;" + data[0][0].antiguedad + " años" + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0][0].num_habs + " habitaciones" + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0][0].fecha_publicacion + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-bath fa-2xl'></i> &nbsp;" + data[0][0].aseos + " aseos"+ "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-house fa-2xl'></i> &nbsp;" + data[0][0].name_tipo + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-key fa-2xl'></i> &nbsp;" + data[0][0].name_operacion + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-city fa-2xl'></i> &nbsp;" + data[0][0].name_ciudad + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-trowel fa-2xl'></i> &nbsp;" + data[0][0].name_categoria + "</td>" +
                "</table>" +
                "<hr class=hr-shop>" +
                "<h3><b>" + "Descripción:" + "</b></h3>" +
                "<p>" + data[0][0].descripcion + "</p>" +
                "<div class='buttons_details'>" +
                "<a class='button add' href='#'>Contactar</a>" +
                "<a class='button buy' href='#'>Guardar</a>" +
                "<span class='button' id='price_details'>" + data[0][0].precio +" "+ "<i class='fa-solid fa-euro-sign'></i> </span>" +
                "<a id='" + data[0][0].id_vivienda + "'><i id=" + data[0][0].id_vivienda + " class='fa-regular fa-heart fa-lg details__heart'></i></a>" +
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
        
        // more_viviendas_related(data[0].id_ciudad);//fsts. el que vullgam que estiga relacionat
        // mapBox(data);

    }).catch(function() {
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
    });
}


$(document).ready(function() {
    
    print_filters();
    clicks();
    loadViviendas();
}); 
