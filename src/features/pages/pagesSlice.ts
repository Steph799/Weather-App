import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatusPage, PagesState } from './pagesInterfaces'

const initialState: PagesState = {
    page: StatusPage.weather
};

export const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        changePage: (state, { payload }: PayloadAction<StatusPage>) => {
            state.page = payload
        }
    },
})

export const { changePage } = pagesSlice.actions;

export default pagesSlice.reducer;
