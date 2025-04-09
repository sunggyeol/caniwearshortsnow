'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  canWearShorts: boolean;
  temperature: number;
  condition: string;
}

export default function LocationWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
            
            if (!response.ok) {
              throw new Error('Failed to fetch weather data');
            }
            
            const data = await response.json();
            setWeather(data);
            setLoading(false);
          } catch (err) {
            setError('Could not get weather information');
            setLoading(false);
          }
        },
        () => {
          setError('Location access denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="text-xl">Checking weather...</p>;
  }

  if (error) {
    return <p className="text-xl text-red-500">{error}</p>;
  }

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">
        {weather?.canWearShorts ? 'YES!' : 'NO'}
      </h1>
      <p className="text-xl mb-3">
        {weather?.canWearShorts ? 'Wear shorts today!' : 'Wear pants today!'}
      </p>
      <p className="text-lg">{weather?.temperature}°F - {weather?.condition}</p>
    </div>
  );
}
