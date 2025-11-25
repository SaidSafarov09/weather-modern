export const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
};

export const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
};

export const getWindDirection = (degrees) => {
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
};

export const formatTemperature = (temp) => {
    return `${Math.round(temp)}°`;
};

export const formatVisibility = (visibility) => {
    return `${(visibility / 1000).toFixed(1)} км`;
};

export const getLocalTime = (timezoneOffset) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (timezoneOffset * 1000));

    return localTime.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

export const getLocalDate = (timezoneOffset) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (timezoneOffset * 1000));

    return localTime.toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
};
