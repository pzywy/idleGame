import { ECreationType, EResources, ICreation } from "../../types/creationTypes";
import { ICreationFactory as ICreationFactorBase } from "./ICreationFactory";
//TODO array of effects

const ICreationFactory = ICreationFactorBase(ECreationType.power, { usable: true })

export const powers: ICreation[] =
    [
        ICreationFactory({
            id: EResources.powerPunch,
            name: "Power punch",
            effects: [{
                mode: 'instant',
                resource: EResources.health,
                value: 1,
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
            effects: [{
                mode: 'instant',
                resource: EResources.health,
                value: 15,
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
            effects: [{
                mode: 'instant',
                resource: EResources.health,
                value: 50,
            }],
            cost: [{
                mode: 'onBuy',
                resource: EResources.energy,
                value: 5,
            }],
            baseCreationTime: 10,
        })
    ]