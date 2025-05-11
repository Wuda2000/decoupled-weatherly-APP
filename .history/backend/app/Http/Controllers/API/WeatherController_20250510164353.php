<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city', 'Nairobi'); // default city
        $apiKey = env('OPENWEATHERMAP_API_KEY');
        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        if ($response->successful()) {
            $data = $response->json();

            // Parse and sanitize the response
            $cleanData = [
                'city' => $data['name'] ?? $city,
                'temperature' => $data['main']['temp'] ?? null,
                'description' => $data['weather'][0]['description'] ?? null,
                'humidity' => $data['main']['humidity'] ?? null,
                'wind_speed' => $data['wind']['speed'] ?? null,
            ];

            return response()->json($cleanData);
        } else {
            return response()->json([
                'error' => 'Unable to fetch weather data'
            ], $response->status());
        }
    }
}
