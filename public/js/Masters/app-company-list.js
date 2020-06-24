
$(document).ready(function(){
    $('#company-menu').attr('class','active');
    $('#add').attr('href',new_company);
        var table = [];
        var cols = [
        {'data':"id","name":"companies.id","searchable":true},
        {'data':"company_name","name":"companies.name","searchable":true},
        {'data':"code","name":"companies.code","searchable":true},
        {'data':"phone_number","name":"companies.phone_number","searchable":false},
        {'data':"contacts","searchable":false},
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
            url: list_company,
            data: function (d){
            },
            },
            columns: cols,
        });

$('body').on('click', '#delete_company', function (event) {
     event.preventDefault();
        $('#delete_confirmation_modal').modal("show");
        delete_url=$(this).attr('href');
});
$('.delete-confirm').click(function(){
        window.location = delete_url;
    });




});