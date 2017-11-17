<?php

namespace App\Http\Controllers;

use App\Booking;
use App\Customer;
use App\Expert;
use App\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $bookings = $user->bookings()->latest()->get();

        return response()->json($bookings);
    }


    public function booking(Request $request)
    {
        //Validation
        $validator = Validator::make($request->all(), [
            'package_id' => [
                'required',
                Rule::exists('packages', 'id')->where(function ($query) use($request) {
                    $query->where('id', $request->input('package_id'));
                }),
            ],
            'event_at' => 'required|date|after:yesterday',
            'event_time' => 'required|date_format:H:i',
            'location' => 'required',
        ], [
            'package_id.required' => 'Package is missing.',
            'package_id.exists' => 'The selected package is invalid.',
            'event_at.required' => 'The event date field is required.',
            'event_at.date' => 'Wrong Date format.',
            'event_at.after' => 'Can not book past date.',
            'event_time.required' => 'The Time field is required.',
            'event_time.date_format' => 'Wrong Time format.',
        ]);

        if($validator->fails())
        {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        try {
            $package = Package::find($request->input('package_id'));
            $customer = Customer::find(Auth::user()->id);

            $book = new Booking();
            $book->event_at = $request->input('event_at');
            $book->location = $request->input('location');
            $book->additional_notes = $request->input('additional_notes');
            $book->package_name = $package->name;
            $book->package_image = $package->image;
            $book->section = $package->section;
            $book->type = $package->type;
            $book->category = $package->category;
            $book->subcategory = $package->subcategory;
            $book->description = $package->description;
            $book->price = $package->price;
            $book->duration = $package->duration;
            $book->package()->associate($package);
            $book->customer()->associate($customer);
            $book->save();

            return response()->json([
                'success' => 'Your booking created successfully.',
                'booking' => $book->makeHidden(['package', 'customer'])
            ]);
        }
        catch (Exception $e)
        {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong. Please try again.'], 500);
        }
    }
}
