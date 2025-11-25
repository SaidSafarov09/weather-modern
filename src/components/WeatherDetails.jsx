import { formatTime, getWindDirection, formatVisibility } from '../utils/formatters';
import styles from './WeatherDetails.module.scss';

const DetailIcon = ({ children, color }) => (
    <div className={styles.detailIcon} style={{ color }}>
        {children}
    </div>
);

export default function WeatherDetails({ data }) {
    if (!data) return null;

    const { main, wind, visibility, sys } = data;

    const details = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            label: 'Влажность',
            value: `${main.humidity}%`,
            color: 'var(--accent-blue)'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            label: 'Ветер',
            value: `${Math.round(wind.speed)} м/с ${getWindDirection(wind.deg || 0)}`,
            color: 'var(--accent-purple)'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
            label: 'Давление',
            value: `${main.pressure} мм рт. ст.`,
            color: 'var(--accent-orange)'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
            ),
            label: 'Видимость',
            value: formatVisibility(visibility),
            color: 'var(--accent-pink)'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 18a5 5 0 0 0-10 0m5-13V3m-7.78 2.22l1.42 1.42M1 18h2m18 0h2m-4.64-12.36l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            label: 'Восход',
            value: formatTime(sys.sunrise),
            color: 'var(--accent-yellow)'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 18a5 5 0 0 0-10 0m5 3V19m-7.78-2.22l1.42-1.42M1 18h2m18 0h2m-4.64-12.36l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            label: 'Закат',
            value: formatTime(sys.sunset),
            color: 'var(--accent-orange)'
        }
    ];

    return (
        <div className={styles.weatherDetails}>
            <h2 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Подробности
            </h2>

            <div className={styles.detailsGrid}>
                {details.map((detail, index) => (
                    <div key={index} className={`${styles.detailCard} glass-card`}>
                        <DetailIcon color={detail.color}>{detail.icon}</DetailIcon>
                        <div className={styles.detailContent}>
                            <div className={styles.detailLabel}>{detail.label}</div>
                            <div className={styles.detailValue}>{detail.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
