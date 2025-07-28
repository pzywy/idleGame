import { useSelector } from "react-redux";
import ResourceDisplay from "./ResourceDisplay";
import { statsSelector, utilsSelector } from "../store/creationSlice";


const Stats = () => {
    const stats = useSelector(statsSelector);
    const utils = useSelector(utilsSelector);

    return (
        <div style={styles.stats}>
            {stats.map((stat, index) => (
                <ResourceDisplay key={index}
                    name={stat.name}
                    value={stat.owned}
                    // effectiveValue={stat.effectiveValue}
                    perSecond={stat.perSecond ?? 0}
                    icon={stat.icon} // Example icon
                />

            ))}

            {utils.map((stat, index) => (
                <ResourceDisplay key={index}
                    name={stat.name}
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
        padding: '5px',
        wordBreak: 'break-word'
    },
};

export default Stats;
