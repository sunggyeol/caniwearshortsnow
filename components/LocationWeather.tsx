'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  canWearShorts: boolean;
  temperature: number;
  condition: string;
}

export default function LocationWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locationMethod, setLocationMethod] = useState<string>('geolocation');

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError('Could not get weather information');
    }
  };

  const fetchWeatherByIP = async () => {
    try {
      setLocationMethod('ip');
      const response = await fetch('/api/weather-by-ip');
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError('Could not get weather information');
    }
  };

  const getLocationAndWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
          setLocationMethod('geolocation');
        },
        () => {
          fetchWeatherByIP();
        }
      );
    } else {
      fetchWeatherByIP();
    }
  };

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-lg sm:text-xl text-red-500 mb-4 px-4">{error}</p>
        <button
          className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-lg 
          border-2 border-white shadow-md transition duration-300 ease-in-out transform hover:scale-105 
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 touch-manipulation"
          onClick={getLocationAndWeather}
          style={{ boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      {weather && (
        <>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            {weather.canWearShorts ? 'YES!' : 'NO'}
          </h1>
          <p className="text-lg sm:text-xl mb-3 px-4">
            {weather.canWearShorts ? 'Wear shorts today!' : 'Wear pants today!'}
          </p>
          <p className="text-base sm:text-lg px-4">{weather.temperature}°F - {weather.condition}</p>
        </>
      )}
    </div>
  );
}
