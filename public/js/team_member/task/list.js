$(document).ready(function(){
	$('.dummy_fields').hide();
	var status=new Array;
	var status1=-1;
	var table = [];
	var cols = [
		{'data':"project_name",'name':"projects.short_name","searchable":false},
		{'data':"task_number",'name':"tasks.number","searchable":true},
		{'data':"subject",'name':"tasks.subject","searchable":true},
		{'data':"task_type",'name':"task_types.name","searchable":true},
		{'data':"estimated_date","searchable":false},
		{'data':"flow_type",'name':"tasks.flow_type","searchable":true},
		{'data':"task_status",'name':"task_statuses.name","searchable":true},
		{'data':"dead_line_status","searchable":false},
		{'data':"action","searchable":false,"class":"action"},
	];

	var status_array=new Array();
	var project_table = $('#Ticket_table').DataTable({
			"language": {
			"search":"",
			"lengthMenu":     "_MENU_",
			"paginate": { 
			"next":       '<i class="icon ion-ios-arrow-forward"></i>',
			"previous":   '<i class="icon ion-ios-arrow-back"></i>'
			},
		},
        'pageLength': -1,
        processing:true,
        serverSide: true,
        ordering: false,
        method:"GET",  
        ajax: {
            url: list_ticket,
            data: function (d){
            	 d.project_id = $('.project_team_member').val();
            	 console.log(d.project_id);
            	 d.task_type_id = $('.task_type').val();
            	 d.flow_type_id = $('.flow_type').val();
            	 console.log($('.status').val());
            	
            	 var status;
            	 if($('.status').val()==null || $('.status').val()=="")
            	 { 
            	 	status = -1;
            	 }else
            	 {
            	 	status = $('.status').val();
            	 }
            	 var task_division=$('.task_division').val();
            	 d.status_id =status;
            	 d.assign_to_id = $('.assign_to').val();
            	 d.type = type;
            	 d.task_division=task_division;
            },
        },
       columns: cols,
    });
	var form_id = "#form";
	var v = jQuery(form_id).validate({
		ignore:"",
		rules:{

		},
		submitHandler: function(form){
			let formData = new FormData($(form_id)[0]);
			$('#submit').button('loading');
			$.ajax({
				url:save_ticket,
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
					window.location = list_ticket;
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
	var dataTable = $('#Ticket_table').dataTable();


    $('.project_team_member').on('change', function(){
         dataTable.fnFilter();     
    });
	$('.task_type').on('change', function(){
		dataTable.fnFilter();     
	});
	$('.flow_type').on('change', function(){
		dataTable.fnFilter();     
	});
	$('.status').on('change', function(){
		status=$(this).val();
		//alert(status);
		if(status==null)
		{
			status1=-1;
		}else
		{
			status1=$(this).val();
		}
		//alert(status1);
		dataTable.fnFilter();     
	});
	$('.assign_to').on('change', function(){
		dataTable.fnFilter();     
	});

	$('.task_division').on('change', function(){
		task_division=$(this).val();
		//alert(task_division);
		dataTable.fnFilter();     
	});
	$('body').on('click', '#task_export', function (event) {
		//alert(1)
		event.preventDefault();
		$('#task_export_modal').modal("show");
		$('.type').val('task');
	});
	$('.export-confirm').click(function(event){
		event.preventDefault();
		var task_ids=selected_task;
		var type=$('#task_type_id1').val();
		var status=$('#task_status_id1').val();
		var url=export_url +'/'+selected_task +'/'+type+'/'+status;
		window.location = url;
	});
	$('body').on('click', '#task_bulk_update', function (event) {
		event.preventDefault();
		$('#task_bulk_update_modal').modal("show");
		$('.type').val('task');
	});
	$('.change-confirm').click(function(event){
		event.preventDefault();
		var task_ids=selected_task;
		var assign_to=$('.assign_to_update').val();
		var status=$('.status_update').val();
		var url=bulk_update_url +'/'+selected_task +'/'+assign_to+'/'+status;
		window.location = url;
	});

	$('body').on('click','#task_email',function(event){
		event.preventDefault();
		$('#task_email_modal').modal("show");
		$('.type').val('task');
	});

	$('.task_total_select').on('click', function() {
		if (this.checked == true)
		$('#Ticket_table').find('input[name="task_id[]"]').prop('checked', true).trigger("change");
		else
		$('#Ticket_table').find('input[name="task_id[]"]').prop('checked', false).trigger("change");
	});

	$(".task_total_select").click(function(){
		selected_task=[];
		selected_project=[];
		selected_project_name=[];
		sel_pro="";
		sel_pro_name="";
		$.each($("input[name='task_id[]']:checked"), function(){            
			selected_task.push($(this).val());
			selected_project.push($(this).attr("project-id"));
			selected_project_name.push($(this).attr("project-name"));  
		});
		sel_pro = $.unique(selected_project);
		sel_pro_name = $.unique(selected_project_name);
		$('.seleted_tasks').val(selected_task);
		$('.seleted_projects').val(sel_pro);
		$('.project_name').val(sel_pro_name);
	});
	$('body').on('click','.task_select',function(){
		selected_task=[];
		selected_project=[];
		selected_project_name=[];
		sel_pro="";
		sel_pro_name="";
		$.each($("input[name='task_id[]']:checked"), function(){            
			selected_task.push($(this).val());
			selected_project.push($(this).attr("project-id"));
			selected_project_name.push($(this).attr("project-name"));  
		});
		sel_pro = $.unique(selected_project);
		sel_pro_name = $.unique(selected_project_name);
		$('.seleted_tasks').val(selected_task);
		$('.seleted_projects').val(sel_pro);
		$('.project_name').val(sel_pro_name);
	});

	var form_id = '#form1';
	var v = jQuery(form_id).validate({
		ignore: "",
		rules: {
		task_subject:
		{
			required:true,
		},
		'task_email_to[]':{
			required:true,
		},
		},         
		submitHandler: function (form) {
			let formData = new FormData($(form_id)[0]);
			window.location(preview_url);

		}
	});

});