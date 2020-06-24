$(document).ready(function(){
  //alert(1);
  $('.addnew').attr('data-target','');
  $('.addnew').attr('data-target','#admin-ticket-type');
  $('#ticket_type').attr('class','active');
  $('.edit_delete').hide();
  $('.ticket_modal').on('click',function(){
    $('.ticket_type_name').val('');
    $('.ticket_type_id').val('');
    $('.edit_delete').hide();
    var ticket_type_id = $(this).attr('data-id');
    //alert(ticket_type_id);
    if(ticket_type_id !=''){
      $('.edit_delete').show();
      $('.edit_delete #delete').attr('data-href',"delete-ticket-type/"+ticket_type_id+"");
      $('.delete_modal .delete-confirm').attr('data-id',ticket_type_id);
      $('.edit_delete #edit').attr('data-id',ticket_type_id);
      $('#ticket_type_id').val(ticket_type_id);
      $.ajax({
        url:edit_ticket+'/'+ticket_type_id,
        type:'get',
        success:function (res) {
          var datas = res.ticket_type;
          if(datas){
            $('.ticket_type_name').val(datas.name);
            $('.ticket_type_name').attr('disabled','disabled');
            $('.reset_value').attr('disabled','disabled');
          }
        }
      })
      $('#save_type').attr('disabled','disabled');
    }else{
      $('.edit_delete').hide();
    }


  });
  $('#delete').click(function(){
    $('#delete_confirmation_modal').modal("show");
    $('#delete_confirmation_modal #confirm_message').html('Are you sure? Do you want to delete this Ticket Type?');
        // $('.delete_modal .delete-confirm').attr('href',"delete-agent/"+user_id+"");

      });


  $(document).on('click','.delete-confirm',function(){
    //$('#delete_confirmation_modal #confirm_message').html('Are you sure? Do you want to delete this Ticket Type?');
    var ticket_type_id = $(this).attr('data-id'); 
    //alert(delete_ticket+'/'+ticket_type_id);
    $.ajax({
      url:delete_ticket+'/'+ticket_type_id,
      type:'get',
      success:function (res) {
        if(res){
         $('#admin-ticket-type').modal('hide');
         $('#delete_confirmation_modal').modal("hide");
         //window.location=list_ticket;
            // $("#agents").load(location.href + " #agents");
            // new Noty({
            //   type: 'success',
            //   layout: 'topRight',
            //   text: res.message
            // }).show();
            //setTimeout(function(){
           window.location=list_ticket;
         //}, 300);
          }
          
        }
      });    

//       $('#delete_confirmation_modal').modal({
//     backdrop: 'static',
//     keyboard: false
// });
});

  $(document).on('click','.edit_delete #edit',function(){
    var ticket_type_id = $(this).attr('data-id');
    if(ticket_type_id !=''){
      $('.edit_delete').show();
      $('.ticket_type_name').removeAttr('disabled');
      $('#save_type').removeAttr('disabled');
      $('.reset_value').removeAttr('disabled');
    }

  })



  $('.new_field').click(function(){
    $(".ticket_names").append('<div class="row remove_ticket">'
     +'<div class="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">'
     +'<div class="input-group">'
     +'<input type="text" class="form-control name" value="" required="required" name="name[]" placeholder="Type Something">'
     +'<span class="input-group-addon">'
     +'<button class="delete_box">'
     +'<img class="img-responsive delete_box" alt="delete-icon" src="public/img/content/delete.svg"/>'
     +'</button>'
     +'</span>'
     +'</div>'
     +'</div>'
     +'</div>');
  });
  $('.ticket_names').on('click', '.delete_box', function() {
    $(this).closest(".remove_ticket").remove();
  });

    //RESET VALUES
    $('.reset_value').click(function(){
      $('.ticket_names input').val("");
    });
    //SUBMIT FORM
    var form_id = '#ticket_type_form';
    var v = jQuery(form_id).validate({
      ignore: "",
      rules: {
        name: {
          required: true,
          maxlength:191,
        },
      },

      submitHandler: function (form) {
        let formData = new FormData($('#ticket_type_form')[0]);
        $('#save_type').button('loading');
        $.ajax({
          url: save_url,
          method: "POST",
          data:$("#ticket_type_form").serialize(),
          processData: false,
        })
        .done(function(res) {

          console.log(res);
          $('#save_type').button('reset');
          if(!res.success) {
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
          //  new Noty({
          //   type: 'success',
          //   layout: 'topRight',
          //   text: res.message
          // }).show();

           $('#admin-ticket-type').modal('hide');
           
           //setTimeout(function(){
           window.location=list_ticket;
        // }, 300);
                // $('#save_type').button('reset');
                    // window.location = save_url;
                  }

                })

        .fail(function(xhr) {
          $('#save_type').button('reset');
          new Noty({
            type: 'error',
            layout: 'topRight',
            text: 'Something went wrong at server.'
          }).show();

        })
      }
    }); 

  }); 

$(document).ready(function(){
    $('#list-ticket-type').attr('class','active');
  //  $('#add').attr('href',list_ticket);

  $('#ajax-table').DataTable({
    "language": {
      "search":"",
      "lengthMenu":     "_MENU_",
      "paginate": { 
        "next":       '<i class="icon ion-ios-arrow-forward"></i>',
        "previous":   '<i class="icon ion-ios-arrow-back"></i>'
        },
    }
  });
  $('#ajax-table').on( 'keyup', function () {
    table.search( this.value ).draw();
} );
  
});