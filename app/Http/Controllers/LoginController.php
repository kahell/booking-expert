<?php

namespace App\Http\Controllers;

use App\Notifications\UserLoginPassCode;
use Auth;
use Exception;
use Faker\Factory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Propaganistas\LaravelPhone\PhoneNumber;

class LoginController extends Controller
{
    function register(Request $request)
    {
        $model = Auth::getProvider()->getModel();
        $user_model = ($model == 'App\Expert') ? 'experts' : 'customers';

        //Validation
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:'.$user_model.',username|alpha_num|between:4,12',
            'phoneNumber' => 'required|phone:ID,mobile',
        ], [
            'phoneNumber.required' => 'Phone number is required.',
            'phoneNumber.phone' => 'Invalid phone number.',
            'username.required' => 'Username is required.',
            'username.unique' => 'Username already taken.'
        ]);

        if($validator->fails())
        {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        $phone_number = (string) PhoneNumber::make($request->phoneNumber, 'ID')->formatE164();
        $userCheck = app(Auth::getProvider()->getModel())->where('phone_number', $phone_number)->first();
        if($userCheck)
        {
            return response()->json(['error' => 'Phone number already registered.'], 422);
        }

        try {
            $user = app(Auth::getProvider()->getModel());
            $user->username = strtolower($request->username);
            $user->email = $request->email;
            $user->phone_number = $phone_number;
            $user->fullname = $request->fullname;
            $user->password = bcrypt(Factory::create()->randomNumber(4, true));
            $user->save();

            return response()->json(['success' => 'Registration successful'], 200);
        }
        catch (Exception $e)
        {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong. Please try again.'], 500);
        }

    }


    /**
     * User login request using phone number
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function login(Request $request)
    {
        //Validation
        $validator = Validator::make($request->all(), [
            'phoneNumber' => 'required|phone:ID,mobile'
        ]);

        if($validator->fails())
        {
            return response()->json(['error' => 'Invalid phone number.'], 422);
        }

        //Format phone number to use country code +62
        $phone_number = (string) PhoneNumber::make($request->phoneNumber, 'ID')->formatE164();

        //Get User
        try {
            $user = app(Auth::getProvider()->getModel())->where('phone_number', $phone_number)->firstOrFail();
        }
        catch (ModelNotFoundException $e)
        {
            return response()->json(['error' => 'Phone number not registered with '.env('APP_NAME')], 401);
        }

        //Generate sms code
        $sms_code = (env('APP_ENV') == 'testing') ? '1234' : Factory::create()->randomNumber(4, true);
        $user->password = bcrypt($sms_code);
        $user->save();

        //Do not send SMS during unit test.
        if(env('APP_ENV') != 'testing')
        {
            try {
                //Send out sms code to user's phone
                $user->notify(new UserLoginPassCode($sms_code));
                return response()->json(['success' => 'OK']);
            }
            catch (Exception $e)
            {
                // TODO: Create sms service down notification
                Log::critical('Can not send out SMS Login Verification to: '.$user->phone_number.'. '.$e->getMessage());

                return response()->json(['error' => 'Login error. Please try again.'], 500);
            }
        }
        else
        {
            return response()->json(['success' => 'OK']);
        }
    }

    /**
     * Verify user login by phone number & sms code
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function verify(Request $request)
    {
        $phoneNumber = (string) PhoneNumber::make($request->phoneNumber, 'ID')->formatE164();
        $token = Auth::attempt(['phone_number' => $phoneNumber, 'password' => $request->password]);

        if($token)
        {
            // TODO:: Create login success notification
            return response()->json(['token' => $token, 'user' => Auth::user()]);
        }
        else
        {
            return response()->json(['error' => 'Wrong verification code.'], 401);
        }
    }
}
