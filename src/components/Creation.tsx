import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addCreation } from "../store/creations/creationSlice";
import { formatNumber } from "../utils/formatNumber";
import CreationCost from "./CreationCost";
import CreationEffects from "./CreationEffects";
import { ICreation, IStats } from "../store/creations/creationTypes";
import { resourceToDispatchAction } from "../utils/resourceChecker";



const Creation: React.FC<{ creation: ICreation }> = ({ creation }) => {
    const currentPower = useSelector((state: RootState) => state.stats.power); // Get current power
    const currentFollowers = useSelector((state: RootState) => state.stats.followers); // Get current power
    const dispatch = useDispatch();


    const howManyCanAfford = () => Math.min(
        ...creation.cost.map(o => {
            switch (o.resource) {
                case IStats.power:
                    return Math.floor(currentPower / o.value);
                case IStats.followers:
                    return Math.floor(currentFollowers / o.value);
                default:
                    throw new Error(`Resource ${o.resource} not handled!`);
            }
        })
    );

    const canAfford = howManyCanAfford() > 0;

    const payForResource = (count = 1) => creation.cost.forEach(o => {
        dispatch({ type: resourceToDispatchAction(o.resource), payload: -o.value * count });
    })

    const buyResource = (count = 1) => creation.effects.forEach(o => {
        if (creation.type !== 'usable') return;
        dispatch({ type: resourceToDispatchAction(o.resource), payload: o.value * count });
    })

    const handleBuyCreation = (count = 1) => {
        if (howManyCanAfford() < count) {
            console.log("Not enough power to buy this creation!");
            return
        }

        payForResource(count);
        buyResource(count);
        dispatch(addCreation({ id: creation.id, count }));
    };


    return (
        <div style={styles.card}>
            {/* Icon */}
            <div style={styles.iconContainer}>{creation.icon}</div>

            <h3 style={styles.name}>{creation.name}</h3>

            <CreationEffects effects={creation.effects} />

            {creation.owned != null && (
                <p style={styles.stat}>
                    <strong>Owned:</strong> {formatNumber(creation.owned, 0)}
                </p>
            )}
            {/* TODO owned and effect of them */}

            <CreationCost costs={creation.cost} />


            {/* Buy Button */}
            <div className="buttons" style={styles.buttons}>
                <button
                    style={{
                        ...styles.button,
                        ...(!canAfford ? styles.disabledButton : {}),
                    }}
                    onClick={() => handleBuyCreation(1)}
                    disabled={!canAfford}
                >
                    Buy 1
                </button>

                <button
                    style={{
                        ...styles.button,
                        ...(!canAfford ? styles.disabledButton : {}),
                    }}
                    onClick={() => handleBuyCreation(howManyCanAfford())}
                    disabled={!canAfford}
                >
                    Buy {howManyCanAfford()} (max)
                </button>
            </div>


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
    iconContainer: {
        fontSize: "2.5rem",
        marginBottom: "10px",
    },
    name: {
        fontSize: "1.5rem",
        color: "#333",
        marginBottom: "10px",
    },
    stat: {
        fontSize: "1rem",
        color: "#555",
        margin: "5px 0",
    },
    buttons: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    button: {
        marginTop: "15px",
        padding: "10px 20px",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    disabledButton: {
        backgroundColor: "#ccc",
        cursor: "not-allowed",
    },
};

export default Creation;