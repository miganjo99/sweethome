function load_operacion() {
    
    //ajaxPromise('index.php?module=search&op=search_operacion', 'POST', 'JSON')
    ajaxPromise(friendlyURL('index.php?module=search&op=search_operacion'), 'POST', 'JSON')
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
        //ajaxPromise('index.php?module=search&op=search_innovacion_null', 'POST', 'JSON')
        ajaxPromise(friendlyURL('index.php?module=search&op=search_innovacion_null'), 'POST', 'JSON')
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
        //ajaxPromise('index.php?module=search&op=search_innovacion', 'POST', 'JSON', operacion)
        ajaxPromise(friendlyURL('index.php?module=search&op=search_innovacion'), 'POST', 'JSON', operacion)
            .then(function (data) {
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
        //  console.log("operacion:",operacion);
        if (operacion === 0) {
            load_innovacion();
        } else {
            load_innovacion({ operacion });
        }
    });
}

function autocomplete() {
    $("#autocom").on("keyup", function () {
        let sdata = { complete: $(this).val() };
        //console,log("sdata",sdata);
        if (($('.search_operacion').val() != 0)) {
            //console.log("search_operacion",$('.search_operacion').val());
            sdata.operacion = $('.search_operacion').val();
            if (($('.search_operacion').val() != 0) && ($('.search_innovacion').val() != 0)) {
                sdata.innovacion = $('.search_innovacion').val();
            }
        }
        if (($('.search_operacion').val() == undefined) && ($('.search_innovacion').val() != 0)) {
            sdata.innovacion= $('.search_innovacion').val();
        }
        console.log("sdata",sdata);



        //ajaxPromise('index.php?module=search&op=autocomplete', 'POST', 'JSON', sdata)
        ajaxPromise(friendlyURL('index.php?module=search&op=autocomplete'), 'POST', 'JSON', sdata)
            .then(function (data) {
                
                
                console.log(data);
                console.log("data AUTOCOMPLETE:");

                $('#search_viv').empty();
                $('#search_viv').fadeIn(10000000);
                for (row in data) {
                    $('<div></div>').appendTo('#search_viv').html(data[row].name_ciudad).attr({ 'class': 'searchElement', 'id': data[row].name_ciudad });
                }
                $(document).on('click', '.searchElement', function () {
                    $('#autocom').val(this.getAttribute('id'));
                    $('#search_viv').fadeOut(1000);
                });
                $(document).on('click scroll', function (event) {
                    if (event.target.id !== 'autocom') {
                        $('#search_viv').fadeOut(1000);
                    }
                });
            }).catch(function () {
                $('#search_viv').fadeOut(500);
            });
    });
}
function button_search() {
    $('#search-btn').on('click', function () {
        var search = [];
        //console.log("search",search);
        if ($('.search_operacion').val() != undefined) {
            search.push({ "id_operacion": [$('.search_operacion').val()] })
            if ($('.search_innovacion').val() != undefined) {
                search.push({ "id_innovacion": [$('.search_innovacion').val()] })
            }
            if ($('#autocom').val() != undefined) {
                search.push({ "ciudad": [$('#autocom').val()] })
            }
        } else if ($('.search_operacion').val() == undefined) {
            if ($('.search_innovacion').val() != undefined) {
                search.push({ "id_innovacion": [$('.search_innovacion').val()] })
            }
            if ($('#autocom').val() != undefined) {
                search.push({ "ciudad": [$('#autocom').val()] })
            }
        }
        localStorage.removeItem('filters_search');
        if (search.length != 0) {
            localStorage.setItem('filters_search', JSON.stringify(search));
            //console.log(search);
            //console.log("search filtersssssssss");
            //alert("Hola filters_search");
        }
        window.location.href = 'index.php?module=shop&op=view';
    });
}


$(document).ready(function() {
    launch_search();
    autocomplete();
    button_search();
});