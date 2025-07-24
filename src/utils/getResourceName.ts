import { IStats } from "../store/creations/creationTypes";


export const getResourceName = (resource: IStats): string => {
    switch (resource) {
        case IStats.followers:
            return "Followers";
        case IStats.followersPS:
            return "Followers Per Second";
        case IStats.power:
            return "Power";
        case IStats.powerPs:
            return "Power Per Second";
        default:
            return "Unknown Resource";
    }
};