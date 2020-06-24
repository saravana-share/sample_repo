$(document).ready(function() {

    if (leave_type == 'Leave') {
        $("#day").show();
        $("#min").hide();
    } else if (leave_type == 'Permission') {
        $("#min").show();
        $("#day").hide();
    }

    var form_id = '#leave_edit_form';
    var v = jQuery(form_id).validate({



        ignore: "",
        rules: {


        },
        submitHandler: function(form) {
            var valid = true;
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            $.ajax({
                    url: save_leaves,
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
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: errors
                        }).show();
                    } else {
                        window.location = list_leaves;
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
    $('body').on('change', '#leave_type', function(event) {

        var value = $(this).val();
        if (value == 0) {
            $("#day").show();
            $("#min").hide();
        } else if (value == 1) {
            $("#min").show();
            $("#day").hide();
        }
    });
});