import { createSlice } from '@reduxjs/toolkit';

// https://redux-toolkit.js.org/tutorials/typescript

// ------- TYPES -------
export type DrawerState = {
    open: Boolean;
};

// ------- INITIAL STATE -------
const initialState: DrawerState = {
    open: false,
};

// ------- SLICE -------
export const campaignsSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.open = !state.open;
        },
    },
});

export const { toggleDrawer } = campaignsSlice.actions;
export default campaignsSlice.reducer;
