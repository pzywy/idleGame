// gameSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
    speed: 1, // Default speed multiplier
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload; // Update speed
        },
    },
});

export const { setSpeed } = gameSlice.actions;
export const selectSpeed = (state: RootState) => state.game.speed; // Selector for speed
export default gameSlice.reducer;