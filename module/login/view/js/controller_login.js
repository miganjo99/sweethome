

// ------------------- LOAD CONTENT ------------------------ //
function load_content() {
    let path = window.location.pathname.split('/');
    
    if(path[5] === 'recover'){
        window.location.href = friendlyURL("?module=login&op=recover_view");
        localStorage.setItem("token_email", path[6]);
    }else if (path[5] === 'verify') {
        ajaxPromise(friendlyURL("?module=login&op=verify_email"), 'POST', 'JSON', {token_email: path[6]})
        .then(function(data) {
            toastr.options.timeOut = 3000;
            toastr.success('Email verified');
            setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
        })
        .catch(function() {
          console.log('Error: verify email error');
        });
    }else if (path[4] === 'view') {
        $(".login-wrap").show();
        $(".forget_html").hide();
    }else if (path[4] === 'recover_view') {
        load_form_new_password();
    }
}

$(document).ready(function(){
    load_content();
    
});