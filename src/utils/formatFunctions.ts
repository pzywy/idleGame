import { ICreation } from "../store/creations/creationTypes";

export enum FormatFunction {
    log10Owned = 'log10Owned'
}

export const formatFunctions: Record<FormatFunction, (arg: ICreation) => number> = {
    [FormatFunction.log10Owned]: (c: ICreation) => Math.log10(c.owned) / c.owned,//need to divide as it will be multiplayed
};

export function calculateResourceValue(value: number | FormatFunction, creation: ICreation) {
    // console.log('value', value, typeof value == 'number' ? value : formatFunctions[value](creation), creation)
    return typeof value == 'number' ? value : formatFunctions[value](creation)
}