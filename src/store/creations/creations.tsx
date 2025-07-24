import { ICreation, EResources } from "./creationTypes";

//TODO array of effects

export const creationList: ICreation[] =
    [
        {
            id: "cr-miracle",
            name: "Miracle",
            effects: [
                { resource: { resource: EResources.followers, type: 'stat' }, value: 5 }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.power, type: 'stat' },
                value: 10,
            }],
            type: 'usable'
        },
        {
            id: "cr-temple",
            name: "Temple",
            effects: [
                { resource: { resource: EResources.followers, mode: 'perSecond', type: 'stat' }, value: 1 }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.followers, type: 'stat' },
                value: 10,
            }],
            type: 'owned'
        },
    ]