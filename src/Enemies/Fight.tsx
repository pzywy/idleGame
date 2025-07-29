import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";
import Portrait from "./Portrait";
import AttackAnimation from "./AttackAnimation";
import "./Fight.css";
import { ICreation, IAbilities, EResources, IResistance } from "../types/creationTypes";
import { getResourceName } from "../utils/getResourceName";
import { buttonStyle } from "../components/buttonsStyle";
import { IEnemy } from "../store/enemiesSlice";
import { useResourceActions } from "../features/hooks/useResourceActions";


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
        setAttackAmount(Math.max(Math.min(attackAmount, playerSelectedAbility?.owned ?? 1), 1))


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
        const totalPlayerDamage = (playerSelectedAbility.abilities && playerSelectedAbility.abilities.reduce((acc, curr) => acc + getPowerDamage(curr, playerSelectedAbility.id, attackAmount, enemyCurrentHealth, enemy.resistance), 0)) ?? 0;
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


    const getPowerDamage = (power: IAbilities, powerId: EResources, attackAmount: number = 1, enemyHeath = 0, enemyResistances?: IResistance[]): number => {

        // console.log('enemyResistances', power, enemyResistances)
        const resistances = enemyResistances?.filter(o => !o.resource || o.resource == powerId)
        //TODO armor / resistance
        let totalDmg = 0;

        for (let i = 0; i < attackAmount; i++) {
            if (power.value) {
                totalDmg += power.value
            }

            if (power.percentage) {
                let dmg = enemyHeath * power.percentage / 100;
                totalDmg += dmg
            }

            if (power.min && power.max) {
                totalDmg += Math.random() * (power.max - power.min) + power.min
            }
            // console.log('totalDmg', totalDmg, resistances)
            resistances?.forEach(res => {
                if (res.value) {
                    totalDmg -= res.value
                }

                if (res.percentage) {
                    totalDmg = totalDmg - (totalDmg * res.percentage / 100)
                }

                if (res.min && res.max) {
                    totalDmg -= Math.random() * (res.max - res.min) + res.min
                }



            })
            // console.log('totalDmg', totalDmg, resistances)
            totalDmg = Math.max(0, totalDmg)
            enemyHeath = Math.max(enemyHeath - totalDmg, 0)
        }




        return Number(totalDmg.toFixed(3))
    }

    const enemyAttack = () => {
        const randomPower =
            enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];
        const totalEnemyDamage = getPowerDamage(randomPower, randomPower.resource, 1, playerCurrentHealth)
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

    const canAttack = playerSelectedAbility && playerSelectedAbility?.owned && playerSelectedAbility?.owned > 0

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
                                value={playerSelectedAbility?.id}
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
                                    disabled={!canAttack}
                                    max={playerSelectedAbility?.owned}
                                    value={attackAmount}
                                    onChange={(e) => setAttackAmount(Number(e.target.value))}
                                />
                                <p>Attack Amount: {attackAmount}</p>
                            </div> : ''}

                            <button
                                style={{
                                    ...buttonStyle.button,
                                    ...(!canAttack ? buttonStyle.disabledButton : {}),
                                }}
                                disabled={!canAttack}
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