import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EResources, ICreation, IPower, IResourceEffect } from "../types/creationTypes";

export enum EEnemy {
    chaosEnergy = 'chaosEnergy',
}

export type IAttack = {
    name: string,
    value: number,
    tick: number
}

export type IEnemy = {
    id: EEnemy;
    name: string;
    defeated: number,
    effects: IResourceEffect[],
    powers: IPower[]
    health: number
    icon?: string;
};


const initialState = {
    enemies: [{
        id: EEnemy.chaosEnergy,
        name: 'Chaos energy',
        health: 100,
        powers: [{ resource: EResources.energyBlast, value: 1 }],
        defeated: 0,
        effects: [{ resource: EResources.energy, mode: 'instant', value: 10 }]
    }] as IEnemy[], // Default speed multiplier
};

const enemiesSlice = createSlice({
    name: "enemies",
    initialState,
    reducers: {
    },
});

// export const gameSpeedSelect = createSelector(
//     [state => state.game],
//     (game: typeof initialState) => game.speed
// )


// export const { setSpeed } = enemiesSlice.actions;
export default enemiesSlice.reducer;