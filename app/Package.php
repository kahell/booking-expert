<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    protected $appends = ['formatted_price'];

    public function getFormattedPriceAttribute()
    {
        return 'Rp '.number_format($this->price, 0, ',', '.');
    }

    public function category()
    {
        return $this->belongsTo(PackageCategory::class, 'key', 'category');
    }

    public function subcategory()
    {
        return $this->belongsTo(PackageCategory::class, 'key', 'subcategory');
    }

    public function expert()
    {
        return $this->belongsTo(Expert::class);
    }

    public function getSectionAttribute($value)
    {
        return strtoupper(str_replace('_', ' ', $value));
    }

    public function getTypeAttribute($value)
    {
        return title_case($value);
    }

    public function getCategoryAttribute($value)
    {
        return title_case(str_replace('_', ' ', $value));
    }

    public function getSubcategoryAttribute($value)
    {
        return title_case(str_replace('_', ' ', $value));
    }

    public function getDurationAttribute($value)
    {
        return $value.' '.str_plural('hour', $value);
    }
}
