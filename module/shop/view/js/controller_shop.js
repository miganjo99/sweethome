

function loadViviendas() {
    
    // var verificate_filters_home = localStorage.getItem('filters_home') || null;//de false a null
    // var verificate_filters_shop = localStorage.getItem('filters_shop') || null;//de false a null
    // var verificate_filters_search = localStorage.getItem('filters_search') || null;//de false a null



    //pagination();


  

    
    // if (verificate_filters_home !=  null) {//un unico filters
        

    //     var filters_home=JSON.parse(verificate_filters_home);

    //     ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=redirect_home", 'POST', 'JSON', {'filters_home' : filters_home });

        
    
    // }else if(verificate_filters_shop !=  null){
        

    //     var filters_shop=JSON.parse(verificate_filters_shop);
       

    //     ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filter", 'POST', 'JSON', { 'filters_shop': filters_shop  });
       
        
    //     setTimeout(() => {
    //         highlightFilters();
            
    //       }, "1000");
          
    // }else if(verificate_filters_search !=  null){
        
    //     var filters_search=JSON.parse(verificate_filters_search);
      
    //     ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=search", 'POST', 'JSON', { 'filters_search': filters_search });

    //     setTimeout(() => {
    //         highlightFilters();
            
    //       }, "1000");
          
    // }
    // else {
       console.log("Holala load viviendas.........................");
        ajaxForSearch('index.php?module=shop&op=list','POST', 'JSON');
                    //index.php?module=home&op=carousel_innovacion
    // }
}



function ajaxForSearch(url, type, JSON, data=undefined, num_pages = 3 , offset = 0) {
    
    // console.log(url);
    // console.log(type);
    // console.log(JSON);
    // console.log("Holala ayaxForSearch");

    ajaxPromise(url, type, JSON, {'filters_shop': data , 'filters_home' : data , 'filters_search' : data, 'num_pages': num_pages, 'offset': offset})
        .then(function(data) {

            console.log("RETURN CONSULTA");
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

function pagination() {

    var filters_search = JSON.parse(localStorage.getItem('filters_search'));
    var filters_home = JSON.parse(localStorage.getItem('filters_home'));
    var filters_shop = JSON.parse(localStorage.getItem('filters_shop'));


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



$(document).ready(function() {
    

    loadViviendas();
    
    //pagination();
}); 
