<?php

Route::group(['guard' => 'expert'], function () {

    //Generate SMS Code for login using phone number
    Route::post('register', 'LoginController@register');

    //Generate SMS Code for login using phone number
    Route::post('login', 'LoginController@login')->name('login');

    //Login using phone number & SMS Code
    Route::post('login/verify', 'LoginController@verify');


    Route::middleware('jwt.auth')->group(function() {
        Route::get('me', 'ExpertController@show');
    });

});
