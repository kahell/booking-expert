<?php

namespace App;

class Expert extends User
{
    protected $hidden = ['bio', 'isTopExpert', 'created_at', 'updated_at', 'password'];
    protected $table = 'packages';
    public function packages()
    {
        return $this->hasMany(Package::class)->orderBy('price');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
