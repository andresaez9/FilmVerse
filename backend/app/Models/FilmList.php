<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilmList extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_film_list';
    protected $table = 'films_lists';
}
