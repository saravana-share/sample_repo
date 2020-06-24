$(document).ready(function() {
    $('#user').attr('class', 'active');
    var table = [];
    var cols = [
        { 'data': "sl_no", "searchable": false },
        { 'data': "name", "name": "users.name" },
        { 'data': "email", "name": "users.email" },
        { 'data': "mobile", "name": "users.email" },
        { 'data': "ecode", "name": "users.ecode" },
        { 'data': "status", "searchable": false },
    ];

    var company_table = $('.ajax_table').DataTable({
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
            url: list_user,
            data: function(d) {
                d.name = $('#name').val();
                d.status = $('#status').val();
                console.log(d);
            },
        },
        columns: cols,
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            $("td:nth-child(1)", nRow).html(iDisplayIndex + 1);
            return nRow;
        }
    });


    var db_Table = $('.ajax_table').dataTable();

    $('#name').keyup(function() {
        db_Table.fnFilter();
    });
    $('#status').change(function() {
        db_Table.fnFilter();
    });




});