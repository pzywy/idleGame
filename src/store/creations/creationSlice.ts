import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { creationList } from './creationList';

const initialState = creationList

const creationsSlice = createSlice({
    name: 'creations',
    initialState,
    reducers: {
        // Action to "buy" a creation
        addCreation: (state, action: PayloadAction<{ id: string, count: number }>) => {
            const creation = state.creations.find((c) => c.id === action.payload.id);
            if (creation && creation.owned != null) {
                creation.owned += action.payload.count; // Increase the number owned
            }
        },
    },
});

export const { addCreation } = creationsSlice.actions;
export default creationsSlice.reducer;