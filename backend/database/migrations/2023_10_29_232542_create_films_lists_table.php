<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('films_lists', function (Blueprint $table) {
            $table->id('id_film_list');
            $table->bigInteger('id_film')->unsigned();
            $table->bigInteger('id_play_list')->unsigned();
            $table->foreign('id_film')->references('id_film')->on('films');
            $table->foreign('id_play_list')->references('id_play_list')->on('play_lists');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films_lists');
    }
};
