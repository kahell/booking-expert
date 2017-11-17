<?php

namespace Tests\Feature;

use App\Customer;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CustomerLoginTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Test customer can register with valid data
     *
     * @return void
     */
    public function test_customer_can_register_with_valid_data()
    {
        //Act
        $response = $this->postJson('/api/customer/register', [
            'phoneNumber' => '081345188288',
            'username' => 'handiwijoyo'
        ]);

        //Assert
        $response
            ->assertExactJson([
                'success' => 'Registration successful'
            ])
            ->assertStatus(200);

        $user = Customer::where('username', 'handiwijoyo')->first();
        $this->assertNotNull($user);
        $this->assertEquals('handiwijoyo', $user->username);
        $this->assertEquals('+6281345188288', $user->phone_number);
        $this->assertNotNull($user->password);
    }

    /**
     * Test customer can register with invalid data
     *
     * @return void
     */
    public function test_customer_register_with_invalid_data()
    {
        //Arrange
        factory(Customer::class)->create([
            'username' => 'user1',
            'phone_number' => '+62813111111'
        ]);

        //Test user can register with invalid phone number
        $response = $this->postJson('/api/customer/register', [
            'username' => 'user2',
            'phoneNumber' => '969654'
        ]);

        //Assert
        $response
            ->assertExactJson([
                'error' => 'Invalid phone number.'
            ])
            ->assertStatus(422);

        //Test user can register with registered phone number
        $response = $this->postJson('/api/customer/register', [
            'username' => 'user3',
            'phoneNumber' => '+62813111111'
        ]);

        //Assert
        $response
            ->assertExactJson([
                'error' => 'Phone number already registered.'
            ])
            ->assertStatus(422);

        //Test user can register with registered with registered username
        $response = $this->postJson('/api/customer/register', [
            'username' => 'user1',
            'phoneNumber' => '+62813666666'
        ]);

        //Assert
        $response
            ->assertExactJson([
                'error' => 'Username already taken.'
            ])
            ->assertStatus(422);
    }

    /**
     * Test customer can login using phone number
     *
     * @return void
     */
    public function test_customer_can_login_with_registered_phone_number()
    {
        //Arrange
        factory(Customer::class)->create([
            'phone_number' => '+6281345188288',
        ]);

        //Act
        $response = $this->postJson('/api/customer/login', ['phoneNumber' => '+6281345188288']);

        //Assert
        $response
            ->assertExactJson([
                'success' => 'OK'
            ])
            ->assertStatus(200);

        //Act
        $response = $this->postJson('/api/customer/login', ['phoneNumber' => '+6281533969875']);

        //Assert
        $response
            ->assertExactJson([
                'error' => 'Phone number not registered with '.env('APP_NAME'),
            ])
            ->assertStatus(401);
    }

    /**
     * Test customer can login with invalid phone number
     *
     * @return void
     */
    public function test_customer_can_login_with_invalid_phone_number()
    {
        //Act
        $response = $this->postJson('/api/customer/login', ['phoneNumber' => '123456789']);

        //Assert
        $response
            ->assertExactJson([
                'error' => 'Invalid phone number.'
            ])
            ->assertStatus(422);
    }


    /**
     * Test customer can verify sms code
     *
     * @return void
     */
    public function test_customer_can_verify_login_with_sms_code()
    {
        //Arrange
        factory(Customer::class)->create([
            'phone_number' => '+6281345188288',
        ]);

        //Act
        $response = $this->postJson('/api/customer/login/verify', ['phoneNumber' => '081345188288', 'password' => '1234']);

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
