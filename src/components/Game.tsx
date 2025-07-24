import Stats from "./Stats";
import Creations from "./Creations";
import { useDispatch, useSelector } from "react-redux";
import useGameEngine from "../features/gameEngine";
import { selectSpeed, setSpeed } from "../store/gameSlice";

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
        <div>
            <p>Speed: {speed}</p>
            <button onClick={increaseSpeed}>Increase Speed</button>
            <button onClick={decreaseSpeed}>Decrease Speed</button>

            <Stats />
            <Creations />
        </div>
    );
};

export default Game;