$(document).ready(function() {


    //On Edit Case
    $(".approved_date").datepicker({
        orientation: 'auto',
        startDate: $('.requested_date').val(),
    });

    //On Change Requested Date
    $('body').on('change', '.requested_date', function() {
        $('.approved_date').val('');
        $('.approved_date').datepicker('destroy');
        $(".approved_date").datepicker({
            orientation: 'auto',
            startDate: $(this).val(),
        });
    });

    $('#project_id').focus();
    var form_id = '#form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            name: {
                required: true,
            },
            description: {
                required: true,
            },
            rfc_type: {
                required: true,
            },
            status: {
                required: true,
            },
            primary_email: {
                required: true,
            },
            cc_emails: {
                required: function() {
                    if (count(document.getElementById('cc_emails').value) <= 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            requested_date: {
                required: true,
            },

            approved_by: {
                required: function(element) {
                    if ($("#action").val() == 'Edit') {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            approved_date: {
                required: function(element) {
                    if ($("#action").val() == 'Edit') {
                        return true;
                    } else {
                        return false;
                    }
                }

            },

        },
        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            //alert();
            $.ajax({
                    url: save_rfc,
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

                        console.log(errors);
                        /*new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: errors
                        }).show();*/
                        custom_noty('error', errors);
                    } else {
                        /* new Noty({
                             type: 'success',
                             layout: 'topRight',
                             text: res.message
                         }).show();*/
                        //custom_noty('success', res.message);
                        window.location = rfc_list_page;
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
        }
    });


});