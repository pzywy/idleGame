import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSpeed } from "../store/gameSlice";
import { setGlobalSpeedMultiplier, updateProgress } from "../store/creationQueueSlice";
import useProcessCompletedItems from "./hooks/useProcessCompletedItems";
import { RootState } from "../store/store";
import { EResources, ICreation, IResourceEffect } from "../types/creationTypes";
import { addCreation, setCreationCount, setCreationEffectiveValue, updateCreationPerSecond } from "../store/creationSlice";
import { calculateResourceValue } from "../utils/formatFunctions";
import { useAutobuyItems } from "./hooks/useAutobuyItems";

// Constants
const MIN_TICK_IN_SECONDS = 0.1;

const useGameEngine = () => {
    const dispatch = useDispatch();

    const { autobuyItems } = useAutobuyItems();

    useProcessCompletedItems();




    // Refs to store dynamic values for calculations
    const lastUpdateRef = useRef<number>(performance.now());
    const speedRef = useRef<number>(1);
    const creationsWithEffectsRef = useRef<ICreation[]>([]);
    const creationsRef = useRef<ICreation[]>([]);
    const autobuyItemsRef = useRef(autobuyItems);

    const creations = useSelector((state: RootState) => Object.values(state.creations).flat());

    const creationsWithEffects = useSelector((state: RootState) => Object.values(state.creations)
        .flatMap((o: ICreation[]) => o.filter(c => c.owned > 0)))
        .map(o => ({ ...o, effects: o.effects.filter(o => !!o.resource.mode) }))
        .filter(c => c.effects && c.effects.length > 0);


    const speedSelected = useSelector(selectSpeed);


    // Update refs whenever Redux state changes
    useEffect(() => {
        creationsWithEffectsRef.current = creationsWithEffects;
        creationsRef.current = creations;
        speedRef.current = speedSelected;
        autobuyItemsRef.current = autobuyItems;
    }, [speedSelected, creationsWithEffects, autobuyItems, creations]);

    // Function to handle updates during each tick
    const handleTickUpdate = (delta: number) => {
        const deltaMod = delta * speedRef.current;


        creationsRef.current.forEach(creation => {
            //calculate perSecond for Each

            let perSecond = 0;
            // let bonusPerSec = 1;
            let bonus: number = 0;

            creationsWithEffectsRef.current.forEach((creationWithEffect) => {
                const allEffects = creationWithEffect.effects.filter(o => o.resource.resource == creation.id)
                // console.log('allEffects', allEffects)

                perSecond += allEffects.filter(o => o.resource.mode == 'perSecond')
                    .map(o => calculateResourceValue(o.value, creationWithEffect))
                    .reduce((acc, cur) => acc + cur * creationWithEffect.owned, 0)

                //TODO implement
                // bonusPerSec += allEffects.filter(o => o.resource.mode == 'bonusPerSec').map(o => o.value)
                //     .reduce((acc, cur) => acc + cur * creationWithEffect.owned, 0)

                bonus += allEffects.filter(o => o.resource.mode == 'bonus')
                    .map(o => calculateResourceValue(o.value, creationWithEffect))
                    .reduce((acc, cur) => acc + cur * creationWithEffect.owned, 0)
            }, 0)

            //bonus apply only when element has base value
            if (bonus > 0) {
                // console.log('bonus', bonus)
                const value = creation.owned * (1 + bonus)
                // console.log('value', value)
                dispatch(setCreationEffectiveValue({ id: creation.id, count: value }));
            } else
                dispatch(setCreationEffectiveValue({ id: creation.id, count: creation.owned }));

            if (perSecond < 0) return


            dispatch(updateCreationPerSecond({ id: creation.id, count: perSecond }));

            if (perSecond <= 0) return
            dispatch(addCreation({ id: creation.id, count: perSecond * deltaMod }));
        })


        const creationSpeed = creationsRef.current.find(o => o.id == EResources.creationSpeed)?.effectiveValue ?? 1


        // Update progress for creation queues
        dispatch(updateProgress({ delta: deltaMod }));

        // console.log('speedMod', speedMod)
        dispatch(setGlobalSpeedMultiplier(Math.max(1, creationSpeed)))


        // autobuyItems(deltaMod)
        autobuyItemsRef.current(deltaMod);
        // autobuyItems(deltaMod)

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