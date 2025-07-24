import { EResources, ICreation } from "./creationTypes";

//TODO array of effects

export const elements: ICreation[] =
    [
        {
            id: EResources.energy,
            name: "Energy",
            effects: [
                {
                    resource: { resource: EResources.divinity },
                    value: 1,
                }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.power },
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
                    resource: { resource: EResources.divinity },
                    value: 5,
                }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.power },
                value: 5,
            }, {
                resource: { resource: EResources.energy },
                value: 5,
            }
            ],
            baseCreationTime: 3,
            type: 'owned',
            requirements: []
        },
    ]