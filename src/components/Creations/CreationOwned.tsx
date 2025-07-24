import React from "react";
import { formatNumber } from "../../utils/formatNumber";
import { ICreation, IResourceCost } from "../../store/creations/creationTypes";
import CreationEffects from "./CreationEffects";

const CreationOwned: React.FC<{ creation: ICreation, name?: string }> = ({ creation, name = 'Owned' }) => {
    return (
        <div>
            {creation.owned != null && (
                <p style={styles.stat}>
                    <strong>{name}:</strong> {formatNumber(creation.owned, 0)}
                </p>
            )}
            <CreationEffects effects={creation.effects} count={creation.owned} />
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

export default CreationOwned;