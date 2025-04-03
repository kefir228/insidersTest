"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "@/store/slicers/weatherReducer";
import { RootState, AppDispatch } from "@/store/store";
import { addFavorite } from "@/store/slicers/weatherReducer";
import Link from 'next/link'

const POPULAR_CITIES = ["Kyiv", "New York", "London", "Tokyo"];

export default function Home() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { weather, loading, error } = useSelector((state: RootState) => state.weather);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [popularCitiesWeather, setPopularCitiesWeather] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularCities = async () => {
      const responses = await Promise.all(POPULAR_CITIES.map((city) => dispatch(fetchWeather(city))));
      setPopularCitiesWeather(responses.map((res) => res.payload).filter(Boolean));
    };
    fetchPopularCities();
  }, [dispatch]);

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  };

  const handleAddFavorite = () => {
    if (weather && weather.name) {
      dispatch(addFavorite(weather.name))
    }
  };

  const handleLogout = () => {
    setFavorites([]);
    setCity("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Погода</h1>

      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введіть назву міста"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button onClick={handleSearch} className="w-full mt-2 p-2 bg-gray-500 text-white rounded cursor-pointer">
          Пошук
        </button>
      </div>

      {loading && <p>Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-bold">{weather.name}</h2>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Опис: {weather.weather[0].description}</p>
          <button onClick={handleAddFavorite} className="mt-2 p-2 bg-gray-500 text-white rounded cursor-pointer">
            <Link href="/favorites">
              Додати до обраного
            </Link>
          </button>
        </div>
      )}

      <h2 className="text-lg font-bold mt-6">Популярні міста</h2>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {popularCitiesWeather.map((cityWeather) => (
          <div key={cityWeather.name} className="p-3 border rounded bg-gray-200">
            <h3 className="font-bold">{cityWeather.name}</h3>
            <p>{cityWeather.main.temp}°C</p>
          </div>
        ))}
      </div>
      <ul>
        <button onClick={handleLogout} className="mt-6 w-full p-2 bg-red-500 text-white rounded cursor-pointer">
          Log out
        </button>
        <button onClick={handleLogout} className="mt-6 w-full p-2 bg-gray-500 text-white rounded cursor-pointer">
          <Link href='/registration'>
            Зареєструватись
          </Link>
        </button>
        <button onClick={handleLogout} className="mt-6 w-full p-2 bg-gray-500 text-white rounded cursor-pointer">
          <Link href="/login">
            Увійти
          </Link>
        </button>
      </ul>

    </div>
  );
}


