import React from "react";
import CreationCost from "./CreationCost";
import CreationEffects from "./CreationEffects";
import { ICreation } from "../../types/creationTypes";
import CreationBuy from "./CreationBuy";
import CreationHeader from "./CreationHeader";
import CreationOwned from "./CreationOwned";
import Checkbox from "../Checkbox";
import { useDispatch } from "react-redux";
import { setCreationAutobuy } from "../../store/creationSlice";
import { formatNumber } from "../../utils/formatNumber";

const Creation: React.FC<{ creation: ICreation }> = ({ creation }) => {
    const dispatch = useDispatch();
    const handleCheckboxChange = (value: boolean) => {
        dispatch(setCreationAutobuy({ id: creation.id, value }))
    };

    return (
        <div style={styles.card}>
            <CreationHeader creation={creation} />

            <div style={styles.info}>

            </div>

            <CreationEffects creation={creation} />


            <CreationOwned creation={creation} name='Owned' />

            <CreationCost creation={creation} />

            <Checkbox label="Autobuy" checked={!!creation.autobuy} onChange={handleCheckboxChange} />

            {creation.autobuy && creation.autobuyPerSec != undefined && <p>Autobuy per second {formatNumber(creation.autobuyPerSec)}</p>}
            {!creation.autobuy && <CreationBuy creation={creation} />}




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
    info: {
        display: 'flex',
    },
    stat: {
        fontSize: "1rem",
        color: "#555",
        margin: "5px 0",
    },
};

export default Creation;