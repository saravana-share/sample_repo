
$(document).ready(function(){
// alert(save_employee);
$('body').on('click', ".save-credentials" ,function(){ 
    var data_type= $(this).attr("data-id");
var form_id = '#credential_form';
var $btn = $(this);
    
    var v = jQuery(form_id).validate({
    ignore: "",
    rules: {
    credentials_name:{
    required: true,
    },

    },
    submitHandler: function (form) {
    var valid = true;
    let formData = new FormData($(form_id)[0]);
    $btn.button('loading');
    $.ajax({
    url: save_credentials,
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
    }else

    {
    if(data_type == 0)
    {
        window.location=list_project_view;
    }
    if(data_type == 1)
    {
        window.location=add_project_credentials;
    }
    // if(data_type == 2)
    // {
    //     window.location=save_view;
    // }
    
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
          

          $('body').on('click', ".save-view-credentials" ,function(){
            
            var form_id = '#credential_form';
            var $btn = $(this);
                
            var v = jQuery(form_id).validate({
            ignore: "",
            rules: {
            credentials_name:{
            required: true,
            },

            },
            submitHandler: function (form) {
            var valid = true;
            let formData = new FormData($(form_id)[0]);
            $btn.button('loading');
            $.ajax({
            url: save_credentials,
            method: "POST",
            data:formData,
            processData: false,
            contentType: false,
            })
            .done(function(res) {
            if(!res.success) {
            $('#save_and_view').button('reset'); 
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
            }else
            {
                var save_view_url=save_view;
                url = save_view_url.replace(/id_value/g,res.id);
                window.location=url;
            
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

          $('body').on('click', ".cancel-credentials" ,function(){
            window.location=list_project_view;
          });
          $('body').on('click', ".remove_link" ,function(){
            // alert(1);
            var delete_id = $(this).attr('id');
            var type = 'remove_value_credentials';
            $('#remove_credentials_value').val(delete_id);
            $('#type').val(type);
            if(delete_id)
            {
                $('#delete_confirmation_modal').modal("show");
                $('.change_title').html("Links");
            }
        });

            $('.delete-confirm').click(function(){
            var type=$('#type').val();
            
            if(type=='remove_value_credentials')
            { 
                delete_credentials_value();
            }

        });
            function delete_credentials_value()
            {

            var id = $('#remove_credentials_value').val();
            var class_name='remove_'+id;
            $('.'+class_name).hide();
            $.ajax({
                url:delete_value,
                method:'POST',
                data: {
                    id :id
                },
                success:function(d){
                    if(d.success==true)
                    {
                    new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: 'Deleted Sucessfully.'
                        }).show();
                        $('#delete_confirmation_modal').modal("hide");
                        $("."+class_name).remove();
                    }
                    else
                    {
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: d.errors,
                        }).show();
                    }
                }
            })

      
            }
       $('body').on('click', ".add_link" ,function(){
            var div = $('.link').html();
            div = div.replace(/xxx/g,link_count);  
            $('.time_estimate_link').append(div);
            link_count++;
        });
       $('body').on('click', ".remove_attachment_link" ,function(){   

            $(this).parents(".link_show").remove();
        });

});


