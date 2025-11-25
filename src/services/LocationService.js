import axios from 'axios';

class LocationService {
    async getIpLocation() {
        try {
            const response = await axios.get('https://ipwho.is/');

            if (!response.data.success) {
                throw new Error(response.data.message || 'IP Geolocation failed');
            }

            return {
                lat: response.data.latitude,
                lon: response.data.longitude,
                city: response.data.city,
                country: response.data.country
            };
        } catch (error) {
            console.error('IP Location error:', error);
            throw error;
        }
    }
}

export default new LocationService();
