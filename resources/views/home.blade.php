@extends('layouts.app')

@section('content')
<style type="text/css">
    body {
  padding : 10px ;
  
}

#exTab1 .tab-content {
  color : white;
  background-color: #428bca;
  padding : 5px 15px;
}

#exTab2 h3 {
  color : white;
  background-color: #428bca;
  padding : 5px 15px;
}

/* remove border radius for the tab */

#exTab1 .nav-pills > li > a {
  border-radius: 0;
}

/* change border radius for the tab , apply corners on top*/

#exTab3 .nav-pills > li > a {
  border-radius: 4px 4px 0 0 ;
}

#exTab3 .tab-content {
  color : white;
  background-color: #428bca;
  padding : 5px 15px;
}
</style>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>
                    <div id="exTab1" class="container"> 
                        <ul  class="nav nav-pills">
                            <li class="active">
                                <a href="#2a" data-toggle="tab">Calendar</a>
                            </li>
                            <li >
                                <a  href="#1a" data-toggle="tab">Overview</a>
                            </li>
                        </ul>
                        <div class="tab-content clearfix">
                            <div class="tab-pane active" id="1a">
                                <div id="calendar">
                                       

                                </div>
                                
                            </div>
                            <div class="tab-pane" id="2a">
                               
                               <div id="calendar_view">
                                </div>
                            </div>
                        </div>
                    </div>                
            </div>
        </div>
    </div>
   
</div>
 <div id="calendar">
    </div>
@section('footer_scripts')
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="{{asset('/public/js/fullcalendar/fullcalendar.min.css')}}"></link>
    <link rel="stylesheet" type="text/css" href="{{asset('/public/js/fullcalendar/fullcalendar.print.min.css')}}" media="print"></link>
    <script type="text/javascript" src = "{{asset('/public/js/fullcalendar/fullcalendar.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('/public/js/app-calendar.js?v=5')}}"></script>

    @endsection

@endsection 
