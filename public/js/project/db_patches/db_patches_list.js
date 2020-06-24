  $(document).ready(function(){
   
    var list_db = [
      {'data':"created_at",'name':"db_patches.created_at","searchable":true},
      {'data':"task_number",'name':"tasks.number","searchable":true},
      {'data':"query","searchable":false},
      {'data':"local",'name':"db_patches.local","searchable":false},
      {'data':"local_select","searchable":false},
      {'data':"staging",'name':"db_patches.staging","searchable":false},
      {'data':"staging_select","searchable":false},
      {'data':"live",'name':"db_patches.live","searchable":false},
      {'data':"live_select","searchable":false},
      {'data':"developer",'name':"users.developer","searchable":false},
      {'data':"action","searchable":false,"class":"action"},
    ];

    var company_table = $('.db_patches_table').DataTable({
      "language": {
        "search":"",
        "lengthMenu":     "_MENU_",
        "paginate": { 
        "next":       '<i class="icon ion-ios-arrow-forward"></i>',
        "previous":   '<i class="icon ion-ios-arrow-back"></i>'
        },
      },
      'pageLength': 100,
      processing:true,
      serverSide: true,
      ordering: false,
      method:"GET",  
      ajax: {
        url: list_db_patches,
        data: function (d) {
          d.date_range=$('#Date_range').val();
          d.developer=$('#developer').val();
          d.db_not_applied=$('#db_not_applied').val();

        },
      },
      columns: list_db,
    });
    $('body').on('click','.copy_btn_class',function(event){
      var id=$(this).val();
      var db_patch_id="query_"+id;
      var copyText = document.getElementById(db_patch_id);
      copyText.select();
      document.execCommand("copy");
    });

    $('body').on('click','.copy_local_class',function(event){
      var total_query_text = '';
      $( ".local_copied_queries" ).each(function() {  
        var queries =$(this).val()+';';
        total_query_text += queries;
      });
      
      var copyText = total_query_text;
      var div="<input type='text' id='local_selected_values' value='"+total_query_text+"'>";
      $('#show_query').append(div); 
      var copyText = document.getElementById('local_selected_values');
      copyText.select();
      document.execCommand("copy");
    });

    $('body').on('click','.copy_staging_class',function(event){
      var total_query_text = '';
      $( ".staging_copied_queries" ).each(function() {
        var queries =$(this).val()+';';
        total_query_text += queries;
      });
     
      var div="<input type='text' id='staging_selected_values' value='"+total_query_text+"'>";
      $('#show_query').append(div); 
      var copyText = document.getElementById("staging_selected_values");
      copyText.select();
      // console.log(copyText);
      document.execCommand("copy");
    });

    $('body').on('click','.copy_live_class',function(event){
      var total_query_text = '';
      $( ".live_copied_queries" ).each(function() {
        var queries =$(this).val()+';';
        total_query_text += queries;
      });
      // alert(total_query_text);
      $('#live_copied_queries').val(total_query_text);
      var div="<input type='text' id='live_selected_values' value='"+total_query_text+"'>";
      $('#show_query').append(div); 
      var copyText = document.getElementById('live_selected_values');
      copyText.select();
      document.execCommand("copy");
    });

    $('body').on('change','.total_local_select',function(event){
      if (this.checked == true)
      $('.db_patches_table').find('.local_select').prop('checked', true).trigger("change");
      else
      $('.db_patches_table').find('.local_select').prop('checked', false).trigger("change");

      selected_local_db_query=[];
      $.each($("input[name='local_select[]']:checked"), function(){  
        selected_local_db_query.push($(this).val()); 
      });
      $('.selected_local_db_query').val(selected_local_db_query);

    });

    $('body').on('change','.total_staging_select',function(event){
      if (this.checked == true)
      $('.db_patches_table').find('.staging_select').prop('checked', true).trigger("change");
      else
      $('.db_patches_table').find('.staging_select').prop('checked', false).trigger("change");

      selected_staging_db_query=[];
      $.each($("input[name='staging_select[]']:checked"), function(){            
        selected_staging_db_query.push($(this).val()); 
      });
      $('.selected_staging_db_query').val(selected_staging_db_query);

    });

    $('body').on('change','.total_live_select',function(event){
      if (this.checked == true)
      $('.db_patches_table').find('.live_select').prop('checked', true).trigger("change");
      else
      $('.db_patches_table').find('.live_select').prop('checked', false).trigger("change");

      selected_live_db_query=[];
      $.each($("input[name='live_select[]']:checked"), function(){            
        selected_live_db_query.push($(this).val()); 
      });
      $('.selected_live_db_query').val(selected_live_db_query);
    });

    $('body').on('change','.local_select',function(event){
      selected_local_db_query=[];
      $.each($("input[name='local_select[]']:checked"), function(){  
        selected_local_db_query.push($(this).val()); 
      });
      $('.selected_local_db_query').val(selected_local_db_query);
    });

    $('body').on('change','.staging_select',function(event){
      selected_staging_db_query=[];
      $.each($("input[name='staging_select[]']:checked"), function(){            
        selected_staging_db_query.push($(this).val()); 
      });
      $('.selected_staging_db_query').val(selected_staging_db_query);
    });
    $('body').on('change','.live_select',function(event){
      selected_live_db_query=[];
      $.each($("input[name='live_select[]']:checked"), function(){            
        selected_live_db_query.push($(this).val()); 
      });
      $('.selected_live_db_query').val(selected_live_db_query);
    });

    var dataTable = $('.db_patches_table').dataTable();

    $('#Date_range').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('DD-MM-YYYY') + ' to ' + picker.endDate.format('DD-MM-YYYY'));

    dataTable.fnFilter();
    });
    $('#developer').change(function(){

    dataTable.fnFilter();       
    });
    $('#db_not_applied').change(function(){

    dataTable.fnFilter();       
    });

  });