import { ECreationType, EResources, ICreation } from "../../types/creationTypes";
import { ICreationFactory as ICreationFactorBase } from "./ICreationFactory";
//TODO array of effects

const ICreationFactory = ICreationFactorBase(ECreationType.ability, { usable: true })

export const attacks: ICreation[] =
    [
        ICreationFactory({
            id: EResources.powerPunch,
            name: "Power punch",
            abilities: [{
                mode: 'instant',
                resource: EResources.health,
                min: 0.5,
                max: 1,
            }],
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 1,
            }],
            baseCreationTime: 5,
        }),
        ICreationFactory({
            id: EResources.divineStrke,
            name: "Divine strike",
            abilities: [{
                mode: 'instant',
                resource: EResources.health,
                min: 40,
                max: 40,
            }],
            cost: [{
                mode: 'onBuy',
                resource: EResources.divinity,
                value: 1,
            }],
            baseCreationTime: 10,
        }),
        ICreationFactory({
            id: EResources.energyBlast,
            name: "Energy Blast",
            abilities: [{
                mode: 'instant',
                resource: EResources.health,
                min: 50,
                max: 200,
            }],
            cost: [{
                mode: 'onBuy',
                resource: EResources.energy,
                value: 5,
            }],
            baseCreationTime: 10,
        }),
        ICreationFactory({
            id: EResources.energyBlast,
            name: "Finger Snap",
            abilities: [{
                mode: 'instant',
                resource: EResources.health,
                percentage: 50,
            }],
            cost: [{
                mode: 'onBuy',
                resource: EResources.energy,
                value: 5,
            }],
            baseCreationTime: 10,
        })
    ]