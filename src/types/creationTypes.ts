import { FormatFunction } from "../utils/formatFunctions";

//TODO change to ECreations
export enum EResources {
    health = 's-health',
    followers = 's-followers',
    power = 's-power',
    divinity = 's-divinity',
    might = 's-might',

    energy = 'e-energy',
    light = 'e-light',
    air = 'e-air',
    fire = 'e-fire',
    water = 'e-water',
    earth = 'e-earth',
    stone = 'e-stone',
    life = 'e-life',

    powerPunch = 'p-powerPunch',
    energyBlast = 'p-energyBlast',
    divineStrke = 'p-divineStrike',


    miracle = 'miracle',
    temple = 'temple',

    creationSpeed = 'creationSpeed'
}

export enum ECreationType {
    stats,
    elements,
    creations,
    ability,
    utility,
}


export type IResourceMode = 'perSecond' | 'bonus' | 'bonusPerSec' | 'static' | 'instant' | 'onBuy' | 'max'

export type IResource = {
    resource: EResources,
    //no mode = instant
    mode: IResourceMode;
    value: number | FormatFunction; // >0
}

export type IResourceEffect = IResource & {
    name?: string;
}

export type IResourceCost = IResource & {
}

export type IAbilities = {
    resource: EResources,
    //no mode = instant
    mode: IResourceMode;
    value?: number;
    percentage?:number
    min?: number
    max?: number
    //critical chance
}

export type IResourceRequirement = Omit<IResourceCost, 'time'>

export type ICreation = {
    id: EResources;
    name: string;
    effects: IResourceEffect[],
    effectiveValue?: number;
    abilities?: IAbilities[]
    owned: number;
    maxOwned?: number;
    created: number;
    cost: IResourceCost[];
    requirements?: IResourceRequirement[]
    type?: ECreationType
    icon?: string;
    baseCreationTime?: number
    perSecond?: number

    usable?: boolean;

    autobuy?: boolean;
    autobuyPerSec?: number
    hideFromUI?: boolean
};
