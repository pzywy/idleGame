import React, { useState, useImperativeHandle, forwardRef } from "react";
import Portrait from "./Portrait";
import AttackAnimation from "./AttackAnimation";
import "./Fight.css";

type Power = {
    id: string;
    name: string;
    damage: number; // Damage this power does
};

type FightComponentProps = {
    playerHealth: number; // Player's starting health
    enemyHealth: number; // Enemy's starting health
    playerPowers: Power[]; // Array of player powers
    enemyPowers: Power[]; // Array of enemy powers
    onFightEnd: (winner: "player" | "enemy") => void; // Callback when fight ends
};

const FightComponent = forwardRef((props: FightComponentProps, ref) => {
    const {
        playerHealth,
        enemyHealth,
        playerPowers,
        enemyPowers,
        onFightEnd,
    } = props;

    const [fightStarted, setFightStarted] = useState(false);
    const [playerCurrentHealth, setPlayerCurrentHealth] = useState(playerHealth);
    const [enemyCurrentHealth, setEnemyCurrentHealth] = useState(enemyHealth);
    const [playerSelectedPower, setPlayerSelectedPower] = useState<Power | null>(
        playerPowers[0]
    );
    const [attackAmount, setAttackAmount] = useState(1);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [message, setMessage] = useState("");
    const [activePowerName, setActivePowerName] = useState<string | null>(null);
    const [attacker, setAttacker] = useState<"player" | "enemy" | null>(null);
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
        setEnemyCurrentHealth(enemyHealth);
        setPlayerSelectedPower(playerPowers[0]);
        setAttackAmount(1);
        setIsPlayerTurn(true);
        setMessage("");
        setActivePowerName(null);
        setAttacker(null);
        setShaking({ player: false, enemy: false });
    };

    const attack = () => {
        if (!playerSelectedPower) return;

        // Player attacks first
        const totalPlayerDamage = playerSelectedPower.damage * attackAmount;
        const newEnemyHealth = Math.max(0, enemyCurrentHealth - totalPlayerDamage);
        setEnemyCurrentHealth(newEnemyHealth);

        // Animate player attack
        animateAttack("player", playerSelectedPower.name);

        if (newEnemyHealth <= 0) {
            setMessage("You defeated the enemy!");
            onFightEnd("player");
            return;
        }

        // Enemy's turn after a delay
        setMessage("Enemy is attacking...");
        setIsPlayerTurn(false);

        setTimeout(() => {
            enemyAttack();
        }, 1500);
    };

    const enemyAttack = () => {
        const randomPower =
            enemyPowers[Math.floor(Math.random() * enemyPowers.length)];
        const totalEnemyDamage = randomPower.damage;
        const newPlayerHealth = Math.max(0, playerCurrentHealth - totalEnemyDamage);
        setPlayerCurrentHealth(newPlayerHealth);

        // Animate enemy attack
        animateAttack("enemy", randomPower.name);

        if (newPlayerHealth <= 0) {
            setMessage("The enemy defeated you!");
            onFightEnd("enemy");
            return;
        }

        // Back to player's turn
        setMessage("Your turn! Select your power and attack.");
        setIsPlayerTurn(true);
    };

    const animateAttack = (attacker: "player" | "enemy", powerName: string) => {
        setActivePowerName(powerName);
        setAttacker(attacker);

        // Add shake effect to target
        const target = attacker === "player" ? "enemy" : "player";
        setShaking((prev) => ({ ...prev, [target]: true }));

        // Remove animations after a short delay
        setTimeout(() => {
            setActivePowerName(null);
            setAttacker(null);
            setShaking((prev) => ({ ...prev, [target]: false }));
        }, 1000);
    };

    return (
        <div className="fight-container">
            {!fightStarted ? (
                <button className="start-button" onClick={startFight}>
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
                        {activePowerName && attacker && (
                            <AttackAnimation powerName={activePowerName} attacker={attacker} />
                        )}

                        {/* Enemy Portrait */}
                        <Portrait
                            name="Enemy"
                            health={enemyCurrentHealth}
                            maxHealth={enemyHealth}
                            imageSrc="/enemy.png"
                            shaking={shaking.enemy}
                        />
                    </div>

                    {/* Controls */}
                    {isPlayerTurn && (
                        <div className="player-controls">
                            <h3>Select Attack Power</h3>
                            <select
                                className="power-select"
                                onChange={(e) =>
                                    setPlayerSelectedPower(
                                        playerPowers.find((p) => p.id === e.target.value) || null
                                    )
                                }
                            >
                                {playerPowers.map((power) => (
                                    <option key={power.id} value={power.id}>
                                        {power.name}
                                    </option>
                                ))}
                            </select>

                            <h3>Attack Amount</h3>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={attackAmount}
                                onChange={(e) => setAttackAmount(Number(e.target.value))}
                            />
                            <p>Attack Amount: {attackAmount}</p>

                            <button className="attack-button" onClick={attack}>
                                Attack!
                            </button>
                        </div>
                    )}

                    <div className="message">{message}</div>

                    {/* Restart Fight Button */}
                    {(!playerCurrentHealth || !enemyCurrentHealth) && (
                        <button className="restart-button" onClick={restartFight}>
                            Restart Fight
                        </button>
                    )}
                </>
            )}
        </div>
    );
});

export default FightComponent;