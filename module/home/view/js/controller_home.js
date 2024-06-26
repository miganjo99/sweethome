function carousel_innovacion() {
  //ajaxPromise('index.php?module=home&op=carousel_innovacion','GET', 'JSON')
  ajaxPromise(friendlyURL('?module=home&op=carousel_innovacion'),'GET', 'JSON')
  .then(function(data) {   

    //   console.log(data);
    //   console.log("promesa data");
      
      for (row in data) {
               
              $('<div></div>').attr('class', "carousel__elements_innovacion").attr('id', data[row].id_innovacion).appendTo(".carousel__innovacion")
              .html(
                  "<img class='carousel__img_innovacion' id='' src='http://localhost/sweethome/" + data[row].img_innovacion + "' alt='' >"
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
      .catch(function() {
          console.log("error en controllerhome, carousel inovacion");
      });
}

function carousel_tipo() {
  //ajaxPromise('index.php?module=home&op=carousel_tipo','GET', 'JSON')
  ajaxPromise(friendlyURL('?module=home&op=carousel_tipo'),'GET', 'JSON')
  .then(function(data) {        
      //console.log(data);
      
      for (row in data) {
              $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].id_tipo).appendTo(".carousel__list")
              .html(
                  "<img class='carousel__img' id='' src='http://localhost/sweethome/" + data[row].img_tipo + "' alt='' >"
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
      .catch(function() {
        console.log("error en controllerhome, carousel tipo");
    });
}

function loadCategorias() {
  //ajaxPromise('index.php?module=home&op=loadCategorias','GET', 'JSON')
  ajaxPromise(friendlyURL('?module=home&op=loadCategorias'),'GET', 'JSON')  
  .then(function(data) {
      for (row in data) {
          $('<div></div>').attr('class', "div_cate").attr({ 'id': data[row].id_categoria }).appendTo('#containerCategories')
              .html(
                  "<li class='portfolio-item'>" +
                  "<div class='item-main'>" +
                  "<div class='portfolio-image'>" +
                  "<img src = 'http://localhost/sweethome/" + data[row].img_categoria + "' alt='foto' </img> " +
                  "</div>" +
                  "<h5>" + data[row].name_categoria + "</h5>" +
                  "</div>" +
                  "</li>"
              )
      }
  })
 .catch(function() {
     console.log("error en controllerhome,  categorias");

 });
} 

function loadOperacion() {
  //ajaxPromise('index.php?module=home&op=loadOperacion','GET', 'JSON')
  ajaxPromise(friendlyURL('?module=home&op=loadOperacion'),'GET', 'JSON')  
  .then(function(data) {
      for (row in data) {
          $('<div></div>').attr('class', "div_op").attr({ 'id': data[row].id_operacion }).appendTo('#containerOperacion')
              .html(
                  "<li class='portfolio-item'>" +
                  "<div class='item-main'>" +
                  "<div class='portfolio-image'>" +
                  "<img src = 'http://localhost/sweethome/" + data[row].img_operacion + "' alt='foto'" +
                  "</div>" +
                  "<h5>" + data[row].name_operacion + "</h5>" +
                  "</div>" +
                  "</li>"
              )

      }
  })
  .catch(function() {
      console.log("error en controllerhome,  operacion");

  });
}

function loadCiudad() {
  //ajaxPromise('index.php?module=home&op=loadCiudad','GET', 'JSON')
  ajaxPromise(friendlyURL('?module=home&op=loadCiudad'),'GET', 'JSON')  
  .then(function(data) {
      for (row in data) {
          $('<div></div>').attr('class', "div_ciu").attr({ 'id': data[row].id_ciudad }).appendTo('#containerCiudad')
              .html(
                  "<li class='portfolio-item'>" +
                  "<div class='item-main'>" +
                  "<div class='portfolio-image'>" +
                  "<img src = 'http://localhost/sweethome/" + data[row].img_ciudad + "' alt='foto' </img> " +
                  "</div>" +
                  "<h5>" + data[row].name_ciudad + "</h5>" +
                  "</div>" +
                  "</li>"
              )
      }
  })
 .catch(function() {
  console.log("error en controllerhome,  ciudad");
   });
}
  
function loadRecomendaciones() {
  //ajaxPromise('index.php?module=home&op=loadRecomendaciones','GET', 'JSON')
  ajaxPromise(friendlyURL('?module=home&op=loadRecomendaciones'),'GET', 'JSON')  
  .then(function(data) {
      //console.log(data);
      for (row in data) {
          $('<div></div>').attr('class', "div_recom").attr({ 'id': data[row].id_vivienda }).appendTo('#containerRecomendaciones')
              .html(
                  "<li class='portfolio-item'>" +
                  "<div class='item-main'>" +
                  "<div class='portfolio-image'>" +
                  "<img src = 'http://localhost/sweethome/" + data[row].img_vivienda + "' alt='foto' </img> " +
                  "</div>" +
                  "<h5>" + data[row].estado + ",   " +data[row].m2+" m2"+ "</h5>" +
                  "</div>" +
                  "</li>"
              )
      }
  })
 .catch(function() {
  console.log("error en controllerhome,  recomendacion");
 });
}

function loadMasVisitadas() {
  //ajaxPromise('index.php?module=home&op=loadMasVisitadas','GET', 'JSON')
  ajaxPromise(friendlyURL('?module=home&op=loadMasVisitadas'),'GET', 'JSON')  
  .then(function(data) {
      //console.log(data);
      for (row in data) {
          $('<div></div>').attr('class', "div_visit").attr({ 'id': data[row].id_vivienda }).appendTo('#containerMasVisitadas')
              .html(
                  "<li class='portfolio-item'>" +
                  "<div class='item-main'>" +
                  "<div class='portfolio-image'>" +
                  "<img src = 'http://localhost/sweethome/" + data[row].img_vivienda + "' alt='foto' </img> " +
                  "</div>" +
                  "<h5>" + data[row].estado + ",   " +data[row].m2+" m2"+ "</h5>" +
                  "</div>" +
                  "</li>"
              )
      }
  })
 .catch(function() {
  console.log("error en controllerhome,  visitadas");
 });
}


function clicks(){
    $(document).on("click",'div.carousel__elements', function (){
        var filters_home = [];
        filters_home.push({"tipo":[this.getAttribute('id')]});
        

        localStorage.removeItem('filters_home')
       
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); //guardar en filters_shop
            setTimeout(function(){ 
            //window.location.href = 'index.php?module=shop&op=view';
            window.location.href = friendlyURL('index.php?module=shop&op=view');
            }, 1000);  
    }); 

    $(document).on("click",'div.div_cate', function (){ 
      var filters_home = [];
      filters_home.push({"categoria":[this.getAttribute('id')]});

      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
        setTimeout(function(){ 
          //window.location.href = 'index.php?module=shop&op=view';
          window.location.href = friendlyURL('index.php?module=shop&op=view');
        }, 1000);  
    });

    $(document).on("click",'div.div_op', function (){
      var filters_home = [];
      filters_home.push({"operacion":[this.getAttribute('id')]});


      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
        setTimeout(function(){ 
          //window.location.href = 'index.php?module=shop&op=view';
          window.location.href = friendlyURL('index.php?module=shop&op=view');
        }, 1000);  
    });

    $(document).on("click",'div.div_ciu', function (){
      var filters_home = [];
      filters_home.push({"ciudad":[this.getAttribute('id')]});


      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
        setTimeout(function(){ 
          //window.location.href = 'index.php?module=shop&op=view';
          window.location.href = friendlyURL('index.php?module=shop&op=view');
        }, 1000);  
    });

   
    
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