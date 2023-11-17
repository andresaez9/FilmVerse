<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function showAll() {
        try {
            $categories = Category::all();
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Categories not found'], 404);
        }
    }

    public function findNameById($id) {
        try {
            $category = Category::findOrFail($id);
            return response()->json($category);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }
}
