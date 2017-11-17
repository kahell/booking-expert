<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call(ExpertsTableSeeder::class);
         $this->call(CustomerTableSeeder::class);
    }
}
