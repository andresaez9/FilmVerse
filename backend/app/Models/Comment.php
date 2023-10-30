<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'id_comment';
    protected $table = 'comments';

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function film()
    {
        return $this->belongsTo(Film::class, 'id_film');
    }
}
