<?php

namespace App;

class Customer extends User
{
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
