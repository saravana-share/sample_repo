$(document).ready(function() {

    $('#leave-table').DataTable({
        "language": {
            "search": "",
            "lengthMenu": "_MENU_",
            "paginate": {
                "next": '<i class="icon ion-ios-arrow-forward"></i>',
                "previous": '<i class="icon ion-ios-arrow-back"></i>'
            },
        },
        processing: true,
        serverSide: true,
        pageLength: 100,
        ajax: {
            url: get_leave_list,
            data: function(d) {
                d.period = $('#leave_period').val();
                d.employee_id = $('#leave_employee_id').val();
            }

        },
        columns: [
            { data: 'name', name: 'users.name', searchable: true },
            { data: 'start_date', name: 'leaves.from_date', searchable: false },
            { data: 'end_date', name: 'leaves.to_date', searchable: false },
            { data: 'leave_list_type', searchable: false },
            { data: 'leave_days', name: 'leaves.days', searchable: false },
            { data: 'reason', name: 'leaves.reason', searchable: true },
            { data: 'approver1_status', name: 'leaves.approver_status1', searchable: true },
            { data: 'approver2_status', name: 'leaves.approver_status2', searchable: true },
            { data: 'approver3_status', name: 'leaves.approver_status3', searchable: true },
            { data: 'approver4_status', name: 'leaves.approver_status4', searchable: true },
            { data: 'status', name: 'leaves.status', searchable: true },
            { data: 'action', "class": "action" }
        ],
        rowCallback: function(row, data, index) {
            if (data.leave_list_type == "leave") {
                var test = data.leave_days + ' - Day';
                $('td:eq(4)', row).html(test);
            } else {
                var test = data.leave_days + ' - Hours';
                $('td:eq(4)', row).html(test);
            }

        },
    });

    var datTable = $('#leave-table').dataTable();
    // $('#period').change(function(){
    //      dataTable.fnFilter();       
    // });    
    $('#leave_period').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD-MM-YYYY') + ' to ' + picker.endDate.format('DD-MM-YYYY'));
        datTable.fnFilter();
    });
    $('#leave_employee_id').change(function() {

        datTable.fnFilter();
    });

    $(document).on('click', '.status_click', function() {
        $('#row_id').val('');
        $('#status').val('');
        $('#row_id').val($(this).data('id'));
        $('#status').val($(this).data('status'));
        $('.status_name_class').text($(this).data('status'));
    });

    $('#status_yes').click(function() {
        var id = $("#row_id").val();
        var status = $("#status").val();
        var dataString = 'id=' + id + '&status=' + status;
        console.log(dataString);
        $.ajax({
                url: get_statusresult,
                type: "POST",
                data: dataString,
                processData: false,
            })
            .done(function(result) {
                //PROBLEM IS HERE
                var table = $('#leave-table').DataTable({
                    "language": {
                        "search": "",
                        "lengthMenu": "_MENU_",
                        "paginate": {
                            "next": '<i class="icon ion-ios-arrow-forward"></i>',
                            "previous": '<i class="icon ion-ios-arrow-back"></i>'
                        },
                    },
                });
                table.ajax.reload();
            })
    });

});