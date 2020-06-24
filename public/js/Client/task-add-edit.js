$(document).ready(function(){
	
var form_id = "#form";
	var v = jQuery(form_id).validate({
		ignore:"",
		rules:{
			project_id:{
				required:true,
			},
			task_type_id:{
				required:true,
			},
			subject:{
				required:true,
			},
			due_date:{
				required:true,
			},
			assign_to:{
				required:true,
			},
			priority_id:{
				required:true,
			},
		},
		submitHandler: function(form){
			let formData = new FormData($(form_id)[0]);
			$('#submit').button('loading');
			$.ajax({
				url:save_client_task,
				method:"POST",
				data:formData,
				processData:false,
				contentType:false,
			})
			.done(function(res){
				if(!res.success){
					$('#submit').button('Reset');
					var errors = '';
					for(var i in res.errors){
						errors = '<li>'+res.errors[i]+'</li>';
					}
					new Noty({
						type:'error',
						layout:'topRight',
						text:errors,
					}).show();
				}else{
					if(res.where_from=='task')
					{
						window.location = list_task;
					}
					else
					{
						project_view_url = project_view.replace(/id/g,res.id);
						window.location = project_view_url;
					}
				}
			})
			.fail(function(xhr){
				$('#submit').button('Reset');
				new Noty({
			          type: 'error',
			          layout: 'topRight',
			          text: 'Something went wrong at server.'
			      }).show();
			})
		}
	});


	$(document).on('click','.error_checkbox',function()
		{
			var id=$(this).data('id');
			//alert(id);
			var text=$('.errors_'+id).val();
			if($('.error_checkbox_'+id).is(":checked"))
			{
			$('.errors_'+id).wrap('<strike>');
			$('.error_check_val_'+id).val(0);
			}else
			{
			$('.errors_'+id).unwrap();
			$('.error_check_val_'+id).val(1);
			}
		});

	$(document).on('click','.add_notes',add_note_form);
		
	function add_note_form(){
		var id=$(this).data('id');
		var sub_task_id=$(this).data('sub_task_id');
		var div = $('#dummy_note').val('').html();
		div = div.replace(/xxx/g,task_notes);
		div = div.replace(/yyy/g,sub_task_id);
		var app_div='notes_wrp_'+sub_task_id;
		$('#'+app_div).append(div);   
		task_notes++;
		$('.task_assigner_status').next('.select2').remove();
		$('.task_assigner_status').select2();  
		  
		$('.priority_list').next('.select2').remove();
		$('.priority_list').select2();       
	}
	$('body').on('click', ".remove_note_detail" ,function(){      
		var id = $(this).attr('id');
		$(this).parents(".note").remove();
	});



});