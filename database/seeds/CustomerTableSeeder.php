<?php

use App\Customer;
use Illuminate\Database\Seeder;

class CustomerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Customer::class)->create([
            'phone_number' => '+6281345188288',
            'username' => 'handiwijoyo',
            'fullname' => 'Handi Wijoyo'
        ]);

        factory(Customer::class)->create([
            'phone_number' => '+6281288598891',
            'username' => 'wpwp',
            'fullname' => 'Wahyu Prastya'
        ]);

        factory(Customer::class)->create([
            'phone_number' => '+6281931859636',
            'username' => 'deodhika',
            'fullname' => 'Deo Dhika'
        ]);

        factory(Customer::class)->create([
            'phone_number' => '+6283873767405',
            'username' => 'helfipangestu',
            'fullname' => 'Helfi Pangestu'
        ]);
    }
}
