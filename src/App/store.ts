import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from 'features/weather/weatherSlice'
import FavoriteCityReducer from 'features/favorites/favoritesSlice';
import PageReducer from 'features/pages/pagesSlice'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        favorite: FavoriteCityReducer,
        page: PageReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch