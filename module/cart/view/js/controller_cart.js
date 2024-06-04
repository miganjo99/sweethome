
function carrito_usuario(){

  var token = localStorage.getItem('token');


  console.log("hola carrito_usuario");
      try {
        var parsear_token = JSON.parse(token);
        token = parsear_token;
      } catch (e) {
          //console.log("No se ha podido parsear el token");
      }


    if (token) {
      console.log("hay token en el cart ");
      ajaxPromise(friendlyURL("?module=cart&op=carrito_usuario"), 'POST', 'JSON', {'token': token})
        .then(function(data) {
            
          console.log("CARRITO USUARIO");
          console.log(data);

          if (data.length > 0) {
            console.log("Hay productos en el carrito");
            data.forEach(function(data) {
                var row = $("<div class='cart-item'></div>");
                row.append("<div>ID: " + data.id_vivienda + "</div>");
                //row.append("<div>Nombre: Vivienda " + data.id_vivienda + "</div>"); 
                row.append("<div>Precio: " + data.precio + "</div>");
                row.append("<div>Cantidad: " + data.cantidad + "</div>");
                row.append("<div>Subtotal: " + (data.precio * data.cantidad) + "</div>");
                row.append("<div><button class='add_viv'>Añadir</button><button class='remove_viv'>Quitar</button><button class='delete_linea'>Borrar</button></div>");
                $("#cartDiv").append(row);
            });
        } else {
            console.log("No hay productos en el carrito");
            $("#cartDiv").html("<p>No hay productos en el carrito</p>");
        }
          
          
        })   
  }else{
      toastr.warning("No tienes productos en el carrito");
    
  }

}




function click_compra(){
   
      // $('#comprar_sweethome').on('click', function(e) {
      //   alert("hola CLICK COMPRA");
      //   console.log("hola CLICK COMPRA");
      //   e.preventDefault();

      //   //compra();
      // });


    
  } 


$(document).ready(function() {
 
  click_compra();
  carrito_usuario();
});