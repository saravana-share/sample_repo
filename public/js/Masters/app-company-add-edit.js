$(document).ready(function() {

    $('#company-menu').attr('class', 'active');
    $('#add').attr('href', new_company);

    $(document).on('click', '.add_contact_detail', add_contact_form);

    function add_contact_form() {
        var div = $('#dummy_contact').html();
        contact_count++;
        div = div.replace(/xxx/g, contact_count);
        $('#contacts_wrp').append(div);
        $('.designation_list').next('.select2').remove();
        $('.designation_list').select2();
    }

    if (add_contact) {
        add_contact_form();
    }

    function image_search() {
        var image_val = $('.images').val();
        if (image_val) {
            var fields = image_val.split('.');
            var name = fields[0];
            var extension = fields[1];
            alert(extension);
            if (extension == 'jpg' || extension == 'png' || extension == 'jpeg') {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }


    $('body').on('change', '.company_type', function() {
        var company_type = $('input[name=type]:checked').val();


        if (company_type == 'Yes') {
            $('.client_display').css('display', '');
            $('.leave_approve').css('display', 'none');
        } else {
            $('.client_display').css('display', 'none');
            $('.leave_approve').css('display', '');

        }
    });
    $('body').on('change', '.daily_report_mail', function() {
        var mail_type = $('input[name=daily_report]:checked').val();
        if (mail_type == 1) {
            $('.daily_report_mail_display').css('display', '');
        } else {
            $('.daily_report_mail_display').css('display', 'none');
        }
    });
    $('body').on('change', '.employee_report_mail', function() {
        var employee_report = $('input[name=employee_report]:checked').val();
        if (employee_report == 1) {
            $('.employee_report_mail_display').css('display', '');
        } else {
            $('.employee_report_mail_display').css('display', 'none');
        }
    });
    $('body').on('change', '.punch_report_mail', function() {
        var punch_report = $('input[name=punch_mail]:checked').val();
        if (punch_report == 1) {
            $('.punch_report_mail_display').css('display', '');
        } else {
            $('.punch_report_mail_display').css('display', 'none');
        }
    });





    var form_id = '#form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            name: {
                required: true,
            },
            email: {
                email: true,
            },
            phone_number: {
                minlength: 10,
                phone_numbers_only: true,
            },
            short_name: {
                required: true,
            },
            'weekly_report_to_mail[]': {
                required: function(element) {
                    if ($("#client_type_yes").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'daily_report_to_mail[]': {
                required: function(element) {
                    if ($("#send_daily_mail_yes").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'employee_report_to_mail[]': {
                required: function(element) {
                    if ($("#employee_report_yes").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'punch_report_to_mail[]': {
                required: function(element) {
                    if ($("#punch_report_mail_yes").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            },
            leave_approver1_mail: {
                required: function(element) {
                    if ($("#client_type_no").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            },
            leave_approver2_mail: {
                required: function(element) {
                    if ($("#client_type_no").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            },
            leave_approver3_mail: {
                required: function(element) {
                    if ($("#client_type_no").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            },
            leave_approver4_mail: {
                required: function(element) {
                    if ($("#client_type_no").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            $.ajax({
                    url: save_company,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        //alert(res);
                        $('#submit').button('reset');
                        var errors = '';
                        for (var i in res.errors) {
                            errors += '<li>' + res.errors[i] + '</li>';
                        }

                        console.log(errors)
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: errors
                        }).show();
                    } else {
                        //$('#master-new-project').modal('hide');
                        window.location = list_company_home;
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
    jQuery.validator.addMethod("phone_numbers_only", function(value, element) {
        return this.optional(element) || /^[0-9 -]+$/i.test(value);
    }, "Phone numbers only please");

    $('body').on('click', ".remove_contact_detail", function() {
        var id = $(this).attr('id');
        //alert(id);
        $(this).parents(".company_contact").remove();
    });


});