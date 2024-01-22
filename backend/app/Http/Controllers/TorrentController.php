<?php

namespace App\Http\Controllers;

use App\Models\Torrent;
use Illuminate\Http\Request;

class TorrentController extends Controller
{
    public function showAll()
    {
        try {
            $torrents = Torrent::all();
            return response()->json($torrents);
        } catch (\Throwable $th) {
            return response()->json('Error to show all torrents');
        }
    }

    public function findMagnetLinkById($id)
    {
        try {
            $torrent = Torrent::find($id);
            return response()->json($torrent->magnet_link);
        } catch (\Throwable $th) {
            return response()->json('Torrent not found');
        }
    }

    public function getMagnetLinkById($id)
    {
        try {
            $torrent = Torrent::find($id);
            return response()->json($torrent->magnet_link);
        } catch (\Throwable $th) {
            return response()->json('Torrent not found');
        }
    }
}
