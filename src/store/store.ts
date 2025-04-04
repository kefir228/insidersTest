import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './slicers/weatherReducer'
import registrationReducer from '@/store/slicers/registrationReducer'
import themeReducer from '@/store/slicers/themeReducer'

const preloadedState = {
    theme: {
      theme: (typeof window !== "undefined" && localStorage.getItem("theme")) || "light",
    },
  };

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        registration: registrationReducer,
        theme: themeReducer,
    },
    preloadedState, 
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch