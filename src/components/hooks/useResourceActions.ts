import { useDispatch } from "react-redux";
import { ICreation, IResource } from "../../store/creations/creationTypes";
import { addStat } from "../../store/statsSlice";
import { addCreation } from "../../store/creations/creationSlice";


/**
 * Custom hook to encapsulate resource-related actions.
 */
export const useResourceActions = () => {
    const dispatch = useDispatch();

    /**
     * Modify a resource by a specific amount.
     * @param resource The resource object to modify.
     * @param amount The amount to modify the resource by.
     */
    const modifyResource = (resource: IResource, amount: number) => {
        switch (resource.type) {
            case "stat": {
                dispatch(addStat({ amount, id: resource.resource }));
                return;
            }
            case "element": {
                dispatch(addCreation({ count: amount, id: resource.resource }));
                return;
            }
            default: {
                console.error(`Unhandled resource type: ${resource.type}`);
            }
        }
    };

    /**
     * Pay for a resource by reducing the required amount.
     * @param creation The creation object that has a cost.
     * @param count The number of times to pay for the resource.
     */
    const payForResource = (creation: ICreation, count = 1) => {
        creation.cost.forEach((cost) => {
            const amount = -cost.value * count;
            modifyResource(cost.resource, amount);
        });
    };

    /**
     * Buy a resource by applying its effects and dispatching the creation action.
     * @param creation The creation object to buy.
     * @param count The number of times to buy the resource.
     */
    const buyResource = (creation: ICreation, count = 1) => {
        creation.effects.forEach((effect) => {
            if (effect.resource.mode === "perSecond") return;
            const amount = effect.value * count;
            modifyResource(effect.resource, amount);
        });
        dispatch(addCreation({ id: creation.id, count: 1 }));
    };

    // Return the functions so they can be used in other components
    return {
        modifyResource,
        payForResource,
        buyResource,
    };
};