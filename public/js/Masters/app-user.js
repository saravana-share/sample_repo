$(document).ready(function(){
	$('#addnew').attr('class','btn btn-primary addnew user_modal')
	$('.addnew').attr('data-target','');
	$('.addnew').attr('data-target','#user-form');
	$('#user').attr('class','active');
	$('.edit_delete').hide();

    //Delete
	$('#delete').click(function(){
        $('#delete_confirmation_modal').modal("show");
    });

   
   $(document).on('click','.delete-confirm',function(){
      $('#delete_confirmation_modal #confirm_message').html('Are you sure? Do you want to delete this user?');
      var user_id = $(this).attr('data-id'); 
      	$.ajax({
			url:delete_user+'/'+user_id,
			type:'get',
			success:function (res) {
				if(res){
					$('#user-form').modal('hide');
					$('#delete_confirmation_modal').modal("hide");
					window.location=list_user;
						
				}
					
			}
		}); 
    });

	//Save
	var form_id = '#userForm';
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
	        url: save_user,
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
		        window.location = list_user;
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

})