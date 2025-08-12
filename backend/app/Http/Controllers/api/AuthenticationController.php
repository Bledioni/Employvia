<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Register;
use App\Http\Requests\Login;
use App\Models\User;
use Illuminate\Support\Facades\Hash;  
use Exception;  
use Auth;

class AuthenticationController extends Controller
{
    //Register Function

    public function Register(Register $request)
    {
        try {
            User::create([

                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role

            ]);

            return response([

                    'message'=> "Registration Successfull",

                ], 200);
            
        } catch (Excetpion $e) {
            
            return response()->json([

                'message' => $e->getMessage(),

            ], 400);

        }
    }

    //Login Function

    public function Login(Request $request){

        try {
            
            if(Auth::attempt($request->only('email' , 'password'))){

                $user = Auth::user();
                $token = $user->createToken('app')->plainTextToken;

                return response([

                    'message' => 'Login Successfull',
                    'token' => $token,
                    'user' => $user,

                ] , 200);

                if(auth()->user()->role === 'admin'){

                    return redirect('/admin/dashboard');

                }
                else if(auth()->user()->role === 'user'){

                    return redirect('/user/dashboard');

                }
                else if(auth()->user()->role === 'employeer'){

                    return redirect('/employeer/dashboard');

                }

            }

        } catch (Excetpion $e) {
         
            return response()->json([

                'message' => $e->getMessage(),

            ], 400);
            
        }
        return response([

            'message' => 'Invalid Email or Password',

        ], 401);

    }
}
