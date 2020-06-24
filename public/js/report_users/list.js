$(document).ready(function() {
    // alert();
    var table = [];
    var cols = [
        { 'data': "id", "name": "id", "searchable": false },
        { 'data': "report_name", "name": "report_name", "searchable": true },
        { 'data': "to_emails", "searchable": false },
        { 'data': "cc_emails", "searchable": false },
        { 'data': "name", "name": "name", "searchable": false },
        { 'data': "action", "class": "action", "searchable": false },
    ];

    var rfc_table = $('#report_table').DataTable({
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
            url: list_users_details,
            data: function(d) {},
        },
        columns: cols,
    });
    $('body').on('click', '#delete_report_user', function(event) {
        event.preventDefault();
        $('#delete_confirmation_modal').modal("show");
        delete_url = $(this).attr('href');
    });
    $('.delete-confirm').click(function() {
        window.location = delete_url;
    });
});