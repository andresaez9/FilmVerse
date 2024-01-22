<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\Torrent;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function showAll() {
        try {
            $films = Film::all();
            return response()->json($films);
        } catch (\Throwable $th) {
            return response()->json('Error to show all films');
        }
    }

    public function showOne($id) {
        try {
            $film = Film::find($id);
            return response()->json($film);
        } catch (\Throwable $th) {
            return response()->json('Film not found');
        }
    }

    public function showRandom() {
        try {
            $films = Film::all()->random(7);
            return response()->json($films);
        } catch (\Throwable $th) {
            return response()->json('Error to show random films');
        }
    }

    public function create(Request $request) {        
        try {
            $film = Film::create($request->all());
            return response()->json(['message' => 'Film created successfully', 'film' => $film], 201);
        } catch (\Throwable $th) {
            return response()->json('Error to create film');
        }
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
        try {
            $films = Film::where('title', 'like', '%'.$request->search.'%')->get();
            return response()->json($films);
        } catch (\Throwable $th) {
            return response()->json('Error to search films');
        }
    }

    public function getByIdCategory($id) {
        try {
            $films = Film::where('id_category', $id)->get();
            return response()->json($films);
        } catch (\Throwable $th) {
            return response()->json('Error to get films by category');
        }
    }
}
