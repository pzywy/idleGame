import { FormatFunction } from "../utils/formatFunctions";

export enum EResources {
    followers = 'followers',
    power = 'power',
    divinity = 'divinity',
    might = 'might',

    energy = 'energy',
    light = 'light',
    air = 'air',
    fire = 'fire',
    water = 'water',
    earth = 'earth',
    stone = 'stone',
    life = 'life',


    miracle = 'miracle',
    temple = 'temple',

    creationSpeed = 'creationSpeed'
}

export enum ECreationType {
    stats,
    elements,
    creations,
    utility
}


export type IResourceMode = 'perSecond' | 'bonus' | 'bonusPerSec' | 'static' | 'instant'

export type IResource = {
    resource: EResources,
    //no mode = instant
    mode?: IResourceMode;
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
    type?: ECreationType
    icon?: string;
    baseCreationTime?: number
    perSecond?: number
    autobuy?: boolean;
};
