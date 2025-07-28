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
import CreationUse from "./CreationUse";
import { cardStyle } from "../cardStyle";

const Creation: React.FC<{ creation: ICreation }> = ({ creation }) => {
    const dispatch = useDispatch();
    const handleCheckboxChange = (value: boolean) => {
        dispatch(setCreationAutobuy({ id: creation.id, value }))
    };

    const autobuyLabel = 'Autobuy ' + (creation.autobuy && creation.autobuyPerSec != undefined ? `${formatNumber(creation.autobuyPerSec)}/s` : '')

    return (
        <div style={styles.card}>
            <CreationHeader creation={creation} />

            <div style={styles.info}>

            </div>

            <CreationEffects creation={creation} />


            <CreationOwned creation={creation} name='Owned' />

            <CreationCost creation={creation} />

            <Checkbox label={autobuyLabel} checked={!!creation.autobuy} onChange={handleCheckboxChange} />

            {!!creation.usable && <CreationUse creation={creation} />}


            {!creation.autobuy && <CreationBuy creation={creation} />}

        </div >
    );
};

// Styling
const styles: { [key: string]: React.CSSProperties } = {
    ...cardStyle
};

export default Creation;