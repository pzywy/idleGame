import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResourceActions } from "./useResourceActions";
import { clearCompleted, completeCreationQueueItems } from "../../store/creationQueueSlice";
import { allResources } from "../../store/creations/allResources";

const useProcessCompletedItems = () => {
    const dispatch = useDispatch();
    const { buyResource } = useResourceActions();
    const completedItems = useSelector(completeCreationQueueItems)



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