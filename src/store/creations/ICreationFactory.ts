import { ECreationType, ICreation } from "../../types/creationTypes"

type RequiredParameters = { id: ICreation['id'] }

export const ICreationFactory = (type: ECreationType) => (data: Partial<ICreation> & RequiredParameters): ICreation => {
    return {
        name: "No name",
        effects: [],
        owned: 0,
        created: 0,
        cost: [],
        baseCreationTime: 1,
        requirements: [],
        type,
        ...data
    }
}