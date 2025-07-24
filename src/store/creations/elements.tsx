import { EResources, IElement } from "./creationTypes";

//TODO array of effects

export const elements: IElement[] =
    [
        {
            id: EResources.energy,
            name: "Energy",
            effects: [
                {
                    resource: { resource: EResources.divinity, type: 'stat' },
                    value: 1,
                }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.power, type: 'stat' },
                value: 5,
            }],
            type: 'owned',
            baseCreationTime: 1,
            requirements: []
        },
        {
            id: EResources.light,
            name: "Light",
            effects: [
                {
                    resource: { resource: EResources.divinity, type: 'stat' },
                    value: 5,
                }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.power, type: 'stat' },
                value: 5,
            }, {
                resource: { resource: EResources.energy, type: 'element' },
                value: 5,
            }
            ],
            baseCreationTime: 3,
            type: 'owned',
            requirements: []
        },
    ]