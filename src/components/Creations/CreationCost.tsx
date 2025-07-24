import React from "react";
import { getResourceName } from "../../utils/getResourceName";
import { formatNumber } from "../../utils/formatNumber";
import { IResourceCost } from "../../store/creations/creationTypes";

const CreationCost: React.FC<{ costs: IResourceCost[] }> = ({ costs }) => {
    return (
        <div>
            {costs.map((cost, index) => (
                <p style={styles.stat} key={index}>
                    <strong>{getResourceName(cost.resource)}: </strong>
                    <span>{formatNumber(cost.value)}</span>
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