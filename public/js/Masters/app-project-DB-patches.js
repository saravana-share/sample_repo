var selected_sub_task='';
$(document).ready(function(){
	$('body').on('click','#add_test_case',function(event){
		var test_case = $('#dummy_test_case').val('').html();
		$('.test_case_wrapper').append(test_case);
		$('.testcase_status').next('.select2').remove();
		$('.testcase_status').select2();  
	})

	var form_id = "#form_test_cases";
	var v = jQuery(form_id).validate({
		ignore:"",
		rules:{
			'test_case_name[]':
			{
				required:true,
			},
			'test_description[]':
			{
				required:true,
			},
			'expected_result[]':
			{
				required:true,
			},
			'test_case_status[]':
			{
				required:true,
			}
		},
	});


	$('body').on('click', ".remove_test_case" ,function(){      
    	var id = $(this).attr('id');
    	$('#test_case').val(id);
        if(id){
        		$('#delete_confirmation_modal').modal("show");
			}
			else
			{
			 	$(this).parents(".test_case").remove();	
			}
    });

		$('.delete-confirm').click(function(){
			 var delete_case_id = $('#test_case').val();
			 var class_remove='remove_test_case_'+delete_case_id;
	        	$.ajax({
				url:delete_test_case_url,
				method:'POST',
				data:{id:delete_case_id},
				success:function(d){
					if(d.success==true)
					{
						new Noty({
						type: 'success',
						layout: 'topRight',
						text: 'Deleted Sucessfully.'
						}).show();
						$('#delete_confirmation_modal').modal("hide");
						$('.'+class_remove).remove();	
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
        });


	
	$('#task').attr('class','active');
	$('.dummy_fields').hide();
	var work_count=1;
	$(document).on('click','.add_works',add_work);
	$('#add_db_patch').click(add_db_patch);
	
	function add_work(){
		var div = $('#dummy_wok_log').val('').html();
		div = div.replace(/xxx/g,work_count);
		$('#work_wrp').prepend(div);
		$('#work_wrp input').eq(2).focus();
		work_count++;    
	}
	add_db_patch();
	function add_db_patch(){
		//alert(1)
		var div = $('#dummy_db_patch').val('').html();
		div = div.replace(/xxx/g,patch_count);
		$('#db_patch_wrp').prepend(div);   
		$('#db_patch_wrp textarea').first().focus();
		patch_count++;
	}
	  $('body').on('click','#work_log_save',function(event){
         	var id=$(this).data('id');
            event.preventDefault();
            $('#work_log_modal').modal("show");
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
		//alert(sub_task_id);
		var div = $('#dummy_note').val('').html();
		//alert(task_notes);
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
        //alert(id);
        $(this).parents(".note").remove();
    });

	$('body').on('click', ".save_action" ,function(){ 

		var data_type= $(this).attr("data-id");

		var form_id = "#form_db_patches";
			var v = jQuery(form_id).validate({
				ignore:"",
				rules:{
				
				},
                invalidHandler: function(event, validator) {
                    new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'You have errors, Kindly check !'
                    }).show();
                    //alert($('.error').eq(0).parents('.tab-pane').attr('id'))
                    //alert($('.error').eq(0).parents('.tab-pane'))
                    //$('[data-attribute= "'+$('.error').eq(0).parents('.tab-pane').attr('id')+'"]').trigger('click');
                },        
                submitHandler: function(form){
					let formData = new FormData($(form_id)[0]);
					$('#submit').button('loading');
					$.ajax({
						url:save_db_patches_url,
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
						}else
							{
								if(data_type == 0)
								{
									window.location=add_dbpatch;
								}
								else
								{
									window.location=project_view;
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
	});
	$('body').on('click', ".remove_sub_file" ,function(){      
		var id = $(this).attr('id');
		var class_name='remove_'+id;
		$('.'+class_name).hide();
		$.ajax({
			url:delete_sub_task_file_url,
			method:'POST',
			//processData:true,
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

	});
	
	$(".numbers_only").keypress(function (e) {
		//if the letter is not digit then display error and don't type anything
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			//display error message
			$(this).find("#errmsg").html("Digits Only").show().fadeOut("slow");
			return false;
		}
	});
	$('.numbers_only1').keypress(function (e) {
		var regex = new RegExp("^[0-9.]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(str)) {
			return true;
		}
		e.preventDefault();
		return false;
	});
	jQuery.validator.addMethod("numbers_only", function(value, element) {
		return this.optional(element) || /^[0-9 .]+$/i.test(value);
	}, "Numbers only please"); 

});