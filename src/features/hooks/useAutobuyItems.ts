import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { ModifiedResources, useResourceActions } from "./useResourceActions";
import { getCreationAffordability } from "./useCreationAffordability";
import { addToQueue, creationMultiply, creationQueueItems } from "../../store/creationQueueSlice";
import { allCreationsSelector, updateCreationAutobuyPerSecond } from "../../store/creationSlice";
import { ICreation } from "../../types/creationTypes";

export const useAutobuyItems = () => {
    const { buyResource, payForResource } = useResourceActions();
    const dispatch = useDispatch();

    const creationMultipy = useSelector(creationMultiply);

    const creations = useSelector(allCreationsSelector);

    const queue = useSelector(creationQueueItems);

    const autobuyItems = useCallback(
        async (delta: number) => {
            const autobuyItems = creations.filter(o => !!o.autobuy);
            function handleAutobuy(creation: ICreation, usedResources: ModifiedResources) {
                let amountToBuy = 0;
                // console.log('usedResources', usedResources)
                let maxAmount = getCreationAffordability(creations, creation, usedResources);
                // console.log('maxAmount', maxAmount)

                if (creation.baseCreationTime) {
                    const adjustedDelta = delta * creationMultipy;
                    const itemsPerDelta = (adjustedDelta / creation.baseCreationTime);
                    amountToBuy = Math.min(itemsPerDelta, maxAmount);
                } else
                    amountToBuy = maxAmount

                let buyPerSec = amountToBuy / delta;

                dispatch(
                    updateCreationAutobuyPerSecond({
                        id: creation.id, count: buyPerSec,
                    })
                );

                //instant buy
                if (amountToBuy >= 1) {
                    const instantAmountToBuy = Math.floor(amountToBuy);
                    amountToBuy -= instantAmountToBuy;
                    maxAmount -= instantAmountToBuy
                    try {
                        payForResource(creation, instantAmountToBuy, usedResources);
                        buyResource(creation, instantAmountToBuy, usedResources);
                        //veryfi
                    }
                    catch (e) {
                        console.warn('Failed to pay for resource', { instantAmountToBuy, creation, e, maxAmount })
                    }
                }

                const itemsInQueue = queue[creation.id]?.count;
                // if there is more then 0.5 item per delta we need to add more to queue (if possible)

                const maxInQueue = Math.floor(amountToBuy / 0.33)
                const isInQueue = itemsInQueue && itemsInQueue > maxInQueue;
                if (isInQueue) return;

                const countToAddToQueue = Math.min(maxAmount, maxInQueue + 1)

                //Add one element to queue
                try {
                    payForResource(creation, countToAddToQueue, usedResources);
                    dispatch(
                        addToQueue({
                            creationId: creation.id,
                            count: countToAddToQueue,
                            baseTime: creation.baseCreationTime ?? 0,
                        })
                    );
                } catch (e) {
                    console.warn('Failed to pay fo quequed resource', e)
                }

            }

            if (autobuyItems.length > 0) {
                let usedResources: ModifiedResources = {}
                for (const creation of autobuyItems) {
                    handleAutobuy(creation, usedResources)

                }

            }
        },
        [creations, creationMultipy, payForResource, buyResource, dispatch]
    );

    return { autobuyItems };
};

