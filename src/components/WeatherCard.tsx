import React from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useWeather } from '../hooks/useWeather';
import { getWeatherDescription } from '../utils/weatherUtils';
import { Link } from 'react-router-dom';

interface WeatherCardProps {
  city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const { data, loading, error } = useWeather(city);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Card.Body>Ошибка: {error}</Card.Body>;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        <p>Температура: {data?.temperature}°C</p>
        <p>Погода: {getWeatherDescription(data?.weathercode || 0)}</p>
        <p>Ветер: {data?.windspeed} м/с</p>
        <Link className="btn btn-primary" to={`/weather/${encodeURIComponent(city)}?lat=${data?.latitude}&lng=${data?.longitude}`}>
          Смотреть прогноз
        </Link>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;




