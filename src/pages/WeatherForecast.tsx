import React from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { useForecast } from '../hooks/useForecast';
import { getWeatherDescription, formatDate } from '../utils/weatherUtils';

const WeatherForecast: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat') || '';
  const lng = searchParams.get('lng') || '';

  const { data, loading, error } = useForecast(lat, lng);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Container>Ошибка: {error}</Container>;

  return (
    <Container>
      <Link className="btn btn-secondary mb-3" to="/">Назад</Link>
      <Header title={`Прогноз погоды в ${city}`} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Мин. температура (°C)</th>
            <th>Макс. температура (°C)</th>
            <th>Погода</th>
          </tr>
        </thead>
        <tbody>
          {data?.time.slice(0, 7).map((date, index) => (
            <tr key={date}>
              <td>{formatDate(date)}</td>
              <td>{data.temperature_2m_min[index]}</td>
              <td>{data.temperature_2m_max[index]}</td>
              <td>{getWeatherDescription(data.weathercode[index])}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default WeatherForecast;
