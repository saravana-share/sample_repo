


<head>

<link rel='stylesheet' href='https://fullcalendar.io/js/fullcalendar-3.1.0/fullcalendar.min.css' />
<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
 <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
</head>

            <div class="page-list-form-section">
            <div class="row">
                <div class="col-md-12">
                    <h5 class="form-title">Filter</h5>
                </div><!-- Column -->
                <div class="col-sm-4">
                    <div class="input-text form-group">
                        <label>Date </label>
                        <div class="input-group daterange-picker">
                            <input type="text" name="from_date" id="from_date" class="date">
                           
                        </div><!-- Input Group -->
                        <div class="input-group daterange-picker">
                            <input type="text" name="to_date" id="to_date"  class="date">
                           
                        </div><!-- Input Group -->
                    </div><!-- Field -->
                </div><!-- Column -->

               <div class="col-sm-4">
                    <div class="input-text form-group">
                        <label>Status</label>
                        <select name="color_filter " class="color_filter filter color_class1" >
                            <option value="project">Booked</option>
                            <option value="user">Blocked</option>
                            <option value="status">Active</option>
                        </select>
                    </div><!-- Field -->
                </div><!-- Column -->
                 <div class="col-sm-4">
                <button type="button"  class="btn btn-info btn-lg filter">Apply Filter</button>
                 <div class="col-sm-4">
            </div><!-- Row -->
            </div><!-- Form Section -->
            <button type="button" id="open_modal" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" style="display:none;">Open Modal</button>

<body>
	  <input name="csrfToken" value="{{ csrf_token() }}" type="hidden">
  <div id='calendar' style="width:50%;height: 50%;"></div>



   <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Add Event</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="input-text form-group">
               <label>Name</label>
               <input type="text" name="name" id="event_name">
             </div> 
            </div>
             <div class="col-md-4">
              <div class="input-text form-group">
               <label>Price</label>
               <input type="text" name="price" id="event_price">
             </div> 
            </div>
            <div class="col-md-4">
                    <label>Status</label>
                    <select name="event_status" class="" id="event_status">
                        <option value="Book">Book</option>
                        <option value="Block">Block</option>
                    </select>
              </div><!-- Column -->
          </div>
        <div class="modal-footer">
          <input type="hidden" name="selected_date" id="selected_date">
          <button type="button"  class="btn btn-primary submit" data-dismiss1="modal">Save</button>

           <button type="button" id="close" class="btn btn-primary " data-dismiss="modal" style="display: none;">Close</button>
        </div>
      </div>
      
    </div>
  </div>

    
<script src='https://fullcalendar.io/js/fullcalendar-3.1.0/lib/moment.min.js'></script>
<script src='https://fullcalendar.io/js/fullcalendar-3.1.0/lib/jquery.min.js'></script>
<script src='https://fullcalendar.io/js/fullcalendar-3.1.0/lib/jquery-ui.min.js'></script>
<script src='https://fullcalendar.io/js/fullcalendar-3.1.0/fullcalendar.min.js'></script>
<script>
        var get_calendar_url="{{route('getListCalendar')}}";
        var update_date_url = "{{route('updateCalendar')}}";
        var create_event_url = "{{route('createEvent')}}";

        $(document).ready(function() {

        //$('input[name="date"]').daterangepicker();

        $( ".date" ).datepicker({
            dateFormat: 'dd-mm-yy' 
        });

        $('#from_date').val('');
        $('#to_date').val('');


        var token =  $('input[name="csrfToken"]').attr('value'); 
        // page is now ready, initialize the calendar...
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
                 /*$el.popover({
                title: eventObj.title,
                content: eventObj.description,
                trigger: 'hover',
                placement: 'top',
                container: 'body'
                });*/

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
                description: event.description,
                start: start_date,
                end: end_date,
                },
                headers: {
                'X-CSRF-Token': token 
                },
                /*beforeSend: function(xhr) {
                xhr.setRequestHeader('Csrf-Token', token);
                }*/
            })
            .done(function(res) {
                console.log(res);

            });

            },
            dayClick: function(event) {
            $("#open_modal").trigger("click");
                //console.log(event._d);
                var start_date = new Date(event._d);
                var curr_date = start_date.getDate();
                var curr_month = start_date.getMonth()+1;
                var curr_year = start_date.getFullYear();
                var date=curr_date+"-"+curr_month+"-"+curr_year;
                $('#selected_date').val('');
                $('#selected_date').val(date);
                //console.log(date);
            },
            daySelect: function(event) {
                alert('a day has been clicked!');
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
        $('.filter').on('click', function() {
            // alert();
            var from_date = $('#from_date').val();
            var to_date = $('#to_date').val();
            console.log(to_date);
            cal.fullCalendar('removeEventSources');
            cal.fullCalendar('addEventSource', get_calendar_url + '/' + from_date + '/' + to_date);
        });

        $('.submit').on('click', function() {
            $("#close").trigger("click");
            var date=$('#selected_date').val();
            var name=$('#event_name').val();
            var price=$('#event_price').val();
            var status=$('#event_status').val();
            $.ajax({
                url: create_event_url,
                method: "POST",
                data: {
                status: status,
                name: name,
                price: price,
                start: date,
                end: date,
                },
                headers: {
                'X-CSRF-Token': token 
                },
            })
            .done(function(res) {
                $('#selected_date').val('');
                $('#event_name').val('');
                $('#event_price').val('');
                //$('#event_status').val('')
                cal.fullCalendar('removeEventSources');
                cal.fullCalendar('addEventSource', get_calendar_url);

            });

        });


        });
</script>
