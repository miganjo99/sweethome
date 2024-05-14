function load_operacion() {
    //console.log("HOLA LOAD CIUDAD SEARCH");
    //alert("uep");
    ajaxPromise('index.php?module=search&op=search_operacion', 'POST', 'JSON')
    .then(function (data) {
        $('<option>Operacion</option>').attr('selected', true).attr('disabled', true).appendTo('.search_operacion')
        for (row in data) {
            $('<option value="' + data[row].id_operacion + '">' + data[row].name_operacion + '</option>').appendTo('.search_operacion')
        }
    }).catch(function () {
        //  window.location.href = "index.php?modules=exception&op=503&error=fail_load_category&type=503";
    });
}

function load_innovacion(operacion) {
    $('.search_innovacion').empty();
    console.log(operacion);
    console.log("operacion");
    if (operacion == undefined) {
        console.log("nulllllllllll")
        ajaxPromise('index.php?module=search&op=search_innovacion_null', 'POST', 'JSON')
            .then(function (data) {
                $('<option>Innovacion</option>').attr('selected', true).attr('disabled', true).appendTo('.search_innovacion')
                for (row in data) {
                    $('<option value="' + data[row].id_innovacion + '">' + data[row].name_innovacion + '</option>').appendTo('.search_innovacion')
                }
            }).catch(function () {
                //window.location.href = "index.php?modules=exception&op=503&error=fail_load_innovacion&type=503";
            });
    }
    else {
        console.log("hola search innovacion");
        ajaxPromise('index.php?module=search&op=search_innovacion', 'POST', 'JSON', operacion)
            .then(function (data) {
                console.log(data);
                console.log("data innovacion");
                for (row in data) {
                    $('<option value="' + data[row].id_innovacion + '">' + data[row].name_innovacion + '</option>').appendTo('.search_innovacion')
                }
            }).catch(function () {
                //window.location.href = "index.php?modules=exception&op=503&error=fail_load_innovacion_2&type=503";
            });
    }
}

function launch_search() {
    load_operacion();
    load_innovacion();
    $(document).on('change', '.search_operacion', function () {
        let operacion = $(this).val();
        console.log("operacion:",operacion);
        if (operacion === 0) {
            load_innovacion();
        } else {
            load_innovacion({ operacion });
        }
    });
}





$(document).ready(function() {
    launch_search();
    autocomplete();
    search_button();
});