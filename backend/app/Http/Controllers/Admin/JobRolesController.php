<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\admin\job_roles_request;
use App\Models\JobRoles;

class JobRolesController extends Controller
{
    
    function InsertRole(job_roles_request $request)
    {
        try {
            $JobRole = JobRoles::create([
                'user_id' => $request->user_id,
                'role_name' => $request->role_name,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Job Role Has Been Successfully Saved',
                'role_name' => $JobRole->role_name,
                'id' => $JobRole->id,
            ], 201); // ✅ 201 for resource created

        } catch (\Illuminate\Database\QueryException $qe) {
            // Database error
            return response()->json([

                'status' => 'error',
                'message' => 'Database Error: ' . $qe->getMessage(),
            ], 500);

        } catch (\Illuminate\Validation\ValidationException $ve) {

            return response()->json([
                'status' => 'fail',
                'message' => 'Validation Failed',
                'errors' => $ve->errors(),
            ], 422);

        } catch (\Exception $ex) {
           
            return response()->json([
                'status' => 'error',
                'message' => 'Unexpected Error: ' . $ex->getMessage(),
                'line' => $ex->getLine(),
                'file' => $ex->getFile(),
            ], 500);
        }
    }

    function GetRoles(){

        $roles = JobRoles::get();
        return response()->json($roles);

    }
}
