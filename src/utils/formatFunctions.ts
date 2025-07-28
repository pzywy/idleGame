import { ICreation } from "../types/creationTypes";

export enum FormatFunction {
    // log10Owned = 'log10Owned',
    creationSpeedFromDivinity = 'creationSpeedFromDivinity'
}

export const formatFunctions: Record<FormatFunction, (arg: ICreation) => number> = {
    //need to divide by c.owned as it will be multiplayed
    [FormatFunction.creationSpeedFromDivinity]: (c: ICreation) => Math.max(Math.log10(c.owned), 0) / c.owned,
};

export function calculateResourceValue(value: number | FormatFunction, creation: ICreation) {
    // console.log('value', value, typeof value == 'number' ? value : formatFunctions[value](creation), creation)
    return typeof value == 'number' ? value : formatFunctions[value](creation)
}