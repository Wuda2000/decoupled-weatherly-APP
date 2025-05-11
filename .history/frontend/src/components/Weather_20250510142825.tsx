import React, { useState } from 'react';

interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  condition_icon: string;
}

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!res.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await res.json();
      setWeather(data);
      setError(null);
    } catch {
      setError('Could not fetch weather data. Please try again.');
      setWeather(null);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <div className="text-center">
          <img
            src={weather.condition_icon}
            alt="Weather condition icon"
            className="mx-auto mb-2"
          />
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind_speed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
