import deepCopy from '../helpers/deepCopy';
import {ShortCoordsType} from '../type/coords';
import {getRoutesDataFromSQL} from './transformData';

/**
 * Merge data from SQL with current path's data.
 * Data will be sorted by timestamp.
 */
export const getCurrentRoutePathById = async (
    routeId: string,
    oldRoutes?: {latitude: number; longitude: number; timestamp: number}[],
): Promise<{latitude: number; longitude: number; timestamp: number}[]> => {
    const timeStart = oldRoutes?.[oldRoutes?.length - 1]?.timestamp;

    let res = await getRoutesDataFromSQL(routeId, {
        start: timeStart ? new Date(timeStart).getTime() : 0,
        end: 0,
    });

    if (oldRoutes) {
        res = [...oldRoutes, ...res];
    }

    const sorted = res.sort((a, b) => {
        if (new Date(a.timestamp) === new Date(b.timestamp)) {
            return 0;
        }

        return new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1;
    });

    return sorted;
};

export const restoreMultipleRouteDataFromSQL = async (
    routeId: string,
    routeNumber: number,
    routes: ShortCoordsType[][],
) => {
    try {
        const oldRoute = routes?.[routeNumber]
            ? deepCopy(routes[routeNumber])
            : [];

        const newRoute = getCurrentRoutePathById(routeId, oldRoute);

        return await Promise.resolve(newRoute);
    } catch (error) {
        return [];
    }
};

export const restoreRouteDataFromSQL = async (
    routeId: string,
    route: ShortCoordsType[],
) => {
    try {
        const oldRoute = route?.length ? deepCopy(route) : [];

        const newRoute = getCurrentRoutePathById(routeId, oldRoute);

        return await Promise.resolve(newRoute);
    } catch (error) {
        return [];
    }
};
