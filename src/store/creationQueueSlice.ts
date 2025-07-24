// store/creationQueueSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EResources, ICreation } from "../types/creationTypes";

interface CreationQueueState {
    globalSpeedMultiplier: number; // Global speed multiplier
    creations:
    Partial<Record<EResources, {
        progress: number; // Progress percentage for the current item (0-100)
        count: number; // Number of items in the queue
        baseCreationTime: number; // Base creation time in seconds for this creation
        completedCount: number; // Number of completed items
    }>>
    ;
}

const initialState: CreationQueueState = {
    globalSpeedMultiplier: 1, // Default global speed multiplier
    creations: {},
};

const creationQueueSlice = createSlice({
    name: "creationQueue",
    initialState,
    reducers: {
        addToQueue: (
            state,
            action: PayloadAction<{ creationId: ICreation["id"]; count: number; baseTime: number }>
        ) => {
            const { creationId, count, baseTime } = action.payload;

            if (!state.creations[creationId]) {
                state.creations[creationId] = {
                    progress: 0,
                    count: 0,
                    baseCreationTime: baseTime,
                    completedCount: 0,
                };
            }

            //@ts-ignore
            state.creations[creationId].count += count; // Increment the count
            //@ts-ignore
            state.creations[creationId].baseCreationTime = baseTime; // Update base creation time
        },
        updateProgress: (
            state,
            action: PayloadAction<{ delta: number }>
        ) => {
            const delta = action.payload.delta;

            for (const creationId in state.creations) {
                const creation = state.creations[creationId as EResources];
                if (!creation || creation.count === 0) continue;

                //instant completion
                if (creation.baseCreationTime == 0) {
                    creation.completedCount = creation.count
                    creation.count = 0;
                    continue;
                }

                const adjustedDelta = delta * state.globalSpeedMultiplier; // Adjust delta by the global speed multiplier
                const progressIncrement = (adjustedDelta / creation.baseCreationTime) * 100;

                creation.progress += progressIncrement;

                // Calculate the number of items completed in one step
                const completedItems = Math.floor(creation.progress / 100);
                creation.completedCount += Math.min(completedItems, creation.count); // Increment completed count
                creation.count -= Math.min(completedItems, creation.count); // Decrease the count
                creation.progress %= 100; // Keep the remaining progress below 100%
            }
        },
        setGlobalSpeedMultiplier: (state, action: PayloadAction<number>) => {
            state.globalSpeedMultiplier = action.payload; // Update the global speed multiplier
        },
        clearQueue: (state, action: PayloadAction<ICreation["id"]>) => {
            const creationId = action.payload;
            if (state.creations[creationId]) {
                //@ts-ignore
                state.creations[creationId].progress = 0; // Reset progress
                //@ts-ignore
                state.creations[creationId].count = 0; // Clear the queue count
            }
        },
        clearCompleted: (state, action: PayloadAction<ICreation["id"]>) => {
            const creationId = action.payload;
            if (state.creations[creationId]) {
                //@ts-ignore
                state.creations[creationId].completedCount = 0; // Reset completed count
            }
        },
    },
});

export const {
    addToQueue,
    updateProgress,
    setGlobalSpeedMultiplier,
    clearQueue,
    clearCompleted,
} = creationQueueSlice.actions;

export default creationQueueSlice.reducer;