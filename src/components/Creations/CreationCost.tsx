import React from "react";
import { getResourceName } from "../../utils/getResourceName";
import { formatNumber } from "../../utils/formatNumber";
import { ICreation } from "../../types/creationTypes";
import { calculateResourceValue } from "../../utils/formatFunctions";

const CreationCost: React.FC<{ creation: ICreation }> = ({ creation }) => {
    return (



        <div>
            <p style={styles.stat}>Cost:</p>
            {creation.cost.map((cost, index) => (
                <p style={styles.stat} key={index}>
                    <strong>{getResourceName(cost)}: </strong>
                    <span>{formatNumber(calculateResourceValue(cost.value, creation))}</span>
                </p>
            ))}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    stat: {
        fontSize: "1rem",
        color: "#555",
        margin: "5px 0",
    },
};

export default CreationCost;