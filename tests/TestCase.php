<?php

namespace Tests;

use App\Customer;
use Exception;
use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function disableExceptionHandling()
    {
        $this->app->instance(ExceptionHandler::class, new DisabledTestException());
    }

    public function login()
    {
        factory(Customer::class, 1)->create([
            'username' => 'handiwijoyo',
            'phone_number' => '+6281345188288',
        ]);

        $response = $this->postJson('/api/customer/login/verify', ['phoneNumber' => '081345188288', 'password' => '1234']);

        return $response->json()['token'];
    }
}

class DisabledTestException extends Handler
{
    public function __construct()
    {
    }

    public function report(Exception $e)
    {
    }

    public function render($request, Exception $e)
    {
        throw $e;
    }
}
