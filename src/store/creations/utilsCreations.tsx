import { EResources, ICreation } from "./creationTypes";

//TODO array of effects

export const utilsCreations: ICreation[] =
    [
        {
            id: EResources.creationSpeed,
            name: "CreationSpeed",
            effects: [],
            owned: 1,
            effectiveValue: 1,
            created: 0,
            cost: [],
            type: 'owned',
            baseCreationTime: 0,
            requirements: [],
            icon: '⚡'
        },
    ]