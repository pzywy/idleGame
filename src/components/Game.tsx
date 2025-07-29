import Creations from "./lists/Creations";
import { useDispatch, useSelector } from "react-redux";
import useGameEngine from "../features/gameEngine";
import { addForwardTime, selectSpeed, setSpeed } from "../store/gameSlice";
import Elements from "./lists/Elements";
import { Route, Routes } from "react-router-dom";
import Abilities from "./lists/Abilities";
import Enemies from "./lists/Enemies";
let savedSpeed: number;
const Game = () => {
    const dispatch = useDispatch();
    // Select computed values from Redux
    const speed = useSelector(selectSpeed);



    useGameEngine();

    const increaseSpeed = () => {
        dispatch(setSpeed(speed * 2))
    };

    const decreaseSpeed = () => {
        dispatch(setSpeed(speed * 0.5))
    };


    const pause = () => {
        if (savedSpeed && speed == 0) {
            dispatch(setSpeed(savedSpeed))
        }
        else {
            savedSpeed = Number(speed)
            dispatch(setSpeed(0))
        }
    };

    const addMinute = () => {
        dispatch(addForwardTime(60))
    }



    return (
        <div style={styles.container}>
            <div style={styles.speed}>
                <p>Speed: {speed}</p>
                <button onClick={pause}>{speed > 0 ? 'Pause' : 'Resume'}</button>
                <button onClick={increaseSpeed}>Increase Speed</button>
                <button onClick={decreaseSpeed}>Decrease Speed</button>
                <button onClick={addMinute}>Add 1 minute</button>


            </div>
            {/* <Stats /> */}

            <div style={styles.gameField}>
                <Routes>
                    <Route path="/creations" element={<Elements />} />
                    <Route path="/enemies" element={<Enemies />} />
                    <Route path="/abilities" element={<Abilities />} />
                    <Route path="/" element={<Creations />} />
                </Routes>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    speed: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    container: {
        display: 'flex',
        flexDirection: 'column'

    },
    gameField: {
        flex: '1',
        overflow: 'auto',
        maxHeight: '100%'
    }
};

export default Game;