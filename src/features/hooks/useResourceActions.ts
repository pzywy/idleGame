import { useDispatch } from "react-redux";
import { EResources, ICreation, IResource } from "../../types/creationTypes";
import { addCreation } from "../../store/creationSlice";
import { calculateResourceValue } from "../../utils/formatFunctions";

export type ModifiedResources = Partial<Record<EResources, number>>
/**
 * Custom hook to encapsulate resource-related actions.
 */
export const useResourceActions = () => {
    const dispatch = useDispatch();

    const modifyResource = (id: EResources, amount: number) => {
        dispatch(addCreation({ count: amount, id }));
    };

    const payForResource = (creation: ICreation, count = 1, modifiedResources: ModifiedResources = {}): ModifiedResources => {
        creation.cost.forEach((cost) => {
            const amount = -cost.value * count;
            modifyResource(cost.resource, amount);
            //@ts-ignore
            if (cost.resource in modifiedResources) modifiedResources[cost.resource] += amount
            else modifiedResources[cost.resource] = amount

        });
        return modifiedResources;
    };

    const buyResource = (creation: ICreation, count = 1, modifiedResources: ModifiedResources = {}) => {

        //add resources from instant effect
        creation.effects.forEach((effect) => {
            const instantMode = effect.mode === 'onBuy'
            // console.log('instantMode', instantMode, effect)
            if (!instantMode) return;
            const effectValue = calculateResourceValue(effect.value, creation)
            const amount = effectValue * count;
            modifyResource(effect.resource, amount);
            //@ts-ignore
            if (effect.resource in modifiedResources) modifiedResources[effect.resource] += amount
            else modifiedResources[effect.resource] = amount
        });

        //add resource itself
        dispatch(addCreation({ id: creation.id, count }));
        //@ts-ignore
        if (creation.id in modifiedResources) modifiedResources[creation.id] += count
        else modifiedResources[creation.id] = count
        return modifiedResources;
    };

    // Return the functions so they can be used in other components
    return {
        modifyResource,
        payForResource,
        buyResource,
    };
};