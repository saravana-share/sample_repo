$(document).ready(function(){
	/*var ticket_list = $('#ajax-table').Datatable({
		processing:true,
		serverSide:true,
		ajax:{
			url:get_ticket_list,
			data:function(d){

			},
		},
		columns:[
		{data:"ticket_id",name:'tickets.ticket_id',searchable:true},
		{data:"date",name:'tickets.created_at',searchable:true},
		{data:"project_name",name:'projects.name',searchable:true},
		{data:"title",name:'tickets.subject',searchable:true},
		{data:"posted_by",name:'users.name',searchable:true},
		{data:"type",name:'ticket_types.name',searchable:true},
		{data:"status",searchable:false},
		{data:"priority",searchable:false},
		],

	});	*/

	var cols = [
		{data:'ids'},
		{data:"ticket_number",name:'tickets.ticket_number',searchable:true},
		{data:"date",name:'tickets.created_at',searchable:true},
		{data:"project_name",name:'projects.name',searchable:true},
		{data:"title",name:'tickets.subject',searchable:true},
		{data:"posted_by",name:'users.name',searchable:true},
		{data:"type",name:'ticket_types.name',searchable:true},
		{data:"status",searchable:false},
		{data:"priority",searchable:false},
		];

	var table1 = $('#ajax-table').DataTable({
                "pageLength": 10,
                columns: cols,
                ajax: {
                    url: get_ticket_list,
                    data: function (d) {
                        // d.duration = $('#duration').val();
                    },
                },
                serverSide: true,
                "ordering": false,
                /*infoCallback: function( settings, start, end, max, total, pre ) {
                    $('.'+count_element).html(total+' / '+max+' listings')
                },*/
                //initComplete: function(){ dtInitComplete(this,common_filter,filter)},
            });
});