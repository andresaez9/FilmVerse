<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function showAll() {
        $films = Film::all();
        return response()->json($films);
    }

    public function showOne($id) {
        $film = Film::find($id);
        return response()->json($film);
    }

    public function findMagnetLinkByTorrentId($id) {
        $film = Film::find($id);
        return response()->json($film->torrent->magnet_link);
    }
}
