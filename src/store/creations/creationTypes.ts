export enum EResources {
    followers = 'followers',
    power = 'power',
    divinity = 'divinity',
    might = 'might',
    energy = 'energy',
    light = 'light',
    miracle = 'miracle',
    temple = 'temple'
}

export type IResource = {
    resource: EResources,
    mode?: 'perSecond'
}

export type IResourceEffect = {
    name?: string;
    resource: IResource,
    value: number;
}

export type IResourceCost = {
    resource: IResource
    value: number; // >0
}

export type IResourceRequirement = Omit<IResourceCost, 'time'>

export type ICreation = {
    id: EResources;
    name: string;
    effects: IResourceEffect[],
    owned: number;
    created: number;
    cost: IResourceCost[];
    requirements?: IResourceRequirement[]
    type?: 'owned' | 'usable'
    icon?: string;
    baseCreationTime?: number
    perSecond?: number
};
