import { FormatFunction } from "../../utils/formatFunctions";

export enum EResources {
    followers = 'followers',
    power = 'power',
    divinity = 'divinity',
    might = 'might',
    energy = 'energy',
    light = 'light',
    miracle = 'miracle',
    temple = 'temple',
    creationSpeed = 'creationSpeed'
}

export type IResource = {
    resource: EResources,
    //no mode = instant 'gift'
    mode?: 'perSecond' | 'bonus' | 'bonusPerSec'
}

export type IResourceEffect = {
    name?: string;
    resource: IResource,
    value: number | FormatFunction; // >0
}

export type IResourceCost = {
    resource: IResource
    value: number | FormatFunction; // >0
}

export type IResourceRequirement = Omit<IResourceCost, 'time'>

export type ICreation = {
    id: EResources;
    name: string;
    effects: IResourceEffect[],
    effectiveValue?: number
    owned: number;
    created: number;
    cost: IResourceCost[];
    requirements?: IResourceRequirement[]
    type?: 'owned' | 'usable'
    icon?: string;
    baseCreationTime?: number
    perSecond?: number
};
