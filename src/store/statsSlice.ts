import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IStats } from './creations/creationTypes';

const initialState = {
    power: 100, // Player's current power
    powerPerFollower: 0.1,
    followers: 0,
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        addPower: (state, action: { payload: number }) => {
            state.power += action.payload; // Increment power by the given amount
        },
        addFollowers: (state, action: { payload: number }) => {
            state.followers += action.payload; // Increment power by the given amount        
        },
    },
});


export const selectPowerPerSecond = (state: RootState) => {
    const fromFollowers = state.stats.followers * state.stats.powerPerFollower;
    return fromFollowers;
};

export const selectFollowersPerSecond = (state: RootState): number => {

    return state.creations.creations
        .filter(o => o.type == 'owned')
        .map(o => {
            const effectWithProperResource = o.effects.filter(effect => effect.resource == IStats.followersPS)
            return o.owned * effectWithProperResource.reduce((acc, curr) => acc + curr.value, 0)

        })
        .reduce((acc, curr) => acc + curr, 0)
};

export const { addFollowers, addPower } = statsSlice.actions;
export default statsSlice.reducer;