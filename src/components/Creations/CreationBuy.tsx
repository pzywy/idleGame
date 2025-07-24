import React from "react";
import { ICreation, IResource } from "../../store/creations/creationTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addCreation } from "../../store/creations/creationSlice";
import { addStat } from "../../store/statsSlice";

const CreationBuy: React.FC<{ creation: ICreation, buyName?: string }> = ({ creation, buyName = 'Create' }) => {

    const dispatch = useDispatch();

    const elements = useSelector((state: RootState) => state.creations.elements);
    const stats = useSelector((state: RootState) => state.stats);


    const howManyCanAfford = () => Math.min(
        ...creation.cost.map(cr => {
            switch (cr.resource.type) {
                case 'element': {
                    const value = elements.find(o => o.id == cr.resource.resource)
                    if (!value) return 0;
                    return Math.floor(value?.owned / cr.value);
                }

                case "stat": {
                    const statValue = stats[cr.resource.resource as keyof typeof stats]; // Dynamically access stats
                    if (statValue === undefined || statValue === null) return 0;
                    return Math.floor(statValue / cr.value);
                }

                default:
                    console.error(`Unhandled resource type: ${cr.resource.type}`);
                    return 0;

            }
        })
    );

    const canAfford = howManyCanAfford() > 0;

    const payForResource = (count = 1) => creation.cost.forEach(o => {
        const amount = -o.value * count

        modifyResource(o.resource, amount)
    })

    const buyResource = (count = 1) => creation.effects.forEach(o => {
        if (o.resource.mode == 'perSecond') return;
        const amount = o.value * count

        modifyResource(o.resource, amount)
    })


    const modifyResource = (o: IResource, amount: number) => {
        switch (o.type) {
            case "stat": {
                dispatch(addStat({ amount: amount, id: o.resource }))
                return
            }
            case "element": {
                dispatch(addCreation({ count: amount, id: o.resource }))
                return
            }
        }
    }

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
        <div className="buttons" style={styles.buttons}>
            <button
                style={{
                    ...styles.button,
                    ...(!canAfford ? styles.disabledButton : {}),
                }}
                onClick={() => handleBuyCreation(1)}
                disabled={!canAfford}
            >
                {buyName} 1
            </button>

            <button
                style={{
                    ...styles.button,
                    ...(!canAfford ? styles.disabledButton : {}),
                }}
                onClick={() => handleBuyCreation(howManyCanAfford())}
                disabled={!canAfford}
            >
                {buyName} {howManyCanAfford()} (max)
            </button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
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

export default CreationBuy;