import { FormatFunction } from "../../utils/formatFunctions";
import { ECreationType, EResources, ICreation } from "../../types/creationTypes";
import { ICreationFactory } from "./ICreationFactory";

//TODO array of effects

export const stats: ICreation[] =
    [
        ICreationFactory({
            id: EResources.power,
            name: "Power",
            owned: 100,
            type: ECreationType.stats,
            icon: '⚡'
        }),
        ICreationFactory({
            id: EResources.divinity,
            name: "Divinity",
            effects: [
                { resource: { resource: EResources.power, mode: 'perSecond' }, value: 0.1 },
                { resource: { resource: EResources.creationSpeed, mode: 'bonus' }, value: FormatFunction.creationSpeedFromDivinity }
            ],
            type: ECreationType.stats,
            icon: '⚡'
        }),
        ICreationFactory({
            id: EResources.followers,
            name: "Followers",
            effects: [{ resource: { resource: EResources.power, mode: 'perSecond' }, value: 1 }],
            type: ECreationType.stats,
            icon: '👥'
        }),
        ICreationFactory({
            id: EResources.might,
            name: "Might",
            type: ECreationType.stats,
            icon: '⚡'
        }),
    ]