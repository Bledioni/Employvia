<?php

namespace App\Http\Controllers\User;
use App\Http\Requests\User\AddToFavoritesRequest;
use App\Models\AddToFavorites;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AddToFavoritesController extends Controller
{
    public function AddToFavorites(AddToFavoritesRequest $request)
{
    try {
        $add_to_favorites = AddToFavorites::create([
            'user_id' => $request->user_id,
            'job_id'  => $request->job_id,
        ]);

        return response()->json([
            'message' => 'Job added to favorites successfully',
            'data'    => $add_to_favorites
        ], 201); 
        
    } catch (\Illuminate\Database\QueryException $e) {
        return response()->json([
            'message' => 'Database error occurred',
            'error'   => $e->getMessage(),
        ], 500); 

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Something went wrong',
            'error'   => $e->getMessage(),
        ], 400); 

    }
}

}
