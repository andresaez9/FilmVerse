<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;

class ProfileController extends Controller
{

    public function getOne($id) {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        return response()->json([
            'user' => $user
        ], 200);
    }

    public function update(Request $request, $id) {
        try {
            $user = User::find($id);
            $user->update($request->all());
            return response()->json($user);
        } catch (\Throwable $th) {
            return response()->json('User not found');
        }
    }

    public function delete($id) {
        try {
            $user = User::find($id);
            $user->delete();
            return response()->json('User deleted');
        } catch (\Throwable $th) {
            return response()->json('User not found');
        }
    }

    public function getAllUsers() {
        $users = User::all();
        return response()->json($users);
    }
}
