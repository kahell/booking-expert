<?php

namespace Tests\Feature;

use App\Expert;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExpertLoginTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * Test expert can register with valid data
     *
     * @return void
     */
    public function test_expert_can_register_with_valid_data()
    {
        $this->disableExceptionHandling();
        //Act
        $response = $this->postJson('/api/expert/register', [
            'phoneNumber' => '081345188288',
            'username' => 'handiwijoyo',
            'fullname' => 'Handi Wijoyo',
        ]);

        //Assert
        $response
            ->assertExactJson([
                'success' => 'Registration successful'
            ])
            ->assertStatus(200);

        $user = Expert::where('username', 'handiwijoyo')->first();
        $this->assertNotNull($user);
        $this->assertEquals('handiwijoyo', $user->username);
        $this->assertEquals('Handi Wijoyo', $user->fullname);
        $this->assertEquals('+6281345188288', $user->phone_number);
        $this->assertNotNull($user->password);
    }

    /**
     * Test expert can login using phone number
     *
     * @return void
     */
    public function test_expert_can_login_with_registered_phone_number()
    {
        //Arrange
        factory(Expert::class)->create([
            'phone_number' => '+6281345188288',
        ]);

        //Act
        $response = $this->postJson('/api/expert/login', ['phoneNumber' => '+6281345188288']);

        //Assert
        $response
            ->assertExactJson([
                'success' => 'OK'
            ])
            ->assertStatus(200);

        //Act
        $response = $this->postJson('/api/expert/login', ['phoneNumber' => '+6281533969875']);

        //Assert
        $response
            ->assertExactJson([
                'error' => 'Phone number not registered with '.env('APP_NAME'),
            ])
            ->assertStatus(401);
    }

    /**
     * Test expert can verify sms code
     *
     * @return void
     */
    public function test_expert_can_verify_login_with_sms_code()
    {
        //Arrange
        factory(Expert::class)->create([
            'phone_number' => '+6281345188288',
        ]);

        //Act
        $response = $this->postJson('/api/expert/login/verify', ['phoneNumber' => '081345188288', 'password' => '1234']);

        //Assert
        $response
            ->assertJsonStructure([
                'token',
                'user' => [
                    'fullname',
                    'phone_number'
                ]
            ])
            ->assertStatus(200);
    }
}
