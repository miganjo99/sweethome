function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    
    return new Promise((resolve, reject) => {
       
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
            
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            console.error("Error en la solicitud AJAX:", errorThrow);
            console.log("Respuesta del servidor:", jqXHR.responseText);

            reject(errorThrow);
        });
    });
};