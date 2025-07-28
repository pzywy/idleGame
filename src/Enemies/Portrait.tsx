import React from "react";
import "./Portrait.css";
import { formatNumber } from "../utils/formatNumber";

type PortraitProps = {
    name: string; // Name of the character (Player/Enemy)
    health: number; // Current health
    maxHealth: number; // Maximum health
    imageSrc: string; // Path to the portrait image
    shaking: boolean; // Whether the portrait is shaking (during attack)
};

const Portrait: React.FC<PortraitProps> = ({
    name,
    health,
    maxHealth,
    imageSrc,
    shaking,
}) => {
    return (
        <div className={`portrait-container ${shaking ? "shake" : ""}`}>
            <img src={imageSrc} alt={name} className="portrait-image" />
            <div className="health-bar">
                <div
                    className="health"
                    style={{
                        width: `${(health / maxHealth) * 100}%`,
                    }}
                ></div>
            </div>
            <p>{name} Health: {formatNumber(health)}</p>
        </div>
    );
};

export default Portrait;