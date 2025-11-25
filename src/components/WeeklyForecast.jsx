import weatherService from '../services/WeatherService';
import { getDayName, formatDate } from '../utils/formatters';
import styles from './WeeklyForecast.module.scss';

export default function WeeklyForecast({ data }) {
    if (!data || !data.daily) return null;

    return (
        <div className={`${styles.weeklyForecast} glass-card`}>
            <h2 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 8h14M7 2v4m6-4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Прогноз на неделю
            </h2>

            <div className={styles.weeklyList}>
                {data.daily.map((day, index) => (
                    <div key={index} className={styles.weeklyItem}>
                        <div className={styles.dayInfo}>
                            <div className={styles.dayName}>{getDayName(day.date)}</div>
                            <div className={styles.dayDate}>{formatDate(day.date)}</div>
                        </div>

                        <div className={styles.dayWeather}>
                            <img
                                src={weatherService.getWeatherIcon(day.weather.icon)}
                                alt={day.weather.description}
                                className={styles.dayIcon}
                            />
                            <div className={styles.dayDescription}>{day.weather.description}</div>
                        </div>

                        <div className={styles.dayTempRange}>
                            <div className={styles.tempBarWrapper}>
                                <span className={styles.tempMin}>{weatherService.formatTemp(day.temp_min)}</span>
                                <div className={styles.tempBar}>
                                    <div
                                        className={styles.tempBarFill}
                                        style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #f97316 100%)' }}
                                    />
                                </div>
                                <span className={styles.tempMax}>{weatherService.formatTemp(day.temp_max)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
