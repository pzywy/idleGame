export enum EResources {
    followers = 'followers',
    power = 'power',
    divinity = 'divinity',
    might = 'might',
    energy = 'energy',
    light = 'light',
}

export type IResource = {
    resource: EResources,
    type: 'stat' | 'element'
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
    id: EResources | string;
    name: string;
    effects: IResourceEffect[],
    owned: number;
    cost: IResourceCost[];
    type?: 'owned' | 'usable'
    icon?: string;
    baseCreationTime?: number
};

export type IElement = ICreation & {
    type: 'owned';
    requirements: IResourceRequirement[]
};