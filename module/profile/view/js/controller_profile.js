
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
                var row = $("<div class='cart_tabla'></div>");
                row.append("<div><img src= 'http://localhost/sweethome/" + data.img_vivienda + "'" + "</img>"+ "</div>");
                row.append("<div>ID: " + data.id_vivienda + "</div>");
                row.append("<div>Estado: " + data.estado + "</div>");
                row.append("<div>m2: " + data.m2 + "</div>");
                //row.append("<div>Nombre: Vivienda " + data.id_vivienda + "</div>"); 
                row.append("<div>Precio: " + data.precio + "</div>");
                row.append("<div>Cantidad: " + data.cantidad + "</div>");
                row.append("<div>Subtotal: " + (data.precio * data.cantidad) + "</div>");
                row.append("<div class='buttons_cart'><button id='" + data.id_vivienda +
                 "' class='add_viv'>Añadir</button><button id='" + data.id_vivienda +
                  "' class='remove_viv'>Quitar</button><button id='" + data.id_vivienda +
                   "' class='delete_linea'>Borrar</button></div>");
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




function clicks_carrito(){
   
    $(document).on('click', '.add_viv', function(e) {
      var id_vivienda = this.getAttribute('id');      
      console.log("hola add_viv");
      add_vivienda(id_vivienda);
    });

    $(document).on('click', '.remove_viv', function(e) {
      var id_vivienda = this.getAttribute('id');      
      console.log("hola remove_viv");
      quitar_vivienda(id_vivienda); 
    });

    $(document).on('click', '.delete_linea', function(e) {
      var id_vivienda = this.getAttribute('id');      
      console.log("hola delete_linea");
      borrar_linea(id_vivienda);
  
    });
}  


function add_vivienda(id_vivienda){

  var token = localStorage.getItem('token');
  console.log("hola add_vivienda");
  console.log(id_vivienda);
  console.log(token);

  try {
    var parsear_token = JSON.parse(token);
    token = parsear_token;
  } catch (e) {
      //console.log("No se ha podido parsear el token");
  }

  if (token) {
    console.log("hay token en el cart ");
    ajaxPromise(friendlyURL("?module=cart&op=add_vivienda"), 'POST', 'JSON', {'token': token, 'id_vivienda': id_vivienda})
      .then(function(data) {
          
        console.log("ADD VIVIENDA");
        console.log(data);
       
        if(data.result == "Vivienda_add"){
          location.reload();
        }
        if(data.result == "No_hay_stock"){
        toastr.warning("No hay stock suficiente");
        }
      
        
      })   
  }else{
      toastr.warning("No tienes productos en el carrito");
    
  }

}

function quitar_vivienda(id_vivienda){

  var token = localStorage.getItem('token');
  console.log("hola remove_vivienda");
  console.log(id_vivienda);
  console.log(token);

  try {
    var parsear_token = JSON.parse(token);
    token = parsear_token;
  } catch (e) {
      //console.log("No se ha podido parsear el token");
  }

  if (token) {
    console.log("hay token en el cart ");
    ajaxPromise(friendlyURL("?module=cart&op=quitar_vivienda"), 'POST', 'JSON', {'token': token, 'id_vivienda': id_vivienda})
      .then(function(data) {
          
        console.log("quitar");
        console.log(data);
        if(data.result == "Vivienda_quitada"){
          location.reload();
        }
        if(data.result == "No_en_carrito"){
        toastr.warning("No se ha podido quitar la vivienda");
        }
        
      }).catch(function() {
          //error.log();

          console.log("entro al CATCH");
    });
  }else{
    //error.log()
      toastr.warning("No tienes productos en el carrito");
    
  }



}

function borrar_linea(id_vivienda){

  var token = localStorage.getItem('token');
  console.log("hola borrar_linea");
  console.log(id_vivienda);
  console.log(token);

  try {
    var parsear_token = JSON.parse(token);
    token = parsear_token;
  } catch (e) {
      //console.log("No se ha podido parsear el token");
  }

  if (token) {
    console.log("hay token en el cart ");
    ajaxPromise(friendlyURL("?module=cart&op=borrar_linea"), 'POST', 'JSON', {'token': token, 'id_vivienda': id_vivienda})
      .then(function(data) {
          
        console.log("BORRAR LINEA");
        console.log(data.result);
        if(data.result == "Linea_borrada"){
          location.reload();
        }
        if(data.result == "No_encontrado"){
        toastr.warning("No se ha podido borrar la linea");
        }
        
        
      }).catch(function() {
          //error.log();

          console.log("entro al CATCH");
    });
  }else{
    //error.log()
      toastr.warning("No tienes productos en el carrito");
    
  } 





}


$(document).ready(function() {
 
  clicks_carrito();
  carrito_usuario();
});