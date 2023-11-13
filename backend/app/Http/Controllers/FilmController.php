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

    public function showRandom() {
        $films = Film::all()->random(4);
        return response()->json($films);
    }

    public function findMagnetLinkByTorrentId($id) {
        $film = Film::find($id);
        return response()->json($film->torrent->magnet_link);
    }

    public function create(Request $request) {
        $film = new Film();
        $film->title = $request->title;
        $film->description = $request->description;
        $film->year = $request->year;
        $film->duration = $request->duration;
        $film->rating = $request->rating;
        $film->image = $request->image;
        $film->save();
        return response()->json($film);
    }

    public function update(Request $request, $id) {
        $film = Film::find($id);
        $film->title = $request->title;
        $film->description = $request->description;
        $film->year = $request->year;
        $film->duration = $request->duration;
        $film->rating = $request->rating;
        $film->image = $request->image;
        $film->save();
        return response()->json($film);
    }

    public function delete($id) {
        $film = Film::find($id);
        $film->delete();
        return response()->json('Film deleted');
    }

    public function search(Request $request) {
        $films = Film::where('title', 'like', '%'.$request->search.'%')->get();
        return response()->json($films);
    }

    public function getByIdCategory($id) {
        $films = Film::where('id_category', $id)->get();
        return response()->json($films);
    }
}
