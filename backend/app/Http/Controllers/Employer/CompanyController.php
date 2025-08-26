<?php

namespace App\Http\Controllers\Employer;

use App\Models\Companies;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\InsertCompanyRequest;
use Illuminate\Support\Facades\Cache; // Make sure this is present

class CompanyController extends Controller
{
    public function InsertCompany(InsertCompanyRequest $request)
    {
        try {
            $logoPath = null;

            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('logo', 'public');
            }

            $company = Companies::create([
                // ... (other company fields)
                'user_id' => $request->user_id,
                'company_name' => $request->company_name,
                'company_info' => $request->company_info,
                'organization_type' => $request->organization_type,
                'industry_type' => $request->industry_type,
                'team_size' => $request->team_size,
                'year_of_establishment' => $request->year_of_establishment,
                'company_website' => $request->company_website,
                'company_vision' => $request->company_vision,
                'map_location' => $request->map_location,
                'phone' => $request->phone,
                'email' => $request->email,
                'logo' => $logoPath,
            ]);

            // Add this block to save the logo path to the cache
            if ($logoPath) {
                // The cache key must match the one used in checkCompany
                Cache::put('company_logo_' . $company->id, $logoPath, 3600);
            }

            return response()->json([
                'message' => 'Company has been successfully saved',
                'company_id' => $company->id,
                'company_name' => $company->company_name,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Something went wrong: ' . $th->getMessage()
            ], 500);
        }
    }

    public function checkCompany($user_id)
    {
        $companies = Companies::where('user_id', $user_id)->get();

        return response()->json($companies);
    }
}