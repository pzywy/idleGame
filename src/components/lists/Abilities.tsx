import { useSelector } from "react-redux";
import Creation from "../Creations/Creation";
import { abilitiesSelector } from "../../store/creationSlice";
import { listStyles } from "./listStyles";


const Abilities = () => {
    const elements = useSelector(abilitiesSelector);

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

export default Abilities;