import { useSelector } from "react-redux";
import { ICreation } from "../../types/creationTypes";
import { RootState } from "../../store/store";
import { calculateResourceValue } from "../../utils/formatFunctions";

//TODO in future we could make all previous needed items too

/**
 * Custom hook to calculate how many of a creation can be afforded.
 * @param creation The creation object to check affordability for.
 * @returns The maximum number of the creation that can be afforded.
 */
export function useCreationAffordability(creation: ICreation): number {
    // Access Redux state using selectors
    const creations = useSelector((state: RootState) => Object.values(state.creations).flat());


    // Calculate the affordability based on creation cost
    return Math.min(
        ...creation.cost.map((cr) => {
            const value = creations.find((o) => o.id === cr.resource.resource);
            if (!value) return 0;

            const creationValue = calculateResourceValue(cr.value, creation)

            return Math.floor(value?.owned / creationValue);
        })
    );
}