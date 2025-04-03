import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const API_KEY = "8883bae4b75acf1de4051d0916bd9cc1"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)
            if (!response.ok) {
                throw new Error("Місто не знайдено")
            }
            const data = await response.json()
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

interface WeatherState {
    loading: boolean
    weather: any | null
    error: string | null
    favorites: string[]
}

const initialState: WeatherState = {
    loading: false,
    weather: null,
    error: null,
    favorites: []
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
                if (typeof window !== "undefined") {
                    localStorage.setItem("favorites", JSON.stringify(state.favorites));
                }
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(city => city !== action.payload);
            if (typeof window !== "undefined") {
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.weather = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addFavorite, removeFavorite, setFavorites } = weatherSlice.actions;

export default weatherSlice.reducer;
