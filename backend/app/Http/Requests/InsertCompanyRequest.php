<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InsertCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'company_name' => 'required|string|max:255',
            'company_info' => 'required|string|max:255',
            'organization_type' => 'required|string|max:255',
            'industry_type' => 'required|string|max:255',
            'team_size' => 'required|integer|min:1',
            'year_of_establishment' => 'required|digits:4|integer|min:1900|max:' . date('Y'),
            'company_website' => 'nullable|url|max:255',
            'company_vision' => 'required|string|max:1000',
            'map_location' => 'nullable|string|max:1000',
            'phone' => 'required|string|max:25',
            'email' => 'required|email|max:55',
            'logo' => 'nullable|file|image|max:2048',
        ];
    }
}
