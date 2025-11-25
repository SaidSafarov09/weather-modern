import weatherService from '../services/WeatherService';
import { formatTime } from '../utils/formatters';
import styles from './HourlyForecast.module.scss';

export default function HourlyForecast({ data }) {
    if (!data || !data.hourly) return null;

    return (
        <div className={`${styles.hourlyForecast} glass-card`}>
            <h2 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10 5v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Почасовой прогноз
            </h2>

            <div className={styles.hourlyScroll}>
                {data.hourly.map((hour, index) => (
                    <div key={index} className={styles.hourlyItem}>
                        <div className={styles.hourTime}>{formatTime(hour.dt)}</div>
                        <img
                            src={weatherService.getWeatherIcon(hour.weather[0].icon)}
                            alt={hour.weather[0].description}
                            className={styles.hourIcon}
                        />
                        <div className={styles.hourTemp}>{weatherService.formatTemp(hour.main.temp)}</div>
                        <div className={styles.hourDesc}>{hour.weather[0].description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
