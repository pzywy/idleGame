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
                    mode: 'onBuy',
                    resource: EResources.divinity,
                    value: 0.5,
                },
                {
                    resource: EResources.divinity, mode: 'static',
                    value: 0.25,
                }
            ],
            cost: [{
                mode: 'onBuy',
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
                    mode: 'onBuy',
                    resource: EResources.divinity,
                    value: 5,
                }
            ],
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 5,
            }, {
                mode: 'onBuy',
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
                    mode: 'onBuy',
                    resource: EResources.divinity,
                    value: 25,
                }
            ],
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 20,
            }, {
                mode: 'onBuy',
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
                    mode: 'onBuy',
                    resource: EResources.divinity,
                    value: 100,
                }
            ],
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 100,
            }, {
                mode: 'onBuy',
                resource: EResources.energy,
                value: 20,
            },
            {
                mode: 'onBuy',
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
                    mode: 'onBuy',
                    resource: EResources.divinity,
                    value: 100,
                }
            ],
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 100,
            }, {
                mode: 'onBuy',
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
                    mode: 'onBuy',
                    resource: EResources.divinity,
                    value: 100,
                }
            ],
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 5,
            }, {
                mode: 'onBuy',
                resource: EResources.energy,
                value: 5,
            },
            {
                mode: 'onBuy',
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
                    mode: 'onBuy',
                    resource: EResources.divinity,
                    value: 50,
                }
            ],
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 100,
            }, {
                mode: 'onBuy',
                resource: EResources.energy,
                value: 50,
            }, {
                mode: 'onBuy',
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
                    mode: 'onBuy',
                    resource: EResources.divinity,
                    value: 100,
                },
                {
                    resource: EResources.life, mode: 'perSecond',
                    value: 0.001,
                }
            ],
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 1000,
            }, {
                mode: 'onBuy',
                resource: EResources.energy,
                value: 100,
            },
            {
                mode: 'onBuy',
                resource: EResources.air,
                value: 10,
            }, {
                mode: 'onBuy',
                resource: EResources.water,
                value: 10,
            }, {
                mode: 'onBuy',
                resource: EResources.earth,
                value: 10,
            }
            ],
            baseCreationTime: 3,
        }),
    ]