$(document).ready(function(){
    $('#role').attr('class','active');
    $('#add').attr('href',new_role);
        var table = [];
        var cols = [
        

        {"data":"rownum"},
                {"data":"name","name":"name","searchable":true},
                {'data':"number_of_users","searchable":false},
                {"data":"status","searchable":false},
                {'data':"action","searchable":false,"class":"action"},
                ];

        var role_table = $('.ajax_table').DataTable({
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
        url: list_role,
        data: function (d){
        },
        },
         columns: cols,
        });

        $('body').on('click', '#delete_role', function (event) {
            event.preventDefault();
            $('#delete_confirmation_modal').modal("show");
            delete_url=$(this).attr('href');
        });
        $('.delete-confirm').click(function(){
            window.location = delete_url;
        });

});