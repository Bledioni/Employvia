<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ResetPasswordRequest;
use Auth;
use DB;
use Exception;
use Mail;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    public function ResetPassword(ResetPasswordRequest $request){

        $email = $request->email;
        $token = $request->token;
        $password = Hash::make($request->password);

        $emailCheck = DB::table('password_reset_tokens')->where('email' , $email)->first();
        $pinCheck = DB::table('password_reset_tokens')->where('token' , $token)->first();

        if(!$emailCheck){

            return response([

                'message' => 'Email Not Fond',

            ], 401);

        }

        if(!$pinCheck){

            return response([

                'message' => 'Pin Code Invalid',

            ] , 401);

        }

        DB::table('users')->where('email', $email)->update(['password' => $password]);
        DB::table('password_reset_tokens')->where('email' , $email)->delete();

        return response([

            'message' => 'Password Has Been Delete Successfully',

        ], 200);

    }
}
