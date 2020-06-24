var selected_sub_task = '';
$(document).ready(function() {
    $('#task').attr('class', 'active');
    $('.dummy_fields').hide();
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    sub_task_list();

    function sub_task_list() {
        $("#sub_tasks option").each(function() {
            var id = $(this).val();
            if ($(this).is(':checked')) {
                selected_sub_task += id + ',';
            }

        });
    }
    list_url = list_ticket;
    $('.project_value').on('change', function() {
        if ($('.project_value').val()) {
            list_url = list_ticket;
        } else {
            list_url = list_project;
        }

    });
    if ($('.project_value').val()) {
        list_url = list_ticket;
    } else {
        list_url = list_project;
    }


    var form_id = "#form";
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            estimated_days: {
                maxlength: 10,
            },
            actual_days: {
                maxlength: 10,
            },
        },
        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            $.ajax({
                    url: save_ticket,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#submit').button('Reset');
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
                        if (res.where_from == 'task') {
                            window.location = list_url;
                        } else {
                            project_view_url = project_view.replace(/id/g, res.id);
                            window.location = project_view_url;
                        }
                    }
                })
                .fail(function(xhr) {
                    $('#submit').button('Reset');
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server.'
                    }).show();
                })
        }
    });

    var subject_val;
    $(document).on('keyup', '.subject_class', function() {
        subject_val = $('.subject_class').val();
        $('.sub_task_subject').val(subject_val);
    });


    var array = new Array();
    var selected_task = new Array();
    $(document).on('change', '#sub_tasks', function() {
        //alert(subject_val);   
        $("#sub_tasks option").each(function() {
            var id = $(this).val();
            var text = $(this).text();
            selected_task = selected_sub_task.split(',');
            if ($(this).is(':checked')) {
                if (selected_task.indexOf(id) == -1) {
                    var div = $('#dummy_sub_task').html();
                    div = div.replace(/xxx/g, id);
                    div = div.replace(/yyy/g, text);
                    $('.sub_task_wrapper').append(div);
                    selected_sub_task += id + ',';
                }
                $('.sub_task_subject').val(subject_val);
                $('select').next('.select2').remove();
                $('select').not('.not_style').select2();
                dateTimeRange();
            } else {
                if (selected_task.indexOf(id) != -1) {
                    var remove_id = id + ',';
                    selected_sub_task = selected_sub_task.replace(remove_id, '');
                }
                var remove_id = 'subtask_' + id;
                $('#' + remove_id).remove();
            }
        });
    });

    $('body').on('click', ".remove_sub_file", function() {
        var id = $(this).attr('id');
        var class_name = 'remove_' + id;
        $('.' + class_name).hide();
        $.ajax({
            url: delete_sub_task_file_url,
            method: 'POST',
            //processData:true,
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
                } else {
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: d.errors,
                    }).show();
                }
            }
        })

    });


    $('body').on('click', ".add_description", function() {
        var div = $('#dummy_description').html();
        div = div.replace(/xxx/g, description_conut);
        description_conut++;
        $('.description_warpper').append(div);
    });
    $(document).on('click', '.remove_description', function() {
        $(this).parents(".description").remove();
        var id_value = $(this).val();
        if (id_value) {
            $.ajax({
                url: delete_description_url,
                method: 'POST',
                //processData:true,
                data: {
                    id: id_value
                },
                success: function(d) {
                    if (d.success == true) {
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: 'Deleted Sucessfully.'
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
        }

    });

    $(document).on('change', '.project_value', function() {

        var project_id_value = $(this).val();
        var re = /id_value/gi;
        var str = get_project_time_estimation_url;
        var url = str.replace(re, project_id_value);

        if (project_id_value) {
            $.ajax({
                url: url,

                method: 'GET',
                //processData:true,
                data: {
                    id: project_id_value
                },
                success: function(d) {
                    if (d.success == true) {


                        if (d.time_estimation_details == null) {
                            time_estimation_details = "";
                        } else {
                            time_estimation_details = d.time_estimation_details;
                        }

                        // $(".ticket_stake_holders").val(cc_mail); // Set the value
                        // $(".ticket_stake_holders").multiselect("refresh"); // Then refresh
                        console.log(time_estimation_details);
                        $('.time_estimation_detail_select')
                            .find('option')
                            .remove();

                        $('.time_estimation_detail_select').append('<option value="">Select Parent Module</option>');

                        $.each(time_estimation_details, function(key, value) {
                            $('.time_estimation_detail_select')
                                .append($("<option></option>")
                                    .attr("value", key)
                                    .text(value));
                        });


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

    });


    $(".numbers_only").keypress(function(e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $(this).find("#errmsg").html("Digits Only").show().fadeOut("slow");
            return false;
        }
    });
    $('.numbers_only1').keypress(function(e) {
        var regex = new RegExp("^[0-9.]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        e.preventDefault();
        return false;
    });
    jQuery.validator.addMethod("numbers_only", function(value, element) {
        return this.optional(element) || /^[0-9 .]+$/i.test(value);
    }, "Numbers only please");

});