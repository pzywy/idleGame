import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResourceActions } from "./useResourceActions";
import { RootState } from "../../store/store";
import { clearCompleted } from "../../store/creations/creationQueSlice";
import { allResources } from "../../store/allResources";

const useProcessCompletedItems = () => {
    const dispatch = useDispatch();
    const { buyResource } = useResourceActions();

    const completedItems = useSelector((state: RootState) =>
        Object.entries(state.creationQueue).flatMap(([creationId, data]) =>
            data.completed.map(() => ({
                creationId: creationId,
            }))
        )
    );

    useEffect(() => {
        if (completedItems.length > 0) {

            completedItems.forEach(({ creationId }) => {
                const creation = allResources.find(o => o.id == creationId)
                if (creation) {
                    buyResource(creation, 1);
                }
            });

            // Clear completed items after processing
            completedItems.forEach(({ creationId }) => {
                dispatch(clearCompleted(creationId));
            });
        }
    }, [completedItems, buyResource, dispatch]);
};

export default useProcessCompletedItems;