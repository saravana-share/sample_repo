$(document).ready(function(){
	$("#client_form").validate();

    $('.name').rules('add',{
    	alpha:true,
    });

    $('.gst').rules('add',{
    	alpha_numeric:true,
    });

    $('.email').rules('add',{
    	email:true,
    	messages:{
    		email:"Please Enter a Valid Email",
    	}
    });

    $('.mobile_number').rules('add',{
    	number:true,
    	minlength: 10,
    	maxlength:10,
    	messages:{
    		number:"Please Enter a Valid Mobile Number",
    	}
    });

    $('.phone_number').rules('add',{
        number:true,
        minlength: 10,
        maxlength:10,
        messages:{
            number:"Please Enter a Valid Phone Number",
        }
    });

    $.validator.addMethod("alpha", function(value, element) {
   	 return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
 	},"Only alphabets and space are allowed");

 	$.validator.addMethod("alpha_numeric",function(value,element){
 		return this.optional(element) || value == value.match(/^[a-z0-9]+$/i);
 	},"Only alphabets and numbers are allowed");
   



    
});