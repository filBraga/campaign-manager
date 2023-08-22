import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiHandler from '@/utils/apiHandler';
import { CampaignType } from '@/types/CampaignType';

// https://redux-toolkit.js.org/tutorials/typescript

// ------- TYPES -------
export type CampaignState = {
    entities: CampaignType[];
    entity: CampaignType;
    loading: boolean;
    error: string | null | undefined;
};

// ------- FUNCTIONS -------
export const createCampaign = createAsyncThunk('campaigns/createCampaign', async (campaignData: CampaignType) => {
    // const { data } = await apiHandler('Post', 'campaign', campaignData);
    const maxId = Math.max(...initialState.entities.map((e) => e.id));
    campaignData.id = maxId + 1;
    return campaignData;
});

export const readCampaign = createAsyncThunk('campaigns/readCampaign', async () => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log('Fetching all campaigns...');
    return initialState.entities;
});

// export const readCampaignById = createAsyncThunk(
//     'campaigns/readCampaignById',
//     async (campaignId: string | string[]) => {
//         await new Promise((res) => setTimeout(res, 1000));
//         console.log('Fetching campaign by ID:', campaignId);
//         const campaign = initialState.entities.find((c) => c.id === campaignId);
//         if (!campaign) throw new Error('Campaign not found');
//         return campaign;
//     },
// );

// export const updateCampaign = createAsyncThunk('campaigns/updateCampaign', async (campaignData: CampaignType) => {
//     await new Promise((res) => setTimeout(res, 1000));
//     console.log('Updating campaign:', campaignData);
//     return campaignData;
// });

export const deleteCampaign = createAsyncThunk('campaigns/deleteCampaign', async (campaignData: CampaignType) => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log('Deleting campaign:', campaignData);
    return campaignData;
});

// ------- INITIAL STATE -------
const initialState: CampaignState = {
    entities: [
        {
            id: 1,
            name: 'Campanha de Verão',
            budget: 10000,
            audience: 'Jovens entre 18-25 anos',
            startDate: 'Thu Aug 24 2023 00:00:00 GMT-0300 (Brasilia Standard Time)',
            endDate: 'Thu Aug 24 2023 00:00:00 GMT-0300 (Brasilia Standard Time)',
            status: 'Ativo',
        },
        {
            id: 2,
            name: 'Campanha de Inverno',
            budget: 12000,
            audience: 'Adultos entre 26-35 anos',
            startDate: 'Thu Aug 24 2023 00:00:00 GMT-0300 (Brasilia Standard Time)',
            endDate: 'Thu Aug 24 2023 00:00:00 GMT-0300 (Brasilia Standard Time)',
            status: 'Desativado',
        },
        {
            id: 3,
            name: 'Campanha de Volta às Aulas',
            budget: 8000,
            audience: 'Estudantes de 10-18 anos',
            startDate: 'Thu Aug 24 2023 00:00:00 GMT-0300 (Brasilia Standard Time)',
            endDate: 'Thu Aug 24 2023 00:00:00 GMT-0300 (Brasilia Standard Time)',
            status: 'Aguardando ativação',
        },
        {
            id: 4,
            name: 'Campanha Black Friday',
            budget: 15000,
            audience: 'Todos os públicos',
            startDate: 'Thu Aug 24 2023 00:00:00 GMT-0300 (Brasilia Standard Time)',
            endDate: 'Thu Aug 24 2023 00:00:00 GMT-0300 (Brasilia Standard Time)',
            status: 'Inativo',
        },
    ] as CampaignType[],
    entity: {} as CampaignType,
    loading: false,
    error: null,
};

// ------- SLICE -------
export const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState,
    reducers: {},

    // https://redux-toolkit.js.org/usage/usage-with-typescript#type-safety-with-extrareducers
    extraReducers: (builder) => {
        builder
            .addCase(createCampaign.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCampaign.fulfilled, (state, action) => {
                state.loading = false;
                state.entities.unshift(action.payload); // unsift() adds to the beginning of the array
            })
            .addCase(createCampaign.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
            .addCase(deleteCampaign.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCampaign.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.entities.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) {
                    state.entities = [...state.entities.slice(0, index), ...state.entities.slice(index + 1)];
                }
                state.entity = action.payload;
            })
            .addCase(deleteCampaign.rejected, (state, action) => {
                state.loading = false;
                console.log('Error:', action.error.message);
                state.error = action.error.message;
            })
            .addCase(readCampaign.pending, (state) => {
                state.loading = true;
            })
            .addCase(readCampaign.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = action.payload;
            })
            .addCase(readCampaign.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            });
        // .addCase(readCampaignById.pending, (state) => {
        //     state.loading = true;
        // })
        // .addCase(readCampaignById.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.entity = action.payload;
        // })
        // .addCase(readCampaignById.rejected, (state, action) => {
        //     state.loading = true;
        //     state.error = action.error.message;
        // })
        // .addCase(updateCampaign.pending, (state) => {
        //     state.loading = true;
        // })
        // .addCase(updateCampaign.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.entity = action.payload;
        // })
        // .addCase(updateCampaign.rejected, (state, action) => {
        //     state.loading = true;
        //     state.error = action.error.message;
        // })
    },
});

export default campaignsSlice.reducer;
