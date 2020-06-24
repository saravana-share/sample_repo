<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::group(['middleware' => 'auth'], function () {
Route::get('/calendar', 'CalendarController@index')->name('Calendar');
Route::get('/calendar-list/{from_date?}/{to_date?}', 'CalendarController@list')->name('getListCalendar');
Route::post('/calendar/update', 'CalendarController@update_calender')->name('updateCalendar');
Route::post('/calendar/create', 'CalendarController@create_event')->name('createEvent');
});
