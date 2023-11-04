<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Torrent extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_torrent';
    protected $table = 'torrents';

    public function film() {
        return $this->hasOne(Film::class, 'id_torrent', 'id_torrent');
    }
}