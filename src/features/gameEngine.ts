import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollowers, addPower, selectFollowersPerSecond, selectPowerPerSecond } from "../store/statsSlice";
import { selectSpeed } from "../store/gameSlice";
import { setGlobalSpeedMultiplier, updateProgress } from "../store/creations/creationQueueSlice";
import useProcessCompletedItems from "../components/hooks/useProcessCompletedItems";
import { RootState } from "../store/store";
import { ICreation, IResourceEffect } from "../store/creations/creationTypes";
import { addCreation, updateCreationPerSecond } from "../store/creations/creationSlice";

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
    const divinity = useSelector((state: RootState) => state.stats.divinity);


    const creationSpeed = useRef<number>(1);
    const creationsWithEffectsRef = useRef<ICreation[]>([]);
    const creationsRef = useRef<ICreation[]>([]);

    const creations = useSelector((state: RootState) => Object.values(state.creations).flat());

    const creationsWithEffects = useSelector((state: RootState) => Object.values(state.creations)
        .flatMap((o: ICreation[]) => o
            .filter(c => c.owned > 0)))
        .map(o => ({ ...o, effects: o.effects.filter(o => o.resource.mode == 'perSecond') }))
        .filter(c => c.effects && c.effects.length > 0);

    // Selectors to retrieve values from Redux store
    const powerPerSecond = useSelector(selectPowerPerSecond);
    const followersPerSecond = useSelector(selectFollowersPerSecond);
    const speedSelected = useSelector(selectSpeed);


    // Update refs whenever Redux state changes
    useEffect(() => {
        creationsWithEffectsRef.current = creationsWithEffects;
        creationsRef.current = creations;
        powerPerSecondRef.current = powerPerSecond;
        followersPerSecondRef.current = followersPerSecond;
        speedRef.current = speedSelected;
        creationSpeed.current = Math.log10(divinity);
    }, [powerPerSecond, followersPerSecond, speedSelected, divinity, creationsWithEffects]);

    // Function to handle updates during each tick
    const handleTickUpdate = (delta: number) => {
        const deltaMod = delta * speedRef.current;

        // Update followers and power based on the current delta time
        dispatch(addFollowers(followersPerSecondRef.current * deltaMod));
        dispatch(addPower(powerPerSecondRef.current * deltaMod));


        creationsRef.current.forEach(creation => {
            //calculate perSecond for Each
            const perSecond = creationsWithEffectsRef.current.reduce((acc, curr) => {
                // console.log('curr', curr)
                const allEffectsValue = curr.effects.filter(o => o.resource.resource == creation.id).map(o => o.value)
                // console.log('allEffectsValue', allEffectsValue)
                const finalValue = allEffectsValue.reduce((acc2, curr2) => acc2 + curr2 * curr.owned, 0)
                // console.log('finalValue', finalValue)
                return acc + finalValue
            }, 0)
            if (perSecond < 0) return

            // console.log('perSecond', perSecond)

            dispatch(updateCreationPerSecond({ id: creation.id, count: perSecond }));

            if (perSecond <= 0) return
            dispatch(addCreation({ id: creation.id, count: perSecond * deltaMod }));
        })



        // Update progress for creation queues
        dispatch(updateProgress({ delta: deltaMod }));

        // console.log('speedMod', speedMod)
        dispatch(setGlobalSpeedMultiplier(Math.max(1, creationSpeed.current)))

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