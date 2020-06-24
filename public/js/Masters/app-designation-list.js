$(document).ready(function(){
    $('#designation').attr('class','active');
    $('#add').attr('href',new_designation);

	var cols = [
				{"data":"rownum"},
    			{"data":"name","name":"name","searchable":true},
    			{"data":"status","searchable":false},
                {'data':"action","searchable":false,"class":"action"},
    			];
    $('#ajax-table').DataTable({
		
        "language": {
            "search":"",
            "lengthMenu":     "_MENU_",
            "paginate": { 
            "next":       '<i class="icon ion-ios-arrow-forward"></i>',
            "previous":   '<i class="icon ion-ios-arrow-back"></i>'
            },
            },



    	columns:cols,
    	ajax:{
    			url:getDesignationList,
    			data:function(d){

    			},
    	},
    	serverSide: true,
    	"ordering": false,
    	processData:true,
    });


$('body').on('click', '#delete_designation', function (event) {
     event.preventDefault();
        $('#delete_confirmation_modal').modal("show");
        delete_url=$(this).attr('href');
});
$('.delete-confirm').click(function(){
        window.location = delete_url;
    });


	
});