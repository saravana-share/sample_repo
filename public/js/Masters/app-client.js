$(document).ready(function(){
    $('.addnew').attr('data-target','');
    $('.addnew').attr('data-target','#client-profile');
    $('#client').attr('class','active');
    $(document).on('click','.addnew',function(){
        $('.myModalLabel').html('NEW CLIENT');
        $('#client_id').hide();
        $('#form')[0].reset();
        $('#contact_wrapper').empty();
        var contact_info = $('.dummy_contact_wrapper_content').html();
        $('#contact_wrapper').append(contact_info);
        $('text,textarea').removeAttr('disabled');
        $('.edit_add_contact,.save_btn,.logo,.close-contact').show();
        $('textarea').removeAttr('disabled');
        $('#delete_client,#edit_client,.client-logo-show').hide();
    });
    var count = -1;
    $('#dummy_contact_person').hide();
    $('.dummy_contact_wrapper_content').hide();

    $(document).on('click','#add-new-client',function(){
        $('#view_client_id,.view_contact_name,#hidden_client_id,.view_contact_designation,.view_contact_mobile,#view_company_name,#view_primary_address,#view_shipping_address,#view_phone,#view_mobile_phone,#view_gst,#contact_count').val('');
        $('.myModalLabel').html('NEW CLIENT');
        $('#client_id').hide();
        $('#contact_wrapper').empty();
        var contact_info = $('.dummy_contact_wrapper_content').html();
        $('#contact_wrapper').append(contact_info);
        $('input[type="text"]').removeAttr('disabled');
        $('.edit_add_contact,.save_btn,.logo,.close-contact').show();
        $('textarea').removeAttr('disabled');
        $('#delete_client,#edit_client,.client-logo-show').hide();
        $('#client-profile').modal('show');
    });

    $(document).on('click','#delete_client',function(){
        $('#confirm_message').text('Are You Sure?Do you want to delete the client?');
        $('#delete_confirmation_modal').modal('show');
    });

    $(document).on('click','.delete-confirm',function(){
        var client_id = $('#delete_client').attr('data-id');
        var url = delete_client;
        url = url.replace('id',client_id);
        $.ajax({
            url: url,
            type:'GET',
            dataType: "json",
            processData: true,
            data:{},
            success:function(data){
                window.location = list_client;
                $('#delete_confirmation_modal').modal('hide');
                $('#client-profile').modal('hide');
                new Noty({
                  type: 'success',
                  layout: 'topRight',
                  text: data.message,
                }).show();
            }
        });
    });

    $(document).on('click','#edit_client',function(){
        var client_id = $(this).attr('data-id');
        $('.edit_add_contact,.save_btn,.logo,.close-contact').show();
        $('#edit_client').hide();
        $('#hidden_client_id').val(client_id);
        $('.myModalLabel').text('EDIT CLIENT');
        $('input[type="text"]').removeAttr('disabled');
        $('textarea').removeAttr('disabled');
        
    })

    $(document).on('click','.client_card',function(){
        $('#client_id').show();
        $('#contact_wrapper').empty();
        $('#delete_client,#edit_client,.client-logo-show').show();
        $('.save_btn').hide();
        edit_id = $('#hidden_client_id').val();
        $('#save_btn').hide();
        $('.edit_add_contact,.logo,.close-contact').hide();
        $('.myModalLabel').html('VIEW CLIENT');
        var client_id = $(this).attr('data-id');
        var url = view_client;
        url = url.replace('id',client_id);
        $('#edit_client').attr('data-id',client_id);
        $('#delete_client').attr('data-id',client_id);
        $('#client-profile').modal('show');
        $.ajax({
            url: url,
            type:'GET',
            dataType: "json",
            processData: true,
            data: function(d){
                
            },
            success:function(data){
                if(data.clinet_details.logo){
                    var img_path = client_image;
                    img_path = img_path.replace('img',data.clinet_details.logo);
                    $('.client-logo').attr('src',img_path);
                }
                else{
                    $('.client-logo').attr('src','public/img/content/Shapes.png');
                }
                $('.view_client_id').val(data.clinet_details.client_id).attr('disabled','disabled');
                $('#view_company_name').val(data.clinet_details.company_name).attr('disabled','disabled');
                $('#view_gst').val(data.clinet_details.gst_number).attr('disabled','disabled');
                $('#view_mobile_phone').val(data.clinet_details.mobile).attr('disabled','disabled');
                $('#view_phone').val(data.clinet_details.phone).attr('disabled','disabled');
                $('#view_primary_address').val(data.clinet_details.primary_address).attr('disabled','disabled');
                $('#view_shipping_address').val(data.clinet_details.shipping_address).attr('disabled','disabled');
                $.each(data.client_contact_details,function(i,value,contacts){
                    var ic = i;
                    $('.contact_count').val(ic);
                    var contacts = $('.dummy_contact_wrapper_content').html();
                    var c = i+1;
                    contacts = contacts.replace(/key/g,i).replace('count',c); 
                    $('#contact_wrapper').append(contacts);
                    $('#view_contact_name'+i).val(value.name).attr('disabled','disabled');
                    $('#view_contact_mobile'+i).val(value.mobile).attr('disabled','disabled');
                    $('#view_contact_designation'+i).val(value.designation).attr('disabled','disabled');
                });

            }

        });
    });
    var form_id  = '#form';
    var v = jQuery(form_id).validate({
      ignore: "",
      rules: {
        'email': {
              email: true,
              maxlength: 100,
            },
      },
      submitHandler: function (form) {
        let formData = new FormData($(form_id)[0]);
        $('#submit').button('loading');
        $.ajax({
            url: save_client,
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
                new Noty({
                  type: 'error',
                  layout: 'topRight',
                  text: errors
                }).show();
            }else{
                $('#master-company').modal('hide');
                $('#client-profile').modal('hide');
                window.location = list_client;
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

    $(document).on('click','.close-contact',function(){
        $(this).closest('.contact-person').remove();
    });

    $(document).on('click','.edit_add_new_contact',function(){
        var contacts = $('.dummy_contact_wrapper_content').html();
        $('#contact_wrapper').append(contacts);
    });

});
