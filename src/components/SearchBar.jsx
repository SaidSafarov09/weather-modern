import { useState, useEffect, useCallback, useRef } from 'react';
import weatherService from '../services/WeatherService';
import { debounce } from '../utils/debounce';
import styles from './SearchBar.module.scss';

export default function SearchBar({ onSearch, onLocationRequest, isLoading }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    const fetchSuggestions = useCallback(
        debounce(async (searchQuery) => {
            if (searchQuery.length < 1) {
                setSuggestions([]);
                return;
            }

            try {
                const cities = await weatherService.searchCity(searchQuery);
                setSuggestions(cities.slice(0, 5));
                setShowSuggestions(cities.length > 0);
            } catch (error) {
                setSuggestions([]);
            }
        }, 300),
        []
    );

    useEffect(() => {
        if (query) {
            fetchSuggestions(query);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query, fetchSuggestions]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setShowSuggestions(false);
        }
    };

    const handleCitySelect = (city) => {
        const cityName = `${city.displayName}${city.displayState ? `, ${city.displayState}` : ''}, ${city.country}`;
        setQuery(cityName);
        onSearch(city.name);
        setShowSuggestions(false);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            handleCitySelect(suggestions[selectedIndex]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }
    };

    return (
        <div className={styles.searchBar}>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <div className={styles.searchInputWrapper}>
                    <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className={`input ${styles.searchInput}`}
                        placeholder="Поиск города..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        disabled={isLoading}
                        autoComplete="off"
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <div ref={suggestionsRef} className={styles.suggestions}>
                            {suggestions.map((city, index) => (
                                <div
                                    key={`${city.lat}-${city.lon}-${index}`}
                                    className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ''
                                        }`}
                                    onClick={() => handleCitySelect(city)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className={styles.cityName}>
                                        {city.displayName}
                                        {city.displayState && <span className={styles.cityState}>, {city.displayState}</span>}
                                    </div>
                                    <div className={styles.cityCountry}>{city.country}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className={`btn-glass ${styles.locationBtn}`}
                    onClick={onLocationRequest}
                    disabled={isLoading}
                    title="Определить местоположение"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 1v2m0 14v2M1 10h2m14 0h2M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
