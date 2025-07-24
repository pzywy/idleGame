import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResourceActions } from "../hooks/useResourceActions";
import { ICreation } from "../../store/creations/creationTypes";
import { RootState } from "../../store/store";
import { useCreationAffordability } from "../hooks/useCreationAffordability";
import { addToQueue, clearQueue } from "../../store/creations/creationQueSlice";

const CreationBuy: React.FC<{ creation: ICreation; buyName?: string }> = ({ creation, buyName = "Create" }) => {
    const dispatch = useDispatch();
    const { payForResource } = useResourceActions();

    const queue = useSelector((state: RootState) => state.creationQueue[creation.id]?.queue || []);
    const baseCreationTime = creation.baseCreationTime ?? 1;
    const affordability = useCreationAffordability(creation)
    const canAfford = affordability > 0;

    const totalTimeLeft = queue.reduce(
        (sum, item) => sum + (100 - item.progress) * baseCreationTime / 100,
        0
    ); // Total time left in seconds

    const currentItem = queue[0];
    const currentProgress = currentItem ? currentItem.progress : 0;
    const currentTimeLeft = currentItem
        ? ((100 - currentItem.progress) * baseCreationTime) / 100
        : 0;

    const handleBuyCreation = (count = 1) => {
        if (!canAfford) return;

        payForResource(creation, count); // Deduct resources
        dispatch(
            addToQueue({
                creationId: creation.id,
                count,
                baseTime: baseCreationTime,
            })
        );
    };

    const handleCancelCreation = () => {
        const remainingCount = queue.length;
        payForResource(creation, -remainingCount); // Refund resources for remaining items
        dispatch(clearQueue(creation.id));
    };

    return (
        <div className="buttons" style={styles.buttons}>
            <button
                style={{
                    ...styles.button,
                    ...(!canAfford ? styles.disabledButton : {}),
                }}
                onClick={() => handleBuyCreation(1)}
                disabled={!canAfford}
            >
                {buyName} 1
            </button>

            <button
                style={{
                    ...styles.button,
                    ...(!canAfford ? styles.disabledButton : {}),
                }}
                onClick={() => handleBuyCreation(affordability)}
                disabled={!canAfford}
            >
                {buyName} {affordability} (max)
            </button>

            {queue.length > 0 && (
                <button
                    style={{
                        ...styles.button,
                        backgroundColor: "#FF5733", // Red color for cancel
                    }}
                    onClick={handleCancelCreation}
                >
                    Cancel ({queue.length} queued)
                </button>
            )}

            {queue.length > 0 && (
                <div style={styles.progressContainer}>
                    <div style={{ ...styles.progressBar, width: `${currentProgress}%` }} />
                    <div style={styles.timeText}>
                        {currentTimeLeft.toFixed(1)}s / {totalTimeLeft.toFixed(1)}s
                    </div>
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    buttons: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    button: {
        marginTop: "15px",
        padding: "10px 20px",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    disabledButton: {
        backgroundColor: "#ccc",
        cursor: "not-allowed",
    },
    progressContainer: {
        marginTop: "20px",
        width: "100%",
        height: "30px",
        backgroundColor: "#e0e0e0",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#007BFF",
        transition: "width 0.1s linear",
    },
    timeText: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "0.9rem",
        color: "#fff",
    },
};

export default CreationBuy;