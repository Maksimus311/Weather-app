export interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
}

export interface ForecastData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface GeocodingResponse {
  results: GeocodingResult[];
}

export type WeatherInterpretation = {
  [key: number]: string;
};

export interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
  latitude: number;
  longitude: number;
}

