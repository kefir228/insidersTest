'use client'

import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setFavorites, removeFavorite } from "@/store/slicers/weatherReducer";
import { fetchWeather } from "@/store/slicers/weatherReducer";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/utils/hooks";

export default function FavoriteCity() {
    const dispatch = useAppDispatch();
    const favorites = useSelector((state: RootState) => state.weather.favorites);
    const weatherData = useSelector((state: RootState) => state.weather.weather);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedFavorites = localStorage.getItem("favorites");
            if (savedFavorites) {
                dispatch(setFavorites(JSON.parse(savedFavorites)));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        favorites.forEach(city => {
            dispatch(fetchWeather(city));
        });
    }, [dispatch, favorites]);

    const handleRemove = (city: string) => {
        dispatch(removeFavorite(city));
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Список обраних міст</h1>
                <Link href="/" className="text-blue-500 hover:underline">На головну</Link>
            </div>

            <ul>
                {favorites.length === 0 ? (
                    <p>Немає обраних міст</p>
                ) : (
                    favorites.map(city => {
                        const cityWeather = weatherData[city];
                        
                        return (
                            <li key={city} className="flex justify-between items-center p-3 border-b">
                                <div>
                                    <h2 className="text-xl font-semibold">{city}</h2>
                                    {cityWeather ? (
                                        <div className="flex items-center gap-2">
                                            <img 
                                                src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`} 
                                                alt="weather icon" 
                                            />
                                            <p>{cityWeather.main.temp}°C, {cityWeather.weather[0].description}</p>
                                        </div>
                                    ) : (
                                        <p>Завантаження...</p>
                                    )}
                                </div>
                                <button 
                                    onClick={() => handleRemove(city)} 
                                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                                >
                                    Видалити
                                </button>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
}
