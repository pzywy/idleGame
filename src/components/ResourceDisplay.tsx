import React from "react";
import { formatNumber } from "../utils/formatNumber";

interface ResourceDisplayProps {
    name: string;
    value: number;
    perSecond: number;
    icon?: React.ReactNode; // Optional icon for the resource
    decimalPlaces?: number; // Number of decimal places for formatting
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
    name,
    value,
    perSecond,
    icon,
    decimalPlaces = 3,
}) => {
    return (
        <div style={styles.container}>
            {icon && <div style={styles.icon}>{icon}</div>}
            <div style={styles.info}>
                <span style={styles.name}>{name}: </span>
                <div style={styles.value}>{formatNumber(value ?? 0, decimalPlaces)}</div>
            </div>
            <div style={styles.perSecond}>
                {perSecond >= 0
                    ? `+${formatNumber(perSecond ?? 0, decimalPlaces)}/s`
                    : `${formatNumber(perSecond ?? 0, decimalPlaces)}/s`}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
    },
    icon: {
        marginRight: "10px",
        fontSize: "20px",
    },
    info: {
        display: "flex",
        alignItems: "center",
        marginRight: "10px",
    },
    name: {
        fontWeight: "bold",
        marginRight: "5px",
        width: "80px",
    },
    value: {
        fontFamily: "monospace",
        width: "80px",
        textAlign: "right",
    },
    perSecond: {
        color: "green",
        fontStyle: "italic",
        fontFamily: "monospace",
        width: "80px",
        textAlign: "right",
    },
};

export default ResourceDisplay;