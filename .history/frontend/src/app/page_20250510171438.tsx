'use client';

import React, { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import {
  Loader2,
  AlertTriangle,
  MapPin,
  Thermometer,
  Wind,
  Calendar,
  Droplet,
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  wind_speed: number;
}

const HomePage: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/api/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200
               flex flex-col items-center justify-start pt-16 md:pt-24"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8
                 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text
                 drop-shadow-lg"
      >
        Weather Explorer
      </motion.h1>

      <div className="w-full max-w-md mb-6 flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
          className="flex-1 bg-white/80 backdrop-blur-md border-0
                   focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder:text-gray-400"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              fetchWeather();
            }
          }}
        />
        <Button
          onClick={fetchWeather}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white
                   hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-full
                   shadow-lg hover:shadow-xl transition-all duration-300
                   font-semibold text-base flex items-center"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Search'
          )}
        </Button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg
                   flex items-center shadow-md"
        >
          <AlertTriangle className="mr-2 h-5 w-5" />
          <p className="text-sm">{`Error: ${error}`}</p>
        </motion.div>
      )}

      {weatherData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl
                   p-4 sm:p-6 md:p-8 transition-all duration-300 hover:scale-[1.01]
                   border border-white/20"
        >
          <Card className="bg-transparent shadow-none">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-800">
                  {weatherData.city}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p
                className="text-4xl sm:text-5xl font-bold text-gray-900
                         bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text"
              >
                {Math.round(weatherData.temperature)}°C
              </p>
              <p className="text-gray-600 capitalize text-lg sm:text-xl">
                {weatherData.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Feels like: {Math.round(weatherData.temperature)}°C
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  Humidity: {weatherData.humidity}%
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  Wind Speed: {weatherData.wind_speed} m/s
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Last updated: {format(new Date(), 'MMM dd, HH:mm')}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
