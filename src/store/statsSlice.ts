import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { EResources, IElement } from './creations/creationTypes';

const initialState = {
    power: 100, // Player's current power
    followers: 0,
    divinity: 0,
    might: 0,
    powerPerFollower: 0.1,
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        addStat: (state, action: { payload: { amount: number, id: EResources } }) => {
            switch (action.payload.id) {
                case EResources.power: state.power += action.payload.amount;
                    break;
                case EResources.followers: state.followers += action.payload.amount;
                    break;
                default: throw new Error(`resource ${action.payload.id} not handled!`);
            }
        },
        addPower: (state, action: { payload: number }) => {
            state.power += action.payload; // Increment power by the given amount
        },
        addFollowers: (state, action: { payload: number }) => {
            state.followers += action.payload; // Increment power by the given amount        
        },
        addDivinity: (state, action: { payload: number }) => {
            state.divinity += action.payload; // Increment power by the given amount        
        },
        addMight: (state, action: { payload: number }) => {
            state.might += action.payload; // Increment power by the given amount        
        },
    },
});


export const selectPowerPerSecond = (state: RootState) => {
    //TODO bonuses
    const fromFollowers = state.stats.followers * state.stats.powerPerFollower;
    return fromFollowers;
};

export const selectFollowersPerSecond = (state: RootState): number => {
    //TODO bonuses

    return state.creations.creations
        .filter(o => o.type == 'owned')
        .map(o => {
            const effectWithProperResource = o.effects.filter(effect => effect.resource.resource == EResources.followers && effect.resource.mode == 'perSecond')
            return o.owned * effectWithProperResource.reduce((acc, curr) => acc + curr.value, 0)

        })
        .reduce((acc, curr) => acc + curr, 0)
};

export const { addFollowers, addPower, addStat } = statsSlice.actions;
export default statsSlice.reducer;