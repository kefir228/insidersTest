import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './slicers/weatherReducer'
import registrationReducer from '@/store/slicers/registrationReducer'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        registration: registrationReducer
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch