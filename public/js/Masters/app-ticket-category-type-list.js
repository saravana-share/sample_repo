$(document).ready(function() {
    $('#company - menu').attr('class', 'active');
    $('#add').attr('href', new_ticket_category_type);
    var table = [];
    var cols = [
        { 'data': "id", "name": "ticket_categories.id", "searchable": true },
        { 'data': "name", "name": "ticket_categories.name", "searchable": true },
        { 'data': "main_category", "name": "configs.name", "searchable": true },
        { 'data': "status", "searchable": false },
        { 'data': "action", "searchable": false, "class": "action" },
    ];

    var ticket_category_table = $('#ticket_category_table').DataTable({
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
            url: list_ticket_category_type,
            data: function(d) {},
        },
        columns: cols,
    });

    $('body').on('click', '#delete_ticket_category_type_id', function(event) {
        event.preventDefault();
        $('#delete_confirmation_modal').modal("show");
        delete_url = $(this).attr('href');
    });
    $('.delete-confirm').click(function() {
        window.location = delete_url;
    });




});