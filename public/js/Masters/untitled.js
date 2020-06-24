$(document).ready(function(){
	$('#addnew').attr('class','btn btn-primary addnew user_modal')
	$('.addnew').attr('data-target','');
	$('.addnew').attr('data-target','#agent-form');
	$('#agent').attr('class','active');
	$('.edit_delete').hide();

	var Table = [];
	var cols = [
        	{'data':"code","name":"users.code","searchable":true},
        	{'data':"role_name","name":"roles.name","searchable":true},
        	{'data':"name","name":"users.name","searchable":true},
        	{'data':"mobile","name":"users.mobile","searchable":true},
        	{'data':"email","name":"users.email","searchable":true},
        	{'data':"agentview"},
        	];
    var agent_table = $('#ajax_table').DataTable({
    	'pageLength': 10,
    	processing:true,
    	serverSide: true,
        ordering: true,
        method:"GET",  
        ajax: {
            url: getAgentList,
            data: function (d) {
            },
        },
        columns: cols,
    });
	//Edit
	$('.agent_modal').on('click',function(){
		$('#name-value,#mobile,#email,#member-value,#project-value').val('');
		$('.edit_delete').hide();
    	var user_id = $(this).attr('data-id');
    	if(user_id !=''){
			$('.edit_delete').show();
    		$('.edit_delete #delete').attr('data-href',"delete-agent/"+user_id+"");
    		$('.delete_modal .delete-confirm').attr('data-id',user_id);
    		$('.edit_delete #edit').attr('data-id',user_id);
			$.ajax({
				url:edit_agent+'/'+user_id,
				type:'get',
				success:function (res) {
					var datas = res.user;
					if(datas){
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
    		$('.edit_delete').hide();
    	}
    	

    });

    //Delete
	$('#delete').click(function(){
        $('#delete_confirmation_modal').modal("show");
    		// $('.delete_modal .delete-confirm').attr('href',"delete-agent/"+user_id+"");

    });

   
   $(document).on('click','.delete-confirm',function(){
      $('#delete_confirmation_modal #confirm_message').html('Are you sure? Do you want to delete this user?');
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
    		$('#project-value').removeAttr('disabled');
    		$('#member-value').removeAttr('disabled');
    		$('.agent_submit').removeAttr('disabled');
    	}

    })

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
      },
      submitHandler: function (form) {
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
	        	new Noty({
		          type: 'success',
		          layout: 'topRight',
		          text: res.message
		      	}).show();
		        // window.location = list_role;
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
	 


