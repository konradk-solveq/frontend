import {DebugRouteInstance} from '@debugging/debugRoute';
import {RouteActionT} from '@type/debugRoute';

export const createDebugRouteInstance = (
    actionType: RouteActionT,
    routeID?: string,
    date?: Date,
) => {
    const d = date || new Date('2021-11-05');
    const routeId = routeID || 'route-id';

    return DebugRouteInstance.debugRouteInstance(actionType, routeId, d);
};
