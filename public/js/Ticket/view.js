$(document).ready(function() {
    $("#time_taken_hour").datetimepicker({
        format: 'HH:mm',
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
                        $('#add_comment').button('reset');
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

    var notes_form_id = "#notes_form";
    var v = jQuery(notes_form_id).validate({
        ignore: "",
        rules: {
            add_notes: {
                required: true,
            }
        },
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

    $(document).on('click', '.add_notes', add_note_form);

    function add_note_form() {
        var div = $('#dummy_note').val('').html();
        div = div.replace(/xxx/g, task_notes);
        div = div.replace(/yyy/g, task_id);
        var app_div = 'notes_wrap';
        $('#' + app_div).append(div);
        task_notes++;
        $('.task_assigner_status').next('.select2').remove();
        $('.task_assigner_status').select2();

        $('.priority_list').next('.select2').remove();
        $('.priority_list').select2();
        $('select').next('.select2').remove();
        $('select').not('.not_style').select2();
    }

    $('body').on('click', ".remove_note_detail", function() {
        var id = $(this).attr('id');
        $(this).parents(".note").remove();
    });
    $(document).on('change', '.update_ticket_status', function() {
        var status = $(this).val();
        if (status > 0) {

            $('.update_ticket_section').css({ 'display': 'block' });
            if (status == 11) {
                $('.show_time_taken_div').css({ 'display': 'block' });
            } else {
                $('.show_time_taken_div').css({ 'display': 'none' });
            }
        } else {
            $('.update_ticket_section').css({ 'display': 'none' });
            $('.show_time_taken_div').css({ 'display': 'none' });
        }
    });

    $(document).on('click', '.update_ticket', function() {
        var ticket_id = $(this).val();
        var status = $('.task_status_id').val();
        var time_taken = $('#time_taken_hour').val();
        $('#update_ticket').button('loading');
        $.ajax({
                url: ticket_status_update_url,
                method: "POST",
                data: {
                    status_id: status,
                    ticket: ticket_id,
                    time_taken: time_taken,

                },
            })
            .done(function(res) {
                $('#update_ticket').button('reset');
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
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'Something went wrong at server.'
                }).show();
            })


    });

    $(document).on('click', '.approve_ticket', function() {
        var approve_value = $(this).attr('data-approve');
        var approve_status = $(this).attr('data-status');


        var ticket_id = $(this).val();
        var project_id = $('#ticket_project_id').val();
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