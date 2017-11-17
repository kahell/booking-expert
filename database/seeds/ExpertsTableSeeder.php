<?php

use App\Expert;
use App\Package;
use App\Skill;
use Illuminate\Database\Seeder;

class ExpertsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Expert::class, 12)->create(['isTopExpert' => true])->each(function($expert){
            $expert->packages()->saveMany(factory(Package::class, 4)->make());
        });

        factory(Expert::class, 120)->create()->each(function($expert){
            $expert->packages()->saveMany(factory(Package::class, 4)->make());
        });
    }
}
