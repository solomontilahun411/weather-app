import { useEffect, useState } from 'react';
import clearImage from './assets/images/clear.png';
import cloudsImage from './assets/images/clouds.png';
import drizzleImage from './assets/images/drizzle.png';
import humidityImage from './assets/images/humidity.png';
import mistImage from './assets/images/mist.png';
import rainImage from './assets/images/rain.png';
import searchImage from './assets/images/search.png';
import snowImage from './assets/images/snow.png';
import windImage from './assets/images/wind.png';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim() || '';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const conditionImages = {
  Clouds: cloudsImage,
  Clear: clearImage,
  Drizzle: drizzleImage,
  Rain: rainImage,
  Snow: snowImage,
  Mist: mistImage,
  Fog: mistImage,
  Haze: mistImage,
  Smoke: mistImage,
  Dust: mistImage,
  Sand: mistImage,
  Ash: mistImage,
  Squall: rainImage,
  Tornado: windImage,
};

export default function App() {
  const [cityInput, setCityInput] = useState('Kombolcha');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadWeather(cityName) {
    const city = cityName.trim();
    if (!city) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }
    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHER_API_KEY_HERE') {
      setError('API key is missing. Create a .env file and add VITE_OPENWEATHER_API_KEY. See README.md.');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}?units=metric&q=${encodeURIComponent(city)}&appid=${encodeURIComponent(API_KEY)}`);
      const data = await response.json().catch(() => ({}));
      if (response.status === 404) throw new Error('City not found. Please enter a correct city name.');
      if (response.status === 401) throw new Error('API key is invalid or not active yet. A new key may take up to 2 hours to activate.');
      if (!response.ok) throw new Error(data.message || `Weather service error (${response.status}).`);
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message || 'Could not load weather. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (API_KEY) {
      loadWeather('Kombolcha');
    } else {
      setError('API key is missing. Copy .env.example to .env and add VITE_OPENWEATHER_API_KEY. See README.md.');
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    loadWeather(cityInput);
  }

  const condition = weather?.weather?.[0]?.main || 'Clouds';
  const weatherImage = conditionImages[condition] || cloudsImage;

  return (
    <main className="card">
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          aria-label="City name"
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
          required
        />
        <button type="submit" aria-label="Search city" disabled={loading}>
          <img src={searchImage} alt="" />
        </button>
      </form>

      {loading && <p className="status-message" role="status">Loading weather…</p>}
      {error && <p className="api-message" role="alert">{error}</p>}

      {weather && !error && (
        <section className="weather" aria-live="polite">
          <img className="weather-icon" src={weatherImage} alt={condition} />
          <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
          <h2 className="city">{weather.name}</h2>
          <p className="condition">{weather.weather?.[0]?.description || condition}</p>
          <div className="details">
            <div className="col">
              <img src={humidityImage} alt="" />
              <div><p className="humidity">{weather.main.humidity}%</p><p>Humidity</p></div>
            </div>
            <div className="col">
              <img src={windImage} alt="" />
              <div><p className="wind">{weather.wind.speed} m/s</p><p>Wind speed</p></div>
            </div>
          </div>
        </section>
      )}
      <p className="footer-note">Weather data provided by OpenWeather</p>
    </main>
  );
}
