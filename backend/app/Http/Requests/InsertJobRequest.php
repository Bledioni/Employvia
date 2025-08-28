<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InsertJobRequest extends FormRequest
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
            'company_id' => 'required|exists:companies,id',
            'job_title' => 'required|string|max:255',
            'tags' => 'nullable|string|max:255',
            'job_role' => 'required|string|max:255',
            'min_salary' => 'required|integer|min:0',
            'max_salary' => 'required|integer|gte:min_salary',
            'salary_type' => 'required|string|max:50',
            'education' => 'required|string|max:100',
            'experience' => 'required|string|max:100',
            'job_type' => 'required|string|max:100',
            'vacancies' => 'required|integer|min:1',
            'expiration_date' => 'required|date',
            'job_level' => 'required|string|max:50',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'job_description' => 'required|string',
        ];
    }
}
