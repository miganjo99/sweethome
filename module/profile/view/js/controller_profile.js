

function facturas(){
  let token = localStorage.getItem("token");
  try {
    var parsear_token = JSON.parse(token);
    token = parsear_token;
  } catch (e) {
      //console.log("No se ha podido parsear el token");
  }
  if(token){

    ajaxPromise(friendlyURL("?module=profile&op=facturas"), "POST", "JSON", {"token":token})
    .then(function(data){
      console.log(data);
        let factura_contenedor = document.getElementById('factura-container');
        factura_contenedor.innerHTML = ''; 

        data.forEach(row => {
          let facturaDiv = document.createElement('div');
          facturaDiv.className = 'div_factura';
          facturaDiv.innerHTML = `
            <div>
              <img class="factura-img" src="http://localhost/sweethome/${row.img_vivienda}" >
            </div>
            <div class="factura-info">
              <p>Cantidad: ${row.cantidad}</p>
              <p>Descripcion: ${row.descripcion}</p>
              <p>Fecha Publicacion: ${row.fecha_publicacion}</p>
              <p>Precio Total: ${row.cantidad * row.precio}</p>
            </div>
            <div class="factura-buttons">
              <button class="pdf_boton">FACTURA</button>
              <button class="qr_boton">   QR  </button>
            </div>
          `;
          factura_contenedor.appendChild(facturaDiv);
        });
      }).catch(function(error){
      console.log(error);


    })


  }

}

function user_likes(){

  let token = localStorage.getItem("token");
  try {
    var parsear_token = JSON.parse(token);
    token = parsear_token;
  } catch (e) {
      //console.log("No se ha podido parsear el token");
  }
  if(token){

    ajaxPromise(friendlyURL("?module=profile&op=user_likes"), "POST", "JSON", {"token":token})
    .then(function(data){
      console.log(data);
        let likes_contenedor = document.getElementById('likes-container');
        likes_contenedor.innerHTML = ''; 

        data.forEach(row => {
          let likesDiv = document.createElement('div');
          likesDiv.className = 'div_likes';
          likesDiv.innerHTML = `
            <div>
              <img class="likes-img" src="http://localhost/sweethome/${row.img_vivienda}" >
            </div>
            <div class="likes-info">
              <p><strong>Titulo:</strong> ${row.estado}</p>
              <p><strong>Descripcion:</strong> ${row.descripcion}</p>
              <p><strong>Fecha Publicacion:</strong> ${row.fecha_publicacion}</p>
              <p><strong>Precio:</strong> ${row.precio}</p>
            </div>
            
          `;
          likes_contenedor.appendChild(likesDiv);
        });
      }).catch(function(error){
      error.log(error); 
      })
    }
}


function datos_user(){


  let token = localStorage.getItem("token");
  try {
    var parsear_token = JSON.parse(token);
    token = parsear_token;
  } catch (e) {
      //console.log("No se ha podido parsear el token");
  }
  if(token){

    ajaxPromise(friendlyURL("?module=profile&op=datos_user"), "POST", "JSON", {"token":token})
    .then(function(data){


        console.log("data de datos_user");
        console.log(data);
        let user_contenedor = document.getElementById('user-container');
        user_contenedor.innerHTML = ''; 

        data.forEach(row => {
          let userDiv = document.createElement('div');
          userDiv.className = 'div_user';
          userDiv.innerHTML = `
            <div>
              <img class="user-img" src="${row.avatar}" >
            </div>
            <div class="user-info">
              <p><strong>Nombre:</strong> ${row.username}</p>
              <p><strong>Email:</strong> ${row.email}</p>
              <p><strong>Id:</strong> ${row.id_user}</p>
            </div>
            
          `;
          user_contenedor.appendChild(userDiv);
        });
      }).catch(function(error){
      error.log(error); 
      })
    }



}


$(document).ready(function() {
 
  
  facturas();
  datos_user();
  user_likes();
  //clicks_profile();
});