<?php

namespace Tests\Feature;

use App\Expert;
use App\Package;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExpertRequestTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Test can get top experts
     *
     * @return void
     */
    public function test_can_get_top_experts()
    {
        //Arrange
        factory(Expert::class, 10)->create([
            'isTopExpert' => true
        ]);

        //Act
        $response = $this->getJson('/api/customer/experts/top');

        //Assert
        $response->assertJsonStructure([
            '*' => [
                'username',
                'fullname',
                'rating',
            ]
        ]);

        $this->assertEquals(10, count($response->json()));
    }

    /**
     * Test can search experts
     *
     * @return void
     */
    public function test_can_search_experts()
    {
        $this->disableExceptionHandling();

        //Arrange
        factory(Expert::class, 5)->create()->each(function($expert){
            $expert->packages()->saveMany(factory(Package::class, 4)->make([
                'section' => 'get_music',
                'type' => 'teacher',
                'category' => 'singer',
                'subcategory' => 'male'
            ]));
        });

        //Act
        $response = $this->postJson('/api/customer/experts/search', [
                'section' => 'get_music',
                'type' => 'teacher',
                'category' => 'singer',
                'subcategory' => 'male',
            ]);

        //Assert
        $response->assertJsonStructure([
            '*' => [
                'username',
                'fullname',
                'reviews_count',
                'rating',
                'avatar'
            ]
        ]);

        $this->assertEquals(5, count($response->json()));
    }

    /**
     * Test can get expert by id
     *
     * @return void
     */
    public function test_can_get_expert_by_id()
    {
        $this->disableExceptionHandling();

        //Arrange
        $expert = factory(Expert::class)->create([
            'username' => 'the.expert',
            'fullname' => 'The Expert',
            'bio' => 'My biography',
            'rating' => 3.5,
        ]);

        $package = factory(Package::class)->make([
            'name' => 'Package A',
            'description' => 'Ready to arrive 2-hours before, ready to check sound d-1',
            'price' => 300000
        ]);

        $expert->packages()->save($package);

        //Act
        $response = $this->getJson('/api/customer/experts/1?token='.$this->login());

        //Assert
        $response->assertJson([
            'username' => 'the.expert',
            'fullname' => 'The Expert',
            'bio' => 'My biography',
            'rating' => 3.5,
            'reviews_count' => 0,
            'packages' => [
                [
                    'name' => 'Package A',
                    'description' => 'Ready to arrive 2-hours before, ready to check sound d-1',
                    'price' => 300000,
                    'formatted_price' => 'Rp 300.000',
                ]
            ]
        ]);
    }
}
