<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $appends = ['formatted_price', 'expert', 'formatted_event_date', 'formatted_event_time'];
    protected $hidden = ['package_id', 'customer_id', 'package'];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function getExpertAttribute()
    {
        return $this->package->expert;
    }

    public function getFormattedPriceAttribute()
    {
        return 'Rp '.number_format($this->price, 0, ',', '.');
    }

    public function getFormattedEventDateAttribute()
    {
        return Carbon::parse($this->event_at)->format('d F Y');
    }

    public function getFormattedEventTimeAttribute()
    {
        return Carbon::parse($this->event_at)->format('H:i');
    }

    public function getStatusAttribute($value)
    {
        switch ($value)
        {
            case 'awaiting_expert':
                return 'Awaiting expert confirmation.';
            default:
                return $value;
        }
    }

    public function getDurationAttribute($value)
    {
        return $value.' '.str_plural('hour', $value);
    }
}
