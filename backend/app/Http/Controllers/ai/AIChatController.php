<?php

namespace App\Http\Controllers\ai;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\Jobs;

class AIChatController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
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
                    [
                        "role" => "system",
                        "content" => "Extract job title and city from user message in JSON like {\"job_title\": \"Front-End Developer\", \"city\": \"New York\"}"
                    ],
                    ["role" => "user", "content" => $userMessage]
                ],
            ],
        ]);

        $result = json_decode($response->getBody(), true);
        $aiContent = $result['choices'][0]['message']['content'];

        // Decode AI response
        $jobData = json_decode($aiContent, true);
        $jobTitle = $jobData['job_title'] ?? null;
        $city = $jobData['city'] ?? null;

        // Build query
        $query = Jobs::query();
        if ($jobTitle) {
            $query->where('job_title', 'LIKE', "%$jobTitle%");
        }
        if ($city) {
            $query->where('city', 'LIKE', "%$city%");
        }

        $jobs = $query->get();

        if ($jobs->isEmpty()) {
            return response()->json([
                'reply' => "Sorry, no jobs found matching your request.",
                'job_ids' => []
            ]);
        }

        // Prepare simplified reply and job IDs
        $reply = "💼 **Jobs I Found:**\n\n";
        $jobIds = [];

        foreach ($jobs as $job) {
            $reply .= "• **Location:** {$job->city} | **Type:** {$job->job_type}\n";
            $jobIds[] = $job->id;
        }

        return response()->json([
            'reply'   => $reply,
            'job_ids' => $jobIds
        ]);
    }
}
