import { configureStore } from '@reduxjs/toolkit';
import campaignsReducer, { CampaignState } from './slice/campaignSlice';
import drawerReducer, { DrawerState } from './slice/drawerSlice';
import modalReducer, { ModalState } from './slice/modalSlice';

// ------- TYPES -------
export type RootState = {
    campaigns: CampaignState;
    drawer: DrawerState;
    modal: ModalState;
};

export type AppDispatch = typeof store.dispatch;

// ------- STORE -------

export const store = configureStore({
    reducer: {
        campaigns: campaignsReducer,
        drawer: drawerReducer,
        modal: modalReducer,
    },
});
