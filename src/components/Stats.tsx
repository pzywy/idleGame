import { useSelector } from "react-redux";
import { selectFollowersPerSecond, selectPowerPerSecond } from "../store/statsSlice";
import ResourceDisplay from "./ResourceDisplay";
import { getStatName } from "../utils/getResourceName";
import { EResources } from "../store/creations/creationTypes";


const Stats = () => {
    const power = useSelector((state: any) => state.stats.power);
    const powerPerSecond = useSelector(selectPowerPerSecond);

    const followers = useSelector((state: any) => state.stats.followers);
    const followersPerSecond = useSelector(selectFollowersPerSecond);

    const divinity = useSelector((state: any) => state.stats.divinity);
    const might = useSelector((state: any) => state.stats.might);

    return (
        <div>
            <ResourceDisplay
                name={getStatName(EResources.power)}
                value={power}
                perSecond={powerPerSecond}
                icon="⚡" // Example icon
            />
            <ResourceDisplay
                name={getStatName(EResources.followers)}
                value={followers}
                perSecond={followersPerSecond}
                icon="👥" // Example icon
            />

            <ResourceDisplay
                name={getStatName(EResources.might)}
                value={might}
                perSecond={0}
                icon="⚡" // Example icon
            />

            <ResourceDisplay
                name={getStatName(EResources.divinity)}
                value={divinity}
                perSecond={0}
                icon="⚡" // Example icon
            />
        </div>
    );
};

export default Stats;
