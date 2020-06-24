$(document).ready(function(){
    move();
        var tables = [];
        $('#status_report').DataTable({
            "language": {
            "search":"",
            "lengthMenu":     "_MENU_",
            "paginate": { 
            "next":       '<i class="icon ion-ios-arrow-forward"></i>',
            "previous":   '<i class="icon ion-ios-arrow-back"></i>'
            },
            },
            processing: true,
            serverSide: true,
            ajax: {
                url: list_status_report,
                data: function(d){
                d.milestone_id = $('#milestone_id').val();
                d.estimation_id = $('#estimation_id').val();
                d.status_id = $('#status_id').val();
                },
            },
            columns: [
                {'data':"time_estimations_name","searchable":false},
                {'data':"mile_stones_description","searchable":false},
                {'data':"time_estimation_details_priority","searchable":false},
                {'data':"time_estimation_details_module","searchable":false},
                {'data':"task_statuses_name","searchable":false},
                {'data':"estimated_date","searchable":false},
                {'data': "action", "searchable":false },
            ],

        });

        var dataTable = $('#status_report').dataTable();
        $('#estimation_id').on('change',function(){
            dataTable.fnFilter();
        });
        $('#milestone_id').on('change',function(){
            dataTable.fnFilter();
        });
        $('#status_id').on('change',function(){
            dataTable.fnFilter();

        });

        $('body').on('click','#reset_filter',function(event){

            $('#estimation_id').val(-1);
            $('#estimation_id').trigger('change');
            $('#milestone_id').val(-1);
            $('#milestone_id').trigger('change');
            $('#status_id').val(-1);
            $('#status_id').trigger('change');
            dataTable.fnFilter();   

        });

      $('body').on('change','.card_filter',function(event){
           var time_estimation_id =$('#card_estimation_id').val();
           var mile_stone_id =$('#card_milestone_id').val();
            var url = card_list_status_report;
            $.ajax({
            url: url,
            type:'POST',
            dataType: "json",
            processData: true,
            data:{
                time_estimation_id:time_estimation_id,
                mile_stone_id:mile_stone_id
            },
                success:function(data){
                    if(data){
                        $('.card_data').html('');
                        $('.card_data').html(data.card_time_estimations); 
                        move();     
                        }
                    }
            });

      });

function move()
{
    $(".subdrag").sortable({
    connectWith: ".connected",
    scroll: true,
    appendTo: '.board-canvas-inner',
    helper: "clone",
    cursor: "pointer",
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
      var id = ui.item.attr('data-id');
      var time_statusid = ui.item.parents('.ui-widget-content').attr('data-status');
      console.log("time_id = "+id+"time_status_id = "+time_statusid);
      var dataString = 'time_id='+ id + '&time_statusid='+ time_statusid;
      $.ajax({
        url: update_status_drag_changes,
        type: "POST",
        data: dataString,
        processData: false,
      })
      .done(function( data ) {
      
        var result = data;
      });
    }
  });
}


});



