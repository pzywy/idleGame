import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { creationList } from './creations/creations';
import { elements } from './creations/elements';
import { stats } from './creations/stats';
import { utilsCreations } from './creations/utilsCreations';
import { EResources } from '../types/creationTypes';


const initialState = {
    creations: creationList,
    elements: elements,
    stats: stats,
    utils: utilsCreations
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
        setCreationCount: (state, action: PayloadAction<{ id: EResources, count: number }>) => {
            Object.values(state).forEach(s => {
                const creation = s.find((c) => c.id === action.payload.id);
                // console.log('creation', creation, action.payload)
                if (!creation) return;
                creation.owned = action.payload.count
            })
        },
        setCreationEffectiveValue: (state, action: PayloadAction<{ id: EResources, count: number }>) => {
            Object.values(state).forEach(s => {
                const creation = s.find((c) => c.id === action.payload.id);
                // console.log('creation', creation, action.payload)
                if (!creation) return;
                creation.effectiveValue = action.payload.count
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

export const { addCreation, updateCreationPerSecond, setCreationCount, setCreationEffectiveValue } = creationsSlice.actions;
export default creationsSlice.reducer;