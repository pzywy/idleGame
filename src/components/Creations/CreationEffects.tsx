import React from "react";
import { getResourceName } from "../../utils/getResourceName";
import { formatNumber } from "../../utils/formatNumber";
import { ICreation, IResourceEffect } from "../../types/creationTypes";
import { calculateResourceValue } from "../../utils/formatFunctions";

const CreationEffects: React.FC<{ creation: ICreation, count?: number }> = ({ creation, count = 1 }) => {
    return (
        <div>
            {creation.effects.map((effect, index) => (
                <div style={styles.stat} key={index}>
                    <strong>{getResourceName(effect)}: </strong>
                    <span>{formatNumber((calculateResourceValue(effect.value, creation)) * count)}</span>
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