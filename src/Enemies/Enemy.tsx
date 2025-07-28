import React, { useRef } from "react";
import CreationHeader from "../components/Creations/CreationHeader";
import { IEnemy } from "../store/enemiesSlice";
import { buttonStyle } from "../components/buttonsStyle";
import { cardStyle } from "../components/cardStyle";
import FightComponent from "./Fight";
import { useSelector } from "react-redux";
import { allCreationsSelector, healthSelector, abilitiesSelector } from "../store/creationSlice";

const Enemy: React.FC<{ enemy: IEnemy }> = ({ enemy }) => {
    // const dispatch = useDispatch();

    const fightRef = useRef<{ startFight: () => void; restartFight: () => void }>(null);

    const canAttack = true

    const playerAbilities = useSelector(abilitiesSelector);

    const playerHealth = useSelector(healthSelector); 




    const canFight = playerAbilities.filter(o => o.owned > 0).length > 0

    const handleFightEnd = (winner: "player" | "enemy") => {
        // alert(`${winner} wins the fight!`);
    };

    return (
        <div style={styles.card}>
            <CreationHeader creation={enemy} />

            <div style={styles.info}>

            </div>

            <p>Defeated: {enemy.defeated}</p>
            {/* <button
                style={{
                    ...styles.button,
                    ...(!canAttack ? styles.disabledButton : {}),
                }}
                onClick={() => attack()}
                disabled={!canAttack}
            >
                Attack
            </button> */}

            {!canFight ? 'you dont have enough powers!' : ''}

            <FightComponent
                ref={fightRef}
                playerHealth={playerHealth?.owned ?? 0}
                enemy={enemy}
                playerAbilities={playerAbilities}
                onFightEnd={handleFightEnd}
            />

            {/* <CreationEffects creation={creation} /> */}


            {/* <CreationOwned creation={creation} name='Owned' /> */}

            {/* <CreationCost creation={creation} /> */}

            {/* <Checkbox label={autobuyLabel} checked={!!creation.autobuy} onChange={handleCheckboxChange} /> */}

            {/* {!!creation.usable && <CreationUse creation={creation} />} */}


            {/* {!creation.autobuy && <CreationBuy creation={creation} />} */}

        </div >
    );
};

// Styling
const styles: { [key: string]: React.CSSProperties } = {
    ...cardStyle,
    ...buttonStyle,
};

export default Enemy;