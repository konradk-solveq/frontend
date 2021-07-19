import {routesData, routesDataToPersist} from './transformData';

export const getCurrentRoutePathById = async (
    routeId: string,
    oldRoutes?: {latitude: number; longitude: number; timestamp: number}[],
): Promise<{latitude: number; longitude: number; timestamp: number}[]> => {
    let res = await routesData(routeId);

    if (oldRoutes) {
        res = [...oldRoutes, ...res];
    }
    console.log('[res - get]', res[0]);
    const sorted = res.sort((a, b) => {
        if (new Date(a.timestamp) === new Date(b.timestamp)) {
            return 0;
        }

        return new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1;
    });
    // console.log('[sorted]', sorted[0]);
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
