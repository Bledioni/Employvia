<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\User\JobApplicationsRequest;
use App\Models\JobApplications;
use App\Models\Jobs;
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
            ], 201); 
        } 
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Related model not found',
                'error'   => $e->getMessage()
            ], 404); 
        } 
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        } 
        catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database error',
                'error'   => $e->getMessage()
            ], 500);
        } 
        catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'error'   => $e->getMessage()
            ], 500); 
        }
    }

    public function getAllJobs()
{
    try {
        $jobs = Jobs::all();

        if ($jobs->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'No jobs found',
                'data'    => []
            ], 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'Jobs retrieved successfully',
            'data'    => $jobs
        ], 200); 
    } 
    catch (\Illuminate\Database\QueryException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Database query error',
            'error'   => $e->getMessage()
        ], 500); 
    } 
    catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong',
            'error'   => $e->getMessage()
        ], 500); 
    }
    }

    public function GetJobID($id){
    $job = Jobs::where('id', $id)->first(); // get single job
    return response()->json($job ? [$job] : []); // return as array
}



}
