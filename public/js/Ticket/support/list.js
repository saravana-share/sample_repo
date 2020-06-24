$(document).ready(function() {
    // alert();
    var table = [];
    var cols = [
        { 'data': "ticket_no", "searchable": true, "name": "time_estimation_details.id" },
        { 'data': "project_name", "searchable": true, "name": "projects.short_name" },
        { 'data': "time_estimation_details_priority", "searchable": true, "name": "time_estimation_details.priority" },
        { 'data': "time_estimation_details_module", "searchable": true, "name": "time_estimation_details.module" },
        { 'data': "config_category_name", "searchable": false },
        { 'data': "config_medium_name", "searchable": false },
        { 'data': "user_name", "searchable": true, "name": "users.name" },
        { 'data': "task_statuses_name", "searchable": true, "name": "task_statuses.name" },
        { 'data': "ticket_due_date", "searchable": true, "name": "time_estimation_details.ticket_due_date" },
        { 'data': "action", "searchable": false, "class": "action" },
    ];

    var company_table = $('#Ticket_table').DataTable({
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
        ordering: true,
        method: "GET",
        ajax: {
            url: list_ticket_details,
            data: function(d) {
                d.ticket_project_id = $('.support_ticket_project_id').val();
                d.ticket_assign_to = $('.support_ticket_assign_to').val();
                if ($('.support_ticket_task_status_id').val() == null || $('.support_ticket_task_status_id').val() == "") {
                    status = -1;
                } else {
                    status = $('.support_ticket_task_status_id').val();
                }
                d.ticket_task_status_id = status;
                console.log(d);
            },
        },
        columns: cols,
    });

    $('body').on('click', '#delete_ticket', function(event) {
        event.preventDefault();
        $('#delete_confirmation_modal').modal("show");
        delete_url = $(this).attr('href');
    });
    $('.delete-confirm').click(function() {
        window.location = delete_url;
    });

    var dataTable = $('#Ticket_table').dataTable();

    $('.support_ticket_project_id').on('change', function() {
        dataTable.fnFilter();
    });
    $('.support_ticket_task_status_id').on('change', function() {
        dataTable.fnFilter();
    });
    $('.support_ticket_assign_to').on('change', function() {
        dataTable.fnFilter();
    });

    $('body').on('click', '#support_reset_filter', function(event) {
        $('#support_ticket_task_status_id').val('');
        $('#support_ticket_task_status_id').multiselect('rebuild');
        $('#support_ticket_project_id').val(-1);
        $('#support_ticket_project_id').trigger('change');
        $('#support_ticket_assign_to').val(-1);
        $('#support_ticket_assign_to').trigger('change');
        dataTable.fnFilter();
    });

    $('body').on('click', '#support_card_reset_filter', function(event) {
        $('#support_card_ticket_task_status_id').val('');
        $('#support_card_ticket_task_status_id').multiselect('rebuild');
        $('#support_card_ticket_project_id').val(-1);
        $('#support_card_ticket_project_id').trigger('change');
        $('#support_card_ticket_assign_to').val(-1);
        $('#support_card_ticket_assign_to').trigger('change');
        var project_id = $('#support_card_ticket_project_id').val();
        var ticket_status_id = $('#support_card_ticket_project_id').val();
        var assign_to = $('#support_card_ticket_assign_to').val();
        var url = card_support_detail_url;
        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            processData: true,
            data: {
                ticket_project_id: project_id,
                ticket_task_status_id: ticket_status_id,
                ticket_assign_to: assign_to,
            },
            success: function(data) {
                if (data) {
                    $('.card_data').html('');
                    $('.card_data').html(data.card_time_estimations);
                    sort();
                }
            }
        });
    });


    $('body').on('change', '.support_ticket_client_card_filter', function(event) {
        var project_id = $('#support_card_ticket_project_id').val();
        var ticket_status_id = $('#support_card_ticket_project_id').val();
        var assign_to = $('#support_card_ticket_assign_to').val();
        var url = card_support_detail_url;
        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            processData: true,
            data: {
                ticket_project_id: project_id,
                ticket_task_status_id: ticket_status_id,
                ticket_assign_to: assign_to,
            },
            success: function(data) {
                if (data) {
                    $('.card_data').html('');
                    $('.card_data').html(data.card_time_estimations);
                    sort();
                }
            }
        });

    });
    /* $('body').on('click', '#export_btn', function(event) {
         var date = $('#export_period').val();
         $.ajax({
             url: export_ticket_url,
             type: 'GET',
             dataType: "json",
             processData: true,
             data: {
                 date: date,

             },
             success: function(data) {

             }
         });

     });*/



});