import React from "react";
import { useSelector } from "react-redux";
import Creation from "./Creations/Creation";
import { elementsSelector } from "../store/creationSlice";


const Elements = () => {
    const elements = useSelector(elementsSelector);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Creations</h2>
            <div style={styles.grid}>
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

export default Elements;