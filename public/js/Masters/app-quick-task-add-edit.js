var selected_sub_task='';
$(document).ready(function(){
	$('#project').attr('class','active');
	$('.dummy_fields').hide();
	//alert(selected_sub_task);
// /var key=1;
	$(document).on('click','.add_task_detail',function(){
var div = $('#dummy_quick_task').html();
task_count++;
div = div.replace(/xxx/g,task_count);  
$('.sub_quick_task_wrapper').append(div);
$('select').next('.select2').remove();
$('select').not('.not_style').select2();
dateRange();
});


	$(document).on('click','.remove_task_detail',function(){
		 var id = $(this).attr('id');
        $(this).parents(".quick_sub_task").remove();
	});

	sub_task_list();
			

	function sub_task_list()
			{
				$("#sub_tasks option").each(function ()
				{	
					var id=$(this).val();
					if($(this).is(':checked'))
					{
					selected_sub_task += id+',';
					}

				});
			}


	var form_id = "#form";
	var v = jQuery(form_id).validate({
		ignore:"",
		rules:{
			estimated_days:{
				numbers_only:true,
				maxlength:10,
			},
			actual_days:{
				numbers_only:true,
				maxlength:10,
			},


		},
		submitHandler: function(form){
			let formData = new FormData($(form_id)[0]);
			$('#submit').button('loading');
			$.ajax({
				url:save_quick_task,
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
					window.location = list_project;
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



			
			var selval='';
			$(document).on('change','#sub_tasks1',function(){
				var task_value = $('#sub_tasks').val();
				var selval='';
				if(task_value)
				{
					$('.sub_task_wrapper').show();	
					for(i=0; i<task_value.length;i++)
					{
					var id='subtask_'+task_value[i];
					$('#'+id).css('display','block');		 
					}
					$("#sub_tasks option").each(function ()
					{
						var id='subtask_'+$(this).val();
						if ($(this).is(':checked'))
						{

						}
						else
						{
						$('#'+id).css('display','none');
						}
					});
				}
				else
				{
					$('.sub_task_wrapper').hide();	
				}

			});
	
			
var selected_task = new Array();
		$(document).on('change','#sub_tasks',function(){				
			$("#sub_tasks option").each(function ()
			{
				var id=$(this).val();
				var text=$(this).text();
				//alert(text);
				selected_task=selected_sub_task.split(',');
				if($(this).is(':checked'))
				{
				if(selected_task.indexOf(id)==-1)
					{
						var div = $('#dummy_sub_task').html();
						div = div.replace(/xxx/g,id);  
						div = div.replace(/yyy/g,text);  
		                $('.sub_task_wrapper').append(div);
		                selected_sub_task += id+',';
					}
					$('select').next('.select2').remove();
					$('select').not('.not_style').select2();
					dateRange();

				}
				else
				{
					var remove_id='subtask_'+id;
					$('#'+remove_id).remove();
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
						new Noty({
						type: 'error',
						layout: 'topRight',
						text: 'Delete Sucessfully.'
						}).show();
				}
			})

    });

  $(".numbers_only").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        //alert($(this));
        $(this).find("#errmsg").html("Digits Only").show().fadeOut("slow");
               return false;
    }
   });


$('.numbers_only1').keypress(function (e) {
	//alert();
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


