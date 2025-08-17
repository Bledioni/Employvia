<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companies extends Model
{
    use HasFactory;
    protected $fillable = [

        'user_id',
        'company_name',
        'company_info',
        'organization_type',
        'industry_type',
        'team_size',
        'year_of_establishment',
        'company_website',
        'company_vision',
        'map_location',
        'phone',
        'email',
        'logo',

    ];
}
