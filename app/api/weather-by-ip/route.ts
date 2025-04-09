import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const ipInfoResponse = await fetch(`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`);
    if (!ipInfoResponse.ok) {
      throw new Error('Failed to fetch IP location');
    }
    
    const ipData = await ipInfoResponse.json();
    const [lat, lon] = ipData.loc.split(',');
    
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`);
    
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const weatherData = await weatherResponse.json();
    const temperature = Math.round(weatherData.current.temp);
    const condition = weatherData.current.weather[0].main;
    const canWearShorts = temperature >= 60;
    
    return NextResponse.json({
      canWearShorts,
      temperature,
      condition
    });
    
  } catch (error) {
    console.error('Error fetching weather by IP:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
