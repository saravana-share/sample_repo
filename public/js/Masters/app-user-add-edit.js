$(document).ready(function() {
    //alert();
    $(".password_class").val('');
    $('#user').attr('class', 'active');
    $('#add').attr('href', new_user);
    $('#user_color').colorPalettePicker({
        button: '<button name="colorpalettebutton" class="{buttonClass}" data-toggle="dropdown"><span name="{buttonPreviewName}"  style="display:none">■ </span>{buttonText}</button>',
        buttonClass: 'btn btn-secondary dropdown-toggle',
        buttonPreviewName: 'colorpaletteselected',
        buttonText: 'Choose color',
        dropdown: '<div class="dropdown-menu"><h5 class="dropdown-header text-center">{dropdownTitle}</h5>',
        dropdownTitle: 'Available colors',
        menu: '<ul class="list-inline" style="padding-left:10px;padding-right:10px">',
        item: '<li class="list-inline-item"><div name="picker_{name}" class="colors" style="background-color:{color};width:32px;height:32px;border-radius:5px;border: 1px solid #666;margin: 0px;cursor:pointer" data-toggle="tooltip"  title="{name}" data-color="{color}"></div></li>',
    });
    $('.colors').on('click', function() {
        var color = $(this).attr('data-original-title');
        $('.color').val(color);
    });


    $(".password_change").click(function() {
        var password_status = $(".password_change").attr("checked", "checked]").val();
        // alert(password_status);
        if (password_status == "Yes") {

            $(".password_div").show();
        } else {
            $(".password_div").hide();
        }
    });
    $(".password_change1").click(function() {
        var password_status = $(".password_change1").attr("checked", "checked]").val();
        if (password_status == "Yes") {

            $(".password_div").show();
        } else {
            $(".password_div").hide();
        }
    });
    $(".shift_roster").click(function() {
        var shift_roster = $(this).prop('checked', true).val();
        //alert(shift_roster);
        if (shift_roster == 1) {
            $(".shift_roster_div").show();
        } else {
            $(".shift_roster_div").hide();
        }
    });

    function image_search() {
        var image_val = $('.images').val();
        if (image_val) {

            var fields = image_val.split('.');
            var name = fields[0];
            var extension = fields[1];
            //alert(extension);
            if (extension == 'jpg' || extension == 'png' || extension == 'jpeg' || extension == 'PNG' || extension == 'JPEG' || extension == 'JPG') {
                return true;
            } else {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'Please select only image formats'
                }).show();
                return false;
            }
        }

        var password = $('.password_class').val();
        var confirm_password = $('.confirm_password_class').val();
        if ((password) && (password_status == "Yes")) {
            if (password == confirm_password) {
                return true;
            } else {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'Please enter same passwords'
                }).show();
                return false;
            }
        } else {
            return true;
        }
    }

    $("input[name=mobile]").attr("maxlength", "10");

    var form_id = '#form';
    var v = jQuery(form_id).validate({
        ignore: "",
        errorPlacement: function(error, element) {
            if (element.hasClass("gender")) {
                error.insertAfter(".gender_error");
            } else {
                error.insertAfter(element);
            }
        },

        rules: {
            company_id: {
                required: true,
            },
            name: {
                required: true,
            },
            "role_id[]": {
                required: true,
            },
            portal_role_id: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },

            mobile: {
                minlength: 10,
                required: true,
                phone_numbers_only: true,
            },

            ecode: {
                required: true,
            },
            username: {
                required: true,
            },
            password: {

                required: function(element) {
                    return $('.change_password_yes').is(':checked');
                },
            },
            confirm_password: {

                equalTo: "#password",

                required: function(element) {
                    return $('.change_password_yes').is(':checked');
                },
            },
            gender: {
                required: true,
            },
            shift_time: {
                required: function(element) {
                    return $('.shift_roster_yes').is(':checked');
                },
            },
        },
        submitHandler: function(form) {
            var valid = true;
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            $.ajax({
                    url: save_user,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#submit').button('reset');
                        var errors = '';
                        for (var i in res.errors) {
                            errors += '<li>' + res.errors[i] + '</li>';
                        }
                        console.log(errors)
                        custom_noty('error', errors);
                        /*new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: errors
                        }).show();*/
                    } else {
                        window.location = list_user;
                    }
                })
                .fail(function(xhr) {
                    $('#submit').button('reset');
                    /*new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server.'
                    }).show();*/
                    custom_noty('error', 'Something went wrong at server.');

                })
        }
    });
    jQuery.validator.addMethod("phone_numbers_only", function(value, element) {
        return this.optional(element) || /^[0-9 -]+$/i.test(value);
    }, "Phone numbers only please");

});