import { configureStore } from '@reduxjs/toolkit';
import creationReducer from './creations/creationSlice'; // Import the stats reducer
import statsSlice from './statsSlice'; // Import the stats reducer
import gameReducer from './gameSlice'; // Import the stats reducer
import creationQueue from './creations/creationQueSlice'; // Import the stats reducer
const store = configureStore({
    reducer: {
        stats: statsSlice,
        creations: creationReducer,
        game: gameReducer,
        creationQueue
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;