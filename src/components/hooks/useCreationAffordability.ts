import { useSelector } from "react-redux";
import { ICreation } from "../../store/creations/creationTypes";
import { RootState } from "../../store/store";

//TODO in future we could make all previous needed items too

/**
 * Custom hook to calculate how many of a creation can be afforded.
 * @param creation The creation object to check affordability for.
 * @returns The maximum number of the creation that can be afforded.
 */
export function useCreationAffordability(creation: ICreation): number {
    // Access Redux state using selectors
    const elements = useSelector((state: RootState) => state.creations.elements);
    const stats = useSelector((state: RootState) => state.stats);

    // Calculate the affordability based on creation cost
    return Math.min(
        ...creation.cost.map((cr) => {
            switch (cr.resource.type) {
                case "element": {
                    const value = elements.find((o) => o.id === cr.resource.resource);
                    if (!value) return 0;
                    return Math.floor(value?.owned / cr.value);
                }
                case "stat": {
                    const statValue = stats[cr.resource.resource as keyof typeof stats]; // Dynamically access stats
                    if (statValue === undefined || statValue === null) return 0;
                    return Math.floor(statValue / cr.value);
                }
                default:
                    console.error(`Unhandled resource type: ${cr.resource.type}`);
                    return 0;
            }
        })
    );
}