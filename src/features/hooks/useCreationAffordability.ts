import { useSelector } from "react-redux";
import { ICreation } from "../../types/creationTypes";
import { RootState } from "../../store/store";
import { calculateResourceValue } from "../../utils/formatFunctions";
import { ICreationsIndex } from "../../store/creationSlice";

//TODO in future we could make all previous needed items too

/**
 * Custom hook to calculate how many of a creation can be afforded.
 * @param creation The creation object to check affordability for.
 * @returns The maximum number of the creation that can be afforded.
 */
export function useCreationAffordability(creation: ICreation): number {
    // Access Redux state using selectors
    // const creationsIndex = useSelector((state: RootState) => state.creations.index);
    const creations = useSelector((state: RootState) => Object.values(state.creations).flat());

    return getCreationAffordability(creations, creation)
    // return getCreationAffordabilityIndex(creationsIndex, creation)

}

export function getCreationAffordabilityIndex(creations: ICreationsIndex, creation: ICreation) {
    // Calculate the affordability based on creation cost
    return Math.min(
        ...creation.cost.map((cr) => {
            const value = creations[cr.resource.resource];
            if (!value) return 0;

            const creationValue = calculateResourceValue(cr.value, creation)

            return Math.max(Math.floor(value.owned / creationValue), 0);
        })
    );
}
export function getCreationAffordability(creations: ICreation[], creation: ICreation) {
    // Calculate the affordability based on creation cost
    return Math.min(
        ...creation.cost.map((cr) => {
            const value = creations.find((o) => o.id === cr.resource.resource);
            if (!value) return 0;

            const creationValue = calculateResourceValue(cr.value, creation)

            return Math.max(Math.floor(value.owned / creationValue), 0);
        })
    );
}