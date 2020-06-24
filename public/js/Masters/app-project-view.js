$(document).ready(function() {
    $('#time_estimate_table').dataTable({
        "language": {
            "search": "",
            "lengthMenu": "_MENU_",
            "paginate": {
                "next": '<i class="icon ion-ios-arrow-forward"></i>',
                "previous": '<i class="icon ion-ios-arrow-back"></i>'
            },
        }
    });

    var selected_task = [];
    var cols = [
        { 'data': "select", "searchable": false },
        { 'data': "subject", "name": "tasks.subject", "searchable": true },
        { 'data': "task_type", "name": "task_types.name", "searchable": true },
        { 'data': "task_number", "name": "tasks.number", "searchable": true },
        { 'data': "assign_to", "name": "users.id", "searchable": true },
        { 'data': "estimated_date", "searchable": false },
        { 'data': "days", "searchable": false },
        { 'data': "task_status", "name": "task_statuses.name", "searchable": true },
        { 'data': "dead_line_status", "searchable": false },
        { 'data': "action", "searchable": false, "class": "action" },
    ];


    var project_table = $('#project_task1').DataTable({
        "footerCallback": function(row, data, start, end, display) {
            var api = this.api(),
                data;
            var json = api.ajax.json();
            $(api.column(1).footer()).html('Totals: ' + json.total_days);
        },
        "language": {
            "search": "",
            "lengthMenu": "_MENU_",
            "paginate": {
                "next": '<i class="icon ion-ios-arrow-forward"></i>',
                "previous": '<i class="icon ion-ios-arrow-back"></i>'
            },
        },
        'pageLength': -1,
        processing: true,
        serverSide: true,
        ordering: false,
        destroy: true,
        method: "GET",
        ajax: {

            url: list_ticket_project,
            data: function(d) {
                d.task_type_id = $('.task_type').val();
                d.flow_type_id = $('.flow_type').val();
                console.log($('.status').val());

                var status;
                if ($('.status').val() == null || $('.status').val() == "") {
                    status = -1;
                } else {
                    status = $('.status').val();
                }
                d.status_id = status;
                d.assign_to_id = $('.assign_to').val();
                var task_division = $('.task_division').val();
                d.task_division = task_division;
            },
        },
        columns: cols,
    });


    $('body').on('click', '#delete_mom', function(event) {
        event.preventDefault();
        var type = "delete_mom";
        $("#type").val(type);
        $('#delete_confirmation_modal').modal("show");
        delete_url = $(this).attr('href');
        // alert(delete_url);
    });

    var list_db_patch = [
        { 'data': "created_at", 'name': "db_patches.created_at", "searchable": true },
        { 'data': "task_number", 'name': "tasks.number", "searchable": true },
        { 'data': "query", "searchable": false },
        { 'data': "local", 'name': "db_patches.local", "searchable": false },
        { 'data': "local_select", "searchable": false },
        { 'data': "staging", 'name': "db_patches.staging", "searchable": false },
        { 'data': "staging_select", "searchable": false },
        { 'data': "live", 'name': "db_patches.live", "searchable": false },
        { 'data': "live_select", "searchable": false },
        { 'data': "developer", 'name': "users.developer", "searchable": false },
        { 'data': "action", "searchable": false, "class": "action" },
    ];

    var db_table = $('.db_patches_details_table').DataTable({
        "language": {
            "search": "",
            "lengthMenu": "_MENU_",
            "paginate": {
                "next": '<i class="icon ion-ios-arrow-forward"></i>',
                "previous": '<i class="icon ion-ios-arrow-back"></i>'
            },
        },
        'pageLength': 10,
        processing: true,
        serverSide: true,
        ordering: false,
        method: "GET",
        ajax: {
            url: list_db_patches,
            data: function(d) {
                d.db_range = $('#db_range').val();
                // if($('#developer').val()==null || $('#developer').val()=="")
                //   { 
                //     developer = -1;
                //   }else
                //   {
                //     developer = $('#developer').val();
                //   }
                d.developer = $('#developer').val();;
                d.db_not_applied = $('#db_not_applied').val();
            },
        },
        columns: list_db_patch,
    });



    var db_patchTable = $('.db_patches_details_table').dataTable();

    $('#db_range').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD-MM-YYYY') + ' to ' + picker.endDate.format('DD-MM-YYYY'));
        db_patchTable.fnFilter();
    });
    $('#developer').change(function() {
        db_patchTable.fnFilter();
    });
    $('#db_not_applied').change(function() {
        db_patchTable.fnFilter();
    });



    var mom_cols = [
        { 'data': "start_date_time", "searchable": false },
        { 'data': "title", "searchable": false },
        { 'data': "members", "searchable": false },
        { 'data': "description", "searchable": false },
        { 'data': "action", "searchable": false, "class": "action" },
    ];

    var mom_table = $('#project_mom_table').DataTable({
        "language": {
            "search": "",
            "lengthMenu": "_MENU_",
            "paginate": {
                "next": '<i class="icon ion-ios-arrow-forward"></i>',
                "previous": '<i class="icon ion-ios-arrow-back"></i>'
            },
        },
        'pageLength': 10,
        processing: true,
        serverSide: true,
        ordering: false,
        destroy: true,
        method: "GET",
        ajax: {
            url: list_mom_project,
            data: function(d) {},
        },
        columns: mom_cols,
    });

    $('.sub_credentials_actions').html('<div class="dropdown"><button class="btn btn-border btn-md" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><ul><li><a class="dropdown-item" id="credentials_email" href="#">Email</a></li></ul></div></div>');

    $('body').on('click', '#credentials_email', function(event) {
        event.preventDefault();
        $('#project_credentials_report_modal').modal("show");
        $('.type').val('Credentials');
    });



    $('.credentials_submit').on('click', function() {
        // alert(1);
        var form = jQuery("#project_credentials_report_modal");

        form.validate({
            rules: {

            },
            messages: {

            },
            submitHandler: function(form) {
                $('#credentials_submit').button('loading');
                var form_id = '#project_credentials_report_modal';
                let formData = new FormData($(form_id)[0]);
                $.ajax({
                        url: send_credentials_report_mail,
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                    })
                    .done(function(res) {
                        if (!res.success) {
                            $('#credentials_submit').button('reset');
                            var errors = '';
                            for (var i in res.errors) {
                                errors += '<li>' + res.errors[i] + '</li>';
                            }
                            console.log(errors)

                            new Noty({
                                type: 'error',
                                layout: 'topRight',
                                text: 'Something Went Wrong At Server'
                            }).show();

                        } else {
                            new Noty({
                                type: 'success',
                                layout: 'topRight',
                                text: 'Project Credentials Report Sent Successfully!!!'
                            }).show();
                            $('#credentials_submit').button('reset');
                            $('#project_credentials_report_modal').modal('hide');

                        }
                    })
            }
        });
    });

    var cols_credentials = [
        { 'data': "select", "searchable": false },
        { 'data': "project_credentials_name", 'name': "project_credentials.name", "searchable": true },
        { 'data': "users_name", 'name': "users.name", "searchable": true },
        { 'data': "project_credentials_updated_by", 'name': "project_credentials.updated_by", "searchable": false },
        { 'data': "project_credentials_deleted_by", 'name': "project_credentials.deleted_by", "searchable": false },
        { 'data': "project_credentials_created_at", 'name': "project_credentials.created_at", "searchable": false },
        { 'data': "project_credentials_updated_at", 'name': "project_credentials.updated_at", "searchable": false },
        { 'data': "project_credentials_deleted_at", 'name': "project_credentials.deleted_at", "searchable": false },
        { 'data': "status", "searchable": false },
        { 'data': "action", "searchable": false, "class": "action" },
    ];

    var company_table = $('.project_crdentials_table').DataTable({
        "language": {
            "search": "",
            "lengthMenu": "_MENU_",
            "paginate": {
                "next": '<i class="icon ion-ios-arrow-forward"></i>',
                "previous": '<i class="icon ion-ios-arrow-back"></i>'
            },
        },

        'pageLength': 10,
        processing: true,
        serverSide: true,
        ordering: false,
        method: "GET",
        ajax: {
            url: list_project_credentials,
            data: function(d) {

                d.created_by_list = $('#created_by').val();
                d.updated_by_list = $('#updated_by').val();
            }
        },
        columns: cols_credentials,
    });

    var dataCredentialsTable = $('.project_crdentials_table').dataTable();

    $('.created_by').on('change', function() {
        dataCredentialsTable.fnFilter();
    });
    $('.updated_by').on('change', function() {
        dataCredentialsTable.fnFilter();
    });

    $('body').on('click', '#reset_credentials_filter', function(event) {

        $('#created_by').val('');
        $('#created_by').multiselect('rebuild');
        $('#updated_by').val('');
        $('#updated_by').multiselect('rebuild');
        dataCredentialsTable.fnFilter();

    });

    $('.credentials_select').on('click', function() {
        if (this.checked == true)
            $('#crdentials_data').find('input[name="credential_id[]"]').prop('checked', true).trigger("change");
        else
            $('#crdentials_data').find('input[name="credential_id[]"]').prop('checked', false).trigger("change");
    });

    $('body').on('click', '.credential_select', function() {
        selected_task = [];
        selected_project = [];
        selected_project_credentials_name = [];
        sel_pro = "";
        sel_pro_name = "";
        $.each($("input[name='credential_id[]']:checked"), function() {
            console.log("ready===");
            selected_task.push($(this).val());
            selected_project.push($(this).attr("project-id"));
            selected_project_credentials_name.push($(this).attr("project-credentials-name"));
        });
        sel_pro = $.unique(selected_project);
        sel_pro_name = $.unique(selected_project_credentials_name);
        $('.seleted_tasks').val(selected_task);
        // alert("selected_task"+selected_task);
        $('.seleted_projects').val(sel_pro);
        $('.project_name').val(sel_pro_name);
    });

    $(".credentials_select").click(function() {
        selected_task = [];
        selected_project = [];
        selected_project_credentials_name = [];
        sel_pro = "";
        sel_pro_name = "";
        $.each($("input[name='credential_id[]']:checked"), function() {
            console.log("ready===");
            selected_task.push($(this).val());
            selected_project.push($(this).attr("project-id"));
            selected_project_credentials_name.push($(this).attr("project-credentials-name"));
        });
        sel_pro = $.unique(selected_project);
        sel_pro_name = $.unique(selected_project_credentials_name);
        $('.seleted_tasks').val(selected_task);
        // alert("selected_task"+selected_task);
        $('.seleted_projects').val(sel_pro);
        $('.project_name').val(sel_pro_name);
    });

    $('body').on('click', '#delete_credentials', function(event) {
        event.preventDefault();
        var type = "delete_credentials";
        $("#type").val(type);
        $('#delete_confirmation_modal').modal("show");
        $('.change_title').html("Project Credentials");
        delete_url = $(this).attr('href');

        // alert(delete_url);
    });


    var docs_cols = [
        { 'data': "document_type", "searchable": false },
        { 'data': "availability_status", "searchable": false },
        { 'data': "document", "searchable": false },
        { 'data': "available_date", "searchable": false },
        { 'data': "action", "searchable": false, "class": "action" },
    ];

    var docs_table = $('#project_docs_table').DataTable({
        "language": {
            "search": "",
            "lengthMenu": "_MENU_",
            "paginate": {
                "next": '<i class="icon ion-ios-arrow-forward"></i>',
                "previous": '<i class="icon ion-ios-arrow-back"></i>'
            },
        },
        'pageLength': 10,
        processing: true,
        serverSide: true,
        ordering: false,
        destroy: true,
        method: "GET",
        ajax: {
            url: list_docs_project,
            data: function(d) {},
        },
        columns: docs_cols,
    });


    var form = jQuery("#daily_status_form");

    form.validate({
        rules: {
            task_subject: {
                required: true,
            },
            'project_email_to[]': {
                required: true,
            },
        },
        messages: {
            task_subject: {
                required: 'Please Enter Subject',
            },
            'project_email_to[]': {
                required: 'Please Select To Mail',
            },
        },
        errorPlacement: function(error, element) {
            if (element.hasClass("project_email_to1")) {
                error.appendTo($('.project_to_email_error'));
            }
            if (element.hasClass("project_subject")) {
                error.appendTo($('.project_subject_error'));
            }
        },
        submitHandler: function(form) {
            $('#date_period').val($('#period').val());
            $('#selected_employee').val($('.employee_id').val());
            $('#pro_daily_mail_send').button('loading');
            var form_id = '#daily_status_form';
            let formData = new FormData($(form_id)[0]);
            $.ajax({
                    url: send_daily_report_url,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#pro_daily_mail_send').button('reset');
                        var errors = '';
                        for (var i in res.errors) {
                            errors += '<li>' + res.errors[i] + '</li>';
                        }
                        console.log(errors)

                        new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: 'Something Went Wrong At Server'
                        }).show();

                    } else {
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: 'Project Daily Report Sent Successfully!!!'
                        }).show();
                        $('#pro_daily_mail_send').button('reset');
                        $('#project_daily_report_modal').modal('hide');
                    }
                })
        }
    });

    $('body').on('change', '.total_local_select', function(event) {
        if (this.checked == true)
            $('#project_db_patch_table').find('.local_select').prop('checked', true).trigger("change");
        else
            $('#project_db_patch_table').find('.local_select').prop('checked', false).trigger("change");

        selected_local_db_query = [];
        $.each($("input[name='local_select[]']:checked"), function() {
            selected_local_db_query.push($(this).val());
        });
        $('.selected_local_db_query').val(selected_local_db_query);

    });

    $('body').on('change', '.total_staging_select', function(event) {
        if (this.checked == true)
            $('#project_db_patch_table').find('.staging_select').prop('checked', true).trigger("change");
        else
            $('#project_db_patch_table').find('.staging_select').prop('checked', false).trigger("change");

        selected_staging_db_query = [];
        $.each($("input[name='staging_select[]']:checked"), function() {
            selected_staging_db_query.push($(this).val());
        });
        $('.selected_staging_db_query').val(selected_staging_db_query);


    });

    $('body').on('change', '.total_live_select', function(event) {
        if (this.checked == true)
            $('#project_db_patch_table').find('.live_select').prop('checked', true).trigger("change");
        else
            $('#project_db_patch_table').find('.live_select').prop('checked', false).trigger("change");

        selected_live_db_query = [];
        $.each($("input[name='live_select[]']:checked"), function() {
            selected_live_db_query.push($(this).val());
        });
        $('.selected_live_db_query').val(selected_live_db_query);
    });


    $('body').on('change', '.local_select', function(event) {
        selected_local_db_query = [];
        $.each($("input[name='local_select[]']:checked"), function() {
            selected_local_db_query.push($(this).val());
        });
        $('.selected_local_db_query').val(selected_local_db_query);
    });

    $('body').on('change', '.staging_select', function(event) {
        selected_staging_db_query = [];
        $.each($("input[name='staging_select[]']:checked"), function() {
            selected_staging_db_query.push($(this).val());
        });
        $('.selected_staging_db_query').val(selected_staging_db_query);
    });
    $('body').on('change', '.live_select', function(event) {
        selected_live_db_query = [];
        $.each($("input[name='live_select[]']:checked"), function() {
            selected_live_db_query.push($(this).val());
        });
        $('.selected_live_db_query').val(selected_live_db_query);
    });



    $('body').on('click', '.copy_btn_class', function(event) {
        var id = $(this).val();
        var db_patch_id = "query_" + id;
        var copyText = document.getElementById(db_patch_id);
        copyText.select();
        document.execCommand("copy");
    });

    $('body').on('click', '.copy_work_class', function(event) {
        var id = $(this).val();
        var work_id = "work_" + id;
        var copyText = document.getElementById(work_id);
        copyText.select();
        document.execCommand("copy");
    });



    $('body').on('click', '.copy_local_class', function(event) {
        var total_query_text = '';
        $(".local_copied_queries").each(function() {
            var queries = $(this).val() + ';';
            total_query_text += queries;
        });
        //alert(total_query_text);
        var copyText = total_query_text;
        var div = "<input type='text' id='local_selected_values' value='" + total_query_text + "'>";
        $('#show_query').append(div);
        var copyText = document.getElementById('local_selected_values');
        copyText.select();
        document.execCommand("copy");
    });
    $('body').on('click', '.copy_staging_class', function(event) {
        var total_query_text = '';
        $(".staging_copied_queries").each(function() {
            var queries = $(this).val() + ';';
            total_query_text += queries;
        });
        // alert(total_query_text);
        var div = "<input type='text' id='staging_selected_values' value='" + total_query_text + "'>";
        $('#show_query').append(div);
        var copyText = document.getElementById('staging_selected_values');
        copyText.select();
        document.execCommand("copy");
    });
    $('body').on('click', '.copy_live_class', function(event) {
        var total_query_text = '';
        $(".live_copied_queries").each(function() {
            var queries = $(this).val() + ';';
            total_query_text += queries;
        });
        // alert(total_query_text);
        $('#live_copied_queries').val(total_query_text);
        var div = "<input type='text' id='live_selected_values' value='" + total_query_text + "'>";
        $('#show_query').append(div);
        var copyText = document.getElementById('live_selected_values');
        copyText.select();
        document.execCommand("copy");
    });


    $('body').on('click', '#project_mom_mail', function(event) {
        event.preventDefault();
        var mom_id = $(this).data('id');
        $('.mom_id').val(mom_id);
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
                        $('#project_email_to1').val(to_mail);
                        $("#project_email_to1 option:selected").val(to_mail);
                        $('#project_email_to1').multiselect('rebuild');
                        $('#project_email_cc1').val(cc_mail);
                        $('#project_email_cc1').multiselect('rebuild');
                        $('select').next('.select2').remove();
                        $('select').not('.not_style').select2();
                    }
                }
            })

        } else {
            $('#project_email_to1').val('');
            $('#project_email_to1').multiselect('rebuild');
            $('#project_email_cc1').val('');
            $('#project_email_cc1').multiselect('rebuild');
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
                    $(".project_email_cc").multiselect("refresh"); // Then refresh
                    $('select').next('.select2').remove();
                    $('select').not('.not_style').select2();
                }
            }
        })

    });




    var project_id = $('#project_id').val();
    var project_name = $('.pro_name').val();
    $('.task_email_project').val(project_id);
    $('.project_name').val(project_name);
    /* task export*/

    $('body').on('click', '#task_export', function(event) {
        //alert(1)
        event.preventDefault();
        $('#task_export_modal').modal("show");
        $('.type').val('Project');

        // delete_url=$(this).attr('href');
    });
    $('.export-confirm').click(function(event) {
        event.preventDefault();
        var task_ids = selected_task;
        var type = $('#task_type_id1').val();
        var status = $('#task_status_id1').val();
        var url = export_url + '/' + selected_task + '/' + type + '/' + status;
        window.location = url;
    });
    /* task export*/


    /* bulk update */
    $('body').on('click', '#task_bulk_update', function(event) {
        event.preventDefault();
        $('#task_bulk_update_modal').modal("show");
        $('.type').val('task');
    });

    /* bulk edit */
    $('body').on('click', '#task_bulk_edit', function(event) {
        event.preventDefault();
        var str = task_quick_edit_url;
        var re = /id/gi;
        var bulk_edit_url = str.replace(re, selected_task);
        window.location = bulk_edit_url;
    });

    $('.change-confirm').click(function(event) {
        event.preventDefault();
        var task_ids = selected_task;
        var assign_to = $('.assign_to_update').val();
        var status = $('.status_update').val();
        var url = bulk_update_url + '/' + selected_task + '/' + assign_to + '/' + status;
        window.location = url;
    });
    /* bulk update */

    $('body').on('click', '#task_email', function(event) {
        event.preventDefault();
        $('#task_email_modal').modal("show");
    });

    $('.task_total_select').on('click', function() {
        //alert();
        if (this.checked == true) {
            $('#project_task1').find('input[name="task_id[]"]').prop('checked', true).trigger("change");
        } else {
            $('#project_task1').find('input[name="task_id[]"]').prop('checked', false).trigger("change");
        }
    });
    $(".task_total_select").click(function() {
        selected_task = [];
        selected_project = [];
        selected_project_name = [];
        sel_pro = "";
        sel_pro_name = "";
        $.each($("input[name='task_id[]']:checked"), function() {
            selected_task.push($(this).val());
            selected_project.push($(this).attr("project-id"));
            selected_project_name.push($(this).attr("project-name"));
        });
        sel_pro = $.unique(selected_project);
        sel_pro_name = $.unique(selected_project_name);
        $('.seleted_tasks').val(selected_task);
        $('.seleted_projects').val(sel_pro);
        $('.project_name').val(sel_pro_name);
    });
    $('body').on('click', '.task_select', function() {
        selected_task = [];
        selected_project = [];
        selected_project_name = [];
        sel_pro = "";
        sel_pro_name = "";
        $.each($("input[name='task_id[]']:checked"), function() {
            selected_task.push($(this).val());
            selected_project.push($(this).attr("project-id"));
            selected_project_name.push($(this).attr("project-name"));
        });
        sel_pro = $.unique(selected_project);
        sel_pro_name = $.unique(selected_project_name);
        $('.seleted_tasks').val(selected_task);
        $('.seleted_projects').val(sel_pro);
        $('.project_name').val(sel_pro_name);
    });



    $('.preview-confirm').click(function(event) {
        event.preventDefault();
        //var url=preview_url;
        var form_id = '#form1';
        let formData = new FormData($(form_id)[0]);
        $.ajax({
                url: preview_url,
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
                        text: ''
                    }).show();
                } else {

                    $('#master-new-project').modal('hide');
                }
            })


    });

    var form_id = '#form1';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            task_subject: {
                required: true,
            },
            'task_email_to[]': {
                required: true,
            },
        },
        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            window.location(preview_url);

        }
    });
    var dataTable = $('#project_task1').dataTable();

    $('.task_type').on('change', function() {
        dataTable.fnFilter();
    });
    $('.flow_type').on('change', function() {
        dataTable.fnFilter();
    });
    $('.status').on('change', function() {
        status = $(this).val();
        //alert(status);
        if (status == null) {
            status1 = -1;
        } else {
            status1 = $(this).val();
        }
        dataTable.fnFilter();
    });
    $('.assign_to').on('change', function() {
        dataTable.fnFilter();
    });
    $('.task_division').on('change', function() {
        task_division = $(this).val();
        //alert(task_division);
        dataTable.fnFilter();
    });


    $(document).on('click', '.add_queries', add_queries_form);

    function add_queries_form() {
        var div = $('#dummy_project_queries').html();
        div = div.replace(/xxx/g, queries_count);
        $('.project_queries_wrapper').append(div);
        $('select').next('.select2').remove();
        $('select').not('.not_style').select2();
        $('.datepicker').datepicker();
        queries_count++;
    }

    if (queries_add) {
        add_queries_form();
    }


    $('.save-queries').click(function(event) {
        event.preventDefault();
        var form_id = '#queries_form';
        let formData = new FormData($(form_id)[0]);
        $('#save_querie').button('loading');

        $.ajax({
                url: queries_save_url,
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
            })
            .done(function(res) {
                if (!res.success) {
                    $('#save_querie').button('reset');
                    var errors = '';
                    for (var i in res.errors) {
                        errors += '<li>' + res.errors[i] + '</li>';
                    }

                    console.log(errors)
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: ''
                    }).show();
                } else {

                    window.location = list_project_view;
                }
            })
            .fail(function(xhr) {
                $('#save_querie').button('reset');
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'Something went wrong at server.'
                }).show();

            })


    });

    $('.delete-confirm').click(function() {
        var type = $('#type').val();
        if (type == 'queries') {
            delete_project_queries();
        }
        if (type == 'attachment') {
            delete_attachment_tab();
        }
        if (type == 'events') {
            delete_events_tab();
        }
        if (type == 'delete_mom') {
            window.location = delete_url;
        }
        if (type == 'project_link_delete') {
            delete_project_link_tab();
        }
        if (type == 'delete_credentials') {
            window.location = delete_url;
        }

    });



    $('body').on('click', '.remove_file', function() {

        var delete_id = $(this).attr('id');
        var type = 'attachment';
        $('#attachment_id').val(delete_id);
        $('#type').val(type);
        $('#delete_confirmation_modal').modal("show");
        $('.change_title').html("Attachment");

    });

    function delete_attachment_tab() {

        var id = $('#attachment_id').val();
        var class_name = 'remove_' + id;
        $('.' + class_name).hide();
        $.ajax({
            url: delete_project_file_url,
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

    $(document).on('click', '.remove_queries_detail', function() {
        var delete_id = $(this).attr('id');
        var type = 'queries';
        $('#referer').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('.change_title').html("Queries");
            $('#delete_confirmation_modal').modal("show");
        } else {
            $(this).parents(".project_queries").remove();
        }
    });


    function delete_project_queries() {
        var delete_query_id = $('#referer').val();
        var query_remove = 'project_queries' + delete_query_id;
        var re = /id_value/gi;
        var str = querie_delete_url;
        var delete_url = str.replace(re, delete_query_id);
        $.ajax({
                url: delete_url,
                method: "GET",
                data: { id: delete_query_id },
                processData: false,
                contentType: false,
            })
            .done(function(res) {
                if (res.success) {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Query Deleted Sucessfully'
                    }).show();

                    $('#delete_confirmation_modal').modal("hide");
                    $("." + query_remove).remove();
                } else {
                    $('#submit').button('reset');
                    var errors = '';
                    for (var i in res.errors) {
                        errors += '<li>' + res.errors[i] + '</li>';
                    }

                    console.log(errors)
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server'
                    }).show();
                }
            })
    }

    $('body').on('click', '.remove_event', function() {

        var delete_id = $(this).attr('id');
        var type = 'events';
        $('#events_id').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('.change_title').html("Event");
            $('#delete_confirmation_modal').modal("show");
        } else {
            $(this).parents(".project_event").remove();
        }

    });

    function delete_events_tab() {

        var id = $('#events_id').val();
        var class_name = 'remove_event_' + id;
        $('.' + class_name).hide();

        $.ajax({
            url: delete_project_event_url,
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

    var form_id = '#queries_form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            "queries[][question]": {
                required: true,
            },
        }
    });



    $('.mail_report_option').on('change', function() {
        var type = $(this).val();
        if (type == 'project') {
            $('.project_subject').val('Project Status/Weekly Report -' + project_short_name);
            var str = $('.project_body_description1').text();
            var res = str.replace("daily status", "Status/Weekly");
            $('.project_body_description1').text(res);

        } else {
            $('.project_subject').val('Project Daily Report -' + project_short_name);
            var str = $('.project_body_description1').text();
            var res = str.replace("Status/Weekly", "daily status");
            $('.project_body_description1').text(res);

        }
    });

    $(document).on('click', '.add_attachment', add_attachment_form);

    function add_attachment_form() {
        var div = $('#dummy_project_attachment').html();
        attach_count++;
        div = div.replace(/xxx/g, attach_count);
        $('.project_attachment_wrapper').append(div);
    }
    $(document).on('click', '.remove_attachment', function() {
        $(this).parents(".project_attachment").remove();
    });


    /*$('.save-attachment').click(function(event){
    event.preventDefault();
    var form_id = '#attachment_form';
        $.validator.addMethod("attachmentrequired", $.validator.methods.required,
        "Client Sub Segment is Required");
        $.validator.addClassRules({
        attachment[][]:{
                attachmentrequired:true,
             }
    });




   let formData = new FormData($(form_id)[0]);
     //$('.save-attachment').button('loading');
    $.ajax({
                url: attachment_save_url,
                method: "POST",
                data:formData,
                processData: false,
                contentType: false,
            })
            .done(function(res) {
                if(!res.success) {
                    $('#save_querie').button('reset'); 
                    var errors = '';
                    for(var i in res.errors){
                    errors += '<li>'+res.errors[i]+'</li>';
                    }

                    console.log(errors)
                    new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: ''
                    }).show();
                }else{

                    window.location=list_project_view;
                }
            })
              .fail(function(xhr) {
                    $('#save_querie').button('reset'); 
                    new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'Something went wrong at server.'
                    }).show();

                })

    
    });
*/
    $('.save-attachment').click(function(event) {
        var form_id = '#attachment_form';
        $.validator.addMethod("attachment_name_required", $.validator.methods.required,
            "Attachment is Required");
        $.validator.addMethod("file_required", $.validator.methods.required,
            "Attachment is Required");

        $.validator.addClassRules({
            attch_name: {
                attachment_name_required: true,
            },
        });
        $.validator.addClassRules({
            attach_file: {
                file_required: true,
            },
        });

        var v = jQuery(form_id).validate({
            errorPlacement: function(error, element) {

                if (element.hasClass('attch_name')) {
                    error.insertAfter(element.parent("div"));
                }
                if (element.hasClass('attach_file')) {
                    error.insertAfter(element.parent("div"));
                }

            },
            submitHandler: function(form) {
                let formData = new FormData($(form_id)[0]);
                $('#submit').button('loading');
                $.ajax({
                        url: attachment_save_url,
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                    })
                    .done(function(res) {
                        if (!res.success) {
                            $('#save_attachment').button('reset');
                            var errors = '';
                            for (var i in res.errors) {
                                errors += '<li>' + res.errors[i] + '</li>';
                            }

                            console.log(errors)
                        } else {
                            window.location = list_project_view;
                        }

                    })

                    .fail(function(xhr) {
                        $('#save_attachment').button('reset');
                    })

            }

        });
    });


    $(document).on('click', '.add_link', add_link_form);

    function add_link_form() {
        var div = $('#dummy_project_links').html();
        link_count++;
        div = div.replace(/xxx/g, link_count);
        $('.project_link_wrapper').append(div);
    }

    $(document).on('click', '.remove_link_icon', function() {
        $(this).parents(".project_link").remove();
    });


    $('body').on('click', '.remove_link', function() {

        var delete_id = $(this).attr('id');
        var type = 'project_link_delete';
        $('#project_link_delete_id').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('.change_title').html("Link");
            $('#delete_confirmation_modal').modal("show");
        }


    });



    function delete_project_link_tab() {
        var id = $('#project_link_delete_id').val();
        var class_name = 'remove_link_' + id;
        $('.' + class_name).hide();
        $.ajax({
            url: delete_project_link_url,
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
                    $('#delete_confirmation_modal').modal("hide");
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

    // $('body').on('click', ".remove_link" ,function(){   
    // alert();   
    //     var id = $(this).attr('id');
    //     var class_name='remove_link_'+id;
    //     $('.'+class_name).hide();
    //     $.ajax({
    //         url:delete_project_link_url,
    //         method:'POST',
    //         //processData:true,
    //         data: {
    //         id :id
    //         },
    //         success:function(d){
    //             if(d.success==true)
    //             {
    //                 new Noty({
    //                 type: 'success',
    //                 layout: 'topRight',
    //                 text: 'Deleted Sucessfully.'
    //                 }).show();
    //             }
    //             else
    //             {
    //                 new Noty({
    //                 type: 'error',
    //                 layout: 'topRight',
    //                 text: d.errors,
    //                 }).show();
    //             }
    //         }
    //     })
    // }); 

    var link_form_id = '#link_form1';
    var v = jQuery(link_form_id).validate({
        ignore: "",
        rules: {
            'links[][name]': {
                required: true,
            },
            'links[][url]': {
                required: true,
            },
        },
        invalidHandler: function(event, validator) {
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'You have errors, Kindly check...!'
            }).show();
        },
        submitHandler: function(form) {

            let formData = new FormData($(link_form_id)[0]);
            console.log(formData);
            $('#save_link').button('loading');
            $.ajax({
                    url: link_save_url,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#save_link').button('reset');
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
                    $('#save_link').button('reset');
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server.'
                    }).show();
                })
        }
    });

    $(document).on('click', '.add_event', add_event_form);

    function add_event_form() {
        var div = $('#dummy_project_events').html();
        event_count++;
        div = div.replace(/xxx/g, event_count);
        $('.project_event_wrapper').append(div);
        $('.datetimepicker').datetimepicker({
            format: 'DD-MM-YYYY hh:mm a'
        });
    }

    var form_id = '#event_form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            'events[][title]': {
                required: true,
            },
            'events[][event_from]': {
                required: true,
            },
            'events[][event_to]': {
                required: true,
            },
        },
        invalidHandler: function(event, validator) {
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'You have errors, Kindly check...!'
            }).show();
        },
        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            $('#save_event').button('loading');
            $.ajax({
                    url: event_save_url,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#save_event').button('reset');
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
                    $('#save_event').button('reset');
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Something went wrong at server.'
                    }).show();
                })
        }
    });

});