<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function create() {
        $comment = new Comment();
        $comment->id_user = request('id_user');
        $comment->id_film = request('id_film');
        $comment->text = request('text');
        $comment->save();
        return response()->json($comment);
    }

    public function showAll() {
        $comments = Comment::all();
        return response()->json($comments);
    }

    public function update($id) {
        $comment = Comment::find($id);
        $comment->id_user = request('id_user');
        $comment->id_film = request('id_film');
        $comment->text = request('text');
        $comment->save();
        return response()->json($comment);
    }

    public function delete($id) {
        $comment = Comment::find($id);
        $comment->delete();
        return response()->json($comment);
    }
}
