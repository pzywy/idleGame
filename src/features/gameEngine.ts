import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollowers, addPower, selectFollowersPerSecond, selectPowerPerSecond } from "../store/statsSlice";
import { selectSpeed } from "../store/gameSlice";
import { updateProgress } from "../store/creations/creationQueueSlice";
import useProcessCompletedItems from "../components/hooks/useProcessCompletedItems";

// Constants
const MIN_TICK_IN_SECONDS = 0.1;

const useGameEngine = () => {
    const dispatch = useDispatch();

    // Process completed items globally (e.g., from creation queues)
    useProcessCompletedItems();

    // Refs to store dynamic values for calculations
    const powerPerSecondRef = useRef<number>(0);
    const followersPerSecondRef = useRef<number>(0);
    const lastUpdateRef = useRef<number>(performance.now());
    const speedRef = useRef<number>(1);

    // Selectors to retrieve values from Redux store
    const powerPerSecond = useSelector(selectPowerPerSecond);
    const followersPerSecond = useSelector(selectFollowersPerSecond);
    const speedSelected = useSelector(selectSpeed);

    // Update refs whenever Redux state changes
    useEffect(() => {
        powerPerSecondRef.current = powerPerSecond;
        followersPerSecondRef.current = followersPerSecond;
        speedRef.current = speedSelected;
    }, [powerPerSecond, followersPerSecond, speedSelected]);

    // Function to handle updates during each tick
    const handleTickUpdate = (delta: number) => {
        const deltaMod = delta * speedRef.current;

        // Update followers and power based on the current delta time
        dispatch(addFollowers(followersPerSecondRef.current * deltaMod));
        dispatch(addPower(powerPerSecondRef.current * deltaMod));

        // Update progress for creation queues
        dispatch(updateProgress({ delta: deltaMod }));

        // TODO: Add logic to update base speed or other stats if needed
    };

    // Game loop to calculate elapsed time and trigger updates
    useEffect(() => {
        const gameLoop = (timestamp: number) => {
            const elapsed = (timestamp - lastUpdateRef.current) / 1000; // Time elapsed in seconds

            if (elapsed >= MIN_TICK_IN_SECONDS) {
                lastUpdateRef.current = timestamp;
                handleTickUpdate(elapsed);
            }

            requestAnimationFrame(gameLoop);
        };

        // Start the game loop
        requestAnimationFrame(gameLoop);

        // Cleanup function (optional, not needed in this case)
        return () => { };
    }, [dispatch]);

    return null; // This hook doesn't render anything
};

export default useGameEngine;