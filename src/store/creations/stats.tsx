import { FormatFunction } from "../../utils/formatFunctions";
import { ECreationType, EResources, ICreation } from "../../types/creationTypes";
import { ICreationFactory as ICreationFactorBase } from "./ICreationFactory";

//TODO array of effects

const ICreationFactory = ICreationFactorBase(ECreationType.stats)

export const stats: ICreation[] =
    [
        ICreationFactory({
            id: EResources.power,
            name: "Power",
            owned: 100,
            icon: '⚡',
        }),
        ICreationFactory({
            id: EResources.divinity,
            name: "Divinity",
            effects: [
                { resource: EResources.power, mode: 'perSecond', value: 0.1 },
                { resource: EResources.creationSpeed, mode: 'bonus', value: FormatFunction.creationSpeedFromDivinity }
            ],
            icon: '🌟',
        }),
        ICreationFactory({
            id: EResources.followers,
            name: "Followers",
            effects: [{ resource: EResources.power, mode: 'perSecond', value: 1 }],
            icon: '🧑‍🤝‍🧑',
        }),
        ICreationFactory({
            id: EResources.might,
            owned: 1,
            effects: [
                { resource: EResources.power, mode: 'perSecond', value: 1 },
                { resource: EResources.health, mode: 'perSecond', value: 10 },
                { resource: EResources.health, mode: 'max', value: 100 },
            ],
            name: "Might",
            icon: '💪',
        }),
        ICreationFactory({
            id: EResources.health,
            // hideFromUI: true,
            name: "Health",
            icon: '❤️',
        }),
    ]