<?php

namespace App\Http\Controllers\ai;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\Jobs; // corrected

class AIChatController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required',
        ]);

        $userMessage = $request->message;

        $client = new Client();
        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type' => 'application/json',
            ],
            'json' => [
                "model" => "gpt-4o-mini",
                "messages" => [
                    ["role" => "system", "content" => "Extract job title and city from user message in JSON like {\"job_title\": \"Front-End Developer\", \"city\": \"New York\"}"],
                    ["role" => "user", "content" => $userMessage]
                ],
            ],
        ]);

        $result = json_decode($response->getBody(), true);
        $aiContent = $result['choices'][0]['message']['content'];

        // Parse AI JSON
        $jobData = json_decode($aiContent, true);
        $jobTitle = $jobData['job_title'] ?? null;
        $city = $jobData['city'] ?? null;

        // Query database
        $query = Jobs::query();
        if ($jobTitle) $query->where('job_title', 'LIKE', "%$jobTitle%");
        if ($city) $query->where('city', 'LIKE', "%$city%");
        $jobs = $query->get();

        // Prepare response
        if ($jobs->isEmpty()) {
            $reply = "Sorry, no jobs found matching your request.";
        } else {
            $reply = "Here are some jobs I found:\n";
            foreach ($jobs as $job) {
                $reply .= "- {$job->job_title} ({$job->city}) - {$job->job_type} {$job->id}, Salary: {$job->min_salary}-{$job->max_salary}\n";
            }
        }

        return response()->json(['reply' => $reply , 'job_id' => $job->id]);
    }
}
