import Stats from "./Stats";
import Creations from "./Creations";
import { useDispatch, useSelector } from "react-redux";
import useGameEngine from "../features/gameEngine";
import { selectSpeed, setSpeed } from "../store/gameSlice";
import Elements from "./Elements";

const Game = () => {
    const dispatch = useDispatch();
    // Select computed values from Redux
    const speed = useSelector(selectSpeed);


    useGameEngine(); // Use the game engine

    const increaseSpeed = () => {
        dispatch(setSpeed(speed * 2))
    };

    const decreaseSpeed = () => {
        dispatch(setSpeed(speed * 0.5))
    };


    return (
        <div style={styles.container}>
            <div style={styles.speed}>
                <p>Speed: {speed}</p>
                <button onClick={increaseSpeed}>Increase Speed</button>
                <button onClick={decreaseSpeed}>Decrease Speed</button>

            </div>
            {/* <Stats /> */}
            <div style={styles.gameField}>
                <Elements />
                <Creations />
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