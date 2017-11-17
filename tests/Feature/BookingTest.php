<?php

namespace Tests\Feature;

use App\Booking;
use App\Customer;
use App\Expert;
use App\Package;
use Carbon\Carbon;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BookingTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * Test customer can create booking
     *
     * @return void
     */
    public function test_customer_can_create_booking()
    {
        $expert = factory(Expert::class)->create();

        $expert->packages()->saveMany(factory(Package::class, 3)->make(['price' => '800000']));

        $token = $this->login();

        $response = $this->postJson('/api/customer/booking/?token='.$token, [
            'package_id' => 2,
            'event_at' => Carbon::now()->addHour()->toDateString().' '.'19:00',
            'event_time' => '19:00',
            'location' => 'Jl. Diponegoro No. 1. Jakarta Pusat',
            'additional_notes' => 'This is customer additional note',
        ]);

        $response
            ->assertJsonStructure([
                'success',
                'booking' => [
                    'event_at',
                    'location',
                    'additional_notes',
                    'package_name',
                    'package_image',
                    'duration',
                    'section',
                    'type',
                    'category',
                    'subcategory',
                    'description',
                    'price',
                    'formatted_price',
                    'id',
                    'expert' => [
                        'id',
                        'username',
                        'fullname',
                        'rating',
                        'avatar'
                    ]
                ],
            ])
            ->assertStatus(200);

        $book = Booking::find(1);

        $this->assertEquals(2, $book->package_id);
        $this->assertEquals('Jl. Diponegoro No. 1. Jakarta Pusat', $book->location);
        $this->assertEquals('This is customer additional note', $book->additional_notes);
        $this->assertEquals(800000, $book->price);
        $this->assertEquals('Rp 800.000', $book->formatted_price);
        $this->assertEquals(Carbon::now()->addHour()->toDateString().' '.'19:00', $book->event_at);
        $this->assertEquals('Awaiting expert confirmation.', $book->status);
    }

    /**
     * Test can get booking list
     *
     * @return void
     */
    public function test_can_get_booking_list()
    {
        $token = $this->login();

        $customer = Customer::find(1);

        $expert = factory(Expert::class)->create();

        $package = factory(Package::class)->make();
        $package->expert()->associate($expert);
        $package->save();

        $customer->bookings()->saveMany(factory(Booking::class, 6)->make()->each(function($booking) use ($package) {
            $booking->package()->associate($package);
        }));

        $response = $this->getJson('/api/customer/bookings/?token='.$token);

        $response
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'event_at'
                ]
            ])
            ->assertStatus(200);
    }
}
