import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { creationList } from './creations';
import { elements } from './elements';
import { stats } from './stats';
import { EResources } from './creationTypes';

const initialState = {
    creations: creationList,
    elements: elements,
    stats: stats
}

const creationsSlice = createSlice({
    name: 'creations',
    initialState,
    reducers: {
        // Action to "buy" a creation
        addCreation: (state, action: PayloadAction<{ id: EResources, count: number }>) => {
            Object.values(state).forEach(s => {
                const creation = s.find((c) => c.id === action.payload.id);
                // console.log('creation', creation, action.payload)
                if (!creation) return;
                if (creation && creation.owned != null) {
                    creation.owned += action.payload.count; // Increase the number owned
                    creation.created += action.payload.count; // Increase the number owned
                }
            })
        },
        updateCreationPerSecond: (state, action: PayloadAction<{ id: EResources, count: number }>) => {
            Object.values(state).forEach(s => {
                const creation = s.find((c) => c.id === action.payload.id);
                if (!creation) return;
                creation.perSecond = action.payload.count
            })
        },

    },
});

export const { addCreation, updateCreationPerSecond } = creationsSlice.actions;
export default creationsSlice.reducer;