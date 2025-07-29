import { formatNumber } from "./formatNumber";

// utils/formatTime.ts
export const formatTime = (seconds: number, decimalPlaces: number = 0): string => {
    if (seconds < 0) return "Invalid Time"; // Handle invalid input
    if (seconds === 0) return "0s"; // Handle zero time

    const timeUnits = [
        { unit: "ms", factor: 1 / 1000 }, // Milliseconds
        { unit: "s", factor: 1 },         // Seconds
        { unit: "m", factor: 60 },        // Minutes
        { unit: "h", factor: 3600 },      // Hours
        { unit: "d", factor: 86400 },     // Days
    ];

    // Determine the appropriate unit
    for (let i = timeUnits.length - 1; i >= 0; i--) {
        const { unit, factor } = timeUnits[i];
        if (seconds >= factor || unit === "ms") {
            const scaledValue = seconds / factor;
            return scaledValue.toFixed(decimalPlaces) + unit;
        }
    }

    return seconds.toFixed(decimalPlaces) + "s"; // Default to seconds
};

// utils/formatTimeDetailed.ts
export const formatTimeDetailed = (seconds: number): string => {
    if (seconds < 0) return "Invalid Time"; // Handle invalid input
    if (seconds === 0) return "0s"; // Handle zero time

    // Calculate individual time components
    const days = Math.floor(seconds / 86400); // 86400 seconds in a day
    seconds %= 86400;

    const hours = Math.floor(seconds / 3600); // 3600 seconds in an hour
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60); // 60 seconds in a minute
    seconds %= 60;

    // Build the formatted time string
    const parts = [];
    if (days > 0) parts.push(`${formatNumber(days)}d`);
    if (hours > 0) parts.push(`${formatNumber(hours)}h`);
    if (minutes > 0) parts.push(`${formatNumber(minutes)}min`);
    if (seconds > 0) parts.push(`${formatTime(seconds)}s`);
    // console.log('parts', parts)

    return parts.slice(0, 2).join(" ");
};