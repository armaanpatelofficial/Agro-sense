import { useState, useEffect } from 'react';

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  rainChance: number;
}

// Simulated weather data (replace with real API call)
export function useWeather() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 29,
    humidity: 68,
    description: 'Partly Cloudy',
    icon: '⛅',
    windSpeed: 12,
    rainChance: 25,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setWeather((prev) => ({
        ...prev,
        temperature: Math.round((prev.temperature + (Math.random() - 0.5)) * 10) / 10,
        humidity: Math.max(30, Math.min(95, prev.humidity + Math.round((Math.random() - 0.5) * 3))),
        windSpeed: Math.max(0, Math.round((prev.windSpeed + (Math.random() - 0.5) * 2) * 10) / 10),
        rainChance: Math.max(0, Math.min(100, prev.rainChance + Math.round((Math.random() - 0.5) * 5))),
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return weather;
}
