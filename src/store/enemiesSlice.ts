import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EResources, ICreation, IAbilities, IResourceEffect } from "../types/creationTypes";

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
    abilities: IAbilities[]
    resistance: IAbilities[]
    health: number
    icon?: string;
};


const initialState = {
    enemies: [{
        id: EEnemy.chaosEnergy,
        name: 'Chaos energy',
        health: 100,
        abilities: [{ resource: EResources.energyBlast, min: 15, max: 45, }],
        resistance: [{ resource: EResources.energyBlast, percentage: 110, }],//it loads from it attack
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

export const enemiesSelector = createSelector(
    [state => state.enemies],
    (enemies: typeof initialState) => enemies.enemies
)


// export const { setSpeed } = enemiesSlice.actions;
export default enemiesSlice.reducer;