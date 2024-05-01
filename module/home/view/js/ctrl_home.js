function carousel_innovacion() {
    ajaxPromise('module/homepage/ctrl/ctrl_home.php?op=Carrousel_innovacion','GET', 'JSON')
    .then(function(data) {        
        //console.log(data);
        
        for (row in data) {
                $('<div></div>').attr('class', "carousel__elements_innovacion").attr('id', data[row].id_innovacion).appendTo(".carousel__innovacion")
                .html(
                    "<img class='carousel__img_innovacion' id='' src='" + data[row].img_innovacion + "' alt='' >"
                    +
                    "<h5 class='tipo_name_innovacion'>" + data[row].name_innovacion + "</h5>" 
                    +"<br><br><br>"+"<br><br><br>"
                )
            }
            new Glider(document.querySelector('.carousel__innovacion'), {
                slidesToShow: 3,
                slidesToScroll: 1,
                draggable: true,
                dots: '.dots',
                arrows: {
                  prev: '.glider-prev',
                  next: '.glider-next'
                }
              });
        })
        // .catch(function() {
        //     window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_tipo HOME";
        // });
}

function carousel_tipo() {
    ajaxPromise('module/homepage/ctrl/ctrl_home.php?op=Carrousel_tipo','GET', 'JSON')
    .then(function(data) {        
        //console.log(data);
        
        for (row in data) {
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].id_tipo).appendTo(".carousel__list")
                .html(
                    "<img class='carousel__img' id='' src='" + data[row].img_tipo + "' alt='' >"
                    +
                    "<h5 class='tipo_name'>" + data[row].name_tipo + "</h5>" 
                )
            }
            new Glider(document.querySelector('.carousel__list'), {
                slidesToShow: 3,
                dots: '.carousel__indicator',
                draggable: true,
                arrows: {
                    prev: '.carousel__prev',
                    next: '.carousel__next'
                }
            });
        })
        // .catch(function() {
        //     window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_tipo HOME";
        // });
}


function loadCategorias() {
    ajaxPromise('module/homepage/ctrl/ctrl_home.php?op=homePageCategoria','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', "div_cate").attr({ 'id': data[row].id_categoria }).appendTo('#containerCategories')
                .html(
                    "<li class='portfolio-item'>" +
                    "<div class='item-main'>" +
                    "<div class='portfolio-image'>" +
                    "<img src = " + data[row].img_categoria + " alt='foto' </img> " +
                    "</div>" +
                    "<h5>" + data[row].name_categoria + "</h5>" +
                    "</div>" +
                    "</li>"
                )
        }
    })
   //.catch(function() {
   //     window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
   // });
}   
function loadOperacion() {
    ajaxPromise('module/homepage/ctrl/ctrl_home.php?op=homePageOperacion','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', "div_op").attr({ 'id': data[row].id_operacion }).appendTo('#containerOperacion')
                .html(
                    "<li class='portfolio-item'>" +
                    "<div class='item-main'>" +
                    "<div class='portfolio-image'>" +
                    "<img src = " + data[row].img_operacion + " alt='foto'" +
                    "</div>" +
                    "<h5>" + data[row].name_operacion + "</h5>" +
                    "</div>" +
                    "</li>"
                )

        }
    })
    // .catch(function() {
    //     window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
    // });
}
function loadCiudad() {
    ajaxPromise('module/homepage/ctrl/ctrl_home.php?op=homePageCiudad','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', "div_ciu").attr({ 'id': data[row].id_ciudad }).appendTo('#containerCiudad')
                .html(
                    "<li class='portfolio-item'>" +
                    "<div class='item-main'>" +
                    "<div class='portfolio-image'>" +
                    "<img src = " + data[row].img_ciudad + " alt='foto' </img> " +
                    "</div>" +
                    "<h5>" + data[row].name_ciudad + "</h5>" +
                    "</div>" +
                    "</li>"
                )
        }
    })
   //.catch(function() {
   //     window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
   // });
}
function loadRecomendaciones() {
    ajaxPromise('module/homepage/ctrl/ctrl_home.php?op=homePageRecomendaciones','GET', 'JSON')
    .then(function(data) {
        //console.log(data);
        for (row in data) {
            $('<div></div>').attr('class', "div_recom").attr({ 'id': data[row].id_vivienda }).appendTo('#containerRecomendaciones')
                .html(
                    "<li class='portfolio-item'>" +
                    "<div class='item-main'>" +
                    "<div class='portfolio-image'>" +
                    "<img src = " + data[row].img_vivienda + " alt='foto' </img> " +
                    "</div>" +
                    "<h5>" + data[row].estado + ",   " +data[row].m2+" m2"+ "</h5>" +
                    "</div>" +
                    "</li>"
                )
        }
    })
   //.catch(function() {
   //     window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
   // });
}
function loadMasVisitadas() {
    ajaxPromise('module/homepage/ctrl/ctrl_home.php?op=homePageMasVisitadas','GET', 'JSON')
    .then(function(data) {
        //console.log(data);
        for (row in data) {
            $('<div></div>').attr('class', "div_visit").attr({ 'id': data[row].id_vivienda }).appendTo('#containerMasVisitadas')
                .html(
                    "<li class='portfolio-item'>" +
                    "<div class='item-main'>" +
                    "<div class='portfolio-image'>" +
                    "<img src = " + data[row].img_vivienda + " alt='foto' </img> " +
                    "</div>" +
                    "<h5>" + data[row].estado + ",   " +data[row].m2+" m2"+ "</h5>" +
                    "</div>" +
                    "</li>"
                )
        }
    })
   //.catch(function() {
   //     window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
   // });
}
function clicks(){
    $(document).on("click",'div.carousel__elements', function (){
        var filters_home = [];
        filters_home.push({"tipo":[this.getAttribute('id')]});
        
       // console.log(filters);
        //alert("click carroussel");
        localStorage.removeItem('filters_home')
       
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); //guardar en filters_shop
            setTimeout(function(){ 
            window.location.href = 'index.php?page=ctrl_shop&op=list';
            }, 1000);  
    }); 

    $(document).on("click",'div.div_cate', function (){ 
      var filters_home = [];
      filters_home.push({"categoria":[this.getAttribute('id')]});

      //console.log(filters);
      //alert("click");

      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
        setTimeout(function(){ 
          window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 1000);  
    });

    $(document).on("click",'div.div_op', function (){
      var filters_home = [];
      filters_home.push({"operacion":[this.getAttribute('id')]});

      //console.log(filters);
      //alert("click");

      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
        setTimeout(function(){ 
          window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 1000);  
    });

    $(document).on("click",'div.div_ciu', function (){
      var filters_home = [];
      filters_home.push({"ciudad":[this.getAttribute('id')]});

      //console.log(filters_home);
      //alert("click");

      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
        setTimeout(function(){ 
          window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 1000);  
    });

    // $(document).on("click",'div.div_recom', function (){
    //   var filters_home = [];
    //   filters_home.push({"recomenacion":[this.getAttribute('id')]});

    //   console.log(filters_home);
    //   alert("click");

    //   localStorage.removeItem('filters_home')
    //   localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
    //     setTimeout(function(){ 
    //       //window.location.href = 'index.php?page=ctrl_shop&op=list';
    //     }, 1000);  
    // });
    
  } 



$(document).ready(function() {
    carousel_innovacion();
    carousel_tipo();
    loadCategorias();
    loadOperacion();
    loadCiudad();
    loadRecomendaciones();
    loadMasVisitadas();
    clicks();
});