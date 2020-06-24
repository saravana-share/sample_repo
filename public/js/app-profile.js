$(document).ready(function(){

  $(".password_change").click(function(){
  	var password_status = $(".password_change").attr("checked","checked").val();
            if(password_status=="Yes")
            {
               
                $(".password_div").show();
            }
            else
            {   
                $(".password_div").hide();   
            }
         }); 
          $(".password_change1").click(function(){
            var password_status = $(".password_change1").attr("checked","checked").val();
            if(password_status=="Yes")
            {
               
                $(".password_div").show();
            }
            else
            {   
                $(".password_div").hide();   
            }
         });

	$("#submit").click(function(event){

		$("#form1").validate({
			rules: {
				password: {
					required: true,
				},
				confirm_password: {
					required: true,
					equalTo: "#password",
				}
			},
			submitHandler: function(form) {
				var password=$('.password_class').val();
				var confirm_password=$('.confirm_password_class').val();
				if((password)&&(password_status=="Yes"))
				{
					if(password==confirm_password)
					{
						$('#form1').submit();
					}
					else
					{
						event.preventDefault();
						new Noty({
							type: 'error',
							layout: 'topRight',
							text: 'Please enter same passwords'
						}).show();
						return false;     
					}
				}
				else
				{
					$('#form1').submit();
				} 
			}
		});
	});

});
