import React, { useRef } from "react";
import { ICreation } from "../types/creationTypes";
import CreationHeader from "../components/Creations/CreationHeader";
import CreationEffects from "../components/Creations/CreationEffects";
import CreationOwned from "../components/Creations/CreationOwned";
import CreationCost from "../components/Creations/CreationCost";
import CreationUse from "../components/Creations/CreationUse";
import CreationBuy from "../components/Creations/CreationBuy";
import { IEnemy } from "../store/enemiesSlice";
import { buttonStyle } from "../components/buttonsStyle";
import { cardStyle } from "../components/cardStyle";
import FightComponent from "./Fight";

const Enemy: React.FC<{ enemy: IEnemy }> = ({ enemy }) => {
    // const dispatch = useDispatch();

    const fightRef = useRef<{ startFight: () => void; restartFight: () => void }>(null);

    const canAttack = true

    const attack = () => { fightRef.current?.startFight() }

    const playerPowers = [
        { id: "fireball", name: "Fireball", damage: 10, color: "red" },
        { id: "ice", name: "Ice Blast", damage: 8, color: "blue" },
        { id: "lightning", name: "Lightning Strike", damage: 12, color: "yellow" },
    ];

    const enemyPowers = [
        { id: "claw", name: "Claw Swipe", damage: 5, color: "brown" },
        { id: "bite", name: "Bite", damage: 7, color: "gray" },
    ];

    const handleFightEnd = (winner: "player" | "enemy") => {
        alert(`${winner} wins the fight!`);
    };

    return (
        <div style={styles.card}>
            <CreationHeader creation={enemy} />

            <div style={styles.info}>

            </div>

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

            <FightComponent
                ref={fightRef}
                playerHealth={100}
                enemyHealth={50}
                playerPowers={playerPowers}
                enemyPowers={enemyPowers}
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