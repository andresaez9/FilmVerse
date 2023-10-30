<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_film';
    protected $table = 'films';

    public function torrent()
    {
        return $this->belongsTo(Torrent::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_film');
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class, 'films_lists', 'id_film', 'id_playlist');
    }

}
