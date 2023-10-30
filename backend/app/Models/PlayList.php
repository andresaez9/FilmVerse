<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayList extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_playlist';
    protected $table = 'play_lists';

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function films()
    {
        return $this->belongsToMany(Film::class, 'films_lists', 'id_playlist', 'id_film');
    }
}
