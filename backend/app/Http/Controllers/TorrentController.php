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

    public function findMagnetLinkById($id)
    {
        return response()->json(Torrent::find($id)->magnet_link);
    }

    public function getMagnetLinkById($id)
    {
        $torrent = Torrent::find($id);
        return response()->json($torrent->magnet_link);
    }
}
