$(document).ready(function(){
    $('.clients1').on('change', function(){
    	var comp_id = $('.clients1').val();
    	var pro_id = $('.project1').val();
    	var user_id = $('.assign_to1').val();
    	
    		$.ajax({
			url:dashboard_list,
			method:'GET',
			//processData:true,
			data: {
			company_id :comp_id,
			project_id :pro_id,
			assign_to :user_id

			},
			success:function(d){
				$('#project_table').html('');
				$('#project_count').html('');
				$('#project_over_due_count').html('');
				$('#project_table').html(d.table1);
				$('#project_count').html(d.table_count);
				$('#project_over_due_count').html(d.table_due_count);
			}
		})
    });

	$('.project1').on('change', function(){
		var comp_id = $('.clients1').val();
    	var pro_id = $('.project1').val();
    	var user_id = $('.assign_to1').val();
    	
    		$.ajax({
			url:dashboard_list,
			method:'GET',
			//processData:true,
			data: {
			company_id :comp_id,
			project_id :pro_id,
			assign_to :user_id
			},
			success:function(d){
				$('#project_table').html('');
				$('#project_count').html('');
				$('#project_over_due_count').html('');
				$('#project_table').html(d.table1);
				$('#project_count').html(d.table_count);
				$('#project_over_due_count').html(d.table_due_count);
			}
		})


	});
	$('.assign_to1').on('change', function(){
		var comp_id = $('.clients1').val();
    	var pro_id = $('.project1').val();
    	var user_id = $('.assign_to1').val();
    	
    		$.ajax({
			url:dashboard_list,
			method:'GET',
			//processData:true,
			data: {
			company_id :comp_id,
			project_id :pro_id,
			assign_to :user_id
			},
			success:function(d){
				$('#project_table').html('');
				$('#project_count').html('');
				$('#project_over_due_count').html('');
				$('#project_table').html(d.table1);
				$('#project_count').html(d.table_count);
				$('#project_over_due_count').html(d.table_due_count);
			}
		})

	});



});