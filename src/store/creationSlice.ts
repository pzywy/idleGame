import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { creationList } from './creations/creations';
import { elements } from './creations/elements';
import { stats } from './creations/stats';
import { utilsCreations } from './creations/utilsCreations';
import { ECreationType, EResources, ICreation } from '../types/creationTypes';

export type ICreationsIndex = Partial<Record<EResources, ICreation>>
const initialState = {
    allCreations: [
        ...creationList,
        ...elements,
        ...stats,
        ...utilsCreations,
    ].flat().reduce((acc, creation) => {
        acc[creation.id] = creation;
        return acc;
    }, {} as ICreationsIndex),
    // creations: creationList,
    // elements: elements,
    // stats: stats,
    // utils: utilsCreations,
};

const getCreationFromState = (state: typeof initialState, id: EResources): ICreation | undefined => {
    // const indexState = Object.values(state).flat().reduce((acc, creation) => {
    //     acc[creation.id] = creation;
    //     return acc;
    // }, {} as ICreationsIndex);
    // return indexState[id];

    return state.allCreations[id]
};


const creationsSlice = createSlice({
    name: 'creations',
    initialState,
    selectors: {
    },
    reducers: {
        addCreation: (state, action: PayloadAction<{ id: EResources, count: number }>) => {
            const creation = getCreationFromState(state, action.payload.id);
            if (!creation) return;

            if (creation && creation.owned != null) {

                // console.log('action.payload', action.payload, creation.owned)
                const value = action.payload.count

                if (value < 0 && -value > creation.owned)
                    throw new Error('You cant destroy more creation than you have!!' + JSON.stringify(action.payload))

                creation.owned += value; // Increase the number owned
                if (value > 0)
                    creation.created += value; // Increase the number owned
            }

        },
        setCreationCount: (state, action: PayloadAction<{ id: EResources, count: number }>) => {
            const creation = getCreationFromState(state, action.payload.id);

            if (!creation) return;
            if (action.payload.count < 0)
                throw new Error('You cant have less then 0 creations!!' + JSON.stringify(action.payload))
            creation.owned = action.payload.count

        },
        setCreationEffectiveValue: (state, action: PayloadAction<{ id: EResources, count: number }>) => {
            const creation = getCreationFromState(state, action.payload.id);
            if (!creation) return;

            if (action.payload.count < 0)
                throw new Error('You cant have less then 0 effective value!!' + JSON.stringify(action.payload))

            creation.effectiveValue = action.payload.count

        },
        setCreationAutobuy: (state, action: PayloadAction<{ id: EResources, value: boolean }>) => {
            const creation = getCreationFromState(state, action.payload.id);
            if (!creation) return;
            if (!creation || creation.type != ECreationType.elements) return;

            creation.autobuy = action.payload.value

        },
        updateCreationPerSecond: (state, action: PayloadAction<{ id: EResources, count: number }>) => {
            const creation = getCreationFromState(state, action.payload.id);
            if (!creation) return;
            if (!creation) return;
            creation.perSecond = action.payload.count

        },

    },
});


export const allCreationsSelector = createSelector(
    [state => state.creations],
    (creations: typeof initialState) => Object.values(creations.allCreations),
)


export const creationsWithEffectSelector = createSelector(
    [state => state.creations],
    (creations: typeof initialState) => Object.values(creations.allCreations)
        // .flatMap((o: ICreation[]) => o.filter(c => c.owned >= 0))
        // .flatMap((o: ICreation[]) => o.filter(c => c.owned >= 0))
        .map(o => ({ ...o, effects: o.effects.filter(o => o.mode && o.mode != 'instant') }))
        .filter(c => c.effects && c.effects.length > 0)
)


export const creationsSelector = createSelector(
    [state => state.creations],
    (creations: typeof initialState) => Object.values(creations.allCreations).filter(o => o.type == ECreationType.creations)
)
export const elementsSelector = createSelector(
    [state => state.creations],
    (creations: typeof initialState) => Object.values(creations.allCreations).filter(o => o.type == ECreationType.elements)
)
export const statsSelector = createSelector(
    [state => state.creations],
    (creations: typeof initialState) => Object.values(creations.allCreations).filter(o => o.type == ECreationType.stats)
)
export const utilsSelector = createSelector(
    [state => state.creations],
    (creations: typeof initialState) => Object.values(creations.allCreations).filter(o => o.type == ECreationType.utility)
)





export const { addCreation, updateCreationPerSecond, setCreationCount, setCreationEffectiveValue, setCreationAutobuy } = creationsSlice.actions;


export default creationsSlice.reducer;
