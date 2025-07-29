import React from "react";
import "./AttackAnimation.css";
import { formatNumber } from "../utils/formatNumber";

type AttackAnimationProps = {
    powerName: string; // Name of the power being used
    attacker: "player" | "enemy"; // Who is attacking
    damage?: number
};

const AttackAnimation: React.FC<AttackAnimationProps> = ({ powerName, attacker, damage }) => {
    return (
        <div className={`attack-animation ${attacker}`}>
            <p className="power-name">{powerName}</p>
            <p className="power-name">{formatNumber(damage ?? 0)}</p>
        </div>
    );
};

export default AttackAnimation;