import { useSelector } from "react-redux";
import Creation from "../Creations/Creation";
import { creationsSelector } from "../../store/creationSlice";
import { listStyles } from "./listStyles";


const Creations = () => {
    const creations = useSelector(creationsSelector);

    return (
        <div style={listStyles.container}>
            <h2 style={listStyles.heading}>Creations</h2>
            <div style={listStyles.grid}>
                {creations.map((creation) => (
                    <Creation
                        key={creation.id}
                        creation={creation}
                    />
                ))}
            </div>
        </div>
    );
};

export default Creations;