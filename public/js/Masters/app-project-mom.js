$(document).ready(function() {

    $('#start_date_time').datetimepicker({
        format: 'DD-MM-YYYY hh:mm a'
    });
    $('#end_date_time').datetimepicker({
        format: 'DD-MM-YYYY hh:mm a'
    });

    $(document).on('click', '.add_action_detail', add_action_form);

    function add_action_form() {
        var div = $('#dummy_action').html();
        moms_count++;
        div = div.replace(/xxx/g, moms_count);
        $('#actions_wrp').append(div);
        $('.designation_list').next('.select2').remove();
        $('.designation_list').select2();
        $('.action_status').next('.select2').remove();
        $('.action_status').select2();

    }

    $('.delete-confirm').click(function() {
        // alert();z
        var type = $('#type').val();
        // var del_id = $("#action_id").val(delete_id);
        // alert(del_id);
        if (type == 'action-items') {
            delete_action_items();
        }
        if (type == 'key-items') {
            delete_key_points();
        }



    });

    function delete_action_items() {
        // alert();

        var id = $('#action_id').val();
        // alert(id);
        var query_remove = 'action_item' + id;
        delete_url = delete_mom_action_url.replace(/id_value/g, id);
        // alert(delete_url);

        $.ajax({
            url: delete_url,
            method: 'GET',
            //processData:true,
            data: {
                id: id
            },
            success: function(d) {
                if (d.success == true)

                {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: ' Deleted Sucessfully'
                    }).show();

                    $('#delete_confirmation_modal').modal("hide");
                    // $("."+query_remove).remove();
                    location.reload();
                } else {
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: d.errors,
                    }).show();
                }
            }
        })

    }

    function delete_key_points() {
        // alert();
        var id = $('#mom_key_item_id').val();
        // alert(id);
        var query_remove = 'key_item_' + id;
        delete_url = delete_mom_key_point.replace(/id_value/g, id);
        // alert(delete_url);

        $.ajax({
            url: delete_url,
            method: 'GET',
            //processData:true,
            data: {
                id: id
            },
            success: function(d) {
                if (d.success == true)

                {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: ' Deleted Sucessfully'
                    }).show();

                    $('#delete_confirmation_modal').modal("hide");
                    $("." + query_remove).remove();

                } else {
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: d.errors,
                    }).show();
                }
            }
        })

    }

    $('body').on('click', ".remove_action_detail", function() {

        var delete_id = $(this).attr('id');
        // alert(delete_id);
        var type = 'action-items';
        $("#action_id").val(delete_id);

        $("#type").val(type);
        // $('#form').prepend('<input type="hidden" name="deleted_action_ids[]" value="'+id+'"/>');
        // var delete_id = $(this).attr('id');
        if (delete_id) {
            // alert();
            $('#delete_confirmation_modal').modal("show");
        } else {
            $(this).parents(".action_item").remove();

        }

    });


    $('body').on('click', ".remove_key_item", function() {

        var delete_id = $(this).attr('id');
        alert(delete_id);
        var type = 'key-items';
        $("#mom_key_item_id").val(delete_id);

        $("#type").val(type);
        // $('#form').prepend('<input type="hidden" name="deleted_action_ids[]" value="'+id+'"/>');
        // var delete_id = $(this).attr('id');
        if (delete_id) {
            // alert();
            $('.change_title').html("Key Point");
            $('#delete_confirmation_modal').modal("show");

        } else {
            $(this).parents(".key_item_").remove();

        }

    });




    $(document).on('click', '.add_key_item', add_key_item_form);

    function add_key_item_form() {
        var div = $('#dummy_key_item').html();
        key_items_count++;
        div = div.replace(/xxx/g, key_items_count);
        $('#key_items_wrp').append(div);
    }

    $("#date_time").datetimepicker({
        format: "DD-MM-YYYY hh:mm:ss"
    });


    $('body').on('click', '#project_mom_mail', function(event) {
        //alert();
        var mom_id = $(this).data('id');
        $('.mom_id').val(mom_id);
        event.preventDefault();
        $('#project_mom_modal').modal("show");
    });

    $('body').on('change', '.mail_option_change', function() {
        var mail_option = $('input[name=mail_option]:checked').val();
        if (mail_option == 'company') {
            $('.custom').css('display', 'none');
            $('.company').css('display', '');
        } else {
            $('.company').css('display', 'none');
            $('.custom').css('display', '');
        }
    });

    $('body').on('click', '.mom_mail_send', function() {
        //alert('mail');
        var form_id = '#form2';
        var v = jQuery(form_id).validate({
            ignore: "",
            rules: {
                project_subject: {
                    required: true,
                },
                'project_email_to[]': {
                    required: true,
                },
            },
            submitHandler: function(form) {
                var valid = true;
                let formData = new FormData($(form_id)[0]);
                var id = $('.mom_id').val();
                mail_url = mom_mail_url.replace(/id_value/g, id);
                $('#mom_mail_send').button('loading');
                if (id) {
                    $.ajax({
                            url: mom_mail_url,
                            method: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                        })
                        .done(function(res) {
                            if (!res.success) {
                                $('#mom_mail_send').button('reset');
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
                                window.location = list_project_view;
                            }
                        })
                        .fail(function(xhr) {
                            $('#mom_mail_send').button('reset');
                            new Noty({
                                type: 'error',
                                layout: 'topRight',
                                text: 'Something went wrong at server.'
                            }).show();
                        })
                }
            }
        });
    });

    $('body').on('change', '.company_select', function() {
        var id = $('.company_select').val();
        var re = /id_value/gi;
        var str = get_company_mail_url;
        var mail_url = str.replace(re, id);

        //alert(mail_url);
        $.ajax({
            url: mail_url,
            method: 'GET',
            //processData:true,
            data: {
                id: id
            },
            success: function(d) {
                if (d.success == true) {
                    cc_mail = d.cc_mail_id.split(',');
                    $('.project_email_to').val(d.to_mail_id);
                    $(".project_email_cc").val(cc_mail); // Set the value
                    $(".project_email_cc").multiselect("refresh");
                    $('select').next('.select2').remove();
                    $('select').not('.not_style').select2();
                }
            }
        })

    });


    var form_id = '#form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            date_time: {
                required: true,
            },
            title: {
                required: true,
            },
            'members[]': {
                required: true,
            },

        },
        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            $.ajax({
                    url: save_mom,
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
                        window.location = list_project_view;
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

    // $('body').on('click', ".remove_action_detail" ,function(){      
    //     var id = $(this).attr('id');
    //     delete_url = delete_mom_action_url.replace(/id_value/g,id);
    //     if(id)
    //     {
    //         $.ajax({
    //             url:delete_url,
    //             method:'GET',
    //             //processData:true,
    //             data: {
    //             id :id
    //             },
    //             success:function(d){
    //             if(d.success==true)
    //             {
    //             new Noty({
    //             type: 'success',
    //             layout: 'topRight',
    //             text: 'Deleted Sucessfully.'
    //             }).show();
    //             }
    //             else
    //             {
    //             new Noty({
    //             type: 'error',
    //             layout: 'topRight',
    //             text: d.errors,
    //             }).show();
    //             }
    //             }
    //         })
    //     }

    // });


});