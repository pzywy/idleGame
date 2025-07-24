import React from "react";
import { getResourceName } from "../../utils/getResourceName";
import { formatNumber } from "../../utils/formatNumber";
import { IResourceEffect } from "../../store/creations/creationTypes";

const CreationEffects: React.FC<{ effects: IResourceEffect[], count?: number }> = ({ effects, count = 1 }) => {
    return (
        <div>
            {effects.map((effect, index) => (
                <div key={index}>
                    <strong>{getResourceName(effect.resource)}: </strong>
                    <span>{formatNumber(effect.value * count)}</span>
                </div>
            ))}
        </div>
    );
};

export default CreationEffects;