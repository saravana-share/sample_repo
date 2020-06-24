$(document).ready(function(){

    $('#designation').attr('class','active');
    var form_id = '#form';
            var v = jQuery(form_id).validate({
                ignore: "",
                rules: {
                name: {
                required: true,
                }
                },
            submitHandler: function (form) {           
                let formData = new FormData($(form_id)[0]);
                $('#submit').button('loading');
                $.ajax({
                url: save_designation,
                method: "POST",
                data:formData,
                processData: false,
                contentType: false,
                })
                .done(function(res) {
                if(!res.success) {
                    //alert(res);
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
                window.location = list_designation;
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