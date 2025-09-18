<?php

namespace App\Http\Controllers\Employer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Jobs;
use App\Http\Requests\InsertJobRequest;


class JobController extends Controller
{

    //Insert Jobs Function

    public function InsertJob(InsertJobRequest $request){

        try {
            
            Jobs::create([

                'company_id' => $request->company_id,
                'job_title' => $request->job_title, 
                'tags' => $request->tags,
                'job_role' => $request->job_role,
                'min_salary' => $request->min_salary,
                'max_salary' => $request->max_salary,
                'salary_type' => $request->salary_type,
                'education' => $request->education,
                'experience' => $request->experience,
                'job_type' => $request->job_type,
                'vacancies' => $request->vacancies,
                'expiration_date' => $request->expiration_date,
                'job_level' => $request->job_level,
                'country' => $request->country,
                'city' => $request->city,
                'job_description' => $request->job_description,

            ]);

            return response()->json([
                'message' => 'Job has been successfully saved',
            ], 200);

        } catch (\Throwable $th) {

            return response()->json([
                'error' => 'Something went wrong: ' . $th->getMessage(),
            ], 500);
        }

    }

    //Get All Jobs

    public function getAllJobs($company_id){

        $jobs = Jobs::where('company_id' , $company_id)->get();
        return response()->json($jobs);

    }

    public function GuestJob(Request $request)
{
    $jobTitle = $request->job_title;
    $jobLocation = $request->city;

    $jobs = Jobs::where('job_title', 'like', '%' . $jobTitle . '%')
                ->where('city', 'like', '%' . $jobLocation . '%')
                ->get();

    return response()->json($jobs);
}

    public function GetAllPopularJobs(){

        $jobs = Jobs::all();

        return response()->json([

            'all_jobs' => $jobs,

        ]);

    }


}
