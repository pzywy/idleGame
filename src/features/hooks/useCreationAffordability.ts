import { useSelector } from "react-redux";
import { ICreation } from "../../types/creationTypes";
import { calculateResourceValue } from "../../utils/formatFunctions";
import { allCreationsSelector, ICreationsIndex } from "../../store/creationSlice";

//TODO in future we could make all previous needed items too

/**
 * Custom hook to calculate how many of a creation can be afforded.
 * @param creation The creation object to check affordability for.
 * @returns The maximum number of the creation that can be afforded.
 */
export function useCreationAffordability(creation: ICreation): number {
    const creations = useSelector(allCreationsSelector);

    return getCreationAffordability(creations, creation)

}

export function getCreationAffordability(creations: ICreation[], creation: ICreation) {
    // Calculate the affordability based on creation cost
    return Math.min(
        ...creation.cost.map((cr) => {
            const value = creations.find((o) => o.id === cr.resource);
            if (!value) return 0;

            const creationValue = calculateResourceValue(cr.value, creation)

            return Math.max(Math.floor(value.owned / creationValue), 0);
        })
    );
}