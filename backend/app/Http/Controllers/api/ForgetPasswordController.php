<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Http\Requests\ForgetRequest;
use DB;
use Illuminate\Support\Facades\Hash;
use Exception;
use Mail;
use App\Mail\employviaMail;

class ForgetPasswordController extends Controller
{
    public function ForgetPassword(ForgetRequest $request){

        $email = $request->email;

        if(User::where('email' , $email)->doesntExist()){

            return response([

                'message' => "Email Not Found",
                
            ],  401);

        }

        $token = rand(10 , 100000);

        DB::table('password_reset_tokens')->updateOrInsert(

            ['email' => $email],
            ['token' => $token],

        );

        Mail::to($email)->send(new employviaMail($token));

        return response([

            'message' => "Password Reset Link Has Been Successfully Send",

        ],  200);

    }
}
