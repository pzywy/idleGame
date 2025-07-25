import { ECreationType, EResources, ICreation } from "../../types/creationTypes";

//TODO array of effects

export const utilsCreations: ICreation[] =
    [
        {
            id: EResources.creationSpeed,
            name: "CreationSpeed",
            effects: [],
            owned: 10,
            effectiveValue: 1,
            created: 0,
            cost: [],
            type: ECreationType.utility,
            baseCreationTime: 0,
            requirements: [],
            icon: '⚡'
        },
    ]