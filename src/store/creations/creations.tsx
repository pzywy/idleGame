import { ICreation, EResources, ECreationType } from "../../types/creationTypes";

//TODO array of effects

export const creationList: ICreation[] =
    [
        {
            id: EResources.miracle,
            name: "Miracle",
            effects: [
                { mode: 'onBuy', resource: EResources.followers, value: 5 }
            ],
            owned: 0,
            created: 0,
            cost: [{
                mode: 'onBuy',
                resource: EResources.power,
                value: 10,
            }],
            type: ECreationType.creations
        },
        {
            id: EResources.temple,
            name: "Temple",
            effects: [
                { resource: EResources.followers, mode: 'perSecond', value: 1 }
            ],
            owned: 0,
            created: 0,
            cost: [{
                mode: 'onBuy',
                resource: EResources.followers,
                value: 10,
            }],
            type: ECreationType.creations
        },
    ]