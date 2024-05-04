function carousel_innovacion() {
  ajaxPromise('index.php?module=home&op=carousel_innovacion','GET', 'JSON')
  .then(function(data) {   

      console.log(data);
      console.log("promesa data");
      
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
      .catch(function() {
          //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_tipo HOME";
          console.log("error en controllerhome, carousel inovacion");
      });
}

function carousel_tipo() {
  ajaxPromise('index.php?module=home&op=carousel_tipo','GET', 'JSON')
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
      .catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_tipo HOME";
        console.log("error en controllerhome, carousel tipo");
    });
}

function loadCategorias() {
  ajaxPromise('index.php?module=home&op=loadCategorias','GET', 'JSON')
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
 .catch(function() {
     //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
     console.log("error en controllerhome, carousel categorias");

 });
} 


  

$(document).ready(function() {
  carousel_innovacion();
  carousel_tipo();
  loadCategorias();
});