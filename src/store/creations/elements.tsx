import { ECreationType, EResources, ICreation } from "../../types/creationTypes";

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
            type: ECreationType.elements,
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
            type: ECreationType.elements,
            requirements: []
        },
        {
            id: EResources.air,
            name: "Air",
            effects: [
                {
                    resource: { resource: EResources.divinity },
                    value: 10,
                }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.power },
                value: 15,
            }, {
                resource: { resource: EResources.energy },
                value: 10,
            }
            ],
            baseCreationTime: 10,
            type: ECreationType.elements,
            requirements: []
        },
        {
            id: EResources.water,
            name: "Water",
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
                value: 20,
            }, {
                resource: { resource: EResources.energy },
                value: 20,
            },
            {
                resource: { resource: EResources.air },
                value: 5,
            }
            ],
            baseCreationTime: 3,
            type: ECreationType.elements,
            requirements: []
        },
        {
            id: EResources.earth,
            name: "Earth",
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
            type: ECreationType.elements,
            requirements: []
        },
        {
            id: EResources.stone,
            name: "Stone",
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
            },
            {
                resource: { resource: EResources.earth },
                value: 5,
            }
            ],
            baseCreationTime: 3,
            type: ECreationType.elements,
            requirements: []
        },
        {
            id: EResources.fire,
            name: "Fire",
            effects: [
                {
                    resource: { resource: EResources.divinity },
                    value: 50,
                }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.power },
                value: 100,
            }, {
                resource: { resource: EResources.energy },
                value: 50,
            }, {
                resource: { resource: EResources.air },
                value: 50,
            }
            ],
            baseCreationTime: 3,
            type: ECreationType.elements,
            requirements: []
        },
        {
            id: EResources.life,
            name: "Life",
            effects: [
                {
                    resource: { resource: EResources.divinity },
                    value: 100,
                }
            ],
            owned: 0,
            created: 0,
            cost: [{
                resource: { resource: EResources.power },
                value: 1000,
            }, {
                resource: { resource: EResources.energy },
                value: 100,
            },
            {
                resource: { resource: EResources.air },
                value: 10,
            }, {
                resource: { resource: EResources.water },
                value: 10,
            }, {
                resource: { resource: EResources.earth },
                value: 10,
            }
            ],
            baseCreationTime: 3,
            type: ECreationType.elements,
            requirements: []
        },
    ]