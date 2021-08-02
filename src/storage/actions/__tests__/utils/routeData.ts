import {CurrentRouteI} from '../../../reducers/routes';

export const endDate = new Date();

export const startedRoute: CurrentRouteI = {
    id: 'current-route-test-id',
    isActive: true,
    startedAt: new Date('Wed, 28 Jul 2021 07:08:41 GMT'),
    endedAt: undefined,
    pauseTime: 0,
    routeId: undefined,
    remoteRouteId: 'remote-route-test-id',
};

export const stoppedRoute: CurrentRouteI = {
    id: 'current-route-test-id',
    isActive: false,
    startedAt: new Date('Wed, 28 Jul 2021 07:08:41 GMT'),
    endedAt: endDate,
    pauseTime: 0,
    routeId: undefined,
    remoteRouteId: 'remote-route-test-id',
};
