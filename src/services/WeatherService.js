import axios from 'axios';
import { API_CONFIG, ERROR_MESSAGES } from '../constants';

const { BASE_URL, GEO_URL, UNITS, LANG } = API_CONFIG;
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo';

class WeatherService {
    async getCurrentWeather(lat, lon) {
        try {
            const response = await axios.get(`${BASE_URL}/weather`, {
                params: { lat, lon, appid: API_KEY, units: UNITS, lang: LANG }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getForecast(lat, lon) {
        try {
            const response = await axios.get(`${BASE_URL}/forecast`, {
                params: { lat, lon, appid: API_KEY, units: UNITS, lang: LANG }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async searchCity(cityName) {
        try {
            const response = await axios.get(`${GEO_URL}/direct`, {
                params: { q: cityName, limit: 10, appid: API_KEY }
            });

            const cities = response.data.map(city => ({
                ...city,
                local_names: city.local_names || {},
                displayName: city.local_names?.ru || city.name,
                displayState: city.state || ''
            }));

            return cities;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getFullWeatherData(lat, lon) {
        try {
            const [current, forecast] = await Promise.all([
                this.getCurrentWeather(lat, lon),
                this.getForecast(lat, lon)
            ]);

            return {
                current,
                forecast: this.processForecastData(forecast)
            };
        } catch (error) {
            throw this.handleError(error);
        }
    }

    processForecastData(forecastData) {
        const hourly = forecastData.list.slice(0, 8);

        const dailyMap = new Map();
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString('ru-RU');
            if (!dailyMap.has(date)) {
                dailyMap.set(date, {
                    date: item.dt,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    weather: item.weather[0],
                    humidity: item.main.humidity,
                    wind_speed: item.wind.speed,
                    items: []
                });
            }

            const day = dailyMap.get(date);
            day.temp_min = Math.min(day.temp_min, item.main.temp_min);
            day.temp_max = Math.max(day.temp_max, item.main.temp_max);
            day.items.push(item);
        });

        const daily = Array.from(dailyMap.values()).slice(0, 7);

        return { hourly, daily, city: forecastData.city };
    }

    getWeatherIcon(iconCode) {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

    getWeatherIconLarge(iconCode) {
        return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    }

    formatTemp(temp) {
        return `${Math.round(temp)}°`;
    }

    handleError(error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return new Error(ERROR_MESSAGES.INVALID_API_KEY);
                case 404:
                    return new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
                case 429:
                    return new Error(ERROR_MESSAGES.RATE_LIMIT);
                default:
                    return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
            }
        } else if (error.request) {
            return new Error(ERROR_MESSAGES.NETWORK_ERROR);
        } else {
            return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
        }
    }
}

export default new WeatherService();
