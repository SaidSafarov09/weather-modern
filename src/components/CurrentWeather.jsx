import weatherService from '../services/WeatherService';
import { WEATHER_BACKGROUNDS } from '../constants';
import { formatTime, getLocalTime, getLocalDate } from '../utils/formatters';
import styles from './CurrentWeather.module.scss';

export default function CurrentWeather({ data }) {
    if (!data) return null;

    const { main, weather, name, sys, dt, timezone } = data;
    const weatherInfo = weather[0];
    const background = WEATHER_BACKGROUNDS[weatherInfo.main] || WEATHER_BACKGROUNDS.Clear;

    const localTime = getLocalTime(timezone);
    const localDate = getLocalDate(timezone);

    return (
        <div
            className={`${styles.currentWeather} glass-card`}
            style={{ background }}
        >
            <div className={styles.weatherHeader}>
                <div className={styles.locationInfo}>
                    <h1 className={styles.cityName}>{name}</h1>
                    <p className={styles.country}>{sys.country}</p>
                    <div className={styles.timeInfo}>
                        <div className={styles.localTime}>{localTime}</div>
                        <div className={styles.localDate}>{localDate}</div>
                    </div>
                    <p className={styles.updateTime}>Обновлено: {formatTime(dt)}</p>
                </div>
            </div>

            <div className={styles.weatherMain}>
                <div className={styles.temperatureSection}>
                    <img
                        src={weatherService.getWeatherIconLarge(weatherInfo.icon)}
                        alt={weatherInfo.description}
                        className={styles.weatherIconLarge}
                    />
                    <div className={styles.tempInfo}>
                        <div className={styles.currentTemp}>{weatherService.formatTemp(main.temp)}</div>
                        <div className={styles.weatherDescription}>{weatherInfo.description}</div>
                        <div className={styles.feelsLike}>
                            Ощущается как {weatherService.formatTemp(main.feels_like)}
                        </div>
                    </div>
                </div>

                <div className={styles.tempRange}>
                    <div className={styles.tempItem}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2v10m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M7 6h6M7 10h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Макс: {weatherService.formatTemp(main.temp_max)}</span>
                    </div>
                    <div className={styles.tempItem}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2v10m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M7 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Мин: {weatherService.formatTemp(main.temp_min)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
