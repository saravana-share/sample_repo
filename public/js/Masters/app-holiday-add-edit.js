$(document).ready(function() {
    var form_id = '#holiday-form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {

        },
        submitHandler: function(form) {
            var valid = true;
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            $.ajax({
                    url: save_holiday,
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
                        custom_noty('error', errors);

                    } else {
                        window.location = list_holiday;
                    }
                })
                .fail(function(xhr) {
                    $('#submit').button('reset');
                    custom_noty('error', 'Something went wrong at server.');
                })
        }
    });


});