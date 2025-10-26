import React, { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GeocodingResponse, GeocodingResult } from '../types';

const AutocompleteInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);
        const data: GeocodingResponse = await response.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (city: GeocodingResult) => {
    setQuery(city.name);
    setShowSuggestions(false);
    navigate(`/weather/${encodeURIComponent(city.name)}?lat=${city.latitude}&lng=${city.longitude}`);
  };

  return (
    <div className="position-relative">
      <Form.Control
        type="text"
        placeholder="Введите город"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ListGroup className="position-absolute w-100" style={{ zIndex: 1000 }}>
          {suggestions.slice(0, 5).map((item, index) => (
            <ListGroup.Item key={index} action onClick={() => handleSelect(item)}>
              {item.name}, {item.country}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default AutocompleteInput;

