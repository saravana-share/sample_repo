$(document).ready(function(){


    $(".permission-set-ul").hide();
    
    $('.show_parent').click(function(e) {
        $(this).parents('li').find('.permission-set-ul').slideToggle("fast");
        // var val = $(this).text() == "-" ? "+" : "-";
        /* $(this).text(val).fadeIn("fast"); */
        // e.preventDefault();
    });

    $('.show_sub_parent').click(function(e) {
        $(this).siblings("ul").slideToggle("fast");
        // var val = $(this).text() == "-" ? "+" : "-";
        /* $(this).text(val).fadeIn("fast"); */
        // e.preventDefault();
  });


    $('#company-menu').attr('class','active');

    var form_id = '#form';
            var v = jQuery(form_id).validate({
                ignore: "",
                rules: {
                name: {
                required: true,
                },
                'permission_ids[]':
                {
                    required:true,
                },
                },
            submitHandler: function (form) {
           
                let formData = new FormData($(form_id)[0]);
                $('#submit').button('loading');
                $.ajax({
                url: save_role,
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
                window.location = list_role_home;
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
             

  $('input[type=checkbox]').click(function(){
                    console.log('== click ====');
                    if(this.checked){
                        $(this).parents('li').children('input[type=checkbox]').prop('checked',true);
                    }
                    
                    $(this).parent().find('input[type=checkbox]').prop('checked',this.checked); 
                });

                $('.permission_sub_check').change(function() {
                    console.log(' == permission_sub_check ===');
                    var sub_check_count = 0;
                    
                         $(this).parents('li').find('.permission_sub_check').each(function(){
                        if($(this).is(":checked")) {
                            console.log(' == checked ===');
                            sub_check_count = 1;
                        }else{
                            console.log(' == unchecked ===');
                        }
                    });

                    if(sub_check_count == 0){
                            $(this).parents('.permission-set-li').find('.permission_check_class').prop('checked',false);
                        }
                          
                });

                    $('.permission_check_class').change(function() {
                       
                        var parent_count = 0;
                         $(this).parents('li').find('.permission_check_class').each(function(){
                        if($(this).is(":checked")) {
                            console.log(' == parent count checked ===');
                            parent_count = 1;
                        }
                    });

                    if(parent_count == 0){
                        console.log(' == parent count 0 ===');
                            $(this).parents('li').find('.parent_check').prop('checked',false);
                        }
                    });

                    

            });
