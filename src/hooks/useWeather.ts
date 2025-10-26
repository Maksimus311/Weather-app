import { useState, useEffect } from 'react';
import { WeatherData, GeocodingResponse } from '../types';

export const useWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Шаг 1: Получить координаты
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData: GeocodingResponse = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) throw new Error('Город не найден');

        const { latitude, longitude } = geoData.results[0];

        // Шаг 2: Получить погоду
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=ms`
        );
        const weatherData = await weatherResponse.json();
        setData(weatherData.current_weather);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (city) fetchWeather();
  }, [city]);

  return { data, loading, error };
};

