<?php

namespace App\Http\Controllers;

use App\Models\Torrent;
use Illuminate\Http\Request;

class TorrentController extends Controller
{
    public function showAll()
    {
        return response()->json(Torrent::all());
    }
}
