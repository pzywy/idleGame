import { useDispatch, useSelector } from "react-redux";
import { addPower, selectFollowersPerSecond, selectPowerPerSecond } from "../store/statsSlice";
import ResourceDisplay from "./ResourceDisplay";


const Stats = () => {
    const dispatch = useDispatch();


    const power = useSelector((state: any) => state.stats.power);
    const powerPerSecond = useSelector(selectPowerPerSecond);

    const followers = useSelector((state: any) => state.stats.followers);
    const followersPerSecond = useSelector(selectFollowersPerSecond);

    return (
        <div>
            <ResourceDisplay
                name="Power"
                value={power}
                perSecond={powerPerSecond}
                icon="⚡" // Example icon
            />
            <ResourceDisplay
                name="Followers"
                value={followers}
                perSecond={followersPerSecond}
                icon="👥" // Example icon
            />
        </div>
    );
};

export default Stats;
