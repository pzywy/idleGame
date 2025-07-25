import { useDispatch } from "react-redux";
import { ICreation, IResource } from "../../types/creationTypes";
import { addCreation } from "../../store/creationSlice";
import { calculateResourceValue } from "../../utils/formatFunctions";


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
            const instantMode = effect.resource.mode === 'instant' || effect.resource.mode === undefined
            // console.log('instantMode', instantMode, effect)
            if (!instantMode) return;
            const effectValue = calculateResourceValue(effect.value, creation)
            const amount = effectValue * count;
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