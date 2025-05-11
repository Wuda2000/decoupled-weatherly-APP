import { NextResponse } from 'next/server';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { message: 'City parameter is required' },
      { status: 400 }
    );
  }

  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json(
      { message: 'OpenWeather API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${OPENWEATHER_API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || 'Failed to fetch weather data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 