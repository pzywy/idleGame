import React from "react";
import { getResourceName } from "../utils/getResourceName";
import { formatNumber } from "../utils/formatNumber";
import { IResourceEffect } from "../store/creations/creationTypes";

// Helper function to map IResources enum to readable names

const CreationEffects: React.FC<{ effects: IResourceEffect[] }> = ({ effects }) => {
    return (
        <div>
            {effects.map((effect, index) => (
                <div key={index}>
                    <strong>{getResourceName(effect.resource)}: </strong>
                    <span>{formatNumber(effect.value)}</span>
                </div>
            ))}
        </div>
    );
};

export default CreationEffects;