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
        Schema::create('comments', function (Blueprint $table) {
            $table->id('id_comment');
            $table->string('comment');
            $table->double('puntuation');
            $table->bigInteger('id_user')->unsigned();
            $table->bigInteger('id_film')->unsigned();
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->foreign('id_film')->references('id_film')->on('films');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
