$(document).ready(function() {

    var table = [];
    var cols = [
        { 'data': "users_name", "searchable": true, "name": "users.name" },
        { 'data': "designations_name", "searchable": true, "name": "designations.name" },
        { 'data': "color", "searchable": false },
        { 'data': "doj", "searchable": false },
        { 'data': "dob", "searchable": false },
        { 'data': "address", "searchable": true, "name": "employees.address" },
        { 'data': "blood_group", "searchable": false },
        { 'data': "action", "searchable": false, "class": "action" },
    ];

    var company_table = $('.employee_table').DataTable({
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
            url: list_employee,
            data: function(d) {
                console.log(d);
            },
        },
        columns: cols,
    });

    $('body').on('click', '#delete_employee', function(event) {
        event.preventDefault();
        $('#delete_confirmation_modal').modal("show");
        delete_url = $(this).attr('href');
        // alert(delete_url);
    });
    $('.delete-confirm').click(function() {
        window.location = delete_url;
    });

});