$(document).ready(function() {
    var tables = [];
    $('#punch-table').DataTable({
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
            url: get_punch_list,
            data: function(d) {
                d.period = $('#period').val();
                d.employee_id = $('#employee_id').val();
            }

        },
        columns: [
            { data: 'name', name: 'users.name', searchable: true },
            { data: 'date', name: 'punch_in_outs.date', searchable: false },
            { data: 'in_time', name: 'punch_in_outs.in_time', searchable: false },
            { data: 'out_time', name: 'punch_in_outs.out_time', searchable: false },
            { data: 'duration', name: 'punch_in_outs.duration', searchable: false },
            { data: 'created_on', searchable: false },
            { data: 'updated_on', searchable: false },
            { data: 'reason', searchable: false },
            { data: 'action', searchable: false, 'class': 'action' }
        ],
        "rowCallback": function(row, data) {

            if (data.id) {
                $(row).find('td:eq(8)').css('display', 'block');
            } else {
                $(row).find('td:eq(8)').css('display', 'none');
            }
        },
    });

    var dataTable = $('#punch-table').dataTable();
    // $('#period').change(function(){
    //      dataTable.fnFilter();       
    // });    
    $('#period').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD-MM-YYYY') + ' to ' + picker.endDate.format('DD-MM-YYYY'));

        dataTable.fnFilter();
    });
    $('#employee_id').change(function() {

        dataTable.fnFilter();
    });

    var form = jQuery("#daily_punch_form");

    form.validate({
        rules: {
            punch_mail_subject: {
                required: true,
            },
            'punch_email_to[]': {
                required: true,
            },
        },
        messages: {
            punch_mail_subject: {
                required: 'Please Enter Subject',
            },
            'punch_email_to[]': {
                required: 'Please Select To Mail',
            },
        },
        errorPlacement: function(error, element) {
            if (element.hasClass("punch_mail_subject")) {
                error.appendTo($('.punch_mail_subject_error'));
            }
            if (element.hasClass("punch_email_to")) {
                error.appendTo($('.punch_email_to_error'));
            }
        },
        submitHandler: function(form) {
            $('#punch_mail_send').button('loading');
            var form_id = '#daily_punch_form';
            let formData = new FormData($(form_id)[0]);
            $.ajax({
                    url: send_punch_report_mail,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#punch_mail_send').button('reset');
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
                            text: 'Punch Daily Report Sent Successfully!!!'
                        }).show();
                        $('#punch_mail_send').button('reset');
                        $('#punch_daily_report_modal').modal('hide');
                    }
                })
        }
    });


});