$(document).ready(function() {
    $('.text_today_punch').show();
    $('.show_hide_picker_today').hide();
    $('.show_hide_picker_yesterday').hide();
    $('.text_yesterday_punch').show();
    var form_id = '#punch_edit_report';
    $.validator.addMethod("valid_checking", $.validator.methods.required, "This field is Required");
    $.validator.addClassRules({
        valid_check: {
            valid_checking: true,
        },
    });
    $('.today_edit_status').change(function() {
        if ($(this).val() >= 0) {
            var indx_name = $(this).attr('data-index');
            $('.' + indx_name).addClass('valid_check');
        } else {
            $('#' + indx_name + '[days]').removeClass('valid_check');
        }

        if ($(this).val() == 1) {
            // alert();
            // $('.show_hide_picker_today').show();
            $(this).closest('td').next('td').find('.show_hide_picker_today').show();
            $(this).closest('td').next('td').find('.text_today_punch').hide();

        } else {
            $(this).closest('td').next('td').find('.show_hide_picker_today').hide();

            $(this).closest('td').next('td').find('.text_today_punch').show();
        }
    });

    $('.yesterday_edit_status').change(function() {
        if ($(this).val() >= 0) {
            var indx_name = $(this).attr('data-index');
            $('.' + indx_name).addClass('valid_check');
        } else {
            $('.' + indx_name).removeClass('valid_check');
        }

        if ($(this).val() == 1) {
            // alert();
            // $('.show_hide_picker_today').show();
            $(this).closest('td').next('td').find('.show_hide_picker_yesterday').show();
            $(this).closest('td').next('td').find('.text_yesterday_punch').hide();

        } else {
            $(this).closest('td').next('td').find('.show_hide_picker_yesterday').hide();

            $(this).closest('td').next('td').find('.text_yesterday_punch').show();
        }

    });
    $(".punch_time_picker").datetimepicker({
        format: 'HH:mm',
    });
    $(".punch_yesterday_picker").datetimepicker({
        format: 'HH:mm',
    });

    $("#punch_edit_report").validate({
        rules: {},
        submitHandler: function(form_id) {
            form_id.submit();
        }
    });


    var form = jQuery("#daily_punch_form");

    form.validate({
        rules: {
            punch_mail_subject: {
                required: true,
            },
            'punch_email_to[]': {
                required: true,
            },
        },
        messages: {
            punch_mail_subject: {
                required: 'Please Enter Subject',
            },
            'punch_email_to[]': {
                required: 'Please Select To Mail',
            },
        },
        errorPlacement: function(error, element) {
            if (element.hasClass("punch_mail_subject")) {
                error.appendTo($('.punch_mail_subject_error'));
            }
            if (element.hasClass("punch_email_to")) {
                error.appendTo($('.punch_email_to_error'));
            }
        },
        submitHandler: function(form) {
            $('#punch_mail_send').button('loading');
            var form_id = '#daily_punch_form';
            let formData = new FormData($(form_id)[0]);
            $.ajax({
                    url: send_punch_report_mail,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#punch_mail_send').button('reset');
                        var errors = '';
                        for (var i in res.errors) {
                            errors += '<li>' + res.errors[i] + '</li>';
                        }
                        console.log(errors)

                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: 'Something Went Wrong At Server'
                        }).show();

                    } else {
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: 'Punch Daily Report Sent Successfully!!!'
                        }).show();
                        $('.punch_email_to').val('');
                        $('.punch_email_to').multiselect('rebuild');
                        $('.punch_email_cc').val('');
                        $('.punch_email_cc').multiselect('rebuild');
                        $('#punch_mail_send').button('reset');
                        $('#punch_daily_report_modal').modal('hide');
                    }
                })
        }
    });
});