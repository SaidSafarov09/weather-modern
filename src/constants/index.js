export const WEATHER_BACKGROUNDS = {
    Clear: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    Clouds: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
    Rain: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    Snow: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    Thunderstorm: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
    Drizzle: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    Mist: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
};

export const WEEK_DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const WIND_DIRECTIONS = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];

export const DEFAULT_LOCATION = null;

export const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    GEO_URL: 'https://api.openweathermap.org/geo/1.0',
    UNITS: 'metric',
    LANG: 'ru',
};

export const ERROR_MESSAGES = {
    INVALID_API_KEY: 'Неверный API ключ. Пожалуйста, проверьте настройки.',
    CITY_NOT_FOUND: 'Город не найден. Попробуйте другое название.',
    RATE_LIMIT: 'Превышен лимит запросов. Попробуйте позже.',
    NETWORK_ERROR: 'Нет соединения с сервером. Проверьте интернет.',
    GEOLOCATION_UNAVAILABLE: 'Геолокация не поддерживается вашим браузером',
    GEOLOCATION_DENIED: 'Не удалось определить местоположение. Пожалуйста, разрешите доступ к геолокации.',
    UNKNOWN_ERROR: 'Произошла ошибка. Попробуйте снова.',
};
