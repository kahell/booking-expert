<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Customer::class, function (Faker\Generator $faker) {

    return [
        'fullname' => $faker->name,
        'username' => $faker->unique()->userName,
        'email' => $faker->unique()->safeEmail,
        'password' => bcrypt('1234'),
        'phone_number' => '+62811222333444'
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Expert::class, function (Faker\Generator $faker) {

    $gender = $faker->randomElement(['male', 'female']);
    $genderInitial = ($gender == 'male') ? 'M' : 'F';

    return [
        'username' => $faker->unique()->userName,
        'avatar' => 'http://www.designskilz.com/random-users/images/image'.$genderInitial.rand(1, 50).'.jpg',
        'fullname' => $faker->name($gender),
        'bio' => $faker->paragraph(),
        'rating' => $faker->randomFloat(1, 3, 5),
        'phone_number' => $faker->phoneNumber,
        'password' => bcrypt('1234'),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Package::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->sentence(3),
        'description' => $faker->sentence(8),
        'duration' => rand(1, 5),
        'image' => $faker->imageUrl(640, 480, 'nature'),
        'price' => $faker->randomElement([100000, 200000, 300000, 500000, 1000000, 3000000, 5000000, 12000000]),
        'section' => $faker->randomElement(['get_music', 'get_shot', 'get_beauty']),
        'type' => $faker->randomElement(['expert', 'teacher']),
        'category' => $faker->randomElement(['band', 'dj', 'orchestra', 'session_player', 'singer']),
        'subcategory' => $faker->randomElement(['', 'bass', 'guitar', 'piano']),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Booking::class, function (Faker\Generator $faker) {

    return [
        'package_id' => 1,
        'package_name' => $faker->sentence(3),
        'package_image' => $faker->imageUrl(640, 480, 'nature'),
        'event_at' => \Carbon\Carbon::now()->addHour(),
        'location' => $faker->address,
        'duration' => rand(1, 5),
        'additional_notes' => 'This is a random notes',
        'description' => $faker->sentence(8),
        'price' => $faker->randomElement([100000, 200000, 300000, 500000, 1000000, 3000000, 5000000, 12000000]),
        'section' => $faker->randomElement(['get_music', 'get_shot', 'get_beauty']),
        'type' => $faker->randomElement(['player', 'teacher']),
        'category' => $faker->randomElement(['band', 'dj', 'orchestra', 'session', 'singer']),
        'subcategory' => $faker->randomElement(['', 'bass', 'guitar', 'piano']),
    ];
});
