

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



$(document).ready(function() {
 
  facturas();
  //clicks_profile();
});