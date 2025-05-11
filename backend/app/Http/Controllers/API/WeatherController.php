<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city', '');

        if (trim($city) === '') {
            return response()->json([
                'error' => 'Please enter a city name.'
            ], 400);
        }

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
                'country' => $data['sys']['country'] ?? null,
                'temperature' => $data['main']['temp'] ?? null,
                'description' => $data['weather'][0]['description'] ?? null,
                'icon' => $data['weather'][0]['icon'] ?? null,
                'humidity' => $data['main']['humidity'] ?? null,
                'wind_speed' => $data['wind']['speed'] ?? null,
            ];

            return response()->json($cleanData);
        } else {
            $status = $response->status();
            $errorMessage = 'Unable to retrieve weather data. Please try again later.';

            if ($status === 404) {
                $errorMessage = 'City not found. Please try another name.';
            }

            return response()->json([
                'error' => $errorMessage
            ], $status);
        }
    }
}
