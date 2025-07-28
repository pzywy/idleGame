import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";
import Portrait from "./Portrait";
import AttackAnimation from "./AttackAnimation";
import "./Fight.css";
import { ICreation, IAbilities } from "../types/creationTypes";
import { getResourceName } from "../utils/getResourceName";
import { buttonStyle } from "../components/buttonsStyle";
import { IEnemy } from "../store/enemiesSlice";
import { useResourceActions } from "../features/hooks/useResourceActions";
import { useSelector } from "react-redux";
import { abilitiesSelector } from "../store/creationSlice";


type FightComponentProps = {
    playerHealth: number; // Player's starting health
    enemy: IEnemy,
    playerAbilities: ICreation[]; // Array of player powers
    onFightEnd: (winner: "player" | "enemy") => void; // Callback when fight ends
};

const FightComponent = forwardRef((props: FightComponentProps, ref) => {
    const {
        playerHealth,
        playerAbilities: playerAbilities,
        onFightEnd,
        enemy,
    } = props;


    // const playerPowers = useSelector(powersSelector);

    const playerAbilitiesRef = useRef<ICreation[]>(playerAbilities)

    useEffect(() => {

        playerAbilitiesRef.current = playerAbilities;
        const updatedSelectedPower = playerAbilitiesRef.current.find(o => o.id == playerSelectedAbility?.id) ?? null
        setPlayerSelectedAbility(updatedSelectedPower);
        // console.log('playerSelectedPower', playerSelectedPower)
        setAttackAmount(Math.min(attackAmount, playerSelectedAbility?.owned ?? 1))


        // console.log('playerPowerRef.current', playerPowerRef.current)
    }, [playerAbilities]);


    //TODO playerPowers to effect

    const { modifyResource } = useResourceActions();

    const [fightStarted, setFightStarted] = useState(false);
    const [playerCurrentHealth, setPlayerCurrentHealth] = useState(playerHealth);
    const [damageTaken, setDamageTaken] = useState(0);
    const [enemyCurrentHealth, setEnemyCurrentHealth] = useState(enemy.health);
    const [playerSelectedAbility, setPlayerSelectedAbility] = useState<ICreation | null>(
        playerAbilities[0]
    );
    const [attackAmount, setAttackAmount] = useState(1);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [message, setMessage] = useState("");
    const [activeAbilityName, setActiveAbilityName] = useState<string | null>(null);
    const [attacker, setAttacker] = useState<"player" | "enemy" | null>(null);
    const [attackerDamage, setAttackerDamage] = useState<number>(0);
    const [shaking, setShaking] = useState<{ player: boolean; enemy: boolean }>({
        player: false,
        enemy: false,
    });

    // Expose `startFight` and `restartFight` to parent via ref
    useImperativeHandle(ref, () => ({
        startFight,
        restartFight,
    }));

    const startFight = () => {
        setFightStarted(true);
        setMessage("Your turn! Select your power and attack.");
    };

    const restartFight = () => {
        // Reset all states to their initial values
        setFightStarted(false);
        setPlayerCurrentHealth(playerHealth);
        setEnemyCurrentHealth(enemy.health);
        setPlayerSelectedAbility(playerAbilitiesRef.current[0]);
        setAttackAmount(1);
        setIsPlayerTurn(true);
        setMessage("");
        setActiveAbilityName(null);
        setAttacker(null);
        setShaking({ player: false, enemy: false });
    };


    const fightEnd = (winner: "player" | "enemy") => {
        // damageTaken
        onFightEnd(winner);
    }

    const attack = () => {
        if (!playerSelectedAbility) return;

        // pay for power

        try {
            modifyResource(playerSelectedAbility.id, -attackAmount)
        }
        catch (e) {
            console.warn('Failed to pay for resource!', e, playerSelectedAbility)
            return;

        }

        // Player attacks first
        const totalPlayerDamage = (playerSelectedAbility.abilities && playerSelectedAbility.abilities.reduce((acc, curr) => acc + getPowerDamage(curr, attackAmount, enemyCurrentHealth), 0)) ?? 0;
        const newEnemyHealth = Math.max(0, enemyCurrentHealth - totalPlayerDamage);
        setEnemyCurrentHealth(newEnemyHealth);

        // Animate player attack
        animateAttack("player", playerSelectedAbility.name, totalPlayerDamage);

        if (newEnemyHealth <= 0) {
            setMessage("You defeated the enemy!");
            fightEnd("player");
            return;
        }

        // Enemy's turn after a delay
        setMessage("Enemy is attacking...");
        setIsPlayerTurn(false);

        setTimeout(() => {
            enemyAttack();
        }, 1500);
    };


    const getPowerDamage = (power: IAbilities, attackAmount: number = 1, enemyHeath = 0, enemyResistances?: IAbilities[]): number => {
        //TODO armor / resistance
        if (power.value) { return power.value * attackAmount }
        //TODO calculate each attack separatly
        if (power.min && power.max) { return attackAmount * Number((Math.random() * (power.max - power.min) + power.min).toFixed(2)); }
        if (power.percentage) return enemyHeath * power.percentage * attackAmount// better to do reccurrency here
        return 0
    }

    const enemyAttack = () => {
        const randomPower =
            enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];
        const totalEnemyDamage = getPowerDamage(randomPower)
        setDamageTaken(totalEnemyDamage + damageTaken)
        const newPlayerHealth = Math.max(0, playerCurrentHealth - totalEnemyDamage);
        setPlayerCurrentHealth(newPlayerHealth);

        // Animate enemy attack
        animateAttack("enemy", getResourceName(randomPower), totalEnemyDamage);

        if (newPlayerHealth <= 0) {
            setMessage("The enemy defeated you!");
            fightEnd("enemy");
            return;
        }

        setMessage("Your turn! Select your power and attack.");
        setIsPlayerTurn(true);
    };

    const animateAttack = (attacker: "player" | "enemy", powerName: string, damage: number) => {
        setActiveAbilityName(powerName);
        setAttacker(attacker);
        setAttackerDamage(damage)

        // Add shake effect to target
        const target = attacker === "player" ? "enemy" : "player";
        setShaking((prev) => ({ ...prev, [target]: true }));

        // Remove animations after a short delay
        setTimeout(() => {
            setActiveAbilityName(null);
            setAttacker(null);
            setShaking((prev) => ({ ...prev, [target]: false }));
        }, 1000);
    };

    return (
        <div className="fight-container">
            {!fightStarted ? (
                <button style={buttonStyle.button} onClick={startFight}>
                    Start Fight
                </button>
            ) : (
                <>
                    <div className="fight-area">
                        {/* Player Portrait */}
                        <Portrait
                            name="Player"
                            health={playerCurrentHealth}
                            maxHealth={playerHealth}
                            imageSrc="/player.png"
                            shaking={shaking.player}
                        />

                        {/* Attack Animation */}
                        {activeAbilityName && attacker && (
                            <AttackAnimation damage={attackerDamage} powerName={activeAbilityName} attacker={attacker} />
                        )}

                        {/* Enemy Portrait */}
                        <Portrait
                            name={enemy.name}
                            health={enemyCurrentHealth}
                            maxHealth={enemy.health}
                            imageSrc="/enemy.png"
                            shaking={shaking.enemy}
                        />
                    </div>

                    {/* Controls */}
                    {isPlayerTurn && (
                        <div className="player-controls">
                            <h3>Select Ability</h3>
                            <select
                                className="power-select"
                                onChange={(e) =>
                                    setPlayerSelectedAbility(
                                        playerAbilitiesRef.current.find((p) => p.id === e.target.value) || null
                                    )
                                }
                            >
                                {playerAbilitiesRef.current.map((power) => (
                                    <option key={power.id} value={power.id} disabled={!power?.owned || power?.owned <= 0}>
                                        {power.name}
                                    </option>
                                ))}
                            </select>

                            {playerSelectedAbility?.owned ? <div>
                                <input
                                    type="range"
                                    min="1"
                                    disabled={!playerSelectedAbility?.owned || playerSelectedAbility?.owned <= 0}
                                    max={playerSelectedAbility?.owned}
                                    value={attackAmount}
                                    onChange={(e) => setAttackAmount(Number(e.target.value))}
                                />
                                <p>Attack Amount: {attackAmount}</p>
                            </div> : ''}



                            <button style={buttonStyle.button}
                                disabled={!playerSelectedAbility?.owned || playerSelectedAbility?.owned <= 0}
                                onClick={attack}>
                                Attack!
                            </button>
                        </div>
                    )}

                    <div className="message">{message}</div>

                    {/* Restart Fight Button */}
                    {(!playerCurrentHealth || !enemyCurrentHealth) && (
                        <button style={buttonStyle.button} onClick={restartFight}>
                            Exit
                        </button>
                    )}
                </>
            )}
        </div>
    );
});

export default FightComponent;