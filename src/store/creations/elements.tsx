import { ECreationType, EResources, ICreation } from "../../types/creationTypes";
import { ICreationFactory as ICreationFactorBase } from "./ICreationFactory";
//TODO array of effects

const ICreationFactory = ICreationFactorBase(ECreationType.elements)

export const elements: ICreation[] =
    [
        ICreationFactory({
            id: EResources.energy,
            name: "Energy",
            effects: [
                {
                    resource: EResources.divinity,
                    value: 0.5,
                },
                {
                    resource: EResources.divinity, mode: 'static',
                    value: 0.25,
                }
            ],
            cost: [{
                resource: EResources.power,
                value: 5,
            }],
            baseCreationTime: 1,
        }),
        ICreationFactory({
            id: EResources.light,
            name: "Light",
            effects: [
                {
                    resource: EResources.divinity,
                    value: 5,
                }
            ],
            cost: [{
                resource: EResources.power,
                value: 5,
            }, {
                resource: EResources.energy,
                value: 5,
            }
            ],
            baseCreationTime: 10,
            requirements: []
        }),
        ICreationFactory({
            id: EResources.air,
            name: "Air",
            effects: [
                {
                    resource: EResources.divinity,
                    value: 25,
                }
            ],
            cost: [{
                resource: EResources.power,
                value: 20,
            }, {
                resource: EResources.energy,
                value: 10,
            }
            ],
            baseCreationTime: 25,
            requirements: []
        }),
        ICreationFactory({
            id: EResources.water,
            name: "Water",
            effects: [
                {
                    resource: EResources.divinity,
                    value: 100,
                }
            ],
            cost: [{
                resource: EResources.power,
                value: 100,
            }, {
                resource: EResources.energy,
                value: 20,
            },
            {
                resource: EResources.air,
                value: 20,
            }
            ],
            baseCreationTime: 50,
            requirements: []
        }),
        ICreationFactory({
            id: EResources.earth,
            name: "Earth",
            effects: [
                {
                    resource: EResources.divinity,
                    value: 100,
                }
            ],
            cost: [{
                resource: EResources.power,
                value: 100,
            }, {
                resource: EResources.energy,
                value: 30,
            }
            ],
            baseCreationTime: 60,
            requirements: []
        }),
        ICreationFactory({
            id: EResources.stone,
            name: "Stone",
            effects: [
                {
                    resource: EResources.divinity,
                    value: 100,
                }
            ],
            cost: [{
                resource: EResources.power,
                value: 5,
            }, {
                resource: EResources.energy,
                value: 5,
            },
            {
                resource: EResources.earth,
                value: 5,
            }
            ],
            baseCreationTime: 3,
            requirements: []
        }),
        ICreationFactory({
            id: EResources.fire,
            name: "Fire",
            effects: [
                {
                    resource: EResources.divinity,
                    value: 50,
                }
            ],
            cost: [{
                resource: EResources.power,
                value: 100,
            }, {
                resource: EResources.energy,
                value: 50,
            }, {
                resource: EResources.air,
                value: 50,
            }
            ],
            baseCreationTime: 3,
        }),
        ICreationFactory({
            id: EResources.life,
            name: "Life",
            effects: [
                {
                    resource: EResources.divinity,
                    value: 100,
                },
                {
                    resource: EResources.life, mode: 'perSecond',
                    value: 0.001,
                }
            ],
            cost: [{
                resource: EResources.power,
                value: 1000,
            }, {
                resource: EResources.energy,
                value: 100,
            },
            {
                resource: EResources.air,
                value: 10,
            }, {
                resource: EResources.water,
                value: 10,
            }, {
                resource: EResources.earth,
                value: 10,
            }
            ],
            baseCreationTime: 3,
        }),
    ]