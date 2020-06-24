$(document).ready(function(){
    $('#designation').attr('class','active');
    $('#add').attr('href',new_designation);

	var cols = [
				{"data":"id","name":"id","searchable":true},
    			{"data":"name","name":"name","searchable":true},
    			{"data":"desc","searchable":false},
    			{"data":"status","searchable":false},
    			];
    $('#ajax-table').DataTable({
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


	
});