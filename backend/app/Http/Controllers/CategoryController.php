<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function findNameById($id) {
        $category = Category::find($id);
        return response()->json($category->name);
    }
}
