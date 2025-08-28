<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table){

            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('job_title');
            $table->string('tags');
            $table->string('job_role');
            $table->integer('min_salary');
            $table->integer('max_salary');
            $table->string('salary_type');
            $table->string('education');
            $table->string('experience');
            $table->string('job_type');
            $table->integer('vacancies');
            $table->date('expiration_date');
            $table->string('job_level');
            $table->string('country');
            $table->string('city');
            $table->text('job_description');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
