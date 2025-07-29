import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResourceActions } from "../../features/hooks/useResourceActions";
import { ICreation } from "../../types/creationTypes";
import { useCreationAffordability } from "../../features/hooks/useCreationAffordability";
import { addToQueue, clearQueue, creationMultiply, creationQueueItemById } from "../../store/creationQueueSlice";
import { formatNumber } from "../../utils/formatNumber";
import { formatTimeDetailed } from "../../utils/formatTime";
import { gameSpeedSelect } from "../../store/gameSlice";
import { buttonStyle } from "../buttonsStyle";


//TODO 'check to automate' within queue slice
const CreationBuy: React.FC<{ creation: ICreation; buyName?: string }> = ({ creation, buyName = "Create" }) => {
    const dispatch = useDispatch();
    const { payForResource } = useResourceActions();

    const queue = useSelector(creationQueueItemById(creation.id));
    const creationSpeedMod = useSelector(creationMultiply);
    const gameSpeed = useSelector(gameSpeedSelect);

    const baseCreationTime = creation.baseCreationTime ?? 0;
    const affordability = useCreationAffordability(creation);
    const canAfford = affordability > 0;

    const currentProgress = queue ? queue.count > 0 ? queue.progress : 0 : 0;
    const currentTimeLeft = queue ? queue.count > 0
        ? ((100 - queue.progress) * queue.baseCreationTime) / 100 / creationSpeedMod / gameSpeed
        : 0 : 0

    const totalTimeLeft =
        queue ? queue.baseCreationTime * (queue.count - 1) / creationSpeedMod / gameSpeed + currentTimeLeft : 0

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
        const remainingCount = queue?.count ?? 0;
        payForResource(creation, -remainingCount); // Refund resources for remaining items
        dispatch(clearQueue(creation.id));
    };

    return (
        <div className="buttons" style={styles.buttons}>
            <div style={styles.buyButtons}>
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

            </div>
            {queue && queue.count > 0 && (
                <button
                    style={{
                        ...styles.button,
                        backgroundColor: "#FF5733", // Red color for cancel
                    }}
                    onClick={handleCancelCreation}
                >
                    Cancel ({formatNumber(queue.count ?? 0)} queued)
                </button>
            )}

            {queue && queue.count > 0 && (
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
    ...buttonStyle,
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