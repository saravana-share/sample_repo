$(document).ready(function() {

    // $("#time_taken_hour").datetimepicker({
    //     format: 'HH:mm',
    // });
    $("#start_time").datetimepicker({
        format: 'YYYY-MM-DD hh:mm:ss A',
    });
    $("#end_time").datetimepicker({
        format: 'YYYY-MM-DD hh:mm:ss A',
    });

    count = 0;
    $(document).on('click', '.add_replay', function() {
        var id = $(this).val();
        var entity_id = $(this).attr('data-entity');
        $('.add_replay_' + id).css('display', 'none');
        var div = $('#dummy_comment').val('').html();
        div = div.replace(/xxx/g, count);
        div = div.replace(/yyy/g, id);
        entity_replace_id = 'entity_id_' + id;
        append_div_id = 'add_replay_wrapper_' + id;
        $('.' + append_div_id).append(div);
        $('#' + entity_replace_id).val(entity_id);
        count++;
    });
    $(document).on('click', '.save_replay', function() {
        $('.save_replay').button('loading');
        var parent_id = $(this).val();
        estimation_id = 'entity_id_' + parent_id;
        estimation_id_value = $('#' + estimation_id).val();
        var text = $(this).parents('.comment_replay_row').find('.comment_replay_text').val();
        if (text) {
            $('.add_replay_' + parent_id).css('display', '');
            $.ajax({
                url: save_comment_replay_url,
                method: 'POST',
                data: {
                    entity_id: estimation_id_value,
                    parent_id: parent_id,
                    comment: text,
                },
                success: function(d) {
                    if (d.success == true) {
                        $('.save_replay').button('reset');
                        console.log();
                        var remove_div = 'comment_replay_' + parent_id;
                        var append_replay_div = 'add_replay_new_' + parent_id;
                        var replay_add_div = '<ul class="sub-comment-list"><li><div class="sub-comment-block"><div class="sub-comment"><div class="sub-comment-profile"><img class="img-responsive" alt="TVS" src="' + d.comment_profile_image + '"></div><h5 class="sub-comment-title">' + d.comment_profile_name + '</h5><p class="sub-comment-subtitle">' + d.comment_date + '</p><p>' + d.comment_replay.comment + '</p> <input type="hidden" name="time_estimation_' + d.comment_replay.id + '"  id="time_estimation_' + d.comment_replay.id + '" value="' + d.comment_replay.entity_id + '"><div class="add_replay_wrapper_' + d.comment_replay.id + '"></div></div><div class="add_replay_new_' + d.comment_replay.id + '"></div></div></li></ul>';
                        $('.' + append_replay_div).append(replay_add_div);

                        //window.location=list_url;
                        $('.' + remove_div).remove();
                        //location.reload();
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: 'Updated Sucessfully.'
                        }).show();
                    } else {
                        $('.save_replay').button('reset');
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: d.errors,
                        }).show();
                    }
                }
            })
        } else {
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'Please enter your comments',
            }).show();
        }
    });


    var form_id = "#comment_form";
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            comments: {
                required: true,
            }
        },
        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            $('#add_comment').button('loading');
            $.ajax({
                    url: save_comment_url,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#add_comment').button('Reset');
                        var errors = '';
                        for (var i in res.errors) {
                            errors = '<li>' + res.errors[i] + '</li>';
                        }
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: errors,
                        }).show();
                    } else {
                        //alert(dev_task_url);
                        window.location = view_back_comment_url;
                    }
                })
                .fail(function(xhr) {
                    $('#add_comment').button('reset');
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server.'
                    }).show();
                })
        }
    });

    $(document).on('change', '.log_status_id', function() {
        var val = $(this).val();
        if (val == 18) {
            $('.contact_person_div').show();
            $('.contact_number_div').show();
        } else {
            $('.contact_person_div').hide();
            $('.contact_number_div').hide();
        }

    });
    $(document).on('click', '.update_ticket', function() {
        var form_id = "#ticket_log_form";
        let formData = new FormData($(form_id)[0]);
        console.log(formData);
        var v = jQuery(form_id).validate({
            ignore: "",
            rules: {
                ticket_logs_start_time: {
                    required: true,
                },
                ticket_logs_end_time: {
                    required: true,
                },
                type_id: {
                    required: true,
                },
                status_id: {
                    required: true,
                },
                ticket_log_discription: {
                    required: true,
                }
            },
        });
        var ticket_id = $(this).val();
        var time_taken = $('#time_taken_hour').val();
        var start_time = $('#ticket_logs_start_time').val();
        var end_time = $('#ticket_logs_end_time').val();
        var ticket_status = $('.task_status_id').val();
        var description = $('#description').val();
        var valid = $(form_id).valid();
        if (valid) {
            $('#update_ticket').button('loading');
            $.ajax({
                    url: ticket_status_update_url,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    $('#update_ticket').button('reset');
                    if (!res.success) {
                        var errors = '';
                        for (var i in res.errors) {
                            errors = '<li>' + res.errors[i] + '</li>';
                        }
                        console.log(errors);
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: errors,
                        }).show();
                    } else {
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: res.message,
                        }).show();
                        $(form_id).trigger("reset");
                        //window.location=view_back_comment_url;
                        location.reload();
                    }
                })
                .fail(function(xhr) {
                    $('#update_ticket').button('reset');
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server.'
                    }).show();
                })
        }


    });


    var notes_form_id = "#notes_form";
    var v = jQuery(notes_form_id).validate({
        ignore: "",
        rules: {},
        submitHandler: function(form) {
            let formData = new FormData($(notes_form_id)[0]);
            $('#save_note').button('loading');
            $.ajax({
                    url: save_notes_url,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#save_note').button('Reset');
                        var errors = '';
                        for (var i in res.errors) {
                            errors = '<li>' + res.errors[i] + '</li>';
                        }
                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: errors,
                        }).show();
                    } else {
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: res.message,
                        }).show();

                        window.location = view_back_comment_url;
                    }
                })
                .fail(function(xhr) {
                    $('#save_note').button('reset');
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server.'
                    }).show();
                })
        }
    });

    $(document).on('change', '.update_ticket_status', function() {

        var status = $(this).val();
        if (status > 0) {

            $('.update_ticket_section').css({ 'display': 'block' });
            if (status == 11) {
                // $('.show_time_taken_div').css({ 'display': 'block' });
            } else {
                // $('.show_time_taken_div').css({ 'display': 'none' });
            }
        } else {
            $('.update_ticket_section').css({ 'display': 'none' });
            // $('.show_time_taken_div').css({ 'display': 'none' });
        }


    });
    $(document).on('click', '.approve_ticket', function() {
        var approve_value = $(this).attr('data-approve');
        var ticket_id = $(this).val();
        var project_id = $('#ticket_project_id').val();
        var approve_status = $(this).attr('data-status');
        // alert(approve_status);
        //alert(approve_value);
        //var  status= $('.task_status_id').val();
        //$('#update_ticket').button('loading');
        var $btn = $(this);
        $btn.button('loading');
        $.ajax({
                url: save_mail_approve_url,
                method: "POST",
                data: {
                    approver_status: approve_status,
                    approver: approve_value,
                    ticket_id: ticket_id,
                    project_id: project_id,
                },
            })
            .done(function(res) {
                $('#update_ticket').button('reset');
                $btn.button('reset');
                if (!res.success) {
                    var errors = '';
                    for (var i in res.errors) {
                        errors = '<li>' + res.errors[i] + '</li>';
                    }
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: res.message,
                    }).show();
                } else {
                    $('#update_ticket').button('reset');
                    $btn.button('reset');
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: res.message,
                    }).show();

                    //window.location=view_back_comment_url;
                }
            })
            .fail(function(xhr) {
                $('#update_ticket').button('reset');
                $btn.button('reset');
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'Something went wrong at server.'
                }).show();
            })


    });

});