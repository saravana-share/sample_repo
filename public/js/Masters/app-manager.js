$(document).ready(function(){
	$('#addnew').attr('class','btn btn-primary addnew manager_modal')
	$('.addnew').attr('data-target','');
	$('.addnew').attr('data-target','#master-admin-form');
	$('#manager').attr('class','active');
	$('.edit_delete').hide();

	//Edit
	$('.manager_modal').on('click',function(){
		$('#name-value,#mobile,#email,#imei_number,#role-value,#ticket-value,#project-value').val('');
		$('.logo_div').hide();
		$('.edit_delete').hide();
    	var user_id = $(this).attr('data-id');
    	if(user_id !=''){	
			$('.logo_div').show();	
			$('.edit_delete').show();
    		$('.edit_delete #delete').attr('data-href',"delete-user/"+user_id+"");
    		$('.delete_modal .delete-confirm').attr('data-id',user_id);
    		$('.edit_delete #edit').attr('data-id',user_id);
			$.ajax({
				url:edit_manager+'/'+user_id,
				type:'get',
				success:function (res) {
					var datas = res.user;
					if(datas){

						if(datas.logo){
							
	                    var img_path = user_image_path;

	                    img_path = img_path.replace('img',datas.logo);
                    	$('.user-logo').attr('src',img_path);
			            }
			            else{
			                $('.user-logo').attr('src','public/img/content/Shapes.png');
			            }
						$('#user_id').val(datas.id);
						$('#name-value').val(datas.name);
						$('#name-value').attr('disabled','disabled');
						$('#mobile').val(datas.mobile);
						$('#mobile').attr('disabled','disabled');
						$('#email').val(datas.email);
						$('#email').attr('disabled','disabled');
						// $('#password').val(datas.password);
						// $('#password').attr('disabled','disabled');
						$('#imei_number').val(datas.imei_number);
						$('#imei_number').attr('disabled','disabled');
						$('#password').attr('disabled','disabled');
						$('#confirm_password').attr('disabled','disabled');
						$('#member-value').val(datas.member_type_id);
        				$('#member-value').trigger('change');
						$('#member-value').attr('disabled','disabled');
						$('#role-value').val(datas.role);
        				$('#role-value').trigger('change');
						$('#role-value').attr('disabled','disabled');
						$('#my-file').attr('disabled','disabled');
        				if(res.user_projects){
        					usr_prjts = res.user_projects;
        					$('#project-value').val(usr_prjts);
        					$('#project-value').trigger('change');
        					$('#project-value').attr('disabled','disabled');

        				}
        				if(res.user_tickets){
        					usr_ticket = res.user_tickets;
        					$('#ticket-value').val(usr_ticket);
        					$('#ticket-value').trigger('change');
        					$('#ticket-value').attr('disabled','disabled');

        				}
					}
				}
			})
			$('.manager_submit').attr('disabled','disabled');
    	}else{
			$('#name-value,#mobile,#email,#imei_number,#client-value,#project-value,#member-value,.manager_submit,#my-file').removeAttr('disabled','disabled');

    		$('.edit_delete').hide();
    	}
    	

    });

    // Enable when click on Edit button
    $(document).on('click','.edit_delete #edit',function(){
    	var user_id = $(this).attr('data-id');
    	if(user_id !=''){
    		$('.edit_delete').show();
    		$('#name-value').removeAttr('disabled');
    		$('#mobile').removeAttr('disabled');
    		$('#email').removeAttr('disabled');
    		// $('#password').removeAttr('disabled');
    		// $('#confirm_password').removeAttr('disabled');
    		$('#imei_number').removeAttr('disabled');
    		$('#role-value').removeAttr('disabled');
    		$('#project-value').removeAttr('disabled');
    		$('#member-value').removeAttr('disabled');
    		$('#ticket-value').removeAttr('disabled');
    		$('#my-file').removeAttr('disabled');
    		$('.manager_submit').removeAttr('disabled');
    	}

    })
     //Delete
	$('#delete').click(function(){
        $('#delete_confirmation_modal').modal("show");
    		// $('.delete_modal .delete-confirm').attr('href',"delete-agent/"+user_id+"");

    });

   
   $(document).on('click','.delete-confirm',function(){
      // $('#delete_confirmation_modal #confirm_message').html('Are you sure? Do you want to delete this user?');
      var user_id = $(this).attr('data-id'); 
      $.ajax({
				url:delete_manager+'/'+user_id,
				type:'get',
				success:function (res) {
					if(res){
						 $('#master-admin-form').modal('hide');
						  $('#delete_confirmation_modal').modal("hide");
						  window.location=list_manager;
						
					}
					
				}
				}); 
    });
	//Save
	var form_id = '#managerForm';
    var v = jQuery(form_id).validate({
      ignore: "",
      rules: {
      		'name': {
              required: true,
              maxlength: 191,
            },
      		'email': {
              email: true,
              maxlength: 100,
            },
            'mobile': {
              minlength:10,
              maxlength: 10,
            },
            'imei_number':{
            	required: true,
            },
            'project_id[]': {
              required: true,
            },
            'member_id': {
              required: true,
            },
            'role_id': {
              required: true,
            },
            'ticket_type_id': {
              required: true,
            },
            'password' : {
                required: true,
                minlength: 5
                },
            'confirm_password' : {
               required: true,
                minlength: 5,
                equalTo : "#password"
            }
      },
      submitHandler: function (form) {
	    let formData = new FormData($(form_id)[0]);
      	$('#submit').button('loading');
	    $.ajax({
	        url: save_manager,
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
	        	 $('#master-admin-form').modal('hide');
	        // 	new Noty({
		       //    type: 'success',
		       //    layout: 'topRight',
		       //    text: res.message
		      	// }).show();
		        window.location = list_manager;
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