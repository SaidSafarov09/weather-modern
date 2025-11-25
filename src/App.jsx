import { useState, useEffect } from 'react';
import weatherService from './services/WeatherService';
import locationService from './services/LocationService';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import WeatherDetails from './components/WeatherDetails';
import LoadingSpinner from './components/LoadingSpinner';
import { DEFAULT_LOCATION, ERROR_MESSAGES } from './constants';
import styles from './App.module.scss';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const loadWeather = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getFullWeatherData(lat, lon);
      setCurrentWeather(data.current);
      setForecast(data.forecast);
    } catch (err) {
      setError(err.message);
      console.error('Weather loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const cities = await weatherService.searchCity(cityName);

      if (cities.length === 0) {
        setError(ERROR_MESSAGES.CITY_NOT_FOUND);
        setLoading(false);
        return;
      }

      const city = cities[0];
      await loadWeather(city.lat, city.lon);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLocationRequest = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      locationService.getIpLocation()
        .then(location => {
          loadWeather(location.lat, location.lon);
        })
        .catch(() => {
          setError(ERROR_MESSAGES.GEOLOCATION_UNAVAILABLE);
          setLoading(false);
        });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadWeather(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        console.log('Geolocation error, trying IP fallback:', err);
        locationService.getIpLocation()
          .then(location => {
            loadWeather(location.lat, location.lon);
          })
          .catch(() => {
            setError(ERROR_MESSAGES.GEOLOCATION_DENIED);
            setLoading(false);
          });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    if (!initialLoad) return;

    const tryGeolocation = () => {
      const handleSuccess = (position) => {
        console.log('Geolocation success:', position.coords.latitude, position.coords.longitude);
        loadWeather(position.coords.latitude, position.coords.longitude);
        setInitialLoad(false);
      };

      const handleError = async (error) => {
        console.log('Geolocation error:', error?.message, '- Trying IP fallback...');
        try {
          const location = await locationService.getIpLocation();
          console.log('IP Location success:', location);
          loadWeather(location.lat, location.lon);
        } catch (ipError) {
          console.log('IP Location failed:', ipError);
          if (DEFAULT_LOCATION) {
            console.log('Falling back to default location');
            loadWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
          } else {
            setError('Не удалось определить местоположение. Пожалуйста, воспользуйтесь поиском.');
          }
        } finally {
          setInitialLoad(false);
        }
      };

      if (navigator.geolocation) {
        console.log('Requesting geolocation...');
        navigator.geolocation.getCurrentPosition(
          handleSuccess,
          handleError,
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 300000
          }
        );
      } else {
        handleError(new Error('Geolocation not supported'));
      }
    };

    tryGeolocation();
  }, [initialLoad]);

  return (
    <div className={styles.app}>
      <div className="container">
        <header className={styles.appHeader}>
          <h1 className={styles.appTitle}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" fill="url(#gradient1)" />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-gradient">Погода</span>
          </h1>
          <p className={styles.appSubtitle}>Прогноз погоды для тебя</p>
        </header>

        <SearchBar
          onSearch={handleSearch}
          onLocationRequest={handleLocationRequest}
          isLoading={loading}
        />

        {error && (
          <div className={`${styles.errorMessage} glass-card`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M10 6v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <HourlyForecast data={forecast} />}
            {forecast && <WeeklyForecast data={forecast} />}
            {currentWeather && <WeatherDetails data={currentWeather} />}
          </>
        )}

        <footer className={styles.appFooter} />
      </div>
    </div>
  );
}

export default App;
