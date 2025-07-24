import { useDispatch } from "react-redux";
import { ICreation, IResource } from "../../store/creations/creationTypes";
import { addStat } from "../../store/statsSlice";
import { addCreation } from "../../store/creations/creationSlice";


/**
 * Custom hook to encapsulate resource-related actions.
 */
export const useResourceActions = () => {
    const dispatch = useDispatch();

    const modifyResource = (resource: IResource, amount: number) => {
        dispatch(addCreation({ count: amount, id: resource.resource }));
    };

    const payForResource = (creation: ICreation, count = 1) => {
        creation.cost.forEach((cost) => {
            const amount = -cost.value * count;
            modifyResource(cost.resource, amount);

        });
    };

    const buyResource = (creation: ICreation, count = 1) => {
        creation.effects.forEach((effect) => {
            if (effect.resource.mode === "perSecond") return;
            const amount = effect.value * count;
            modifyResource(effect.resource, amount);
        });
        dispatch(addCreation({ id: creation.id, count }));
    };

    // Return the functions so they can be used in other components
    return {
        modifyResource,
        payForResource,
        buyResource,
    };
};