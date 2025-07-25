import React from "react";
import { useSelector } from "react-redux";
import Creation from "./Creations/Creation";
import { creationsSelector } from "../store/creationSlice";


const Creations = () => {
    const creations = useSelector(creationsSelector);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Creations</h2>
            <div style={styles.grid}>
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

// Styling
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
    },
    heading: {
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "20px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },
};

export default Creations;