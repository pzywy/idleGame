import React from "react";
import { formatNumber } from "../../utils/formatNumber";
import CreationCost from "./CreationCost";
import CreationEffects from "./CreationEffects";
import { ICreation } from "../../store/creations/creationTypes";
import CreationBuy from "./CreationBuy";
import CreationHeader from "./CreationHeader";
import CreationOwned from "./CreationOwned";

const Creation: React.FC<{ creation: ICreation }> = ({ creation }) => {

    return (
        <div style={styles.card}>
            <CreationHeader creation={creation} />

            <h4>Effects:</h4>
            <CreationEffects effects={creation.effects} />


            <h4>Created</h4>
            <CreationOwned creation={creation} name='Created' />


            <h4>Cost:</h4>
            <CreationCost costs={creation.cost} />

            <CreationBuy creation={creation} />

        </div >
    );
};

// Styling
const styles: { [key: string]: React.CSSProperties } = {
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        textAlign: "center",
        transition: "transform 0.2s ease",
    },
    stat: {
        fontSize: "1rem",
        color: "#555",
        margin: "5px 0",
    },
};

export default Creation;