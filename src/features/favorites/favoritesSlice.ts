import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoriteCity, FavoriteCitiesState } from "./favoritesInterfaces";

const initialState: FavoriteCitiesState = {
    favoriteCities: []
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addCityToFavorite: (state, { payload }: PayloadAction<FavoriteCity>) => {
            state.favoriteCities.push(payload)

            if (localStorage.getItem('favoriteCities')) localStorage.removeItem('favoriteCities')
            localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities))
        },

        removeCityFromFavorite: (state, { payload }: PayloadAction<string>) => {
            localStorage.removeItem('favoriteCities')
            state.favoriteCities = state.favoriteCities.filter(city => city.cityKey !== payload)

            if (state.favoriteCities.length) localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities))
        },
    },
})

export const { addCityToFavorite, removeCityFromFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;