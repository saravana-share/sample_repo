
$(document).ready(function(){
    $('#user').attr('class','active');
    $('#add').attr('href',new_user);
        var table = [];
        var cols = [
        {'data':"id","searchable":false},
        {'data':"company_name","name":"companies.name"},
        {'data':"name","name":"users.name"},
        {'data':"email","name":"users.email"},
        {'data':"mobile","name":"users.email"},
        //{'data':"portal_role","name":"pr.name"},
        {'data':"ecode","name":"users.ecode"},
        {'data':"username","name":"users.username"},
        {'data':"imei","name":"users.imei"},
        //{'data':"status","searchable":false},
        {'data':"action","searchable":false,"class":"action"},
        ];

        var company_table = $('.ajax_table').DataTable({
        "language": {
        "search":"",
        "lengthMenu":     "_MENU_",
        "paginate": { 
        "next":       '<i class="icon ion-ios-arrow-forward"></i>',
        "previous":   '<i class="icon ion-ios-arrow-back"></i>'
        },
        },
        'pageLength': 10,
        processing:true,
        serverSide: true,
        ordering: true,
        method:"GET",  
        ajax: {
        url: list_user,
        data: function (d){
            console.log(d);
        },
        },
        columns: cols,
        });

        $('body').on('click', '#delete_user', function (event) {
            event.preventDefault();
            $('#delete_confirmation_modal').modal("show");
            delete_url=$(this).attr('href');
        });
        $('.delete-confirm').click(function(){
            window.location = delete_url;
        });

});