<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserAccountRequest extends FormRequest
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
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'full_name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'experience' => 'nullable|string',
            'education'  => 'nullable|string',
            'personal_website' => 'nullable|url|max:255',
            'cv' => 'nullable|mimes:pdf,doc,docx|max:5120',
        ];
    }
}
