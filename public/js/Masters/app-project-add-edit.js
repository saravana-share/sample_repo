$(document).ready(function() {

    $('#project').attr('class', 'active');
    $(".dev_list option:selected")
    //$('#bcPicker').bcPicker();
    $('#project_color').colorPalettePicker({
        button: '<button name="colorpalettebutton" class="{buttonClass}" data-toggle="dropdown"><span name="{buttonPreviewName}" style="display:none">■ </span>{buttonText}</button>',
        buttonClass: 'btn btn-md btn-border',
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

    var client_company = 0;
    var dev_company = 0;
    client_company = $('.client_company').val();
    dev_company = $('.dev_company').val();

    var check_team1;
    $('#team').click(function() {
        $(this).attr('data-target', "#team-member");
        $(this).attr('data-toggle', "tab");
        $(this).attr('aria-expanded', "true");
    });



    $('#contact').click(function() {
        $(this).attr('data-target', "#contacts");
        $(this).attr('data-toggle', "tab");
        $(this).attr('aria-expanded', "true");
    });

    $(document).on('change', '.client_company', function() {
        client_company = $('.client_company').val();
    });
    $(document).on('change', '.dev_company', function() {
        dev_company = $('.dev_company').val();
    });



    // var form_id = '#form';
    //    var v = jQuery(form_id).validate({
    //        ignore: "",
    //        rules: {
    //            client_company_id:
    //            {
    //                required:true,
    //            },
    //            name:{
    //                required:true,
    //            },
    //            short_name:{
    //                required:true,   
    //            },
    //            description:{
    //                required:true,
    //            },
    //            language_id:{
    //                required:true,
    //            },
    //            framework:{
    //                required:true,
    //            },
    //            db_server:{
    //                required:true,
    //            },
    //            completion_percentage:{
    //                required:true,
    //            },
    //            discussion_started_date:{
    //                required:true,
    //            },
    //            current_status:{
    //                required:true,
    //            }
    //        },
    //        invalidHandler: function(event, validator) {
    //            new Noty({
    //            type: 'error',
    //            layout: 'topRight',
    //            text: 'You have errors, Kindly check in each tab!'
    //            }).show();
    //            //alert($('.error').eq(0).parents('.tab-pane').attr('id'))
    //            //alert($('.error').eq(0).parents('.tab-pane'))
    //            //$('[data-attribute= "'+$('.error').eq(0).parents('.tab-pane').attr('id')+'"]').trigger('click');
    //        },        
    //        submitHandler: function (form) {
    //            let formData = new FormData($(form_id)[0]);
    //            $('#submit').button('loading');
    //                $.ajax({
    //                    url: save_project,
    //                    method: "POST",
    //                    data:formData,
    //                    processData: false,
    //                    contentType: false,
    //                })
    //                .done(function(res) {
    //                    if(!res.success) {
    //                        $('#submit').button('reset'); 
    //                        var errors = '';
    //                        for(var i in res.errors){
    //                        errors += '<li>'+res.errors[i]+'</li>';
    //                        }

    //                        console.log(errors)
    //                        new Noty({
    //                        type: 'error',
    //                        layout: 'topRight',
    //                        text: errors
    //                        }).show();
    //                    }else{
    //                        $('#master-new-project').modal('hide');
    //                        window.location = list_project;
    //                    }
    //                })
    //                .fail(function(xhr) {
    //                    $('#submit').button('reset'); 
    //                    new Noty({
    //                    type: 'error',
    //                    layout: 'topRight',
    //                    text: 'Something went wrong at server.'
    //                    }).show();

    //                })


    //        }
    //    }); 
    $(document).on('click', '#delete_project', function() {
        $('#confirm_message').text('Are you sure? Do you want to delete this Project?');
        $('#delete_confirmation_modal').modal('show');
    });

    $(document).on('click', '.delete-confirm', function() {
        // $('#confirm_message').text('Are you sure? Do you want to delete this Project?');
        var project_id = $('#delete_project').attr('data-id');
        var url = delete_project;
        url = url.replace('id', project_id);
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            processData: true,
            data: {},
            success: function(data) {
                if (data) {
                    $('#delete_confirmation_modal').modal('hide');
                    window.location = list;
                }
            }
        });
    });


    $(document).on("click", ".save-cont-proj", function() {
        // alert("save continue");

        var form_id = '#form';
        var v = jQuery(form_id).validate({
            ignore: "",
            rules: {
                client_company_id: {
                    required: true,
                },
                name: {
                    required: true,
                },
                short_name: {
                    required: true,
                },
                description: {
                    required: true,
                },
                language_id: {
                    required: true,
                },
                framework: {
                    required: true,
                },
                db_server: {
                    required: true,
                },
                completion_percentage: {
                    required: true,
                },
                discussion_started_date: {
                    required: true,
                },
                current_status: {
                    required: true,
                }
            },
            invalidHandler: function(event, validator) {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'You have errors, Kindly check in each tab!'
                }).show();
                //alert($('.error').eq(0).parents('.tab-pane').attr('id'))
                //alert($('.error').eq(0).parents('.tab-pane'))
                //$('[data-attribute= "'+$('.error').eq(0).parents('.tab-pane').attr('id')+'"]').trigger('click');
            },
            submitHandler: function(form) {
                let formData = new FormData($(form_id)[0]);

                $('#submit-continue').button('loading');
                $.ajax({
                        url: save_cont_project,
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                    })
                    .done(function(res) {
                        if (!res.success) {
                            $('#submit-continue').button('reset');
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
                            $('#master-new-project').modal('hide');
                            window.location = view_project_url;
                        }
                    })
                    .fail(function(xhr) {
                        $('#submit-continue').button('reset');
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: 'Something went wrong at server.'
                        }).show();

                    })


            }
        });


    });
    $(document).on("click", ".save-proj", function() {
        $(".dev_list_15").removeClass("required");
        var form_id = '#form';
        var v = jQuery(form_id).validate({
            ignore: "",
            rules: {
                client_company_id: {
                    required: true,
                },
                name: {
                    required: true,
                },
                short_name: {
                    required: true,
                },
                description: {
                    required: true,
                },
                language_id: {
                    required: true,
                },
                framework: {
                    required: true,
                },
                db_server: {
                    required: true,
                },
                completion_percentage: {
                    required: true,
                },
                "members[][]": {
                    required: true,
                },
                "contacts[][]": {
                    required: true,
                },
                discussion_started_date: {
                    required: true,
                },
                support_user: {
                    required: true,
                },
                current_status: {
                    required: true,
                }
            },
            invalidHandler: function(event, validator) {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'You have errors, Kindly check in each tab!'
                }).show();
                //alert($('.error').eq(0).parents('.tab-pane').attr('id'))
                //alert($('.error').eq(0).parents('.tab-pane'))
                //$('[data-attribute= "'+$('.error').eq(0).parents('.tab-pane').attr('id')+'"]').trigger('click');
            },
            submitHandler: function(form) {
                let formData = new FormData($(form_id)[0]);
                $('#submit').button('loading');
                $.ajax({
                        url: save_project,
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
                            $('#master-new-project').modal('hide');
                            window.location = list_project;
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


    });
});