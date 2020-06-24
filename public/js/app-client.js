$(document).ready(function(){
	$('#dummy_contact_person').hide();
	$(document).on('click','#add-new-client',function(){
		$('#master-company').modal('show');
		$('#client_id').val(client_id);
	});

	$(document).on('click','#add_new_contact',function(){
		var contact_info = $('#dummy_contact_person').val('').html();
        contact_info = contact_info.replace(/count/g,++count)
		$('#new_contact_person').append(contact_info);
	})
})
