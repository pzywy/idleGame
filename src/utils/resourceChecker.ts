import { EResources, IResource } from "../store/creations/creationTypes";



export function resourceToDispatchAction(resource: IResource) {
    if (resource.mode == 'perSecond') throw 'WRONG RESOURCE';
    console.log('resource', resource)

    if (resource.type == 'stat')
        switch (resource.resource) {
            case EResources.power: return "stats/addPower";
            case EResources.followers: return "stats/addFollowers";
            default: throw new Error(`resource ${resource} not handled!`);
        }

    if (resource.type == 'element')
        return 'creations/addCreation'

    throw new Error(`resource ${resource} not handled!`);
}

// export function resourceToSelector(resource: IResources) {
//     switch (resource) {
//         case IResources.power: return "power/addPower";
//         default: throw new Error(`resource ${resource} not handled!`);
//     }
// }