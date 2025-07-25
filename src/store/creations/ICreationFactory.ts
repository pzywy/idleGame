import { ICreation } from "../../types/creationTypes"

type RequiredParameters = { id: ICreation['id'], type: ICreation['type'] }

export const ICreationFactory = (data: Partial<ICreation> & RequiredParameters): ICreation => {
    return {
        name: "No name",
        effects: [],
        owned: 0,
        created: 0,
        cost: [],
        baseCreationTime: 1,
        requirements: [],
        ...data
    }
}