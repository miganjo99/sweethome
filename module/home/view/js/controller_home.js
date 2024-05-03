function carousel_innovacion() {
  ajaxPromise('module=home&op=Carrousel_innovacion','GET', 'JSON')
  //module=home&op=carrusel
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
      .catch(function() {
          //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_tipo HOME";
          console.log("error en controllerhome, carousel inovacion");
      });
}



  

$(document).ready(function() {
  console.log("hola js");
  carousel_innovacion();
  category();
 
});