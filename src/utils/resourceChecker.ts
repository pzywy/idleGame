import { IStats } from "../store/creations/creationTypes";



export function resourceToDispatchAction(resource: IStats) {
    switch (resource) {
        case IStats.power: return "stats/addPower";
        case IStats.followers: return "stats/addFollowers";
        default: throw new Error(`resource ${resource} not handled!`);
    }
}

// export function resourceToSelector(resource: IResources) {
//     switch (resource) {
//         case IResources.power: return "power/addPower";
//         default: throw new Error(`resource ${resource} not handled!`);
//     }
// }