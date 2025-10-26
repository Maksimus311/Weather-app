import { useState, useEffect } from 'react';
import { ForecastData } from '../types';

export const useForecast = (lat: string, lng: string) => {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`
        );
        const forecastData = await response.json();
        setData(forecastData.daily);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lng) fetchForecast();
  }, [lat, lng]);

  return { data, loading, error };
};

