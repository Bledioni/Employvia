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

                'message' => "Email Invalid",

            ], 401);

        }

        $token = rand(10 , 100000);

        try {
            
            DB::table('password_reset_tokens')->insert([

                'email' => $email,
                'token' => $token,

            ]);

            Mail::to($email)->send(new employviaMail($token));

            return response([

                'message' => 'Reset Password Mail send on your email',

            ], 200);

        } catch (Exception $e) {
            
            return response()->json([

                'message' => $e->getMessage(),

            ] , 400);

        }

    }
}
