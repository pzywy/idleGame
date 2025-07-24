// store/creationQueueSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreation } from "./creationTypes";

interface QueueItem {
    id: number;
    progress: number; // Progress percentage (0-100)
}

interface CompletedItem {
    creationId: ICreation['id']; // ID of the creation type
}

interface CreationQueueState {
    [creationId: ICreation['id']]: {
        queue: QueueItem[];
        baseCreationTime: number; // Base creation time in seconds for this creation
        completed: CompletedItem[]; // List of completed items
    };
}

const initialState: CreationQueueState = {};

const creationQueueSlice = createSlice({
    name: "creationQueue",
    initialState,
    reducers: {
        addToQueue: (
            state,
            action: PayloadAction<{ creationId: ICreation['id']; count: number; baseTime: number }>
        ) => {
            const { creationId, count, baseTime } = action.payload;

            if (!state[creationId]) {
                state[creationId] = {
                    queue: [],
                    baseCreationTime: baseTime,
                    completed: [],
                };
            }

            for (let i = 0; i < count; i++) {
                state[creationId].queue.push({
                    id: Date.now() + i,
                    progress: 0,
                });
            }
        },
        updateProgress: (state, action: PayloadAction<number>) => {
            const delta = action.payload;

            for (const creationId in state) {
                const creation = state[creationId];
                if (!creation.queue.length) continue;

                const currentItem = creation.queue[0];
                currentItem.progress += (delta / creation.baseCreationTime) * 100;

                if (currentItem.progress >= 100) {
                    creation.queue.shift(); // Remove completed item
                    creation.completed.push({ creationId: creationId }); // Track completed item
                }
            }
        },
        clearQueue: (state, action: PayloadAction<ICreation['id']>) => {
            const creationId = action.payload;
            if (state[creationId]) {
                state[creationId].queue = []; // Clear the queue
            }
        },
        clearCompleted: (state, action: PayloadAction<ICreation['id']>) => {
            const creationId = action.payload;
            if (state[creationId]) {
                state[creationId].completed = []; // Clear completed items
            }
        },
    },
});

export const { addToQueue, updateProgress, clearQueue, clearCompleted } = creationQueueSlice.actions;
export default creationQueueSlice.reducer;