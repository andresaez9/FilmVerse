<?php

namespace App\Http\Controllers;

use App\Models\FilmList;
use Illuminate\Http\Request;

class FilmListController extends Controller
{
    public function addFilmToPlaylist(Request $request, $playlistId, $movieId) {
    $playlist = Playlist::find($playlistId);
    $movie = Movie::find($movieId);

    if (!$playlist || !$movie) {
        return response()->json(['message' => 'Playlist or Movie not found'], 404);
    }

    $playlist->movies()->attach($movie);

    return response()->json(['message' => 'Movie added to playlist']);
}

}
