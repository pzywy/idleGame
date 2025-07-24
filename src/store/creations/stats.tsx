import { FormatFunction } from "../../utils/formatFunctions";
import { EResources, ICreation } from "./creationTypes";

//TODO array of effects

export const stats: ICreation[] =
    [
        {
            id: EResources.power,
            name: "Power",
            effects: [],
            owned: 100,
            created: 0,
            cost: [],
            type: 'owned',
            baseCreationTime: 0,
            requirements: [],
            icon: '⚡'
        },
        {
            id: EResources.divinity,
            name: "Divinity",
            effects: [
                { resource: { resource: EResources.power, mode: 'perSecond' }, value: 0.1 },
                { resource: { resource: EResources.creationSpeed, mode: 'bonus' }, value: FormatFunction.log10Owned }
            ],
            owned: 0,
            created: 0,
            cost: [],
            type: 'owned',
            baseCreationTime: 0,
            requirements: [],
            icon: '⚡'
        },
        {
            id: EResources.followers,
            name: "Followers",
            effects: [{ resource: { resource: EResources.power, mode: 'perSecond' }, value: 1 }],
            owned: 0,
            created: 0,
            cost: [],
            type: 'owned',
            baseCreationTime: 0,
            requirements: [],
            icon: '👥'
        },
        {
            id: EResources.might,
            name: "Might",
            effects: [],
            owned: 0,
            created: 0,
            cost: [],
            type: 'owned',
            baseCreationTime: 0,
            requirements: [],
            icon: '⚡'
        },
    ]