import React from "react";

import { ICreation } from "../../types/creationTypes";

const CreationHeader: React.FC<{ creation: { icon?: string; name: string; } }> = ({ creation }) => {
    return (
        <div>
            <div style={styles.iconContainer}>{creation.icon}</div>

            <h3 style={styles.name}>{creation.name}</h3>
        </div>
    );
};
const styles: { [key: string]: React.CSSProperties } = {
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        textAlign: "center",
        transition: "transform 0.2s ease",
    },
    iconContainer: {
        fontSize: "2.5rem",
        marginBottom: "10px",
    },
};
export default CreationHeader;