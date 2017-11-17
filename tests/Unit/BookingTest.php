<?php

namespace Tests\Unit;

use App\Booking;
use Carbon\Carbon;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BookingTest extends TestCase
{
    /**
     * Test can format price
     *
     * @return void
     */
    public function test_can_format_price()
    {
        $book = new Booking();
        $book->price = 300000;

        $this->assertEquals('Rp 300.000', $book->formatted_price);
    }

    /**
     * Test can format event date
     *
     * @return void
     */
    public function test_can_format_event_date()
    {
        $book = new Booking();
        $book->event_at = Carbon::parse('2017-10-19 12:00')->toDateTimeString();

        $this->assertEquals('19 October 2017', $book->formatted_event_date);
    }

    /**
     * Test can format event time
     *
     * @return void
     */
    public function test_can_format_event_time()
    {
        $book = new Booking();
        $book->event_at = Carbon::parse('2017-10-19 13:00')->toDateTimeString();

        $this->assertEquals('13:00', $book->formatted_event_time);
    }
}
