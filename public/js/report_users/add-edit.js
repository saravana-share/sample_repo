$(document).ready(function() {
    $('#to_emails').change();

    var form_id = '#form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            report_name: {
                required: true,
            },

            'to_emails[]': {
                required: function() {
                    if ($('#to_emails').val() == null) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            // 'cc_emails[]': {
            //     required: function() {
            //         if ($('#cc_emails').val()==null) {
            //             return true;
            //         } else {
            //             return false;
            //         }
            //     },
            // },


        },
        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            //alert();
            $.ajax({
                    url: save_user,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        var errors = '';
                        for (var i in res.errors) {
                            errors += '<li>' + res.errors[i] + '</li>';
                        }
                        custom_noty('error', errors);
                    } else {
                        window.location = user_list_page;
                    }
                    $('#submit').button('reset');
                })
                .fail(function(xhr) {
                    $('#submit').button('reset');
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server.'
                    }).show();
                    $('#submit').button('reset');
                })
        },
        errorElement: "span",
        errorPlacement: function(error, element) {
            if (element.hasClass("to_emails")) {
                error.appendTo($('.to_emails_error'));
            } else if (element.hasClass("cc_emails")) {
                error.appendTo($('.cc_emails_error'));
            } else {
                error.insertAfter(element);
                error.addClass('error-label');
            }
        }
    });


});

$('#to_emails').on('change', function() {
    var to_emails = $(this).val();

    if (to_emails != null) {
        $.ajax({
            url: to_emails_url,
            method: "POST",
            data: { to_emails: to_emails },
            dataType: 'json',
            success: function(result) {
                var cc_mail_users_array = JSON.parse(cc_mail_users);
                var data = [];
                var checks = '';
                $(result).each(function(index, values) {
                    console.log(index, values);
                    var value = values.id;
                    var labels = values.name;
                    //console.log(cc_mail_users.values.id);
                    if (cc_mail_users_array.indexOf(values.id) != -1) {
                        checks = true;
                    } else {
                        checks = false;
                    }

                    data.push({ label: labels, value: value, selected: checks });
                });
                //console.log(data);
                $('#cc_emails').multiselect('dataprovider', data);

            }
        });

    }
});