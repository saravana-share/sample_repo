
$(document).ready(function(){

var cols = [
    {'data':"project_credentials_name","searchable":false},
    {'data':"users_name","searchable":true},
    {'data':"project_credentials_updated_by","searchable":false},
    {'data':"project_credentials_deleted_by","searchable":false},
    {'data':"project_credentials_created_at","searchable":false},
    {'data':"project_credentials_updated_at","searchable":true},
    {'data':"project_credentials_deleted_at","searchable":false},
    {'data':"status","searchable":false},
    {'data':"action","searchable":false,"class":"action"},
];

var company_table = $('.project_crdentials_table').DataTable({
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
        url: list_project_credentials,
        data: function (d){
        console.log(d);
        },
    },
    columns: cols,
});

    
$('body').on('click', '#delete_credentials', function (event) {
    event.preventDefault();
    $('#delete_confirmation_modal').modal("show");
    delete_url=$(this).attr('href');
    // alert(delete_url);
});
$('.delete-confirm').click(function(){
    window.location = delete_url;
    
});

});