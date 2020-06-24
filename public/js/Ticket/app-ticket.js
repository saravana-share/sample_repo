$(document).ready(function() {

    var text_name = $(".ticket_assign_to option:selected").text();
    if (text_name) {
        $('#assign_to_name').val(text_name);
    }

    $('body').on('click', ".add_attachment", function() {
        var div = $('.project_attachments').html();
        div = div.replace(/xxx/g, attach_count);
        attach_count++;
        $('.description_attach_warpper').append(div);
    });

    $('body').on('click', ".add_time_estimate_link", function() {
        var div = $('.link').html();
        link_count++;
        div = div.replace(/xxx/g, link_count);
        $('.time_estimate_link').append(div);
    });

    $('#textarea').on('change keyup keydown paste cut', 'textarea', function() {
        $(this).height(0).height(this.scrollHeight);
    }).find('textarea').change();

    $('body').on('click', ".add_key_item", function() {
        var div = $('#dummy_key_item').html();
        div = div.replace(/xxx/g, key_conut);
        key_conut++;
        $('.description_warpper').append(div);
    });

    $('body').on('click', ".remove_key", function() {

        $(this).parents(".key_item").remove();
    });

    $('body').on('click', ".delete_button_attachment_estimation", function() {

        $(this).parents(".show").remove();
    });

    $('body').on('click', ".remove_attachment_link", function() {

        $(this).parents(".link_show").remove();
    });


    $('body').on('click', '.remove_attachment_ticket', function() {

        var delete_id = $(this).attr('id');
        var type = 'remove_attachment_ticket';
        $('#attachment_ticket_id').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("Attachment file");
        }

    });

    $('body').on('click', ".remove_ticket_link", function() {

        var delete_id = $(this).attr('id');
        var type = 'remove_ticket_link';
        $('#ticket_link_id').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("Link");
        }
    });

    $('body').on('click', '.remove_ticket_key_item', function() {

        var delete_id = $(this).attr('data-id');
        var type = 'key_ticket';
        $('#key_ticket_id').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("key item");
        }

    });

    $('.delete-confirm').click(function() {
        var type = $('#type').val();
        if (type == 'remove_attachment_ticket') {
            delete_attachment_ticket();
        }
        if (type == 'remove_ticket_link') {
            delete_ticket_links();
        }
        if (type == 'key_ticket') {
            delete_ticket_key_item()
        }

    });


    function delete_attachment_ticket() {
        var id = $('#attachment_ticket_id').val();
        var class_name = 'remove_' + id;
        $('.' + class_name).hide();
        $.ajax({
            url: delete_attachment_file_url,
            method: 'POST',
            data: {
                id: id
            },
            success: function(d) {
                if (d.success == true) {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Deleted Sucessfully.'
                    }).show();
                    $('#delete_confirmation_modal').modal("hide");
                    $("." + class_name).remove();
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

    function delete_ticket_links() {
        var id = $('#ticket_link_id').val();
        var class_name = 'remove_' + id;
        $('.' + class_name).hide();
        $.ajax({
            url: delete_attachment_link_url,
            method: 'POST',
            data: {
                id: id
            },
            success: function(d) {
                if (d.success == true) {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Deleted Sucessfully.'
                    }).show();
                    $('#delete_confirmation_modal').modal("hide");
                    $("." + class_name).remove();
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


    function delete_ticket_key_item() {
        var id = $('#key_ticket_id').val();
        var url = key_item_delete_url;
        url = url.replace('id_value', id);
        var class_name = 'remove_' + id;
        // alert(class_name);
        $('.' + class_name).hide();

        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            processData: true,
            data: {},
            success: function(d) {
                if (d.success == true) {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Deleted Sucessfully.'
                    }).show();
                    $('#delete_confirmation_modal').modal("hide");
                    $("." + class_name).remove();
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

    var form_id = '#ticket_form';
    /*var v = jQuery(form_id).validate({
        ignore: "",
        // rules: {
        //  project_id:{
        //  required:true,
        //  },
        //  module:{
        //  required:true,
        //  },
        //  assign_id: {
        //  required: true,
        //  },
        //  remarks:{
        //  required: true,  
        //  },
        //  due_date:{
        //  required: true, 
        //  },
        //  priority:{
        //  required: true,
        //  }
        
        // },
        submitHandler: function (form) {
            var valid = true;
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            $.ajax({
            url: save_ticket,
            method: "POST",
            data:formData,
            processData: false,
            contentType: false,
            })
            .done(function(res) {
            if(!res.success) {
            $('#submit').button('reset'); 
            var errors = '';
            for(var i in res.errors){
            errors += '<li>'+res.errors[i]+'</li>';
            }
            console.log(errors)
            new Noty({
            type: 'error',
            layout: 'topRight',
            text: errors
            }).show();
            }else{
            // window.location = list_employee;
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
    }); */

    // $('body').on('click', '.ticket_create', function (event) {
    //     event.preventDefault();
    //     $('#ticket_create_modal').modal("show");

    // });
    $('body').on('click', ".ticket_create", function() {

        var v = jQuery(form_id).validate({
            ignore: "",
            rules: {
                project_id: {
                    required: true,
                },
                module: {
                    required: true,
                },
                remarks: {
                    required: true,
                },
                due_date: {
                    required: true,
                },
                priority: {
                    required: true,
                },
                 severity_id: {
                    required: true,
                },
                approver1: {
                    required: '#approver1 :visible',
                },
                approver2: {
                    required: '#approver2 :visible',
                },
                approver3: {
                    required: '#approver3 :visible',
                },
                'ticket_stake_holders[]': {
                    required: true,
                },
                'ticket_source_from': {
                    required: true,
                }
            },
        });
        var valid = $(form_id).valid();
        //alert(valid);
        if (valid) {
            var id = $('#id').val();
            if (id) {
                $('#sub_btn_ticket').trigger('click');
                $('.ticket_create').button('loading');

            } else {
                $('#sub_btn_ticket').trigger('click');
                $('.ticket_create').button('reset');
                //$('#ticket_create_modal').modal("show");
            }
        } else {
            $('.ticket_create').button('reset');
        }


    });
    $('body').on('click', ".ticket_mail_send", function() {
        $('#sub_btn_ticket').trigger('click');
        $('.ticket_create').button('loading');
    });


    $('body').on('change', '.ticket_project', function() {
        var id = $('#project_id').val();
        var re = /id_value/gi;
        var str = get_project_mail_url;
        var mail_url = str.replace(re, id);
        $.ajax({
            url: mail_url,
            method: 'GET',
            //processData:true,
            data: {
                id: id
            },
            success: function(d) {
                console.log(d);
                if (d.success == true) {
                    if (d.support_user == null) {
                        support_user = "";
                    } else {
                        support_user = d.support_user;
                    }
                    if (d.cc_mail_id == null) {
                        cc_mail = "";
                    } else {
                        cc_mail = d.cc_mail_id.split(','); //Make an array
                    }
                    if (d.to_mail_id == null) {
                        to_mail = "";
                    } else {
                        to_mail = d.to_mail_id;
                    }
                    $('.ticket_assign_to').val(support_user);
                    $('#assign_to').val(support_user);

                    $('#ticket_email_to').val(to_mail);
                    $('#ticket_email_to').trigger('change');
                    /*$('#ticket_email_cc').val(cc_mail);
                    $('#ticket_email_cc').trigger('change');*/
                    $(".ticket_stake_holders").val(cc_mail); // Set the value
                    $(".ticket_stake_holders").multiselect("refresh"); // Then refresh
                    $('select.ticket_assign_to').next('.select2').remove();
                    $('select.ticket_assign_to').not('.not_style').select2();

                    var text_name = $(".ticket_assign_to option:selected").text();
                    $('#assign_to_name').val(text_name);
                }
                $('#category_id').val('');
                $('#category_id').trigger('change');
                $('#category_type_id').val('');
                $('#category_type_id').trigger('change');
            }

        })



    });

    $('body').on('change', '.category_id', function() {
        var category_id = $('.category_id').val();
        var project_id = $('#project_id').val();
        //var re = /id_value/gi;
        //var str = get_ticket_category_type_url;
        //var mail_url = str.replace(re, id);
        $('.category_type_id').empty().append('<option selected="selected" value="">Select Catgory Type</option>');;

        $('.category_type_id').val('');
        $('.category_type_id').trigger('change');
        if (category_id && project_id) {
            $.ajax({
                url: get_ticket_category_type_url,
                method: 'POST',
                //processData:true,
                data: {
                    category_id: category_id,
                    project_id: project_id
                },
                success: function(d) {
                    console.log(d);
                    if (d.success == true) {

                        //console.log(d.ticket_category_type_list);
                        $.each(d.ticket_category_type_list, function(key, val) {
                            //console.log(key, val);
                            $('.category_type_id').append(`<option value="${key}"> 
                                       ${val} 
                                  </option>`);

                        });
                    }
                }
            })
        }

    });



    $('body').on('change', '.mail_change_project', function() {

        var mail_option = $('input[name=mail_option_project]:checked').val();
        if (mail_option == 'project') {
            var id = $('#project_id').val();

            var re = /id_value/gi;
            var str = get_project_mail_url;
            var mail_url = str.replace(re, id);
            $.ajax({
                url: mail_url,
                method: 'GET',
                //processData:true,
                data: {
                    id: id
                },
                success: function(d) {
                    console.log(d);
                    if (d.success == true) {
                        if (d.cc_mail_id == null) {
                            cc_mail = "";
                        } else {
                            cc_mail = d.cc_mail_id.split(',');
                        }
                        if (d.to_mail_id == null) {
                            to_mail = "";
                        } else {
                            to_mail = d.to_mail_id;
                        }
                        $('#ticket_email_to').val(to_mail);
                        $('#ticket_email_to').trigger('change');
                        $('#ticket_email_cc').val(cc_mail);
                        $('#ticket_email_cc').trigger('change');
                        //$('select.ticket_assign_to').next('.select2').remove();
                        //$('select.ticket_assign_to').not('.not_style').select2();

                        $('select').next('.select2').remove();
                        $('select').not('.not_style').select2();
                    }
                }
            })


        } else {
            $('#ticket_email_to').val('');
            $('#ticket_email_to').trigger('change');
            $('#ticket_email_cc').val('');
            $('#ticket_email_cc').trigger('change');
            $('select').next('.select2').remove();
            $('select').not('.not_style').select2();
            $('select.ticket_email_cc').next('.select2').remove();
            $('select.ticket_email_cc').not('.not_style').select2();
        }
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
                        console.log();
                        var remove_div = 'comment_replay_' + parent_id;
                        var append_replay_div = 'add_replay_new_' + parent_id;
                        var replay_add_div = '<li style="margin-left: 30px;"><div class="form-group"><div class="sub-comment"><label><img class="img" style="width:30px;height:30px;border-radius: 50%;" alt="TVS" src="' + d.comment_profile_image + '">' + d.comment_profile_name + '  ' + d.comment_date + '</label><button type="button" class="btn-xs btn-info add_replay add_replay_' + d.comment_replay.id + '" value="' + d.comment_replay.id + '" id="add_replay_' + d.comment_replay.id + '"  data-entity="' + d.comment_replay.entity_id + '">Replay</button><p>' + d.comment_replay.comment + '</p> <input type="hidden" name="time_estimation_' + d.comment_replay.id + '"  id="time_estimation_' + d.comment_replay.id + '" value="' + d.comment_replay.entity_id + '"><div class="add_replay_wrapper_' + d.comment_replay.id + '"></div><div class="add_replay_new_' + d.comment_replay.id + '"></div></div></div></li>';
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


    var comment_form_id = "#comment_form";
    var v = jQuery(comment_form_id).validate({
        ignore: "",
        rules: {
            comments: {
                required: true,
            }
        },
        submitHandler: function(form) {
            let formData = new FormData($(comment_form_id)[0]);
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
    $('body').on('change', '.approval_level', function() {
        var approve_level_value = $(this).val();

        if (approve_level_value > 0) {

            if (approve_level_value == 1) {
                $(".approver_1").css("display", "block");
                $(".approver1").prop('disabled', false);
                $(".approver_2").css("display", "none");
                $(".approver2").prop('disabled', true);
                $(".approver_3").css("display", "none");
                $(".approver3").prop('disabled', true);

            } else if (approve_level_value == 2) {
                $(".approver_1").css("display", "block");
                $(".approver_2").css("display", "block");
                $(".approver2").prop('disabled', false);
                $(".approver_3").css("display", "none");
                $(".approver3").prop('disabled', true);
            } else if (approve_level_value == 3) {
                $(".approver_1").css("display", "block");
                $(".approver_2").css("display", "block");
                $(".approver_3").css("display", "block");
                $(".approver3").prop('disabled', false);
            } else {
                $(".approver_1").css("display", "none");
                $(".approver1").prop('disabled', true);
                $(".approver_2").css("display", "none");
                $(".approver2").prop('disabled', true);
                $(".approver_3").css("display", "none");
                $(".approver3").prop('disabled', true);
            }
        } else {
            $(".approver_1").css("display", "none");
            $(".approver1").prop('disabled', true);
            $(".approver_2").css("display", "none");
            $(".approver2").prop('disabled', true);
            $(".approver_3").css("display", "none");
            $(".approver3").prop('disabled', true);
        }

    });
    $('body').on('change', '.approver_value', function() {
        var approver = new Array();
        $(".approver_value").each(function() {
            if ($(this).val()) {
                approver.push($(this).val());
            }
        });
        console.log(approver);
        var mail = approver[0];
        var other_mail = approver.splice(0, 1);
        var len = approver.length;
        console.log(approver.length);
        // alert(len);
        //alert(approver);

        $('#ticket_email_to').val(mail);
        $('#ticket_email_to').trigger('change');
        if (len > 0) {
            $('#ticket_email_cc').val(approver);
            $('#ticket_email_cc').trigger('change');
        }
        $('select').next('.select2').remove();
        $('select').not('.not_style').select2();
    });


});