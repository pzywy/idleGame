// gameSlice.ts
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
    speed: 1, // Default speed multiplier
    fowardTime: 0,
    maxFowardTime: 100,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload; // Update speed
        },
        addForwardTime: (state, action: PayloadAction<number>) => {
            state.fowardTime += action.payload; // Update speed
        },
    },
});

export const gameSpeedSelect = createSelector(
    [state => state.game],
    (game: typeof initialState) => game.speed
)

export const forwardTimeSelect = createSelector(
    [state => state.game],
    (game: typeof initialState) => game.fowardTime
)
export const maxForwardTimeSelect = createSelector(
    [state => state.game],
    (game: typeof initialState) => game.maxFowardTime
)

export const { setSpeed, addForwardTime } = gameSlice.actions;
export const selectSpeed = (state: RootState) => state.game.speed; // Selector for speed
export default gameSlice.reducer;