import { NextResponse } from 'next/server';

// Set your OpenWeather API key
const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  
  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  try {
    // Changed units from metric to imperial for Fahrenheit
    const units = "imperial";
    const language = "en";
    // We only need current weather data, exclude the rest  
    const exclude = "minutely,hourly,daily,alerts";
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&lang=${language}&appid=${API_KEY}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Weather API error');
    }

    const data = await response.json();
    
    // Get current temperature in Fahrenheit
    const currentTemp = data.current.temp;
    // Get current weather condition
    const weatherCondition = data.current.weather[0].main;
    
    // Decision logic for wearing shorts
    const canWearShorts = decideIfCanWearShorts(currentTemp, weatherCondition);
    
    return NextResponse.json({
      canWearShorts,
      temperature: currentTemp,
      condition: weatherCondition,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

function decideIfCanWearShorts(temp: number, condition: string): boolean {
  const isWarm = temp >= 60;
  const isNotRaining = !['Rain', 'Thunderstorm', 'Drizzle'].includes(condition);
  
  return isWarm && isNotRaining;
}
