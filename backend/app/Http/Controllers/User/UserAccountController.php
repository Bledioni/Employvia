<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserAccount;
use App\Http\Requests\User\UserAccountRequest;

class UserAccountController extends Controller
{
    public function UserSetUp(UserAccountRequest $request)
    {

        $cv_path = null;

        if ($request->hasFile('cv')) {
                $cv_path = $request->file('cv')->store('cv', 'public');
        }

        $profile_picture = null;

        if ($request->hasFile('profile_picture')) {
                $profile_picture = $request->file('profile_picture')->store('profile_picture', 'public');
        }

        try {
            $userAccount = UserAccount::create([
                'user_id' => $request->user_id,
                'profile_picture'  => $profile_picture,
                'full_name'        => $request->full_name,
                'title'            => $request->title,
                'experience'       => $request->experience,
                'education'        => $request->education,
                'personal_website' => $request->personal_website,
                'cv'               => $cv_path,
            ]);

            return response()->json([
                'message' => 'User account created successfully',
                'data'    => $userAccount
            ], 201); 

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422); 

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User not found',
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    function GetAccounts($id){

        $userAccount = UserAccount::where('user_id' , $id)->get();

        if($userAccount){

            return response()->json([
                'hasAccount' => $userAccount->isNotEmpty(), 
                'user'=> $userAccount
            ]);

        }

    }
}
