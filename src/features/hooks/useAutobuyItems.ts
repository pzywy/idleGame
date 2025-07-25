import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { useResourceActions } from "./useResourceActions";
import { RootState } from "../../store/store";
import { getCreationAffordability } from "./useCreationAffordability";
import { addToQueue } from "../../store/creationQueueSlice";
import { allCreationsSelector } from "../../store/creationSlice";

export const useAutobuyItems = () => {
    const { buyResource, payForResource } = useResourceActions();
    const dispatch = useDispatch();

    const creationMultipy = useSelector((state: RootState) => state.creationQueue.globalSpeedMultiplier);

    const creations = useSelector(allCreationsSelector);

    const queue = useSelector((state: RootState) =>
        state.creationQueue.creations
    );

    // Memoize the `buyItems` function
    const autobuyItems = useCallback(
        (delta: number) => {
            const autobuyItems = creations.filter(o => !!o.autobuy);

            if (autobuyItems.length > 0) {
                autobuyItems.forEach((creation) => {
                    let amountToBuy = 0;
                    const maxAmount = getCreationAffordability(creations, creation);


                    if (creation.baseCreationTime) {
                        const adjustedDelta = delta * creationMultipy;
                        const itemsPerDelta = (adjustedDelta / creation.baseCreationTime);
                        // console.log('itemsPerDelta', itemsPerDelta)
                        amountToBuy = Math.min(itemsPerDelta, maxAmount);

                        // Floor the value if necessary
                        // amountToBuy = Math.floor(amountToBuy);
                    }

                    // //log variable
                    // const resources = creations.filter(cr => creation.cost.map(o => o.resource.resource).includes(cr.id))
                    //     .map(cr => ({ res: cr.id, owned: cr.owned, costs: (<any>creation.cost.find(o => o.resource.resource == cr.id)?.value) * amountToBuy }))
                    //     .map(o => ({ id: o.res, diff: o.owned - o.costs, owned: o.owned, cost: o.costs }))

                    // console.log('resources', resources)

                    if (amountToBuy >= 1) {
                        amountToBuy = Math.floor(amountToBuy);
                        try {
                            payForResource(creation, amountToBuy);
                            buyResource(creation, amountToBuy);
                            //veryfi
                        }
                        catch (e) {
                            console.warn('Failed to pay for resource', { amountToBuy, creation, e, maxAmount })
                        }
                        return;
                    }

                    const itemsInQueue = queue[creation.id]?.count;
                    // if there is more then 0.5 item per delta we need to add more to queue (if possible)

                    const maxInQueue = Math.floor(amountToBuy / 0.33)
                    // console.log('amountToBuy', amountToBuy)
                    const isInQueue = itemsInQueue && itemsInQueue > maxInQueue;
                    if (isInQueue) return;

                    const countToAddToQueue = Math.min(maxAmount, maxInQueue + 1)

                    //Add one element to queue
                    try {
                        payForResource(creation, countToAddToQueue);
                        dispatch(
                            addToQueue({
                                creationId: creation.id,
                                count: countToAddToQueue,
                                baseTime: creation.baseCreationTime ?? 0,
                            })
                        );
                    } catch (e) {
                        console.warn('Failed to pay fo quequed resource')
                    }

                });
            }
        },
        [creations, creationMultipy, payForResource, buyResource, dispatch]
    );

    return { autobuyItems };
};