<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use DB;
use Auth;
use Carbon\Carbon;

class CalendarController extends Controller
{
    public function index(){
    	return view('calendar');
    }

    public function list($from_date=null,$to_date=null,Request $request){
    	//dd($request->all());
    	$events = Event::select([
    				DB::raw('CONCAT(events.name,"-",events.status) as title'),
					//'events.name as title',
					'events.status as description',
					'events.from_date as start',
					'events.to_date as end',
					'events.id as id',
					])
    				->where(function ($query) use ($request,$from_date,$to_date) {
						if(isset($from_date) && isset($to_date)){
							//dd('in');
							$query->where('events.from_date', '>=', date('Y-m-d',strtotime($from_date)))
							->where('events.to_date', '<=',date('Y-m-d',strtotime($to_date)));
						}else{
							$query->where('events.from_date', '>=', $request->start)
							->where('events.to_date', '<=', $request->end);
						}
    				});
					//$query->get();
					//dd($events->get());

    	return response()->json($events->get());
    	
    }

    public function update_calender(Request $request) {
		if (!empty($request->id)) {
					$event = Event::findorFail($request->id);

					if (!empty($request->start)) {
						$event->from_date = $request->start;
					}
					if (!empty($request->end)) {
						$event->to_date = $request->end;
					} 
					$event->save();
			return response()->json(['success' => true]);
		} else {
			return response()->json(['success' => false]);
		}

	}

	public function create_event(Request $request) {
		//dd($request->all());
					$event = new Event();
					if (!empty($request->start)) {
						$event->from_date = date('y-m-d',strtotime($request->start));
					}
					if (!empty($request->end)) {
						$event->to_date = date('y-m-d',strtotime($request->end));
					}
					$event->name=$request->name;
					$event->status=$request->status;
					$event->price=$request->price;
					$event->created_by=Auth::user()->id;
					$event->created_at=Carbon::now();
					$event->save();
			return response()->json(['success' => true]);
	}


}
