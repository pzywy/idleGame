import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResourceActions } from "../hooks/useResourceActions";
import { ICreation } from "../../store/creations/creationTypes";
import { RootState } from "../../store/store";
import { useCreationAffordability } from "../hooks/useCreationAffordability";
import { addToQueue, clearQueue } from "../../store/creations/creationQueueSlice";
import { formatNumber } from "../../utils/formatNumber";
import { formatTimeDetailed } from "../../utils/formatTime";

const CreationBuy: React.FC<{ creation: ICreation; buyName?: string }> = ({ creation, buyName = "Create" }) => {
    const dispatch = useDispatch();
    const { payForResource } = useResourceActions();

    //add creation before?
    const queue = useSelector((state: RootState) => state.creationQueue.creations[creation.id] || {});

    const creationSpeedMod = useSelector((state: RootState) => state.creationQueue.globalSpeedMultiplier);
    const gameSpeed = useSelector((state: RootState) => state.game.speed);

    const baseCreationTime = creation.baseCreationTime ?? 0;
    const affordability = useCreationAffordability(creation);
    const canAfford = affordability > 0;

    const currentProgress = queue.count > 0 ? queue.progress : 0;
    const currentTimeLeft = queue.count > 0
        ? ((100 - queue.progress) * queue.baseCreationTime) / 100 / creationSpeedMod / gameSpeed
        : 0;

    const totalTimeLeft =
        queue.baseCreationTime * (queue.count - 1) / creationSpeedMod / gameSpeed + currentTimeLeft;

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
        const remainingCount = queue.count;
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
                {buyName} {formatNumber(affordability)} (max)
            </button>

            {queue.count > 0 && (
                <button
                    style={{
                        ...styles.button,
                        backgroundColor: "#FF5733", // Red color for cancel
                    }}
                    onClick={handleCancelCreation}
                >
                    Cancel ({formatNumber(queue.count)} queued)
                </button>
            )}

            {queue.count > 0 && (
                <div style={styles.progressContainer}>
                    <div
                        style={{
                            ...styles.currentProgressBar,
                            width: `${currentProgress}%`,
                        }}
                    />
                    <div style={styles.timeText}>
                        {formatTimeDetailed(currentTimeLeft)} / {formatTimeDetailed(totalTimeLeft)}
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
    fullProgressBar: {
        position: "absolute",
        height: "100%",
        backgroundColor: "#0056b3", // Darker blue for full progress
        zIndex: 1,
        transition: "width 0.3s linear", // Smooth transition for full progress
    },
    currentProgressBar: {
        position: "absolute",
        height: "100%",
        backgroundColor: "#007BFF", // Lighter blue for current progress
        zIndex: 2,
        transition: "width 0.1s linear", // Fast updates for current progress
    },
    timeText: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "0.9rem",
        color: "#fff",
        zIndex: 3,
    },
};

export default CreationBuy;