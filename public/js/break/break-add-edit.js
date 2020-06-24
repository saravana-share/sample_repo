$(document).ready(function(){

    var form_id = '#break_punch_form';
            var v = jQuery(form_id).validate({
                ignore: "",
                rules: {
                reason:
                {
                    required:true,
                }
                },
            submitHandler: function (form) {
           
                let formData = new FormData($(form_id)[0]);
                $('#submit').button('loading');
                $.ajax({
                url: save_break_punch,
                method: "POST",
                data:formData,
                processData: false,
                contentType: false,
                })
                .done(function(res) {
                if(!res.success) {
                $('#submit').button('reset'); 
                var errors = '';
                for(var i in res.errors){
                errors += '<li>'+res.errors[i]+'</li>';
                }

                console.log(errors)
                new Noty({
                type: 'error',
                layout: 'topRight',
                text: errors
                }).show();
                }else{
                //$('#master-new-project').modal('hide');
                window.location = list_punch;
                }
                })
                .fail(function(xhr) {
                $('#submit').button('reset'); 
                new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'Something went wrong at server.'
                }).show();

                })
            }      
    });

});