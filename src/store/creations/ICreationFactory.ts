import { ECreationType, ICreation } from "../../types/creationTypes"

type RequiredParameters = { id: ICreation['id'] }

export const ICreationFactory = (type: ECreationType, base: Partial<ICreation> = {}) => (data: Partial<ICreation> & RequiredParameters): ICreation => {
    return {
        ...base,
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