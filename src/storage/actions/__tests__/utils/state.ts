export const initState = {
    routes: {
        currentRoute: {
            id: '',
            isActive: false,
            startedAt: undefined,
            endedAt: undefined,
            pauseTime: 0,
            routeId: undefined,
            remoteRouteId: undefined,
        },
        currentRouteData: [],
    },
    maps: {
        totalPrivateMaps: 0,
        mapToAddId: '',
    },
    app: {
        isOffline: false,
        internetConnectionInfo: {
            goodConnectionQuality: true,
        },
        location: undefined,
    },
};
