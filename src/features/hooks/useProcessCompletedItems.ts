import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResourceActions } from "./useResourceActions";
import { clearCompleted, completeCreationQueueItems } from "../../store/creationQueueSlice";
import { allCreationsSelector } from "../../store/creationSlice";

const useProcessCompletedItems = () => {
    const dispatch = useDispatch();
    const { buyResource } = useResourceActions();
    const completedItems = useSelector(completeCreationQueueItems)

    const creations = useSelector(allCreationsSelector);



    useEffect(() => {
        if (completedItems.length > 0) {
            // console.log('completedItems', completedItems)
            completedItems.forEach(({ id, amount }) => {
                const creation = creations.find(o => o.id == id)
                if (creation) {
                    buyResource(creation, amount);
                }
                dispatch(clearCompleted(id));
            });


        }
    }, [completedItems, buyResource, dispatch]);
};

export default useProcessCompletedItems;