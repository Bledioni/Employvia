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

            return response()->json([

                    'message'=> "Registration Successfull",

                ], 200);
            
        } catch (Exception $e) {
            
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

    function GetAllUsers($user_id)
{
    try {
        $user = User::where('id', $user_id)->get();

        if ($user->isEmpty()) {
            return response()->json([
                'message' => 'User not found',
            ], 404); 
        }

        return response()->json([
            'message' => 'User retrieved successfully',
            'data' => $user
        ], 200); 

    } catch (\Illuminate\Database\QueryException $e) {
        Log::error($e->getMessage());

        return response()->json([
            'message' => 'Database query error',
        ], 500); 

    } catch (\Exception $e) {
        Log::error($e->getMessage());

        return response()->json([
            'message' => 'Something went wrong',
        ], 500);
    }
}
}
