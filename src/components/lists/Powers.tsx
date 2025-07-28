import { useSelector } from "react-redux";
import Creation from "../Creations/Creation";
import { powersSelector } from "../../store/creationSlice";
import { listStyles } from "./listStyles";


const Powers = () => {
    const elements = useSelector(powersSelector);

    return (
        <div style={listStyles.container}>
            {/* <h2 style={styles.heading}>Creations</h2> */}
            <div style={listStyles.grid}>
                {elements.map((element) => (
                    <Creation
                        key={element.id}
                        creation={element}
                    />
                ))}
            </div>
        </div>
    );
};

export default Powers;