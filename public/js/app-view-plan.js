$(document).ready(function() {
 
    cal = $('.u2x-calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
  
//      defaultDate: "{{date('Y-m-d')}}",
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: false,
      eventMouseover: function(calEvent, jsEvent, view) {
      },
      eventClick: function(calEvent, jsEvent, view) {
        var src = getPlanDetailUrl+'/'+calEvent.id;
        $('#view_plan_modal .modal-body').html('')
        $.ajax({
            url:src,
            type:'GET',
            success:function(data){
                if(data.success){
                    $('#view_plan_modal .modal-body').html(data.html)
                    $('#view_plan_modal').modal();
                }else{
                    new Noty({
                        type:'error',
                        layout:'topRight',
                        text:data.error,
                    }).show();

                }
            }
        });

      },
      dayClick: function(date, jsEvent, view) {
        $('#create_plan_modal #date').val(moment(date).format('DD-MM-YYYY'));
        $('#create_plan_modal .employee_id').val($('.employee_id').val()).trigger('change');
        $('#create_plan_modal').modal();

        cal.fullCalendar('clientEvents', function(event) {
            // match the event date with clicked date if true render clicked date events
            if (moment(date).format('YYYY-MM-DD') == moment(event.start).format('YYYY-MM-DD')) {
                // do your stuff here
                console.log(event.title);
                // if you have subarray i mean array within array then 
            }
        });
      },
      });

    $('#date').on('change',function(){
      var date = $(this).val();
      $('.create_date').val(date);
    });

    $('#export-plans').click(function(){
        if(!$('.main_employee_selection').val() || !$('.main_employee_selection').val()){
            new Noty({
                type:'error',
                layout:'topRight',
                text:"Please select date & employee code",
            }).show();            
            return
        }
        var export_url1 = export_url+'/'+$('.main_employee_selection').val()+'/'+$('#date').val()
        window.location = export_url1
    });

    getPlanDetails();

    $('body').on('change','.main_business_selection',function(){
            var id = $(this).val();
            if(!id){
            $('.main_employee_selection').html('');
            $('.main_employee_name').val('');
            $('.main_mobile_number').val('');
            $('.modal_business_type').val('');
            $('.modal_employee_code').val('');
            $('.modal_employee_name').val('');
            $('.modal_mobile_number').val('');        
            $('.create_business_type').val('');
            $('.create_employee_code').val('');
            $('.create_employee_name').val('');
            $('.create_mobile_number').html('');
            cal.fullCalendar( 'removeEventSources')
              return;
            } 
            $('.main_employee_selection').html('');

            var src = getBusinessTypeEmployeesURL;
            $.ajax({
                url:src,
                type:'POST',
                data: {business_type:id},
                success:function(data){
                    var employee_list='<option value="">Select Employee Code</option>';
                    $.each(data[0],function(i,ele){
                        employee_list = employee_list + '<option value = "'+i+'">'+ele+'</option>';
                    });
                    $('.main_employee_selection').html(employee_list);
                    $('.modal_business_type').val($('.main_business_selection option:selected').html());
                    $('.create_business_type').val($('.main_business_selection option:selected').html());
                    $('.modal_business_type_id').val($('.main_business_selection').val());
                    $('.create_business_type_id').val($('.main_business_selection').val());
                    $('.main_employee_name').val('');
                    $('.main_mobile_number').val('');
                    $('.create_employee_code').val('');
                    $('.create_employee_name').val('');
                    $('.create_mobile_number').val(''); 
                    $('.importplanmodal').modal();
                   

                }
            });
            cal.fullCalendar( 'removeEventSources')
          //  var null_id='0';
           // cal.fullCalendar( 'addEventSource', getPlanUrl+'/'+null_id)

    });

    $('body').on('change','#employee_id',getPlanDetails);
    $('body').on('change','#date',function(){
        var date = $(this).val().split("-");
        var d = new Date(date[2]+'-'+date[1]+'-'+date[0])
        cal.fullCalendar( 'gotoDate', d)
    });

    function getPlanDetails(){
        var id = $('.main_employee_selection').val();
       if(!id){
              $('.main_employee_name').val('');
              $('.main_mobile_number').val('');
              $('.modal_employee_code').val('');
              $('.modal_employee_name').val('');
              $('.modal_mobile_number').val('');
              $('.create_employee_code').val('');
              $('.create_employee_name').val('');
              $('.create_mobile_number').val('');
        return;
      }
      // var id = $(this).val();  
        var src = route;
        $.ajax({
            url : src,
            method: "POST",
            data :{id:id},
            success:function(data){
                $('.main_employee_name').val(data[0].employee_name);
                $('.main_mobile_number').val(data[0].mobile_number);
                $('.modal_employee_code').val($('.main_employee_selection option:selected').html());
               $('.modal_employee_name').val(data[0].employee_name);
               $('.modal_mobile_number').val(data[0].mobile_number);
               $('.create_employee_code').val($('.main_employee_selection option:selected').html());
               $('.create_employee_name').val(data[0].employee_name);
               $('.create_mobile_number').val(data[0].mobile_number);
               $('.modal_employee_id').val(id);
               $('.create_employee_id').val(id);
            }
        })  
       
        
        cal.fullCalendar( 'removeEventSources')
        if(employee_id){
            cal.fullCalendar( 'addEventSource', getPlanUrl+'/'+id)
            // cal.fullCalendar( 'addEventSource', getLeaveUrl+'/'+employee_id)
           
        }
    }    

	var form_id = '#create_form';
    var v = jQuery(form_id).validate({
        rules: {
            business_type_id: {
                required: true,
            },
            date: {
              required: true,
            },
            employee_id: {
              required: true,
            },
        },
    });  
});        
