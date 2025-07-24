import { allResources } from "../store/creations/allResources";
import { EResources, IResource } from "../types/creationTypes";

export const getResourceName = (resource: IResource): string => {
    const perSecond = resource.mode == 'perSecond'
    const perSecondString = perSecond ? ' Per Second' : ''

    return getResource(resource) + perSecondString

};

function getResource(resource: IResource) {
    const r = allResources.find(o => o.id == resource.resource)
    if (r) return r.name

    return `Unknown resource ${resource.resource}`;
}

export function getStatName(resource: EResources) {
    switch (resource) {
        case EResources.followers:
            return "Followers";
        case EResources.power:
            return "Power";
        case EResources.divinity:
            return "Divinity";
        case EResources.might:
            return "Might";
        default:
            return `Unknown stat ${resource}`;
    }
}