import {routesData} from './transformData';

export const getCurrentRoutePathById = async (
    routeId: string,
    pauses?: {start: number; end: number},
    oldRoutes?: {latitude: number; longitude: number; timestamp: number}[],
): Promise<{latitude: number; longitude: number; timestamp: number}[]> => {
    const timeStart = oldRoutes?.[oldRoutes?.length - 1]?.timestamp;

    let res = await routesData(routeId, pauses, {
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

    const newRoute: any = [];

    sorted.map(m => {
        const pos = {
            latitude: m.latitude,
            longitude: m.longitude,
            timestamp: m.timestamp,
        };
        newRoute.push(pos);
    });

    return newRoute;
};
