<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('customer_id')->index();
            $table->integer('package_id')->index();
            $table->timestamp('event_at');
            $table->text('location');
            $table->text('additional_notes')->nullable();
            $table->string('status')->default('awaiting_expert');
            $table->string('package_name');
            $table->string('package_image')->nullable();
            $table->integer('duration');
            $table->string('section');
            $table->string('type');
            $table->string('category');
            $table->string('subcategory');
            $table->text('description');
            $table->integer('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
