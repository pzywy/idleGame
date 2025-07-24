import { ICreation, EResources, IElement } from "./creationTypes";

//TODO array of effects

export const elements: IElement[] =
    [
        {
            id: EResources.energy,
            name: "Energy",
            effects: [
            ],
            owned: 0,
            cost: [{
                resource: { resource: EResources.power, type: 'stat' },
                value: 5,
            }],
            type: 'owned',
            requirements: []
        },
        {
            id: EResources.light,
            name: "Light",
            effects: [
            ],
            owned: 0,
            cost: [{
                resource: { resource: EResources.power, type: 'stat' },
                value: 5,
            }, {
                resource: { resource: EResources.energy, type: 'element' },
                value: 5,
            }
            ],
            type: 'owned',
            requirements: []
        },
    ]