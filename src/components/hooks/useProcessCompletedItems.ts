import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResourceActions } from "./useResourceActions";
import { RootState } from "../../store/store";
import { clearCompleted } from "../../store/creations/creationQueueSlice";
import { allResources } from "../../store/allResources";

const useProcessCompletedItems = () => {
    const dispatch = useDispatch();
    const { buyResource } = useResourceActions();

    const completedItems = useSelector((state: RootState) =>
        Object.entries(state.creationQueue.creations).flatMap(([creationId, data]) =>
            ({ id: creationId, amount: data.completedCount })
        ).filter(o => o.amount > 0)
    );

    useEffect(() => {
        if (completedItems.length > 0) {
            // console.log('completedItems', completedItems)
            completedItems.forEach(({ id, amount }) => {
                const creation = allResources.find(o => o.id == id)
                if (creation) {
                    buyResource(creation, amount);
                }
                dispatch(clearCompleted(id));
            });


        }
    }, [completedItems, buyResource, dispatch]);
};

export default useProcessCompletedItems;