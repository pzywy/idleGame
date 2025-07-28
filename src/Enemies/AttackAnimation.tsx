import React from "react";
import "./AttackAnimation.css";

type AttackAnimationProps = {
    powerName: string; // Name of the power being used
    attacker: "player" | "enemy"; // Who is attacking
};

const AttackAnimation: React.FC<AttackAnimationProps> = ({ powerName, attacker }) => {
    return (
        <div className={`attack-animation ${attacker}`}>
            <p className="power-name">{powerName}</p>
        </div>
    );
};

export default AttackAnimation;