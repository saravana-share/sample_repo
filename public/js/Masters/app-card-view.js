$(document).ready(function(){
  sort();
  
  $('#task').attr('class','active');
  //$('#add').attr('href',new_task);
  $('.dummy_fields').hide();
  var status=new Array;
  var status1=-1;
  var table = [];
    var cols = [
        {'data':"select","searchable":false},
        {'data':"project_name",'name':"projects.short_name","searchable":false},
        {'data':"task_number",'name':"tasks.number","searchable":true},
        {'data':"subject",'name':"tasks.subject","searchable":true},
        {'data':"assign_to",'name':"users.id","searchable":true},
        {'data':"task_type",'name':"task_types.name","searchable":true},
        {'data':"estimated_date","searchable":false},
        {'data':"estimated_days",'name':"tasks.estimated_days","searchable":false},
        {'data':"task_status",'name':"task_statuses.name","searchable":true},
        {'data':"dead_line_status","searchable":false},
        {'data':"action","searchable":false,"class":"action"},
        ];

  var status_array=new Array();
    var project_table = $('#Ticket_table').DataTable({
    "language": {
      "search":"",
      "lengthMenu":     "_MENU_",
      "paginate": { 
      "next":       '<i class="icon ion-ios-arrow-forward"></i>',
      "previous":   '<i class="icon ion-ios-arrow-back"></i>'
      },
      },
        pageLength: 10,
        processing:true,
        serverSide: true,
        ordering: false,
        method:"GET",  
        ajax: {
            url: list_ticket,
            data: function (d){
               d.project_id = $('.project1').val();
               d.task_type_id = $('.task_type').val();
               d.flow_type_id = $('.flow_type').val();
               console.log($('.status').val());
              
               var status;
               if($('.status').val()==null || $('.status').val()=="")
               { 
                status = -1;
               }else
               {
                status = $('.status').val();
               }
               var task_division=$('.task_division').val();
               d.status_id =status;
               d.assign_to_id = $('.assign_to').val();
               d.type = type;
               d.task_division=task_division;
            },
        },
     columns: cols,
     rowCallback: function(row, data, index){
        $(row).addClass('highlight-row');
        },
  });


    $('.page-title').html('<h4 class="title">Tasks</h4>');
    $('.sub_actions').html('<div class="dropdown"><button class="btn btn-border btn-md" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><ul><li><a class="dropdown-item" href="{{route(ImportTask)}}">Import</a></li><li><a class="dropdown-item" id="task_export" href="#">Task Export</a></li><li><a class="dropdown-item"  id="task_bulk_update" href="#">Bulk update</a></li><li><a class="dropdown-item" id="task_email" href="#">Email</a></li><li><a class="dropdown-item" href="#">send Status Email</a></li></ul></div></div>');

    

  var form_id = "#form";
  var v = jQuery(form_id).validate({
    ignore:"",
    rules:{

    },
    submitHandler: function(form){
      let formData = new FormData($(form_id)[0]);
      $('#submit').button('loading');
      $.ajax({
        url:save_ticket,
        method:"POST",
        data:formData,
        processData:false,
        contentType:false,
      })
      .done(function(res){
        if(!res.success){
          $('#submit').button('Reset');
          var errors = '';
          for(var i in res.errors){
            errors = '<li>'+res.errors[i]+'</li>';
          }
          new Noty({
            type:'error',
            layout:'topRight',
            text:errors,
          }).show();
        }else{
          window.location = list_card_task;
        }
      })
      .fail(function(xhr){
        $('#submit').button('Reset');
        new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'Something went wrong at server.'
            }).show();
      })
    }
  });









  var dataTable = $('#card_view_table').dataTable();

  $('#project_id').on('change', function(){
    dataTable.fnFilter();     
  });
  $('.task_type').on('change', function(){
    dataTable.fnFilter();     
  });
  $('.flow_type').on('change', function(){
    dataTable.fnFilter();     
  });
  $('.status').on('change', function(){
    status=$(this).val();
    if(status==null)
    {
      status1=-1;
    }else
    {
      status1=$(this).val();
    }
    dataTable.fnFilter();     
  });
  $('.assign_to').on('change', function(){
    dataTable.fnFilter();     
  });

  $('.task_division').on('change', function(){
    task_division=$(this).val();
    dataTable.fnFilter();     
  });


     $('body').on('click', '#task_export', function (event) {
        //alert(1)
            event.preventDefault();
            $('#task_export_modal').modal("show");
            $('.type').val('task');
        });
      $('.export-confirm').click(function(event){
        event.preventDefault();
          var task_ids=selected_task;
            var type=$('#task_type_id1').val();
            var status=$('#task_status_id1').val();
            var url=export_url +'/'+selected_task +'/'+type+'/'+status;
            window.location = url;
        });
      $('body').on('click', '#task_bulk_update', function (event) {
            event.preventDefault();
            $('#task_bulk_update_modal').modal("show");
            $('.type').val('task');
        });
      $('.change-confirm').click(function(event){
        event.preventDefault();
          var task_ids=selected_task;
            var assign_to=$('.assign_to_update').val();
            var status=$('.status_update').val();
            var url=bulk_update_url +'/'+selected_task +'/'+assign_to+'/'+status;
            window.location = url;
        });



       $('body').on('click', '#delete_task', function (event) {
    event.preventDefault();
    $('#delete_confirmation_modal').modal("show");
    delete_url=$(this).attr('href');
    alert(delete_url);
});
$('.delete-confirm').click(function(){
    // window.location = delete_url;
});



  $('body').on('click','#task_email',function(event){
        event.preventDefault();
        $('#task_email_modal').modal("show");
        $('.type').val('task');
     });

   $('.task_total_select').on('click', function() {
        if (this.checked == true)
        $('#Ticket_table').find('input[name="task_id[]"]').prop('checked', true).trigger("change");
        else
        $('#Ticket_table').find('input[name="task_id[]"]').prop('checked', false).trigger("change");
    });






    $(".task_total_select").click(function(){
      selected_task=[];
      selected_project=[];
      selected_project_name=[];
      sel_pro="";
      sel_pro_name="";
      $.each($("input[name='task_id[]']:checked"), function(){            
      selected_task.push($(this).val());
      selected_project.push($(this).attr("project-id"));
      selected_project_name.push($(this).attr("project-name"));  
      });
      sel_pro = $.unique(selected_project);
      sel_pro_name = $.unique(selected_project_name);
      $('.seleted_tasks').val(selected_task);
      $('.seleted_projects').val(sel_pro);
      $('.project_name').val(sel_pro_name);
    });
    $('body').on('click','.task_select',function(){
      selected_task=[];
      selected_project=[];
      selected_project_name=[];
      sel_pro="";
      sel_pro_name="";
      $.each($("input[name='task_id[]']:checked"), function(){            
      selected_task.push($(this).val());
      selected_project.push($(this).attr("project-id"));
      selected_project_name.push($(this).attr("project-name"));  
      });
      sel_pro = $.unique(selected_project);
      sel_pro_name = $.unique(selected_project_name);
      $('.seleted_tasks').val(selected_task);
      $('.seleted_projects').val(sel_pro);
      $('.project_name').val(sel_pro_name);
    });


      var form_id = '#form1';
        var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            task_subject:
            {
                required:true,
            },
            'task_email_to[]':{
                required:true,
            },
        },         
        submitHandler: function (form) {
            let formData = new FormData($(form_id)[0]);
            window.location(preview_url);
            
        }
    });


  $('body').on('click','#reset_filter',function(event){

    $('#ticket_status_id').val('');
    $('#ticket_status_id').multiselect('rebuild');
    $('#project_id').val(-1);
    $('#project_id').trigger('change');
    $('#flow_id').val(-1);
    $('#flow_id').trigger('change');
    $('#assign_to').val(-1);
    $('#assign_to').trigger('change');
    $('#task_division').val(-1);
    $('#task_division').trigger('change');
    $('#ticket_type_id').val(-1);
    $('#ticket_type_id').trigger('change');

    $('#task_type_id').val(-1);
    $('#task_type_id').trigger('change');
    
   
    dataTable.fnFilter();   

  });

   $('body').on('click','#reset_task_filter',function(event){
    

    $('#task_status_id').val('');
    $('#task_status_id').multiselect('rebuild');
    $('#task_project_id').val(-1);
    $('#task_project_id').trigger('change');
    $('#task_flow_id').val(-1);
    $('#task_flow_id').trigger('change');
    $('#task_assign_to').val(-1);
    $('#task_assign_to').trigger('change');
    $('#task_division_id').val(-1);
    $('#task_division_id').trigger('change');
    $('#ticket_type_id').val(-1);
    $('#ticket_type_id').trigger('change');

    $('#task_type_id').val(-1);
    $('#task_type_id').trigger('change');
    
   
    dataTable.fnFilter();  

});


     var dataTable = $('#Ticket_table').dataTable();

    $('.project1').on('change', function(){
         dataTable.fnFilter();     
    });
  $('.task_type').on('change', function(){
    dataTable.fnFilter();     
  });
  $('.flow_type').on('change', function(){
    dataTable.fnFilter();     
  });
  $('.status').on('change', function(){
     status=$(this).val();
    //alert(status);
     if(status==null)
     {
       status1=-1;
     }else
     {
      status1=$(this).val();
     }
    //alert(status1);
    dataTable.fnFilter();     
  });
  $('.assign_to').on('change', function(){
    dataTable.fnFilter();     
  });

  $('.task_division').on('change', function(){
     task_division=$(this).val();
     //alert(task_division);
    dataTable.fnFilter();     
  });




  $('body').on('change','.card_filter',function(event){
    var project_id =$('#project_id').val();
    var task_type_id =$('#task_type_id').val();
    var flow_id =$('#flow_id').val();
    var ticket_status_id =$('#ticket_status_id').val();
    var assign_to =$('#assign_to').val();
    var task_division =$('#task_division').val();
    var url = card_dummy_list;
    $.ajax({
      url: url,
      type:'POST',
      dataType: "json",
      processData: true,
      data:{
      project_id:project_id,
      task_type_id:task_type_id,
      flow_id:flow_id,
      ticket_status_id:ticket_status_id,
      assign_to:assign_to,
      task_division:task_division
      },
      success:function(data){
        if(data){
          $('.card_data').html('');
          $('.card_data').html(data.card_time_estimations); 
          sort();     
        }
      }
    });

  });

  function sort()
  {
    var adjustment;
    $(".subdrag").sortable({
      connectWith: ".connected",
      scroll: true,
      cursor: "pointer",
      appendTo: '.board-canvas-inner',
      helper: "clone",

      start: function(event, ui) {
        var start_pos = ui.item.index();
        ui.item.data('start_pos', start_pos);
      },

      change: function(event, ui) {
        var start_pos = ui.item.data('start_pos');
        var index = ui.placeholder.index();
        if (start_pos < index) 
        {
          $('#sortable li:nth-child(' + index + ')').addClass('highlights');
        } 
        else 
        {
          $('#sortable li:eq(' + (index + 1) + ')').addClass('highlights');
        }
      },
      update: function(event, ui) {
        var index_value = ui.item.index();
        var count_value = ui.item.closest("ul").find(".class").length;
        index_value  = index_value + 1;

        for(var i=index_value; i<count_value; i++)
        {
          var task_id = ui.item.closest("ul").find(".class").eq(i).attr('data-taskid');
          var task_status_id = ui.item.parents('.ui-widget-content').attr('data-itemid');
          var sorting_data = 'task_id='+ task_id + '&task_status_id='+ task_status_id ;
          // console.log(sorting_data);
          $.ajax({
            url: update_sorting_changes,
            type: "POST",
            data: sorting_data,
            processData: false,
          })
          .done(function( data ) {
            var result = data;
          });
        }
        $('#sortable li').removeClass('highlights');
        var id = ui.item.attr('data-taskid');
        var task_statusid = ui.item.parents('.ui-widget-content').attr('data-itemid');
        var prev_task_length = ui.item.prev().length;
        console.log("task_status"+task_statusid);

        if(prev_task_length > 0)
        {
          var prev_taskid = ui.item.prev().attr('data-priid');
          var prev_priority_id = parseInt(prev_taskid) + 1; 
        }
        else
        {
          var prev_priority_id = 1;
        }

        var dataString = 'taskid='+ id + '&task_statusid='+ task_statusid+'&prev_taskid='+prev_priority_id;
        $.ajax({
          url: update_card_changes,
          type: "POST",
          data: dataString,
          processData: false,
        })
        .done(function( data ) {
          var result = data;
        });
      }
    }).disableSelection();
  }

});



























