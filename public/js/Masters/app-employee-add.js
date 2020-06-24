
$(document).ready(function(){
// alert(save_employee);
$("input[name=mobile]").attr("maxlength", "10");
var form_id = '#employeeform';
var v = jQuery(form_id).validate({

    

    ignore: "",
    rules: {
    employee_name:{
    required:true,
    },
    designations_id:{
    required:true,
    },
    color: {
    required: true,
    },
    bloodgroup:{
    required: true,  
    },
    company:{
    required: true, 
    },
    "role[]":{
    required: true,
    },
    email:{
    required: true,
    email:true
    },
    mobile: {
        minlength: 9,
    required: true,
    
    phone_numbers_only:true,
    },
    username:{
    required: true,
    },
    doj:{
    required: true,
    },
    dob:{
    required: true,
    },
    // password: "required",
                employee_confirm_password: {
                    equalTo: "#password"
                }
    
    },
    submitHandler: function (form) {
        var valid = true;
        let formData = new FormData($(form_id)[0]);
        $('#submit').button('loading');
        $.ajax({
            url: save_employee,
            method: "POST",
            data:formData,
            processData: false,
            contentType: false,
        })
        .done(function(res) {
            if(!res.success) {
            $('#submit').button('reset'); 
            var errors = '';
            for(var i in res.errors){
            errors += '<li>'+res.errors[i]+'</li>';
            }
            console.log(errors)
            new Noty({
            type: 'error',
            layout: 'topRight',
            text: errors
            }).show();
            }else{
            window.location = list_employee;
            }
        })
        .fail(function(xhr) {
            $('#submit').button('reset'); 
            new Noty({
            type: 'error',
            layout: 'topRight',
            text: 'Something went wrong at server.'
            }).show();
        })
    }
}); 

$('.datepicker').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901

});

$('#employee_color').colorPalettePicker({
    button: '<button name="colorpalettebutton" class="{buttonClass}" data-toggle="dropdown"><span name="{buttonPreviewName}" style="display:none">■ </span>{buttonText}</button>',
    buttonClass: 'btn btn-md btn-border',
    buttonPreviewName: 'colorpaletteselected',
    buttonText: 'Choose color',
    dropdown: '<div class="dropdown-menu"><h5 class="dropdown-header text-center">{dropdownTitle}</h5>',
    dropdownTitle:'Available colors',
    menu: '<ul class="list-inline" style="padding-left:10px;padding-right:10px">',
    item: '<li class="list-inline-item"><div name="picker_{name}" class="employeecolors" style="background-color:{color};width:32px;height:32px;border-radius:5px;border: 1px solid #666;margin: 0px;cursor:pointer" data-toggle="tooltip"  title="{name}" data-color="{color}"></div></li>',
});

$('.employeecolors').on('click',function(){
    var color=$(this).attr('data-original-title');
    // console.log(' == color =='+color);
    $('.colors').val(color);  

});

$(".password_employee_change").click(function(){
    var password_status = $(".password_employee_change").attr("checked","checked]").val();
    // alert(password_status);
    if(password_status=="Yes")
    {

    $(".employee_password_div").show();
    }
    else
    {   
    $(".employee_password_div").hide();   
    }
}); 
$(".password_employee_change1").click(function(){
    var password_status = $(".password_employee_change1").attr("checked","checked]").val();
    if(password_status=="Yes")
    {

    $(".employee_password_div").show();
    }
    else
    {   
    $(".employee_password_div").hide();   
    }
});

jQuery.validator.addMethod("phone_numbers_only", function(value, element) {
return this.optional(element) || /^[0-9 -]+$/i.test(value);
}, "Phone numbers only please"); 

    $("#salary").keydown(function (event) {


            if (event.shiftKey == true) {
                event.preventDefault();
            }

            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {

            } else {
                event.preventDefault();
            }
            
            if($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
                event.preventDefault();

        });



});


