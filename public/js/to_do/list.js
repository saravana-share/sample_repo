$(document).ready(function(){
	$('#add').click(add_to_do);
	
	function add_to_do(){
		var div = $('#dummy_to_do').html();
		div = div.replace(/xxx/g,to_do_count);
		$('#to_dos_wrp').prepend(div);
		$('#to_dos_wrp input').eq(1).focus();
		$('select').next('.select2').remove();
		$('select').not('.not_style').select2();
		to_do_count++;    
	}
});