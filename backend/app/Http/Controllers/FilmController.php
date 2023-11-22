<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\Torrent;
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
        $films = Film::all()->random(7);
        return response()->json($films);
    }

    public function create(Request $request) {
        /*$film = new Film();
        $film->title = $request->title;
        $film->description = $request->description;
        $film->director = $request->director;
        $film->year = $request->year;
        $film->image = $request->image;
        $film->duration = $request->duration;
        $film->score = $request->score;
        $film->id_category = $request->id_category;
        $film->id_torrent = $request->id_torrent;
        $film->save();
        return response()->json($film);*/
        
        $film = Film::create($request->all());

        return response()->json(['message' => 'Film created successfully', 'film' => $film], 201);
    }

    public function update(Request $request, $id) {
        try {
            $film = Film::find($id);
            $film->update($request->all());
            return response()->json($film);
        } catch (\Throwable $th) {
            return response()->json('Film not found');
        }
    }

    public function delete($id) {
        try {
            $film = Film::find($id);
            $film->delete();
            return response()->json('Film deleted');
        } catch (\Throwable $th) {
            return response()->json('Film not found');
        }
    }

    public function search(Request $request) {
        $films = Film::where('title', 'like', '%'.$request->search.'%')->get();
        return response()->json($films);
    }

    public function getByIdCategory($id) {
        $films = Film::where('id_category', $id)->get();
        return response()->json($films);
    }

    /*public function stream($id) {
        $film = Film::find($id);
        if ($film) {
            $torrentID = $film->id_torrent;

            if (!is_null($torrentId)) {
                // Construir el comando para ejecutar Peerflix con el magnet link del torrent
                $magnetLink = $film->torrent->magnet_link;
        
                $command = "node " . base_path("../ms-streamTorrent/stream.js");

                // Ejecutar Peerflix como un proceso secundario
                Artisan::call('process:run', ['command' => $command]);
            }
        }
        return response()->json($film);
    }*/
}
