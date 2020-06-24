$(document).ready(function(){

  $('body').on('change','.applicable_option',function()
        {
           var applicable_option=$('input[name=applicable]:checked').val();
           if(applicable_option== 1)
           {
                $('.availability_status').css('display','');
                $('.available_date').css('display','');
           }else
           {
                $('.availability_status').css('display','none');
                $('.available_date').css('display','none');
                $('.avaliable_yes').css('display','none');
                
           }
        });
  $('body').on('change','.available_option',function()
        {
           var available_option=$('input[name=availability_status]:checked').val();
           if(available_option== 1)
           {
                $('.available_date').css('display','none');
                $('.avaliable_yes').css('display','');
           }else
           {
                $('.avaliable_yes').css('display','none');
                 $('.available_date').css('display','');
                
           }
        });



  $('body').on('change','.type_option_change',function()
        {
           var type_option=$('input[name=type]:checked').val();
           if(type_option== 0)
           {
                $('.attachment').css('display','none');
                $('.link').css('display','');
           }else
           {
                $('.link').css('display','none');
                $('.attachment').css('display','');
           }
        });
  

   var form_id = '#form';
            var v = jQuery(form_id).validate({
                ignore: "",
            submitHandler: function (form) {   
             let formData = new FormData($(form_id)[0]);
                $('#submit').button('loading');
                $.ajax({
                url: save_project_docs,
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
                window.location = list_project_view;
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