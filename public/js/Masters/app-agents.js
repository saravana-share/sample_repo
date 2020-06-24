$(document).ready(function(){
	$('#addnew').attr('class','btn btn-primary addnew agent_modal')
	$('.addnew').attr('data-target','');
	$('.addnew').attr('data-target','#agent-form');
	$('#agent').attr('class','active');
	$('.edit_delete').hide();
	$('.agents-table').DataTable();
	//Edit
	$('.agent_modal').on('click',function(){
		$('#name-value,#mobile,#email,#member-value,#project-value').val('');
		$('.edit_delete').hide();
    	var user_id = $(this).attr('data-id');
    	if(user_id !=''){
			$('.edit_delete').show();
			$('.logo_div').show();
    		$('.edit_delete #delete').attr('data-href',"delete-agent/"+user_id+"");
    		$('.delete_modal .delete-confirm').attr('data-id',user_id);
    		$('.edit_delete #edit').attr('data-id',user_id);
			$.ajax({
				url:edit_agent+'/'+user_id,
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
						$('#member-value').val(datas.member_type_id);
        				$('#member-value').trigger('change');
						$('#member-value').attr('disabled','disabled');
						$('#imei_number').val(datas.imei_number);
						$('#imei_number').attr('disabled','disabled');
						$('#password').attr('disabled','disabled');
						$('#confirm_password,#my-file').attr('disabled','disabled');
        				if(res.user_projects){
        					usr_prjts = res.user_projects;
        					$('#project-value').val(usr_prjts);
        					$('#project-value').trigger('change');
        					$('#project-value').attr('disabled','disabled');

        				}
					}
				}
			})
			$('.agent_submit').attr('disabled','disabled');
    	}else{
    		alert('asd');
    		$('.edit_delete').hide();
    		$('.logo_div').hide();
    		$('#name-value,#mobile,#email,#imei_number,#project-value,#password,#confirm_password').val('');
    		$('#name-value,#mobile,#email,#imei_number,#project-value,#member-value,.agent_submit,#password,#confirm_password,#my-file').removeAttr('disabled');
    	}
    	

    });

    //Delete
	$('#delete').click(function(){
        $('#delete_confirmation_modal').modal("show");
         $('#delete_confirmation_modal #confirm_message').html('');
         $('#delete_confirmation_modal #confirm_message').html('Are you sure? Do you want to delete this user?');
    		// $('.delete_modal .delete-confirm').attr('href',"delete-agent/"+user_id+"");

    });

   
   $(document).on('click','.delete-confirm',function(){
      var user_id = $(this).attr('data-id'); 
      $.ajax({
				url:delete_agent+'/'+user_id,
				type:'get',
				success:function (res) {
					if(res){
						 $('#agent-form').modal('hide');
						  $('#delete_confirmation_modal').modal("hide");
						  window.location=list_agent;
					}
					
				}
				});    
      
//       $('#delete_confirmation_modal').modal({
//     backdrop: 'static',
//     keyboard: false
// });
    });

   // Enable when click on Edit button
    $(document).on('click','.edit_delete #edit',function(){
    	var user_id = $(this).attr('data-id');
    	if(user_id !=''){
    		$('.edit_delete').show();
    		$('#name-value').removeAttr('disabled');
    		$('#mobile').removeAttr('disabled');
    		$('#email').removeAttr('disabled');
    		$('#imei_number').removeAttr('disabled');
    		$('#project-value').removeAttr('disabled');
    		$('#member-value').removeAttr('disabled');
    		$('.agent_submit').removeAttr('disabled');
    		$('#my-file').removeAttr('disabled');
    	}

    });

// Save
	var form_id = '#agentsForm';
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
        'project_id[]': {
          required: true,
        },
        'member_id': {
          required: true,
        },
        'imei_number':{
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
      submitHandler: function (form) { alert('sdf');
	    let formData = new FormData($(form_id)[0]);
      	$('#submit').button('loading');
	    $.ajax({
	        url: save_agent,
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
	        	$('#agent-form').modal('hide');
	        // 	new Noty({
		       //    type: 'success',
		       //    layout: 'topRight',
		       //    text: res.message
		      	// }).show();
		        window.location = list_agent;
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
	 


