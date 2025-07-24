import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { creationList } from './creationList';
import { elements } from './elements';

const initialState = {
    creations: creationList,
    elements: elements
}

const creationsSlice = createSlice({
    name: 'creations',
    initialState,
    reducers: {
        // Action to "buy" a creation
        addCreation: (state, action: PayloadAction<{ id: string, count: number }>) => {
            Object.values(state).forEach(s => {
                const creation = s.find((c) => c.id === action.payload.id);
                // console.log('creation', creation, action.payload)
                if (!creation) return;
                if (creation && creation.owned != null) {
                    creation.owned += action.payload.count; // Increase the number owned
                }
            })
        },

    },
});

export const { addCreation } = creationsSlice.actions;
export default creationsSlice.reducer;