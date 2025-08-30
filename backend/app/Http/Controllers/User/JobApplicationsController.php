<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\User\JobApplicationsRequest;
use App\Models\JobApplications;
use Exception;

class JobApplicationsController extends Controller
{
    public function JobApply(JobApplicationsRequest $request)
    {
        try {
            $jobApply = JobApplications::create([
                'user_id' => $request->user_id,
                'job_id'  => $request->job_id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Job application created successfully',
                'data'    => $jobApply
            ], 201); // ✅ Created
        } 
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Related model not found',
                'error'   => $e->getMessage()
            ], 404); // ✅ Not Found
        } 
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422); // ✅ Unprocessable Entity
        } 
        catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database error',
                'error'   => $e->getMessage()
            ], 500); // ✅ Internal Server Error
        } 
        catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'error'   => $e->getMessage()
            ], 500); // ✅ Fallback Server Error
        }
    }
}
