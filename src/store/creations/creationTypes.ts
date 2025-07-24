export enum IStats {
    followers,
    followersPS,
    power,
    powerPs
}

export type IResourceEffect = {
    name: string;
    resource: IStats,
    value: number;
}

export type IResourceCost = {
    resource: IStats
    value: number; // >0
    time?: number;
}

export type ICreation = {
    id: string;
    name: string;
    effects: IResourceEffect[],
    owned: number;
    cost: IResourceCost[];
    type?: 'owned' | 'usable'
    icon?: string;
};