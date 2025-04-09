'use client';

import { useState } from 'react';

interface WeatherData {
  canWearShorts: boolean;
  temperature: number;
  condition: string;
}

export default function LocationWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Could not get weather information');
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setError('Location access denied');
        }
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="animate-pulse text-xl">Checking weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-xl text-red-500 mb-4">{error}</p>
        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg 
          shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
          focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={handleGetLocation}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center p-8 flex flex-col items-center justify-center">
        <button
          className="px-6 py-3 bg-black text-white font-medium rounded-lg 
          border-2 border-white shadow-lg transition duration-300 ease-in-out 
          transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white 
          focus:ring-opacity-50 flex items-center justify-center w-auto mx-auto"
          onClick={handleGetLocation}
          style={{ boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
          </svg>
          Allow Location Access
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">
        {weather.canWearShorts ? 'YES!' : 'NO'}
      </h1>
      <p className="text-xl mb-3">
        {weather.canWearShorts ? 'Wear shorts today!' : 'Wear pants today!'}
      </p>
      <p className="text-lg">{weather.temperature}°F - {weather.condition}</p>
    </div>
  );
}
