import { createSlice } from '@reduxjs/toolkit';

// https://redux-toolkit.js.org/tutorials/typescript

// ------- TYPES -------
export type ModalState = {
    open: Boolean;
};

// ------- INITIAL STATE -------
const initialState: ModalState = {
    open: false,
};

// ------- SLICE -------
export const campaignsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.open = !state.open;
        },
    },
});

export const { toggleModal } = campaignsSlice.actions;
export default campaignsSlice.reducer;
