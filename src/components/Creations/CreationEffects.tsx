import React from "react";
import { getResourceName } from "../../utils/getResourceName";
import { formatNumber } from "../../utils/formatNumber";
import { IResourceEffect } from "../../store/creations/creationTypes";

const CreationEffects: React.FC<{ effects: IResourceEffect[], count?: number }> = ({ effects, count = 1 }) => {
    return (
        <div>
            {effects.map((effect, index) => (
                <div style={styles.stat} key={index}>
                    <strong>{getResourceName(effect.resource)}: </strong>
                    <span>{formatNumber(effect.value * count)}</span>
                </div>
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
export default CreationEffects;