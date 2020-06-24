$(document).ready(function(){
	$('#addnew').attr('class','btn btn-primary addnew role_modal')
	$('.addnew').attr('data-target','');
	$('.addnew').attr('data-target','#role-form');
	$('#role').attr('class','active');
	 $('.edit_delete').hide();

	 $('.add_new_role').click(function(){
    $(".dummy_roles_field").append('<div class="row remove_role">'
     +'<div class="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12">'
     +'<div class="input-group">'
     +'<input type="text" class="form-control name" value="" required="required" name="name[]" placeholder="Role name">'
     +'<span class="input-group-addon">'
     +'<button class="delete_box">'
     +'<img class="img-responsive delete_box" alt="delete-icon" src="public/img/content/delete.svg"/>'
     +'</button>'
     +'</span>'
     +'</div>'
     +'</div>'
     +'</div>');
  });
  $('.dummy_roles_field').on('click', '.delete_box', function() {
    $(this).closest(".remove_role").remove();
  });

    //Reset 
    $('.reset_value').click(function(){
      $('.dummy_roles_field input').val("");
    });

    //Edit

    $('.role_modal').on('click',function(){
    $('#role-value').val('');
    $('#role_id').val('');

    $('.edit_delete').hide();
    var role_id = $(this).attr('data-id');
    //alert(ticket_type_id);
    if(role_id !=''){
      $('.edit_delete').show();
      $('.add_fields').hide();
      $('.edit_delete #delete').attr('data-href',"delete-role/"+role_id+"");
      $('.delete_modal .delete-confirm').attr('data-id',role_id);
      $('.edit_delete #edit').attr('data-id',role_id);
      $('#role_id').val(role_id);
      $.ajax({
        url:edit_role+'/'+role_id,
        type:'get',
        success:function (res) {
          var datas = res.role;
          if(datas){
            $('#role-value').val(datas.name);
            $('#role-value').attr('disabled','disabled');
            $('.reset_value').attr('disabled','disabled');
          }
        }
      })
      $('.role_submit').attr('disabled','disabled');
    }else{
    	$('.role_submit,#role-value,.reset_value').removeAttr('disabled','disabled');
      $('.add_fields').show();
      $('.edit_delete').hide();
    }


  });

    //Remove Disabled after click on Edit
    $(document).on('click','.edit_delete #edit',function(){
    var role_id = $(this).attr('data-id');
    if(role_id !=''){
      $('.edit_delete').show();
      $('.role_submit,#role-value,.reset_value').removeAttr('disabled','disabled');
    }

  })
     //Delete
	$('#delete').click(function(){
        $('#delete_confirmation_modal').modal("show");
        $('#delete_confirmation_modal #confirm_message').html('');
      $('#delete_confirmation_modal #confirm_message').html('Are you sure? Do you want to delete this role?');
    		// $('.delete_modal .delete-confirm').attr('href',"delete-agent/"+user_id+"");

    });

   
   $(document).on('click','.delete-confirm',function(){
   	
      var role_id = $(this).attr('data-id'); 
      $.ajax({
				url:delete_role+'/'+role_id,
				type:'get',
				success:function (res) {
					if(res){
						 $('#master-admin-form').modal('hide');
						  $('#delete_confirmation_modal').modal("hide");
						  window.location=list_role;
						
					}
					
				}
				}); 
    });

    //Save
	var form_id = '#rolesForm';
    var v = jQuery(form_id).validate({
      ignore: "",
      rules: {
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
            alert();
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
	        	 $('#role-form').modal('hide');
	        // 	alert('asd');
	        // 	new Noty({
		       //    type: 'success',
		       //    layout: 'topRight',
		       //    text: res.message
		      	// }).show();
		        window.location = list_role;
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


// jquery validaion

var roles_form_id = '#rolesForm';
    var v = jQuery(roles_form_id).validate({
      ignore: "",
      rules: {
        name: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Role name required",
        },
        
      },
      });

});