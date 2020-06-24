  $(document).ready(function() {

      var cal = $('#calendar').fullCalendar({
          weekends: true, // will hide Saturdays and Sundays
          header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay,listMonth',
              //right: 'month,basicWeek,basicDay'

          }, // buttons for switching between views
          businessHours: true, // display business hours
          editable: true,
          eventLimit: true,
          selectable: true,
          //eventResourceEditable : true,
          eventTextColor: '#000000',

          eventSources: [
              get_calendar_url,
          ],
          eventRender: function(eventObj, $el, ) {
              $el.popover({
                  title: eventObj.title,
                  content: eventObj.description,
                  trigger: 'hover',
                  placement: 'top',
                  container: 'body'
              });

          },
          eventMouseover: function(calEvent, jsEvent, view) {
              //alert();
          },

          eventDrop: function(event, date, delta, revertFunc, jsEvent, ui, view) {

              console.log(event.id);
              //console.log(date);
              var day_type = $('input[name=days_list]:checked').val();
              var start_date = '';
              var end_date = '';
              if (typeof(event.start) != 'undefined' && typeof(event.start) != null) {
                  start_date = event.start.format();
              }

              if (typeof(event.end) != 'undefined' && event.end != null) {
                  end_date = event.end.format();
              }
              //alert(event.type);
              $.ajax({
                      url: update_date_url,
                      method: "POST",
                      data: {
                          id: event.id,
                          type: event.type,
                          description: event.description,
                          start: start_date,
                          end: end_date,
                          day_type: day_type,
                      },
                  })
                  .done(function(res) {

                  });

          },
          dayClick: function(event) {
              //alert('a day has been clicked!');
              $("#open_modal").trigger("click");

              //$('#myModal').modal('show');
          },
          daySelect: function(event) {
              $("#open_modal").trigger("click");
              // alert('a day has been clicked!');
          },

          eventResize: function(event, delta, revertFunc) {
              //alert();
              var day_type = $('input[name=days_list]:checked').val();
              var start_date = '';
              var end_date = '';
              if (typeof(event.start) != 'undefined' && event.start != null) {
                  start_date = event.start.format();
              }
              if (typeof(event.end) != 'undefined' && event.end != null) {
                  end_date = event.end.format();
              }
              $.ajax({
                      url: update_date_url,
                      method: "POST",
                      data: {
                          id: event.id,
                          description: event.description,
                          start: start_date,
                          end: end_date,
                          day_type: day_type,
                      },
                  })
                  .done(function(res) {
                      // if(res.success){
                      //   alert('Date updated successfully');
                      // }

                  });

          },
      });

      // $(".list_type").change(function(event){

      //     var task=$('input[name=task]:checked').val();
      //     var punch_in_out=$('input[name=punch_in_out]:checked').val();
      //     var leave=$('input[name=leave]:checked').val();
      //     alert(task); 
      //     alert(punch_in_out);
      //     alert(leave);
      //   });

      $('.list_type').on('change', function() {
          var project = $('.project').val();
          var task_type = $('.task_type').val();
          var flow_type = $('.flow_type').val();
          var status = $('.status').val();
          var assign_to = $('.assign_to').val();
          var color_filter = $('.color_filter').val();
          var day_type = $('input[name=days_list]:checked').val();
          var task = $('input[name=task]:checked').val();
          var punch_in_out = $('input[name=punch_in_out]:checked').val();
          var leave = $('input[name=leave]:checked').val();

          var time_estimation = $('input[name=project_time_estimation]:checked').val();
          var project_mile = $('input[name=project_milestone]:checked').val();
          //alert(project_mile);
          if (task) {
              var task_value = task;
          } else {
              var task_value = 0;
          }

          if (punch_in_out) {
              var punch_value = punch_in_out;
          } else {
              var punch_value = 0;
          }


          if (time_estimation) {
              var time_value = time_estimation;
          } else {
              var time_value = 0;
          }

          if (project_mile) {
              var milestone_value = project_mile;
          } else {
              var milestone_value = 0;
          }

          if (leave) {
              var leave_value = leave;
          } else {
              var leave_value = 0;
          }
          if (project == "") {
              project = -1;
          }
          if (task_type == "") {
              task_type = -1;
          }
          if (flow_type == "") {
              flow_type = -1;
          }
          if (status == "") {
              status = -1;
          }
          if (assign_to == "") {
              assign_to = -1;
          }
          if (color_filter == "") {
              color_filter = "project";
          }
          cal.fullCalendar('removeEventSources');
          if (task_value != 0) {
              cal.fullCalendar('addEventSource', get_calendar_url + '/' + project + '/' + task_type + '/' + flow_type + '/' + status + '/' + assign_to + '/' + color_filter + '/' + day_type);
          }
          if (punch_value != 0) {
              cal.fullCalendar('addEventSource', punch_url + '/' + punch_value);
          }
          if (leave_value != 0) {
              cal.fullCalendar('addEventSource', leavelist_url + '/' + leave_value);
          }


          if (time_value != 0) {
              cal.fullCalendar('addEventSource', time_estimation_url + '/' + project + '/' + day_type + '/' + time_value);
          }
          if (milestone_value != 0) {
              cal.fullCalendar('addEventSource', milestone_url + '/' + project + '/' + day_type + '/' + milestone_value);
          }


          cal.fullCalendar('addEventSource', get_holiday_list_url);

      });


      $('.day_list').on('change', function() {
          var project = $('.project').val();
          var task_type = $('.task_type').val();
          var flow_type = $('.flow_type').val();
          var status = $('.status').val();
          var assign_to = $('.assign_to').val();
          var color_filter = $('.color_filter').val();
          var day_type = $('input[name=days_list]:checked').val();
          var task = $('input[name=task]:checked').val();

          var project_mile = $('input[name=project_milestone]:checked').val();
          var time_estimation = $('input[name=project_time_estimation]:checked').val();
          // alert(day_type);
          //var day_type=1;
          //cal.fullCalendar( 'removeEventSources')

          if (project == "") {
              project = -1;
          }
          if (task_type == "") {
              task_type = -1;
          }
          if (flow_type == "") {
              flow_type = -1;
          }
          if (status == "") {
              status = -1;
          }
          if (assign_to == "") {
              assign_to = -1;
          }
          if (color_filter == "") {
              color_filter = "project";
          }
          if (task) {
              var task_value = task;
          } else {
              var task_value = 0;
          }

          if (project_mile) {
              var milestone_value = project_mile;
          } else {
              var milestone_value = 0;
          }


          if (time_estimation) {
              var time_value = time_estimation;
          } else {
              var time_value = 0;
          }

          cal.fullCalendar('removeEventSources');
          cal.fullCalendar('addEventSource', get_calendar_url + '/' + project + '/' + task_type + '/' + flow_type + '/' + status + '/' + assign_to + '/' + color_filter + '/' + day_type + '/' + task_value);

          cal.fullCalendar('addEventSource', milestone_url + '/' + project + '/' + day_type + '/' + milestone_value);
          cal.fullCalendar('addEventSource', time_estimation_url + '/' + project + '/' + day_type + '/' + time_value);

          cal.fullCalendar('addEventSource', get_holiday_list_url);
      });


      $('.filter').on('change', function() {

          var project = $('.project').val();
          // alert(project);
          var task_type = $('.task_type').val();
          var flow_type = $('.flow_type').val();
          var status = $('.status').val();
          var assign_to = $('.assign_to').val();
          var color_filter = $('.color_filter').val();
          var day_type = $('input[name=days_list]:checked').val();
          var task = $('input[name=task]:checked').val();
          var time_estimation = $('input[name=project_time_estimation]:checked').val();
          var project_mile = $('input[name=project_milestone]:checked').val();
          //alert(project);
          //var day_type=1;
          //cal.fullCalendar( 'removeEventSources')

          if (project == "") {
              project = -1;
          }
          if (task_type == "") {
              task_type = -1;
          }
          if (flow_type == "") {
              flow_type = -1;
          }
          if (status == "") {
              status = -1;
          }
          if (assign_to == "") {
              assign_to = -1;
          }
          if (color_filter == "") {
              color_filter = "project";
          }

          if (task) {
              var task_value = task;
          } else {
              var task_value = 0;
          }

          if (project_mile) {
              var milestone_value = project_mile;
          } else {
              var milestone_value = 0;
          }

          if (time_estimation) {
              var time_value = time_estimation;
          } else {
              var time_value = 0;
          }

          cal.fullCalendar('removeEventSources');
          cal.fullCalendar('addEventSource', get_calendar_url + '/' + project + '/' + task_type + '/' + flow_type + '/' + status + '/' + assign_to + '/' + color_filter + '/' + day_type + '/' + task_value);

          cal.fullCalendar('addEventSource', time_estimation_url + '/' + project + '/' + day_type + '/' + time_value);
          cal.fullCalendar('addEventSource', milestone_url + '/' + project + '/' + day_type + '/' + milestone_value);



          cal.fullCalendar('addEventSource', get_holiday_list_url);
          //$('#task_calendar').fullCalendar('editable', true);
      });

      $('.filter').on('change', function() {
          var color_filter = $('.color_filter').val();
          if (color_filter == 'status') {
              $.ajax({
                      url: get_cal_color_status,
                      method: "GET",
                      processData: false,
                      contentType: false,
                  })
                  .done(function(res) {
                      //console.log(res);
                      $('.color_status').html(res.color_response);
                  })
          } else {
              $('.color_status').html('');
          }
      });

  });
