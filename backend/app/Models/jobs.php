<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;
    protected $fillable = [

        'company_id',
        'job_title', 
        'tags',
        'job_role',
        'min_salary',
        'max_salary',
        'salary_type',
        'education',
        'experience',
        'job_type',
        'vacancies',
        'expiration_date',
        'job_level',
        'country',
        'city',
        'job_description',
    ];
}
