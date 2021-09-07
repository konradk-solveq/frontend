import {getTrackerData} from '@src/hooks/utils/localizationTracker';
import deepCopy from '../helpers/deepCopy';
import {ShortCoordsType} from '../type/coords';
import {
    getRoutesDataFromSQL,
    getRoutesDataFromSQLWithLastRecord,
} from './transformData';

/**
 * Merge data from SQL with current path's data.
 * Data will be sorted by timestamp.
 */
export const getCurrentRoutePathById = async (
    routeId: string,
    oldRoutes?: {latitude: number; longitude: number; timestamp: number}[],
    skipSort?: boolean,
): Promise<{latitude: number; longitude: number; timestamp: number}[]> => {
    const timeStart = oldRoutes?.[oldRoutes?.length - 1]?.timestamp;

    let res = await getRoutesDataFromSQL(routeId, {
        start: timeStart ? new Date(timeStart).getTime() : 0,
        end: 0,
    });

    if (oldRoutes) {
        res = [...oldRoutes, ...res];
    }

    if (skipSort) {
        return res;
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
    skipSort?: boolean,
) => {
    try {
        const oldRoute = route?.length ? route : [];

        const newRoute = getCurrentRoutePathById(routeId, oldRoute, skipSort);

        return await Promise.resolve(newRoute);
    } catch (error) {
        console.log('[restoreRouteDataFromSQL - error]', error);
        return [];
    }
};

/**
 * Merge data from SQL with current path's data.
 * Data will be sorted by timestamp.
 * Contains last recorded position additionally
 */
export const getCurrentRoutePathByIdWithLastRecord = async (
    routeId: string,
    oldRoutes?: {latitude: number; longitude: number; timestamp: number}[],
    skipSort?: boolean,
): Promise<{
    data: {latitude: number; longitude: number; timestamp: number}[];
    lastRecord?: any;
}> => {
    const timeStart = oldRoutes?.[oldRoutes?.length - 1]?.timestamp;

    let res = await getRoutesDataFromSQLWithLastRecord(routeId, {
        start: timeStart ? new Date(timeStart).getTime() : 0,
        end: 0,
    });

    if (oldRoutes) {
        res.data = [...oldRoutes, ...res.data];
    }

    if (skipSort) {
        return res;
    }

    const sorted = res?.data?.sort((a, b) => {
        if (new Date(a.timestamp) === new Date(b.timestamp)) {
            return 0;
        }

        return new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1;
    });

    const lastRecordedData = getTrackerData({
        ...res.lastRecord,
        coords: {
            ...res.lastRecord.coords,
            speed: undefined,
        },
    });

    return {
        data: sorted,
        lastRecord: lastRecordedData,
    };
};
