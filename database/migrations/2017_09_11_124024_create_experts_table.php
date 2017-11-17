<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->unique()->index();
            $table->string('fullname')->nullable()->index();
            $table->string('email')->nullable()->unique();
            $table->string('phone_number')->unique();
            $table->string('password');
            $table->text('bio')->nullable();
            $table->integer('rating')->default(0)->index();
            $table->string('avatar')->nullable();
            $table->boolean('isTopExpert')->default(false)->index();
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
        Schema::dropIfExists('experts');
    }
}
