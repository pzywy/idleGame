// utils/formatNumber.ts
export const formatNumber = (value: number, decimalPlaces: number = 2, decimalPlacesTier0: number = 0): string => {
    if (value === 0) return "0";

    const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    const tier = Math.floor(Math.log10(Math.abs(value)) / 3); // Determines the suffix tier (e.g., K, M, B)

    if (tier <= 0) {
        if (value - Math.floor(value) == 0)
            return value.toFixed(0)
        // No suffix needed
        return value.toFixed(decimalPlacesTier0);
    }

    if (tier > suffixes.length - 1) {
        return value.toExponential(decimalPlaces)
    }

    const suffix = suffixes[tier];
    const scaledValue = value / Math.pow(10, tier * 3); // Scale the value to match the suffix

    return scaledValue.toFixed(decimalPlaces) + suffix;
};