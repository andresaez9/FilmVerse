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
        Schema::create('films', function (Blueprint $table) {
            $table->id('id_film');
            $table->string('title');
            $table->string('description');
            $table->string('director');
            $table->integer('year');
            $table->string('image');
            $table->integer('duration');
            $table->double('score');                
            $table->bigInteger('id_category')->unsigned();
            $table->bigInteger('id_torrent')->unsigned();
            $table->timestamps();
            $table->foreign('id_category')->references('id_category')->on('categories');
            $table->foreign('id_torrent')->references('id_torrent')->on('torrents')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
