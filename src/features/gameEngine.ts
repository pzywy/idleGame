import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollowers, addPower, selectFollowersPerSecond, selectPowerPerSecond } from "../store/statsSlice";
import { selectSpeed } from "../store/gameSlice";

const useGameEngine = () => {
    const dispatch = useDispatch();

    const minTickInSeconds = 0.1;

    const powerPerSecondRef = useRef<number>(0);
    const followersPerSecondRef = useRef<number>(0);
    const lastUpdateRef = useRef<number>(performance.now());
    const speed = useRef<number>(1);

    const powerPerSecond = useSelector(selectPowerPerSecond);
    const followersPerSecond = useSelector(selectFollowersPerSecond);
    const speedSelected = useSelector(selectSpeed); // Get speed from Redux

    useEffect(() => {
        powerPerSecondRef.current = powerPerSecond;
    }, [powerPerSecond]);

    useEffect(() => {
        followersPerSecondRef.current = followersPerSecond;
    }, [followersPerSecond]);

    useEffect(() => {
        speed.current = speedSelected;
    }, [speedSelected]);


    const updateOnTick = (deltaMod: number) => {
        dispatch(addFollowers(followersPerSecondRef.current * deltaMod));
        dispatch(addPower(powerPerSecondRef.current * deltaMod));
    }

    useEffect(() => {
        const gameLoop = (timestamp: number) => {
            const elapsed = (timestamp - lastUpdateRef.current) / 1000; // Time elapsed in seconds

            if (elapsed < minTickInSeconds) {
                requestAnimationFrame(gameLoop);
                return;
            }
            // console.log('tick')

            lastUpdateRef.current = timestamp;

            const deltaMod = elapsed * speed.current

            updateOnTick(deltaMod)

            // dispatch(addFollowers(followersPerSecondRef.current * deltaMod));
            // dispatch(addPower(powerPerSecondRef.current * deltaMod));

            requestAnimationFrame(gameLoop);
        };

        const startTimestamp = performance.now();
        lastUpdateRef.current = startTimestamp;
        requestAnimationFrame(gameLoop);

        return () => { };
    }, [dispatch]); // Include speed as a dependency

};

export default useGameEngine;