import { configureStore } from '@reduxjs/toolkit';
import creationReducer from './creationSlice'; // Import the stats reducer
import gameReducer from './gameSlice'; // Import the stats reducer
import creationQueue from './creationQueueSlice'; // Import the stats reducer
import enemiesReducer from './enemiesSlice'; // Import the stats reducer
const store = configureStore({
    reducer: {
        creations: creationReducer,
        game: gameReducer,
        creationQueue,
        enemies: enemiesReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;