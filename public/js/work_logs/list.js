$(document).ready(function() {
    $('#add').attr('href', new_work_log);
    var table = [];
    var cols = [
        { 'data': "id" },
        { 'data': "name", "name": "users.name" },
        { 'data': "date", "searchable": false },
        { 'data': "start_time", "searchable": false },
        { 'data': "end_time", "searchable": false },
        { 'data': "project_name", "name": "projects.name" },
        { 'data': "task_subject", "name": "tasks.subject" },
        { 'data': "description", "name": "work_logs.description" },
        { 'data': "location", "searchable": false },
        { 'data': "duration", "searchable": false },
    ];
    if ((!role_team_members) && (!role_team_member)) {
        cols.push({ 'data': "action" });
    }


    var data_table = $('.ajax_table').DataTable({
        "footerCallback": function(row, data, start, end, display) {
            var api = this.api(),
                data;
            var json = api.ajax.json();
            $(api.column(8).footer()).html('Total Duration');
            $(api.column(9).footer()).html(json.duration_total);
        },
        "language": {
            "search": "",
            "lengthMenu": "_MENU_",
            "paginate": {
                "next": '<i class="icon ion-ios-arrow-forward"></i>',
                "previous": '<i class="icon ion-ios-arrow-back"></i>'
            },
        },
        'pageLength': 100,
        processing: true,
        serverSide: true,
        ordering: true,
        method: "GET",
        ajax: {
            url: list_url,
            data: function(d) {
                d.period = $('#period').val();
                d.employee_id = $('#employee_id').val();
                d.location = $('#location').val();
                d.project_id = $('#project_id').val();
            },
        },
        columns: cols,
        rowCallback: function(row, data, index) {
            console.log(data);
            if (data.duration != "") {
                var test = data.duration;
                $('td:eq(9)', row).html(test);
            } else {
                var test = data.duration;
                $('td:eq(9)', row).html(test);
            }

        },
    });

    var dt = $('.ajax_table').dataTable();

    $('#period').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD-MM-YYYY') + ' to ' + picker.endDate.format('DD-MM-YYYY'));
        dt.fnFilter();
    });
    $('#employee_id').change(function() {
        dt.fnFilter();
    });
    $('#location').change(function() {
        dt.fnFilter();
    });
    $('#project_id').change(function() {
        dt.fnFilter();
    });



    $('body').on('change', '.mail_change_project', function() {
        var mail_option = $('input[name=mail_option_project]:checked').val();
        if (mail_option == 'project') {
            $('.custom').css('display', 'none');
            $('.project').css('display', '');
            var id = $('#project_select1').val();
            var re = /id_value/gi;
            var str = get_project_mail_url;
            var mail_url = str.replace(re, id);

            if (id) {

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
                            var project_name = 'Daily Work Log Report-' + d.project_name;
                            $('#mail_subject').val(project_name);
                            $('#project_email_to1').val(to_mail);
                            $('#project_email_to1').multiselect('rebuild');
                            $('#project_email_cc1').val(cc_mail);
                            $('#project_email_cc1').multiselect('rebuild');
                            $('select').next('.select2').remove();
                            $('select').not('.not_style').select2();
                        }
                    }
                })
            }
        } else {
            $('.project').css('display', 'none');
            $('.custom').css('display', '');
            $('#project_email_to1').val('');
            $('#project_email_to1').multiselect('rebuild');
            $('#project_email_cc1').val('');
            $('#project_email_cc1').multiselect('rebuild');
            $('select').next('.select2').remove();
            $('select').not('.not_style').select2();

        }
    });


    $('body').on('change', '#project_select1', function() {
        var id = $('#project_select1').val();
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
                    var project_name = 'Daily Work Log Report-' + d.project_name;
                    $('#mail_subject').val(project_name);
                    $('#project_email_to1').val(to_mail);
                    $('#project_email_to1').multiselect('rebuild');
                    $('#project_email_cc1').val(cc_mail);
                    $('#project_email_cc1').multiselect('rebuild');
                    $('select').next('.select2').remove();
                    $('select').not('.not_style').select2();
                }
            }
        })
    });

    var form = jQuery("#daily_status_form");

    form.validate({
        rules: {
            mail_subject: {
                required: true,
            },
            'project_email_to[]': {
                required: true,
            },
            project_select: {
                required: function(element) {
                    if ($("#mail_project").is(':checked')) {

                        return true;
                    } else {
                        return false;
                    }
                }
            }

        },
        messages: {
            mail_subject: {
                required: 'Please Enter Subject',
            },
            'project_email_to[]': {
                required: 'Please Select To Mail',
            },
            project_select: {
                required: 'Please Select Project',
            }
        },
        errorPlacement: function(error, element) {
            if (element.hasClass("project_email_to1")) {
                error.appendTo($('.project_to_email_error'));
            }
            if (element.hasClass("project_select1")) {
                error.appendTo($('.select_project_error'));
            }

        },
        submitHandler: function(form) {
            $('#date_period').val($('#period').val());
            $('#selected_employee').val($('.employee_id').val());
            $('#selected_location').val($('.location').val());
            $('#work_log_mail_send').button('loading');
            var form_id = '#daily_status_form';
            let formData = new FormData($(form_id)[0]);
            $.ajax({
                    url: get_project_send_mail,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#work_log_mail_send').button('reset');
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
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: 'Work Log Daily Report Sent Successfully!!!'
                        }).show();
                        $('#work_log_mail_send').button('reset');
                        $('.project_email_to1').val('');
                        $('.project_email_to1').multiselect('rebuild');
                        $('.project_email_cc1').val('');
                        $('.project_email_cc1').multiselect('rebuild');
                        $('#worklog_daily_report_modal').modal('hide');
                    }
                })
        }
    });



});