<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        // Placeholder weather data
        $weatherData = [
            'location' => 'Sample City',
            'temperature' => '25°C',
            'condition' => 'Sunny',
            'humidity' => '60%',
            'wind_speed' => '10 km/h',
        ];

        return response()->json($weatherData);
    }
}
