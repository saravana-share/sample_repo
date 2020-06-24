$(document).ready(function() {

    var form = jQuery("#work_form");

    form.validate({
        rules: {
            project: {
                required: '#project:visible',
            },
            date: {
                required: true,
            },
            start_time: {
                required: true,
            },
            end_time: {
                required: true,
            },
            description: {
                required: true,
            },
            location: {
                required: true,
            },

        },
        submitHandler: function(form) {
            var form_id = '#work_form';
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading').attr('disabled', true);
            $.ajax({
                    url: update_Worklog,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#submit').button('reset').attr('disabled', false);
                        console.log(res.errors);
                        var errors = '';
                        for (var i in res.errors) {
                            errors += '<li>' + res.errors[i] + '</li>';
                        }
                        console.log(errors)
                        if (errors) {
                            new Noty({
                                type: 'error',
                                layout: 'topRight',
                                text: errors
                            }).show();
                        }

                    } else {
                        window.location = work_log_list;
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: 'Work Log Saved Successfully!!!'
                        }).show();

                    }
                })
        }
    });

    $('body').on('change', '.project', function() {
        var id = $('#project').val();
        var re = /id_value/gi;
        var str = get_task_list_url;
        var task_list_url = str.replace(re, id);
        $.ajax({
            url: task_list_url,
            method: 'GET',
            //processData:true,
            data: {
                id: id
            },
            success: function(d) {
                $('#task_id').html('');
                if (d.success == true) {
                    var task_list = [];
                    if (d.tasks == null) {
                        tasks = "";
                    } else {

                        $('select[name="task_id"]').append('<option value="">Select Task</option>');
                        $.each(d.tasks, function(key, value) {
                            $('select[name="task_id"]').append('<option value="' + value.task_id + '">' + value.task_name + '</option>');
                        });
                    }
                    $('select').next('.select2').remove();
                    $('select').not('.not_style').select2();
                }
            }
        })
    });
});