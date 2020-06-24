var selected_sub_task='';
$(document).ready(function(){
	var form_id = "#form";
	var v = jQuery(form_id).validate({
		ignore:"",
		rules:{
			estimated_days:{
				maxlength:10,
			},
			actual_days:{
				maxlength:10,
			},
		},
	});
	count=0;
	$(document).on('click', '.add_replay', function(){
		var id=$(this).val();
		var entity_id=$(this).attr('data-entity');
		$('.add_replay_'+id).css('display','none');
		var div = $('#dummy_comment').val('').html();
		div = div.replace(/xxx/g,count);
		div = div.replace(/yyy/g,id);
		entity_replace_id='entity_id_'+id;
		append_div_id='add_replay_wrapper_'+id;
		$('.'+append_div_id).append(div);
		$('#'+entity_replace_id).val(entity_id);
		count++;
	});
		$(document).on('click', '.save_replay', function(){
				var parent_id=$(this).val();
				estimation_id='entity_id_'+parent_id;
				estimation_id_value=$('#'+estimation_id).val();	
				
			var text=$(this).parents('.comment_replay_row').find('.comment_replay_text').val();
			if(text)
			{
				$('.add_replay_'+parent_id).css('display','');	
				$.ajax({
				url:save_comment_replay_url,
				method:'POST',
				data:{
				entity_id:estimation_id_value,
				parent_id:parent_id,
				comment:text,
				},
				success:function(d){
				if(d.success==true)
				{
				console.log();
				var remove_div='comment_replay_'+parent_id;
				var append_replay_div='add_replay_new_'+parent_id;
				var replay_add_div ='<li style="margin-left: 30px;"><div class="form-group"><div class="sub-comment"><label><img class="img" style="width:30px;height:30px;border-radius: 50%;" alt="TVS" src="'+d.comment_profile_image+'">'+d.comment_profile_name+'  '+d.comment_date+'</label><button type="button" class="btn-xs btn-info add_replay add_replay_'+d.comment_replay.id+'" value="'+d.comment_replay.id+'" id="add_replay_'+d.comment_replay.id+'"  data-entity="'+d.comment_replay.entity_id+'">Replay</button><p>'+d.comment_replay.comment+'</p> <input type="hidden" name="time_estimation_'+d.comment_replay.id+'"  id="time_estimation_'+d.comment_replay.id+'" value="'+d.comment_replay.entity_id+'"><div class="add_replay_wrapper_'+d.comment_replay.id+'"></div><div class="add_replay_new_'+d.comment_replay.id+'"></div></div></div></li>';
				$('.'+append_replay_div).append(replay_add_div);

				//window.location=list_url;
				$('.'+remove_div).remove();	
				//location.reload();
				new Noty({
				type: 'success',
				layout: 'topRight',
				text: 'Updated Sucessfully.'
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
			}
			else
			{
				new Noty({
						type:'error',
						layout:'topRight',
						text:'Please enter your comments',
					}).show();

			}
		
	});


	var form_id = "#comment_form";
	var v = jQuery(form_id).validate({
		ignore:"",
		rules:{
			comments:
			{
				required:true,
			}
		},
		submitHandler: function(form){
			let formData = new FormData($(form_id)[0]);
			$('#add_comment').button('loading');
			$.ajax({
				url:save_comment_url,
				method:"POST",
				data:formData,
				processData:false,
				contentType:false,
			})
			.done(function(res){
				if(!res.success){
					$('#add_comment').button('Reset');
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
					//alert(dev_task_url);
					window.location=view_back_comment_url;
				}
			})
			.fail(function(xhr){
				$('#add_comment').button('reset');
				new Noty({
			          type: 'error',
			          layout: 'topRight',
			          text: 'Something went wrong at server.'
			      }).show();
			})
		}
	});



});