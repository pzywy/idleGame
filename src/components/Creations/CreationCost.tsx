import React from "react";
import { getResourceName } from "../../utils/getResourceName";
import { formatNumber } from "../../utils/formatNumber";
import { IResourceCost } from "../../store/creations/creationTypes";

const CreationCost: React.FC<{ costs: IResourceCost[] }> = ({ costs }) => {
    return (
        <div>
            {costs.map((cost, index) => (
                <p key={index}>
                    <strong>{getResourceName(cost.resource)}: </strong>
                    <span>{formatNumber(cost.value)}</span>
                </p>
            ))}
        </div>
    );
};

export default CreationCost;