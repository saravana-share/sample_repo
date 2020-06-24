$(document).ready(function(){
    $('#project').attr('class','active');
    $(document).on('click','#project_summary',function(){
        window.location=project_summary_url;
    });

    var cols = [
            {'data':"id","name":"projects.id","searchable":true},
            {'data':"project_name","name":"projects.short_name","searchable":true},
            {'data':"completion_percentage","name":"projects.completion_percentage","searchable":false},
            {'data':"client_company_name","name":"client_company.name","searchable":false},
            {'data':"estimated_days","searchable":false},
            {'data':"actual_days","searchable":false},
            {'data':"project_status","name":"project_statuses.name","searchable":true},
            {'data':"discussion_started_date","searchable":false},
            {'data':"development_started_date","searchable":false},
            {'data':"next_action_by","searchable":false},
            {'data':"action","searchable":false,"class":"action"},
        ];

    var dataTable = $('#project_data_table').dataTable({
        "language": {
            "search":"",
            "lengthMenu":     "_MENU_",
            "paginate": { 
            "next":       '<i class="icon ion-ios-arrow-forward"></i>',
            "previous":   '<i class="icon ion-ios-arrow-back"></i>'
            },
            },
        paging: true,
        searching: true,
        serverSide: true,
        ajax: {
        url: list_project,
        type: "GET",
        dataType: "json",
            data: function (d) {
            },
        },

        columns: cols,
        rowCallback: function(row, data, index){
            $(row).addClass('highlight-row');
        },
    });
    $('.page-title ').html('<h4 class="title">Projects</h4>');
    $('.sub_actions').html('<div class="dropdown"><button class="btn btn-primary btn-md" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><ul><li><a class="dropdown-item" id="project_summary" href="#!">Send Summary Report</a></li></ul></div></div>');

});



