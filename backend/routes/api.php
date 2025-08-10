<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;   
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Http\Controllers\ClientController;
use Laravel\Passport\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\api\AuthenticationController;
use App\Http\Controllers\api\ResetPasswordController;
use App\Http\Controllers\api\ForgetPasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('oauth/token', [AccessTokenController::class, 'issueToken'])
    ->middleware('throttle');

Route::get('oauth/clients', [ClientController::class, 'index'])
    ->middleware('auth:api');

Route::post('oauth/personal-access-tokens', [PersonalAccessTokenController::class, 'store'])
    ->middleware('auth:api');


//Auth Controller API

//Register Route API
Route::post('/register', [AuthenticationController::class, 'Register']);

//Login Route API
Route::post('/login' , [AuthenticationController::class , 'Login']);

// ---------------------------------------------------------------------------

// Resset Password API

Route::post('/resetpassword' , [ResetPasswordController::class , 'ResetPassword']);

// ----------------------------------------------------------------------------

//Forget Password

Route::post('/forgetpassword' , [ForgetPasswordController::class , 'ForgetPassword']);