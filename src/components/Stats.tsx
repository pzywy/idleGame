import { useSelector } from "react-redux";
import { getStatName } from "../utils/getResourceName";
import { RootState } from "../store/store";
import ResourceDisplay from "./ResourceDisplay";


const Stats = () => {
    const stats = useSelector((state: RootState) => state.creations.stats);
    const utils = useSelector((state: RootState) => state.creations.utils);

    return (
        <div style={styles.stats}>
            {stats.map((stat, index) => (
                <ResourceDisplay key={index}
                    name={getStatName(stat.id)}
                    value={stat.owned}
                    // effectiveValue={stat.effectiveValue}
                    perSecond={stat.perSecond ?? 0}
                    icon={stat.icon} // Example icon
                />

            ))}

            {utils.map((stat, index) => (
                <ResourceDisplay key={index}
                    name={getStatName(stat.id)}
                    effectiveValue={stat.effectiveValue}
                    value={stat.owned}
                    perSecond={stat.perSecond ?? 0}
                    icon={stat.icon} // Example icon
                />

            ))}
        </div>
    );
};


const styles: { [key: string]: React.CSSProperties } = {
    stats: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        flexWrap: 'wrap',
        marginBottom: '10px',
        padding: '5px'
    },
};

export default Stats;
