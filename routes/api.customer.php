<?php

Route::group(['guard' => 'customer'], function () {

    //Generate SMS Code for login using phone number
    Route::post('register', 'LoginController@register');

    //Generate SMS Code for login using phone number
    Route::post('login', 'LoginController@login')->name('login');

    //Login using phone number & SMS Code
    Route::post('login/verify', 'LoginController@verify');

    //Get Top Experts
    Route::get('experts/top', 'ExpertController@top');
    Route::post('experts/search', 'ExpertController@search');
    Route::post('experts/search2', 'ExpertController@search2');

    Route::middleware('jwt.auth')->group(function() {
        Route::get('me', function () {
            return Auth::user();
        });

        Route::get('experts/{id}', 'ExpertController@show');

        Route::get('bookings', 'BookingController@index');
        Route::post('booking', 'BookingController@booking');
    });

});
