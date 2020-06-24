$(document).ready(function() {
    $('#company-menu').attr('class', 'active');

    var form_id = '#category_form';
    var v = jQuery(form_id).validate({
        errorPlacement: function(error, element) {
            if (element.attr("name") == "projects[]") {
                error.insertAfter(".project_error");
            } else {
                error.insertAfter(element);
            }
        },
        ignore: "",
        rules: {
            name: {
                required: true,
            },
            type_id: {
                required: true,
            },
            'projects[]': {
                required: true,
            },
        },
        messages: {
            name: {
                required: 'Name is required',
            },
            type_id: {
                required: 'Category is required',
            },
            'projects[]': {
                required: 'Atleast select one project',
            },
        },
        submitHandler: function(form) {
            //alert(1);
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            $.ajax({
                    url: save_ticket_category_type,
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
                        $('#submit').button('reset');
                        /*new Noty({
                               type: 'success',
                               layout: 'topRight',
                               text: ''
                           }).show();*/
                        //$('#master-new-project').modal('hide');
                        window.location = list_ticket_category_type;
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