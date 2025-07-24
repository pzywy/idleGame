import { ICreation, IStats } from "./creationTypes";

//TODO array of effects

export const creationList = {
    creations: [
        {
            id: "miracle",
            name: "Miracle",
            effects: [
                { resource: IStats.followers, value: 5 }
            ],
            owned: 0,
            cost: [{
                resource: IStats.power,
                value: 10,
            }],
            type: 'usable'
        },
        {
            id: "temple",
            name: "Temple",
            effects: [
                { resource: IStats.followersPS, value: 1 }
            ],
            owned: 0,
            cost: [{
                resource: IStats.followers,
                value: 10,
            }],
            type: 'owned'
        },
    ] as ICreation[],
};