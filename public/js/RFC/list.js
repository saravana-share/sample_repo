$(document).ready(function() {
    // alert();
    var table = [];
    var cols = [
        { 'data': "rfc_name", "name": "rfc_name", "searchable": true },
        { 'data': "rfc_description", "name": "rfc_description", "searchable": true },
        { 'data': "project_name", "name": "project_name", "searchable": true },
        { 'data': "rfc_no", "name": "rfc_no", "searchable": true },
        { 'data': "type_name", "searchable": false },
        { 'data': "status", "searchable": false },
        { 'data': "requested_date", "name": "request_for_changes.requested_date", "searchable": false },
        { 'data': "action", "class": "action", "searchable": false },
    ];

    var rfc_table = $('#RFC_table').DataTable({
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
            url: list_rfc_details,
            data: function(d) {},
        },
        columns: cols,
    });
});