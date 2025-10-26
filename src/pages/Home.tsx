import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import WeatherCard from '../components/WeatherCard';
import AutocompleteInput from '../components/AutocompleteInput';

const cities = ['Moscow', 'St Petersburg', 'Rostov-on-Don', 'Vladivostok', 'Krasnodar', 'Yekaterinburg'];

const Home: React.FC = () => (
  <div>
    <Header title="Погода в городах России" />
    <Container>
      <Row className="mb-4">
        <Col md={6} lg={4}>
          <AutocompleteInput />
        </Col>
      </Row>
      <Row>
        {cities.map((city) => (
          <Col key={city} xs={12} md={6} lg={4} className="mb-3">
            <WeatherCard city={city} />
          </Col>
        ))}
      </Row>
    </Container>
  </div>
);

export default Home;
