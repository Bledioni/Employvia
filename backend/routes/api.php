<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;   
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Http\Controllers\ClientController;
use Laravel\Passport\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\api\AuthenticationController;
use App\Http\Controllers\api\ResetPasswordController;
use App\Http\Controllers\api\ForgetPasswordController;
use App\Http\Controllers\api\UserDashboard;
use App\Http\Controllers\Employer\CompanyController;
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


//Authentication API

//Register API
Route::post('/register', [AuthenticationController::class, 'Register']);

//Login API
Route::post('/login' , [AuthenticationController::class , 'Login']);

//ResetPassword API
Route::post('/resetpassword' , [ResetPasswordController::class , 'ResetPassword']);

//ForgetPassword API
Route::post('/forgetpassword' , [ForgetPasswordController::class , 'ForgetPassword']);

// ------------------------------------------------------

// User Dashboard — show all jobs for users
// Route::middleware(['auth:sanctum'])->get('/user/dashboard', [UserDashboard::class, 'AllJobs']);


// Employer Dashboard — protect and route to employer controller
Route::middleware(['auth:sanctum'])->get('/employeer/dashboard', [CompanyController::class, 'index']);
Route::middleware(['auth:sanctum'])->post('/insertcompany', [CompanyController::class, 'InsertCompany']);


// Admin Dashboard — protect and route to admin controller
// Route::middleware(['auth:sanctum'])->get('/admin/dashboard', [AdminDashboard::class, 'index']);
