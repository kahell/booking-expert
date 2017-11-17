<?php

namespace Tests\Unit;

use App\Package;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PackageTest extends TestCase
{
    /**
     * Test can format price
     *
     * @return void
     */
    public function test_can_format_price()
    {
        $package = new Package();
        $package->price = 300000;

        $this->assertEquals('Rp 300.000', $package->formatted_price);
    }
}
